import { useState, useContext, useEffect } from 'react'
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Switch
} from 'react-native'
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
import NewItemForm from '../components/custom/NewItemForm'
import ItemsList from '../components/custom/ItemsList'
import InfoDrawer from '../components/custom/InfoDrawer'

export default function Index () {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [isFormVisible, setFormVisible] = useState(false)
  const [isDrawerVisible, setDrawerVisible] = useState(false)
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext)

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

  // function to add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1
      setTodos([{ id: newId, title: newTodo, completed: false }, ...todos])
      setNewTodo('')
      setFormVisible(false)
    }
  }

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
      data={isFormVisible ? [{ id: 'newForm', isForm: true }, ...todos] : todos}
      renderItem={({item}) => 
        item.isForm ? (<NewItemForm styles={styles} todos={todos} setTodos={setTodos} setFormVisible={setFormVisible}/>): (<ItemsList item={item} todos={todos} setTodos={setTodos} styles={styles} setDrawerVisible={setDrawerVisible}/>)
      }
      keyExtractor={todo => String(todo.id)}
      contentContainerStyle={{ flexGrow: 1 }}
      itemLayoutAnimation={LinearTransition}
      keyboardDismissMode='on-drag' />

      {isDrawerVisible && (<InfoDrawer styles={styles} isDrawerVisible={isDrawerVisible} setDrawerVisible={setDrawerVisible}/>)}

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
