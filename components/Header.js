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
import firebase from 'firebase'
import db from '../config';
import {Header,Icon,Badge} from 'react-native-elements'



export default class MyHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
      value:''
    }
  }
  BellIcon = ()=>{
    return(
      <View>
        <Icon name = 'bell' type = 'font-awesome' color = 'black' onPress ={()=>{
          this.props.navigation.navigate('Notification')
        }}/>
        <Badge value = {this.state.value} containerStyle = {{position:'absolute', top:-4, right:-4}}/>
      </View>
      
    )
  }

  getNotifications=()=>{
    db.collection("allNotifications")
      .where("notificationStatus", "==", "unread")
      .onSnapshot((snapshot)=>{
        var allNotifications = snapshot.docs.map((doc) =>doc.data())
        this.setState({
          value: allNotifications.length
        })
          
        });
        
    }
componentDidMount(){
  this.getNotifications()
}    
  render(){
    return(
        <Header 
        leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = 'black' onPress = {()=>{
          this.props.navigation.toggleDrawer()
        }}/>}
        centerComponent = {{text:this.props.title, style:{color:'#90A5A9', fontSize:20, fontWeight:"bold"}}} backgroundColor = "white"
        rightComponent = {<this.BellIcon {...this.props}/> }/>
    )
}}

