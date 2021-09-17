import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserCard = (props) =>{
    const { item = {}} = props;
    return (
        <View style={styles.container}>
            <Text style= {styles.heading}>{item.name ? item.name : ''} </Text>
            <Text>{item.email ? item.email : ''} </Text>
            <Text>{item.phone ? item.phone : ''} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#990000',
        borderRadius: 6,
    },
    heading: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 2,
    },
});

export default UserCard;
