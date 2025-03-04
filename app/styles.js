import {StyleSheet} from "react-native"

const createStyles = (theme, colorScheme) =>{
return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16
    },
    newItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 8,
      borderBottomWidth: 1,
    },
    
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 20,
      fontFamily: 'Inter_700Bold',
    },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: '#333',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10
    },
    input: {
      borderBottomWidth: 1,
      borderRadius: 8,
      borderBottomColor: '#555',
      padding: 8,
      marginBottom: 8,
      fontSize: 18,
      color: theme.text,
      fontFamily: 'Inter_500Medium'
    },
    addButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme === 'dark' ? 'black' : 'white',
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
      padding: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      color: theme.text,
      fontFamily: 'Inter_500Medium'
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
        backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      borderRadius: 10,
      borderColor: colorScheme === 'dark' ? 'white' : 'black',
      borderWidth: 1,
      padding: 10
    },
    toggleButtonComplete: {
      backgroundColor: 'green',
      borderColor: 'green',
      borderWidth: 1
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
  })}

  export default createStyles;