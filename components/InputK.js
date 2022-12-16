import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { gStyle } from '../styles/style';

export default function InputK({navigation}) {

    const [name, onChangeText] = useState("");
    const [number, onChangeNumber] = useState("");

    
    
    const loadScene=()=>{
        navigation.navigate('PersonalArea');
    }



    return (
    <View style={gStyle.main}>

        <Text style={gStyle.title}>Пользователь</Text> 
        <TextInput style={gStyle.input} onChangeText={onChangeText} value={name}/>
        <Text style={gStyle.title}>Пароль</Text>
        <TextInput style={gStyle.input} onChangeText={onChangeNumber} value={number}/>
        <Button title='ВХОД' disabled={!number||!name} onPress={loadScene}/>
    
    </View>
    );
}


const styles = StyleSheet.create({
    
});