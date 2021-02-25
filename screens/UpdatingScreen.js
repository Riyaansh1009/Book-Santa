import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, TextInput } from 'react-native';
 import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/Header';

export default class UpdateScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailID:'',
            First_Name:'',
            Last_Name:'',
            Address:'',
            Mobile_Number:'',
            docID:'',  
        }
    }
    userDetails = ()=>{
        var email = firebase.auth().currentUser.email
        db.collection('users').where('emailID','==', email).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    emailID: data.emailID,
                    First_Name: data.First_Name,
                    Last_Name: data.Last_Name,
                    Address: data.Address,
                    Mobile_Number: data.Mobile_Number,
                    docID: doc.id,  
                })
            })
        })

    }
    componentDidMount(){
        this.userDetails()
    }
    updateUser = ()=>{
        db.collection('users').doc(this.state.docID).update({
            "First_Name": this.state.First_Name,
            "Last_Name": this.state.Last_Name,
            "Address": this.state.Address,
            "Mobile_Number": this.state.Mobile_Number,
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Settings"/>
                <View style = {styles.formContainer}>
                <TextInput style = {styles.formTextInput} placeholder = {"First Name"} maxLength ={12} onChangeText = {(text)=>{this.setState({First_Name: text})}} value = {this.state.First_Name}/>
                 <TextInput style = {styles.formTextInput} placeholder = {"Last Name"} maxLength ={12} onChangeText = {(text)=>{this.setState({Last_Name: text})}} value = {this.state.Last_Name}/>
                <TextInput style = {styles.formTextInput} placeholder = {"Phone Number"} maxLength ={10} keyboardType = {'numeric'} onChangeText = {(text)=>{this.setState({Mobile_Number: text})}} value = {this.state.Mobile_Number}/>
                 <TextInput style = {styles.formTextInput} placeholder = {"Address"} multiline = {true} onChangeText = {(text)=>{this.setState({Address: text})}} value = {this.state.Address}/>
                 <TouchableOpacity style = {styles.registerButton} onPress = {()=>{this.updateUser()}}>
              <Text style = {styles.registerButtonText}> Update</Text>
              </TouchableOpacity>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })