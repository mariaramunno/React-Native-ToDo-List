import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useState} from 'react';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Detail = ({route}) => {
// getting data from firebase 
    const todoRef = firebase.firestore().collection('todos');
// setting textHeading to the input from the specfic data entry in todoRef
    const [textHeading, onChangeHeadingText]= useState(route.params.item.name);
// sets navigation to useNavigation to navigate between screens on phone
    const navigation = useNavigation();


    const updateTodo = () => {
// checking if there is input in the updating heading input
        if(textHeading && textHeading.length > 0){
// getting data from firebase
            todoRef
// getting doc reference from the id of the specfic data entry in todoRef
            .doc(route.params.item.id)
// updating the heading to the new inputted heading , then navigating home 
            .update ({
                heading:textHeading,
            }).then(() => {
                navigation.navigate('Home')
// catching error and sending back as an alert
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textField}
                onChangeText={onChangeHeadingText}
                value={textHeading}
                fontSize='20%'
                placeholder="Update To-Do"
            />                
            <Pressable
                style={styles.buttonUpdate}
                onPress={() => {updateTodo()}}
            >
                <Text>
                    UPDATE TODO</Text>
            </Pressable>
        </View>
    )
}
export default Detail;

// styling 
const styles = StyleSheet.create({
    container:{
        marginTop:80,
        marginLeft:15,
        marginRight:15
    },
    textField:{
        marginBottom:10,
        padding:10,
        fontSize:15,
        color:'#000000',
        backgroundColor:'#e0e0e0',
        borderRadius:5
    },
    buttonUpdate:{
        marginTop:25,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:32,
        paddingVertical:12,
        borderRadius:4,
        elevation:10,
        backgroundColor:'#acc7c9'
    }
})
