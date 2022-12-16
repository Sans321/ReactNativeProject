import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text, Button} from 'react-native';
import Svg, {Circle, Rect} from 'react-native-svg';
import { gStyle } from '../styles/style';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Schedule() {
    // Корпуса
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
    ]);
    // Номер кабинета
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
        {label: '445', value: '445'},
        {label: '345', value: '345'},
        {label: '112', value: '112'},
        {label: '245', value: '245'},
    ]);
    // Номер группы
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        {label: '1191б', value: '1191б'},
        {label: '1192б', value: '1192б'},
        {label: '1193б', value: '1193б'},
        {label: '1112', value: '1112'},
    ]);
    // Имя преподователя
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([
        {label: 'Долматов', value: 'Долматов'},
        {label: 'Усманов', value: 'Усманов'},
        {label: 'Годовников', value: 'Годовников'},
        {label: 'Русанов', value: 'Русанов'},
    ]);
    // План здания с выбором корпуса/этажа
    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState(null);
    const [items4, setItems4] = useState([
        {label: '4 корпус 1 этаж', value: '4 корпус 1 этаж'},
        {label: '4 корпус 2 этаж', value: '4 корпус 2 этаж'},
        {label: '4 корпус 3 этаж', value: '4 корпус 3 этаж'},
        {label: '4 корпус 4 этаж', value: '4 корпус 4 этаж'},
    ]);

    return (

    // <Svg >
       
    // </Svg>

    <View style={gStyle.main1}>
      {/* <TouchableOpacity style={gStyle.button1}></TouchableOpacity>
      <TouchableOpacity style={gStyle.button2}></TouchableOpacity> 
      <Text style={gStyle.terxtkor}>Корпус 4 Этаж 1</Text> */}
      <DropDownPicker
      style={gStyle.dropselct5}
      open={open4}
      value={value4}
      items={items4}
      setOpen={setOpen4}
      setValue={setValue4}
      setItems={setItems4}
      />

      <Image source={require('../plan/4K1S.jpg')} style={gStyle.paln}/>

      <DropDownPicker
      style={gStyle.dropselct1}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      />

      <DropDownPicker
      style={gStyle.dropselct2}
      open={open1}
      value={value1}
      items={items1}
      setOpen={setOpen1}
      setValue={setValue1}
      setItems={setItems1}
      />

      <DropDownPicker
      style={gStyle.dropselct3}
      open={open2}
      value={value2}
      items={items2}
      setOpen={setOpen2}
      setValue={setValue2}
      setItems={setItems2}
       />
       <DropDownPicker
      style={gStyle.dropselct4}
      open={open3}
      value={value3}
      items={items3}
      setOpen={setOpen3}
      setValue={setValue3}
      setItems={setItems3}
      />
      
    </View>
    );
}


const styles = StyleSheet.create({
  
});