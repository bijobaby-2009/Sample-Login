import { Alert } from 'react-native';

export function showAlert(msg){
    Alert.alert(
        '',
        msg,
        [
            { text : 'Ok', onPress : ()=>{}},
        ],
        {cancelable : false},
    );
}
