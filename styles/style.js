import { StyleSheet} from 'react-native';

export const gStyle = StyleSheet.create({
    main:{
        flex:1,
        padding: 50,
        paddingTop: '50%'
    },
   

    title:{
        fontSize: 20,
        color: '#333',
        fontFamily:'robco-light',
        textAlign: 'auto',
        left:15
        

    },
    title3:{
        fontSize: 20,
        color: '#333',
        fontFamily:'robco-light',
        textAlign: 'auto',
        left:5
        

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        fontFamily:'robco-light',
        backgroundColor: '#EDEDED',
        border: '2px solid #47AAE2',
    }, 
    
    main1:{
        flex:1,
        padding: 15,
    },
    title1:{
        fontSize: 20,
        color: '#333',
        fontFamily:'robco-light',
        textAlign: 'auto',
        paddingLeft:"54%",
        

    },
    image:{
        width: "50%",
        height: "25%",
         
    },
    button:{
        padding:"1%",
        alignItems: "center",
        backgroundColor: "#1A8CF6",
        marginBottom:"5%",
        borderRadius:40,
        borderWidth:1
    },
    button1:{
        padding:"1%",
        alignItems: "center",
        backgroundColor: "#1A8CF6",
        marginBottom:"5%",
        borderWidth:1
    },
    button2:{
        padding:"5%",
        alignItems: "center",
        backgroundColor: "#1A8CF6",
        marginBottom:"2%",
        borderWidth:1
    },
    mcenterView:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modaView:{
        margin: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    // button1:{
    //     alignItems: "center",
    //     backgroundColor: "#1A8CF6",
    //     marginBottom:"5%",
    //     width: 100,
    //     height:50,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     borderWidth:1,
    //     position:'relative',
    //     right: 0,
    //     bottom: 0
    // },
    // button2:{
    //     alignItems: "center",
    //     backgroundColor: "#1A8CF6",
    //     marginBottom:"5%",
    //     width: 100,
    //     height:50,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     borderWidth:1,
    //     position:'relative',
    //     left: 250,
    //     bottom: 68
        
    // },
    // terxtkor:{
    //     textAlign:"center",
    //     backgroundColor: "#1A8CF6",
    //     borderWidth:1,
    //     width: "45%",
    //     height:50,
    //     position:'relative',
    //     left: "28%",
         
    // },
    dropselct1:{
        backgroundColor: "#1A8CF6",
        width: "30%",
    },
    dropselct2:{
        backgroundColor: "#1A8CF6",
        width: "30%",
        position:'relative',
        left: 125,
        bottom: 51
    },
    dropselct3:{
        backgroundColor: "#1A8CF6",
        width: "30%",
        position:'relative',
        left: 250,
        bottom: 101
    },
    dropselct4:{
        backgroundColor: "#1A8CF6",
        bottom: 80
    },
    dropselct5:{
        backgroundColor: "#1A8CF6",
        
    },
    paln:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'

    }
})