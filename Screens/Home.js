import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect} from 'react';
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
// setting all todos to use state to update through input
    const [todos,setTodos] = useState([]);
// setting todos to the firebase firestore collection 
    const todoRef = firebase.firestore().collection('todos');
// setting new todo to use state to update through input
    const [addData, setAddData] = useState('');
// sets navigation to useNavigation to navigate between screens on phone
    const navigation = useNavigation();
    

    useEffect(() => {
// calling data in firebase and ordering by when created in descending order
        todoRef
        .orderBy('createdAt', 'desc')
// When the component initially loads, add all the loaded data to state.
        .onSnapshot(
            querySnapshot => {
                const todos = []
// Enumerates all of the documents in the QuerySnapshot and pushed the heading of the data and id to the todo array
                querySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,
                    })
                })
// setting todos
                setTodos(todos)
            }
        )
    }, [])

    const deleteTodo = (todos) => {
// calling data in firebase
        todoRef
// finding document referece of todo by id, deleting, then sending an alert
            .doc(todos.id)
            .delete()
            .then(() => {
                alert("Deleted Successfully")
            })
// catching errors and sending the error out in an alert
            .catch(error => {
                alert(error);
            })
    }

    const addTodo = () => {
// checking if addData is populated by user input an making sure it is longer than 0
        if (addData && addData.length > 0){
// sets timestamp of user input to timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
// sets data equal to the header and the timestamp
            const data = {
                heading: addData,
                createdAt: timestamp
            };
// calling data in firebase
            todoRef
// adding new data to the data in firebase, then erasing input in textbox and dismissing the keyboard
                .add(data)
                .then(() => {
                    setAddData('');
                    Keyboard.dismiss();
                })
// catching errors and sending out as an alert
                .catch((error) => {
                    alert(error);
                })
    }
}

    return (
        <View style={{flex:1}}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add a New To-Do'
                    fontSize='20%'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate('Detail', {item})}
                        >
                        <FontAwesome 
                            name='trash-o'
                            color='red'
                            onPress={() => deleteTodo(item)}
                            style={styles.todoIcon}
                        />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toUpperCase() + item.heading.slice(1)}
                            </Text>
                        </View>
                        </Pressable>
                
                    </View>
                )} 
            />
        </View>
    )
}
export default Home;

// styling
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f5b19c',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        marginLeft:45,
        flexDirection:'column',
        alignItems:'center'
    },
    itemHeading:{
        marginRight:22,
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    formContainer:{
        marginLeft:10,
        flexDirection:'row',
        height:80,
        marginRight:10,
        marginTop:100
    },
    input:{
        height:48,
        borderRadius:5,
        overflow:'hidden',
        backgroundColor:'white',
        paddingLeft:16,
        flex:1,
        marginRight:5
    },
    button:{
        height:47,
        borderRadius:5,
        backgroundColor:'#5b8f90',
        width:80,
        alignItems:'center',
        justifyContent:'center'

    },
    buttonText: {
        color:'white',
        fontSize:20
    },
    todoIcon: {
        marginTop:5,
        fontSize:20,
        marginLeft:14
    }
})