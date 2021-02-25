import React,{Component} from 'react';
// import { StyleSheet, Text, View,TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView} from 'react-native';
import * as firebase from 'firebase'
import db from '../config';
// import MyHeader from '../components/Header';




export default class BookRequest extends React.Component{
    constructor(){
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            bookName:'',
            reason:''
        }
    }
    createUniqueID(){
        return Math.random().toString(36).substring(7);
    }
    addRequest =(bookName, reason)=>{
        var userID = this.state.userID;
        var randomRequestID = this.createUniqueID();
        db.collection('RequestBooks').add({
            "userID": userID,
            "bookName": bookName,
            "reason": reason,
            "requestID": randomRequestID,
        })
    }
    render(){
        return(
            <View>
               {/* <MyHeader title = "Request Book"/> */}
                <KeyboardAvoidingView style = {styles.keyboardStyle}>
                    <TextInput style = {styles.formTextInput} placeholder = "Enter Book Name"  onChangeText = {(text)=>{this.setState({bookName:text})}} value = {this.state.bookName}/>
                    <TextInput style = {[styles.formTextInput, {height:300}]} placeholder = "Why do you need the book?"  onChangeText = {(text)=>{this.setState({reason:text})}} value = {this.state.reason} multiline numberOfLines = {8}/>
                    <TouchableOpacity style = {styles.button} onPress = {()=>{this.addRequest(this.state.bookName, this.state.reason)}}>
                        <Text> Request </Text>
<Text>{this.state.userID}</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        
        )
    }
}
const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )