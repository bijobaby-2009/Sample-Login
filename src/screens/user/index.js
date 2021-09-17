import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import UserCard from '../../component/user';

const User = () => {

    const {user : userModel} = useSelector(({user})=>{
        return {
            user,
        };
    });

    const {user : userDispatch} = useDispatch(({user})=>{
        return {
            user,
        };
    });

    const navigation = useNavigation();

    const { loading = false, users = [] } = userModel;
    const {getEmployees} = userDispatch;

    useEffect(()=>{
        getEmployees();
        console.log('users',users);
    },[]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}> Users</Text>
                {loading ? <View style={styles.loaderContainer}><ActivityIndicator size={'large'}/></View> :
                  users.length > 0 ? <FlatList
                  showsVerticalScrollIndicator={false}
                  data={users}
                  keyExtractor={({item})=>item.id.toString()}
                  renderItem={({item})=> <UserCard item= {item}/>}/>
                  :  <View style={styles.loaderContainer}><Text>No data to play</Text></View> }
                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    onPress={() => {
                        navigation.navigate('UserAdd');
                    }}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
      flex : 1,
      backgroundColor : '#fff',
    },
    subContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        color: '#990000',
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
  });

export default User;
