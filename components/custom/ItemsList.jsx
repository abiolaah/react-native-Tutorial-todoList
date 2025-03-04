import React,{useState} from 'react';
import { useRouter } from 'expo-router'
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

const ItemsList = ({
  item,
  todos,
  setTodos,
  styles,
  setDrawerVisible,
}) => {
    const [editTodoText, setEditTodoText] = useState('')
  const [editTodoDescriptionText, setEditTodoDescriptionText] = useState('')
  const [currentEditId, setCurrentEditId] = useState(null)

  const router = useRouter()
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
    // edit a todo for complete status
  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handlePress = (id) => {
    router.push(`/todos/${id}`)
  }
    return (
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
        
              {/* Edit button */}
              <TouchableOpacity onPress={() => {handlePress(item.id)}} style={[styles.button, styles.infoButton]}>
              <IconSymbol size={28} name='slider.horizontal.3' style={styles.editButton} selectable={undefined} />
              </TouchableOpacity>
        
              {/* Info Button */}
              <TouchableOpacity
              onPress={() => {
                setDrawerVisible(true)
              }}
                style={[styles.button, styles.infoButton]}
              >
                <IconSymbol size={28} library="Ionicons" name='info.circle' style={styles.editButton} selectable={undefined} />
              </TouchableOpacity>
        
              {/* Delete Button */}
              <TouchableOpacity
                onPress={() => deleteTodo(item.id)}
                style={[styles.button, styles.deleteButton]}
              >
                <IconSymbol
                  color={'red'}
                  size={28}
                  library="Ionicons"
                  name='trash.fill'
                  style={styles.deleteButton}
                  selectable={undefined}
                />
              </TouchableOpacity>
            </View>
    )
}

export default ItemsList;