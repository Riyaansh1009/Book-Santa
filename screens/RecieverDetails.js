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
import {Card,Header,Icon} from 'react-native-elements'

export default class RecieverDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            recieverID: this.props.navigation.getParam('Details')['userID'],
            requestID:  this.props.navigation.getParam('Details')['requestID'],
            bookName:   this.props.navigation.getParam('Details')['bookName'],
            reason:     this.props.navigation.getParam('Details')['reason'],
            reciverName: '',
            recieverContact: '',
            recieverAddress: '',
            documentID: ''
        }
    }

    getRecieverDetails(){
        db.collection('users').where('emailID', '==', this.state.recieverID).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    reciverName: doc.data().First_Name,
                    recieverContact: doc.data().Mobile_Number,
                    recieverAddress: doc.data().Address,
                
                })
            })
        })
    }
    getNotification = ()=>{
        var message = this.state.username + "Has Shown interest in donating the book";
        db.collection('allNotifications').add({
            "reciever": this.state.recieverID,
            "donor": this.state.userID,
            "requestID": this.state.requestID,
            "bookName": this.state.bookName,
            "notificationStatus": "unread",
            "message":message,
            "date": firebase.firestore.FieldValue.serverTimestamp(),
            "username": ''

        })
    }
    getUserDetails = (userID)=>{
        db.collection("users").where('emailID','==', userID).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              username  :doc.data().First_Name + " " + doc.data().Last_Name
            })
          })
        })
    }
    
    updateBookStatus = ()=>{
        db.collection('allDonations').add({
            "bookName": this.state.bookName,
            "requestID": this.state.requestID,
            "requestedBY": this.state.reciverName,
            "donorID": this.state.userID,
            "status": "DonorInterested"
        })
    }
    componentDidMount(){
        this.getRecieverDetails();
        this.getUserDetails(this.state.userID);
    }
    render(){
        return(
            <View style = {styles.container}>
             <View style = {{flex:0.3}}>
            <Card title = {"Book Information"} titleStyle = {{fontSize:20}}>
                <Card>
                    <Text style = {{fontWeight:'bold'}}>
                        Name:{this.state.bookName}
                    </Text>
                </Card>
                <Card>
                    <Text style = {{fontWeight:'bold'}}>
                        Reason:{this.state.reason}
                    </Text>
                </Card>
            </Card>

             </View>
                <View style = {{flex:0.3}}>
                <Card title = {"Reciever Information"} titleStyle = {{fontSize:20}}>
                <Card>
                    <Text style = {{fontWeight:'bold'}}>
                        Name:{this.state.reciverName}
                    </Text>
                </Card>
                <Card>
                    <Text style = {{fontWeight:'bold'}}>
                        Contact:{this.state.recieverContact}
                    </Text>
                </Card>
                <Card>
                    <Text style = {{fontWeight:'bold'}}>
                        Address:{this.state.recieverAddress}
                    </Text>
                </Card>
            </Card>

                </View>
                <View style = {styles.buttonContainer}>
                    {
                        this.state.recieverID == this.state.userID
                        ?(
                            null
                        )
                        :
                        (
                            <TouchableOpacity style = {styles.button} onPress= {()=>{
                                this.updateBookStatus()
                                this.getNotification()
                                this.props.navigation.navigate('MyDonations')
                            }}>
                                <Text>
                                    I Want to Donate
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 10,
      backgroundColor: 'orange',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    }
  })
