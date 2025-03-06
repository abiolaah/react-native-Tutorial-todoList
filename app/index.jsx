import { useState, useContext, useEffect } from 'react'
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Inter_500Medium,
  Inter_700Bold,
  useFonts
} from '@expo-google-fonts/inter'

import { IconSymbol } from '@/components/ui/IconSymbol'

import { data } from '@/data/todos'
import createStyles from './styles'
import { ThemeContext } from '../context/ThemeContext'


export default function Index () {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext)

  const router = useRouter();

  const [loaded, error] = useFonts({
    Inter_500Medium,
    Inter_700Bold
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('TodoApp')
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id))
        } else {
          setTodos(data.sort((a, b) => b.id - a.id))
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
  }, [data])

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos)
        await AsyncStorage.setItem('TodoApp', jsonValue)
      } catch (e) {
        console.error(e)
      }
    }

    storeData()
  }, [todos])

  if (!loaded && !error) {
    return null
  }

  const styles = createStyles(theme, colorScheme)

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

  // delete a todo from the todo list
  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }


  // edit a todo for complete status
  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // handle dynamic routing
  const handlePress = (id) => {
    router.push(`/todos/${id}`)
  }

  const renderNewItemForm = () => (
    <View style={[styles.inputContainer, styles.newItemContainer]}>
        <TextInput
          style={styles.input}
          maxLength={30}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder='New Todo Title'
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
      <TouchableOpacity onPress={() => toggleTodo(item.id)} style={[styles.button, styles.toggleButton, item.completed && styles.toggleButtonComplete]}/>
        {/* Editable Text */}
        <TouchableOpacity style={[styles.button, styles.textContainer]}>
          <Text style={[styles.todoText, item.completed && styles.completedText]}>
            {item.title}
          </Text>
        </TouchableOpacity>
            
                  {/* Edit button */}
                  <TouchableOpacity onPress={() => {handlePress(item.id)}} style={[styles.button, styles.infoButton]}>
                  <IconSymbol size={28} name='slider.horizontal.3' style={styles.editButton} selectable={undefined} />
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List.</Text>
        <Pressable
          onPress={() =>
            setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
          }
          style={{ marginLeft: 10 }}
        >
          <IconSymbol
              name={colorScheme === 'dark' ?'moon.fill': 'sun.max'}
              library="Ionicons"
              size={24}
              color={theme.text}
              style={{ width: 36 }}
            />
        </Pressable>
      </View>
      <Animated.FlatList
        data={
          isFormVisible ? [{ id: 'newForm', isForm: true }, ...todos] : todos
        }
        renderItem={({ item }) =>
          item.isForm ? renderNewItemForm() : renderItem({ item })
        }
        keyExtractor={todo => String(todo.id)}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode='on-drag'
      />

      <View>
        <Pressable
          onPress={() => setFormVisible(!isFormVisible)}
          style={styles.formButton}
        >
          <IconSymbol size={28} library="Ionicons" name='plus.circle' />
          <Text style={styles.formButtonText}>New Todo</Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}
