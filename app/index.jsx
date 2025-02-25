import { useState } from 'react'
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  Switch
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

import { IconSymbol } from '@/components/ui/IconSymbol'

import { data } from '@/data/todos'

export default function Index () {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id))
  const [newTodo, setNewTodo] = useState('')
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [editTodoText, setEditTodoText] = useState('')
  const [editTodoDescriptionText, setEditTodoDescriptionText] = useState('')
  const [currentEditId, setCurrentEditId] = useState(null)
  const [isDrawerVisible, setDrawerVisible] = useState(false)
  const [isDateEnabled, setIsDateEnabled] = useState(true)
  const [isTimeEnabled, setIsTimeEnabled] = useState(false)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [isTimePickerVisible, setTimePickerVisible] = useState(false)

  const dateToggleSwitch = () => {
    setIsDateEnabled(previousState => !previousState)
    if (isDateEnabled === false) {
      setDatePickerVisible(false)
    }
    setDatePickerVisible(previousState => !previousState)
  }
  const timeToggleSwitch = () => {
    setIsTimeEnabled(previousState => !previousState)
    setTimePickerVisible(previousState => !previousState)
  }

  // function to change date
  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate)
  }

  // function to change time
  const onTimeChange = (event, selectedTime) => {
    setTime(selectedTime)
  }

  // function to add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1
      setTodos([{ id: newId, title: newTodo, completed: false }, ...todos])
      setNewTodo('')
      setFormVisible(false)
    }
  }

  const addTodo1 = () => {
    if (newTodo.trim() || newTodoDescription.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1
      setTodos([
        {
          id: newId,
          title: newTodo,
          description: newTodoDescription,
          completed: false
        },
        ...todos
      ])
      setNewTodo('')
      setNewTodoDescription('')
      setFormVisible(false)
    }
  }

  // delete a todo from the todo list
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Edit a todo
  const saveEditTodo = () => {
    setTodos(
      todos.map(todo =>
        todo.id === currentEditId ? { ...todo, title: editTodoText } : todo
      )
    )
    setEditTodoText('')
    setCurrentEditId(null)
  }

  const saveEditTodo1 = () => {
    setTodos(
      todos.map(todo =>
        todo.id === currentEditId
          ? {
              ...todo,
              title: editTodoText,
              description: editTodoDescriptionText
            }
          : todo
      )
    )
    setEditTodoText('')
    setEditTodoDescriptionText('')
    setCurrentEditId(null)
  }

  // edit a todo for complete status
  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const renderNewItemForm = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
        placeholder='New Todo Title'
        placeholderTextColor='#777'
      />
      <TextInput
        style={styles.input}
        value={newTodoDescription}
        onChangeText={setNewTodoDescription}
        placeholder='New todo description'
        placeholderTextColor='#777'
      />
      <Pressable onPress={addTodo} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  )

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      {/* Toggle Button */}
      <TouchableOpacity
        onPress={() => toggleTodo(item.id)}
        style={[
          styles.button,
          styles.toggleButton,
          item.completed && styles.toggleButtonComplete
        ]}
      />

      {/* Editable Text */}
      <TouchableOpacity
        onPress={() => {
          setEditTodoText(item.title)
          setEditTodoDescriptionText(item.description || '')
          setCurrentEditId(item.id)
        }}
        style={[styles.button, styles.textContainer]}
      >
        {currentEditId === item.id ? (
          <>
            <TextInput
              style={[styles.todoText, styles.editInput]}
              value={editTodoText}
              onChangeText={setEditTodoText}
              onBlur={saveEditTodo}
              autoFocus
            />
            <TextInput
              style={[styles.todoDescriptionText, styles.editInput]}
              value={editTodoDescriptionText}
              onChangeText={setEditTodoDescriptionText}
              onBlur={saveEditTodo}
              autoFocus
            />
          </>
        ) : (
          <>
            <Text
              style={[styles.todoText, item.completed && styles.completedText]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.todoDescriptionText,
                item.completed && styles.completedText
              ]}
            >
              {item.description === undefined ? '' : item.description}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Info Button */}
      <TouchableOpacity
        onPress={() => {
          setDrawerVisible(true)
        }}
        style={[styles.button, styles.infoButton]}
      >
        <IconSymbol size={28} name='info.circle' style={styles.editButton} />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => deleteTodo(item.id)}
        style={[styles.button, styles.deleteButton]}
      >
        <IconSymbol
          color={'red'}
          size={28}
          name='trash.fill'
          style={styles.deleteButton}
        />
      </TouchableOpacity>
    </View>
  )

  // Drawer for setting date and time
  const renderDrawer = () => (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isDrawerVisible}
      onRequestClose={() => setDrawerVisible(false)}
    >
      <View style={styles.drawerBackdrop}>
        <View style={styles.drawerContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10
            }}
          >
            <Pressable
              style={styles.drawerCloseButton}
              onPress={() => setDrawerVisible(false)}
            >
              <Text style={styles.drawerCloseButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={styles.drawerCloseButton}
              onPress={() => setDrawerVisible(false)}
            >
              <Text style={styles.drawerCloseButtonText}>Done</Text>
            </Pressable>
          </View>

          {/* Date: Add date picker */}
          <TouchableOpacity
            onPress={() => {
              setDatePickerVisible(true)
            }}
            style={styles.dateTimeButton}
          >
            <View style={styles.dateSwitchView}>
              <View style={styles.dateView}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateValueText}>
                  {isDatePickerVisible && isDateEnabled
                    ? date.toLocaleDateString()
                    : 'Today'}
                </Text>
              </View>

              {/* Switch */}
              <Switch
                trackColor={{ false: '#767577', true: '#1cd396' }}
                thumbColor={isDateEnabled ? '#f2f5f4' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={dateToggleSwitch}
                value={isDateEnabled}
              />
            </View>

            {isDatePickerVisible && (
              <DateTimePicker
                value={date}
                mode='date'
                onChange={onDateChange}
                style={{ width: '100%' }}
              />
            )}
          </TouchableOpacity>

          {/* Time: Add time picker */}
          <TouchableOpacity style={styles.dateTimeButton}>
            <View style={styles.dateSwitchView}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 10
                }}
              >
                <Text style={styles.timeText}>Time</Text>
                <Text style={styles.timeValueText}>
                  {isTimePickerVisible && isTimeEnabled
                    ? time.toLocaleTimeString()
                    : ''}
                </Text>
              </View>

              <Switch
                trackColor={{ false: '#767577', true: '#1cd396' }}
                thumbColor={isTimeEnabled ? '#f2f5f4' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={timeToggleSwitch}
                value={isTimeEnabled}
              />
            </View>
            {isTimePickerVisible && (
              <View style={{ width: '100%' }}>
                <DateTimePicker
                  value={time}
                  mode='time'
                  is24Hour={true}
                  onChange={onTimeChange}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text>To-Do List.</Text>
      <FlatList
        // data={todos}
        data={
          isFormVisible ? [{ id: 'newForm', isForm: true }, ...todos] : todos
        }
        // renderItem={renderItem}
        renderItem={({ item }) =>
          item.isForm ? renderNewItemForm() : renderItem({ item })
        }
        keyExtractor={todo => String(todo.id)}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {isDrawerVisible && renderDrawer()}

      <View>
        <Pressable
          onPress={() => setFormVisible(!isFormVisible)}
          style={styles.formButton}
        >
          <IconSymbol size={28} name='plus.circle' />
          <Text style={styles.formButtonText}>New Todo</Text>
        </Pressable>
        {/* {isFormVisible && renderNewItemForm()} */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  input: {
    // flex: 1,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderBottomColor: '#555',
    // padding: 10,
    padding: 8,
    // marginRight: 10,
    marginBottom: 8,
    fontSize: 18,
    color: 'white'
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10
  },
  addButtonText: {
    fontSize: 18,
    color: 'black'
  },
  formButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  formButtonText: {
    fontSize: 18,
    color: '#1d7bf7'
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // gap: 4,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: 'white'
  },
  todoDescriptionText: {
    flex: 1,
    fontSize: 10,
    color: 'white'
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
    ontSize: 18,
    color: 'white'
  },
  editInput: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5
  },
  infoButton: {
    marginHorizontal: 5
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 12
  },
  drawerContainer: {
    backgroundColor: '#222323',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 20,
    height: '70%',
    marginTop: 10,
    marginBottom: 10
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  drawerInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15
  },
  drawerCloseButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  },
  drawerCloseButtonText: {
    color: '#1d7bf7',
    fontSize: 18
  },
  button: {
    padding: 8,
    borderRadius: 5
  },
  toggleButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10
  },
  toggleButtonComplete: {
    backgroundColor: 'green'
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  dateTimeButton: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between'
  },
  dateView: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10
  },
  dateSwitchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  },
  timeView: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10
  },
  dateText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  dateValueText: {
    fontSize: 14,
    color: 'white'
  },
  timeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  timeValueText: {
    fontSize: 12,
    color: 'white'
  }
})
