import React, {useState, useEffect} from 'react';
import { StyleSheet, View,Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { gStyle } from '../styles/style';

export default function TimeTAble() {  
    // const urlF = "https://www.ugrasu.ru/api/directory/faculties";
    // const urlG = "https://www.ugrasu.ru/api/directory/groups";
    // const url = `https://www.ugrasu.ru/api/directory/lessons?fromdate=2022-12-12&todate=2022-12-18&groupOid=6668` 
    // const dataG={1191:6668, 1192:6586, 1193:6426}
    const [data, setData] = useState({})
    const [loading, setLoading]= useState(true)

    const [modalVisibleISE, setModalVisibleISE] = useState(false);
    const [modalVisibleING, setModalVisibleING] = useState(false);
 
    const[dataG, setDataG]=useState({1191:6668, 1192:6586, 1193:6426})
    
    const url = `https://www.ugrasu.ru/api/directory/lessons?fromdate=2022-12-12&todate=2022-12-18&groupOid=${encodeURIComponent(dataG[1191])}`
    

    useEffect(()=>{
        fetch(url)
            .then((response)=>response.json())
            .then((json)=>setData(json))
            .catch((error)=>console.error(error))
            .finally(()=>setLoading(false))
    }, []);


    return (
    <ScrollView style={gStyle.main1}>
        <View >
        <Text style={gStyle.button1}>"Югорский государственный университет"</Text>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>Гуманитарный институт</Text></TouchableOpacity>
        <TouchableOpacity style={gStyle.button} onPress={() => setModalVisibleING(!modalVisibleING)}><Text style={gStyle.title}>Институт нефти и газа</Text></TouchableOpacity>
        <Modal animationType="slide" transparent={true}  visible={modalVisibleING} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleING(!modalVisibleING);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                    <TouchableOpacity style={gStyle.button2} onPress={() => setModalVisibleING(!modalVisibleING)} ><Text style={gStyle.title3}>321321</Text></TouchableOpacity>
                    <TouchableOpacity style={gStyle.button2} onPress={() => setModalVisibleING(!modalVisibleING)} ><Text style={gStyle.title3}>3213d</Text></TouchableOpacity>
                    <TouchableOpacity style={gStyle.button2} onPress={() => setModalVisibleING(!modalVisibleING)} ><Text style={gStyle.title3}>321wsq</Text></TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
        <TouchableOpacity style={gStyle.button} onPress={() => setModalVisibleISE(!modalVisibleISE)}><Text style={gStyle.title} >Институт цифровой экономики</Text></TouchableOpacity>
        <Modal animationType="slide" transparent={true}  visible={modalVisibleISE} onRequestClose={() => { Alert.alert("Modal has been closed.");setModalVisibleISE(!modalVisibleISE);}}>
            <View style={gStyle.mcenterView}>
                <ScrollView style={gStyle.modaView}>
                    <TouchableOpacity style={gStyle.button2} onPress={() => setModalVisibleISE(!modalVisibleISE)&&setDataG(dataG[1191])} ><Text style={gStyle.title3}>1191б</Text></TouchableOpacity>
                    <TouchableOpacity style={gStyle.button2} onPress={() => setModalVisibleISE(!modalVisibleISE)&&setDataG(dataG[1192])} ><Text style={gStyle.title3}>1192б</Text></TouchableOpacity>
                    <TouchableOpacity style={gStyle.button2} onPress={() => setModalVisibleISE(!modalVisibleISE)&&setDataG(dataG[1193])} ><Text style={gStyle.title3}>1193б</Text></TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>Центр превосходства ugra green school</Text></TouchableOpacity>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>Элективные дисциплины по физической культуре и спорту</Text></TouchableOpacity>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>Юридический институт</Text></TouchableOpacity>

        <Text style={gStyle.button1}>"Филиалы ЮГУ"</Text>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>ИНДУСТРИАЛЬНЫЙ ИНСТИТУТ(филиал)</Text></TouchableOpacity>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>ИНСТИТУТ НЕФТИ И ТЕХНОЛОГИЙ(филиал)</Text></TouchableOpacity>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>ЛЯНТОРСКИЙ НЕФТЯНОЙ ТЕХНИКУМ(филиал)</Text></TouchableOpacity>
        <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>НЕФТЯНОЙ ИНСТИТУТ(филиал)</Text></TouchableOpacity>
        
        </View>

        


{/* 
       {loading ? (<Text>Loading...</Text>) : (
         data.map((post)=>(
            <View>
                <TouchableOpacity style={gStyle.button}><Text style={gStyle.title}>{post.auditorium}</Text></TouchableOpacity>

            </View>
         ))
       )} */}

    </ScrollView >
    );
}


const styles = StyleSheet.create({
  
});