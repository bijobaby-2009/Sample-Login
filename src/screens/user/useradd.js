import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../models';
import { insertUserTable } from '../../service/user';

const UserAddScreen = () => {
    const navigation = useNavigation();

    const [textName, onChangeName] = React.useState('');
    const [textMobile, onChangMobile] = React.useState('');
    const [textEmail, onChangeEmail] = React.useState('');

    const {user : userModel} = useSelector(({user})=>{
        return {
            user,
        };
    });

    const { loading = false, users = [] } = userModel;

    const {user : userDispatch} = useDispatch(({user})=>{
        return {
            user,
        };
    });


    const onButtonClick = async ()=> {

        let data = await userDispatch.getLastUserDataInfo();
        console.log('result', data);
       if (!data)
       {
            insertUser(1);
       }
       else {
           insertUser(data.id + 1);
       }
        // if(data)

        // console.log('Ho',users);
        // userDispatch.getLastUserDataInfo( result =>{
        //    console.log('result' + result);
        // //    let data = {'id':result.id + 1,'name':textName,'mobile':textMobile,'email':textEmail};
        // //    userDispatch.setUserData(data);
        // //    navigation.goBack();
        // });


   };

   const insertUser = async (id) =>{
        let data = {'id':id ,'name':textName,'mobile':textMobile,'email':textEmail};
        // let result = await userDispatch.setUserData(data);
        // console.log(result);
        console.log(data);
        await userDispatch.setUserData(data);
        await userDispatch.getEmployees();
        navigation.goBack();

   };


    return (
        <SafeAreaView style={styles.container}>
            <Text>Name</Text>
            <TextInput
                text = {textName}
                onChangeText = {onChangeName}
                style={styles.input}/>
            <Text>Mobile</Text>
            <TextInput
                text = {textMobile}
                onChangeText = {onChangMobile}
                style={styles.input}/>
            <Text>Email</Text>
            <TextInput
                text = {textEmail}
                onChangeText = {onChangeEmail}
                style={styles.input}/>
            <TouchableOpacity
            onPress={onButtonClick}
            style={styles.button}>
                <Text>Add User</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding: 12,
        backgroundColor: '#fff',
        alignContent : 'center',
        justifyContent : 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
      },
    button: {
        marginTop :12,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      },
});

export default UserAddScreen;
