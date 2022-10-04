import React from "react";
import InputK from "./components/InputK";
import PersonalArea from "./components/PersonalArea";
import Karta from "./components/Karta";
import EductionSub from "./components/EductionSub";
import TimeTAble from "./components/TImeTAble";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createStackNavigator();

export default function Navigate(){
    return <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen 
             name='InputK'
             component={InputK}
             options={{title:'',headerStyle:{backgroundColor:'#8EC6FB'} }}
            />
            <Stack.Screen 
             name='PersonalArea'
             component={PersonalArea}
             
             options={{
                title:'',
                // headerTitle:()=>(
                //     <Image style={{ width: 50, height: 50 }} source={{uri: 'https://i.pinimg.com/736x/fa/1d/f2/fa1df2a02af916fc09a1ee1aae4f573a.jpg'}} />
                // ),
                headerStyle:{
                    backgroundColor:'#8EC6FB'
                } 
            }}
            />
            <Stack.Screen
             name='Karta'
             component={Karta}
             options={{title:'', headerStyle:{backgroundColor:'#8EC6FB'}}}
            />
            <Stack.Screen
             name='TimeTAble'
             component={TimeTAble}
             options={{title:'', headerStyle:{backgroundColor:'#8EC6FB'}}}
            />
            <Stack.Screen
             name='EductionSub'
             component={EductionSub}
             options={{title:'', headerStyle:{backgroundColor:'#8EC6FB'}}}
            />
            
        </Stack.Navigator>
    </NavigationContainer>;
}