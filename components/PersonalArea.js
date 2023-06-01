import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { gStyle } from '../styles/style';
// import { WebView } from 'react-native-webview';

export default function PersonalArea({navigation}) {
    const loadScene=()=>{
        navigation.navigate('Karta');
        
    }
    const loadScene1=()=>{
        navigation.navigate('TimeTAble');
    }
    const loadScene2=()=>{
        navigation.navigate('EductionSub');
    }
    const loadScene3=()=>{
        navigation.navigate('TimeTAbleV');
    }
 
    // const LoginPage = () => {
    //     const [username, setUsername] = useState('san231100');
    //     const [password, setPassword] = useState('Uny771');
  
    // const handleLogin = () => {
    //   const authUrl = 'https://itport.ugrasu.ru/login';
    //   const headers = {
    //     Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    //   };
    //   setWebViewSource({ uri: authUrl, headers });
    // };
  
    // const [webViewSource, setWebViewSource] = useState({ uri: 'https://itport.ugrasu.ru/#/' });
    // }
    return (
    <View style={gStyle.main1}>
        <Text style={gStyle.title1}>Здраствуйте</Text>        
        <Image style={gStyle.image} source={{uri: 'https://i.pinimg.com/736x/fa/1d/f2/fa1df2a02af916fc09a1ee1aae4f573a.jpg'}}/>


        <TouchableOpacity style={gStyle.button} onPress={loadScene}><Text style={gStyle.title}>Карта</Text></TouchableOpacity>

        <TouchableOpacity style={gStyle.button} onPress={loadScene1} ><Text style={gStyle.title}>Расписание</Text></TouchableOpacity>

        <TouchableOpacity style={gStyle.button} onPress={loadScene3} ><Text style={gStyle.title}>Личный кабинет</Text></TouchableOpacity>
    </View>
    );
}


const styles = StyleSheet.create({
  
});