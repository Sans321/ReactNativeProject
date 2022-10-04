import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { gStyle } from '../styles/style';

export default function InputK({navigation}) {

    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);

    const loadScene=()=>{
        navigation.navigate('PersonalArea');
    }


    return (
    <View style={gStyle.main}>

        <Text style={gStyle.title}>Пользователь</Text> 
        <TextInput style={gStyle.input} onChangeText={onChangeText} value={text}/>
        <Text style={gStyle.title}>Пароль</Text>
        <TextInput style={gStyle.input} onChangeText={onChangeNumber} value={number}/>
        <Button title='ВХОД' onPress={loadScene}/>
    
    </View>
    );
}


const styles = StyleSheet.create({
  
});