import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import InputKStack from './navigate';

const fonts = () => Font.loadAsync({
  'robco-light':require('./assets/fonts/RobotoCondensed-Light.ttf')
});
 
export default function App() {
  const [font, setFont] = useState(false);

  if(font){
    return (
    <InputKStack/>
  );
  }else{
    return(
      <AppLoading 
      startAsync={font} 
      onFinish={()=>setFont(true)} 
      onError={console.warn}/>
    );
  }

  
}

const styles = StyleSheet.create({
  
});
