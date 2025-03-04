import { useLocalSearchParams, useRouter  } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {Inter_500Medium,Inter_700Bold,useFonts} from '@expo-google-fonts/inter'
import { ThemeContext } from "@/context/ThemeContext";

import { IconSymbol } from '@/components/ui/IconSymbol'


export default function EditScreen() {
    const {id} = useLocalSearchParams();
    const [todo, setTodo] = useState({});

    const { theme, colorScheme, setColorScheme } = useContext(ThemeContext)

    const router = useRouter();

    const [loaded, error] = useFonts({
        Inter_500Medium,
        Inter_700Bold
    })

    const fetchData = async (id) => {
        try {
            const jsonValue = await AsyncStorage.getItem("TodoApp")
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

            if(storageTodos && storageTodos.length){
                // const myTodo = storageTodos.find(todo => todo.id.toString() === id)
                const myTodo = storageTodos.find(todo => todo.id === Number(id))
                setTodo(myTodo)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if(!id) return ;
        fetchData(id)
    }, [id])

    if (!loaded && !error) {
        return null
    }

    const styles = createStyles(theme, colorScheme)

    const handleSave = async () => {
        try {
            const savedTodo = {...todo, title: todo.title}

            const jsonValue = await AsyncStorage.getItem("TodoApp")
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
            
            if(storageTodos && storageTodos.length){
                const otherTodos = storageTodos.filter(todo => todo.id !== savedTodo.id)
                const allTodos = [...otherTodos, savedTodo]
                await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos))
            }
            else{
                await AsyncStorage.setItem("TodoApp", JSON.stringify([savedTodo]))
            }

            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Text style={{ color: theme.text }}>Loading...</Text>
            </View>
        );
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{todo.title}</Text>
                <Text style={styles.headerTitle}>Edit</Text>
            <Pressable onPress={() => setColorScheme(colorScheme==='light'? 'dark'
                :'light')} style={{marginLeft: 10}}>
                    <IconSymbol name={colorScheme==='dark' ? 'moon.fill' : 'sun.max'} library="Ionicons" size={24} color={theme.text} />
            </Pressable>
            </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={todo?.title||"Edit todo"} maxLength={30} placeholderTextColor="gray" value={todo?.title || ''} onChangeText={(text) => setTodo(prev => ({...prev, title: text}))} />
        </View>

        <View style={styles.inputContainer}>
            <Pressable onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>

            <Pressable onPress={() => router.push('/')} style={[styles.saveButton, {backgroundColor: 'red'}]}>
            <Text style={[styles.saveButtonText, {color: 'white'}]}>Cancel</Text>
            </Pressable>
        </View>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    )
}


function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8
            },
        headerTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 20,
            fontFamily: 'Inter_700Bold',
        },
        title: {
            fontSize: 18,
            fontWeight: 'normal',
            color: theme.text,
            marginBottom: 20,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 6,
            width: '100%',
            maxWidth: 1024,
            marginHorizontal: 'auto',
            pointerEvents: 'auto',
        },
        input: {
            flex: 1,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            fontSize: 18,
            fontFamily: 'Inter_500Medium',
            minWidth: 0,
            color: theme.text,
        },
        saveButton: {
            backgroundColor: theme.button,
            borderRadius: 5,
            padding: 10,
        },
        saveButtonText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white',
        }
    })
}