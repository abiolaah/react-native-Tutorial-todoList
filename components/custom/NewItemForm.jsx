import React, {useState} from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';

const NewItemForm = ({
  styles,
  todos,
  setTodos,
  setFormVisible,
}) => {
  const [newTodo, setNewTodo] = useState('')
  const [newTodoDescription, setNewTodoDescription] = useState('')

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
    <View style={[styles.inputContainer, styles.newItemContainer]}>
    <TextInput
      style={styles.input}
      maxLength={30}
      value={newTodo}
      onChangeText={setNewTodo}
      placeholder='New Todo Title'
      placeholderTextColor='#777'
    />
    {/* <TextInput
      style={styles.input}
      value={newTodoDescription}
      onChangeText={setNewTodoDescription}
      placeholder='New todo description'
      placeholderTextColor='#777'
    /> */}
    <Pressable onPress={addTodo} style={styles.addButton}>
      <Text style={styles.addButtonText}>Add</Text>
    </Pressable>
  </View>
  )
}

export default NewItemForm;