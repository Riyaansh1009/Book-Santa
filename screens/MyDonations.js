import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
 import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/Header';

export default class MyDonations extends Component{
  constructor(){
    super()
    this.state = {
      AllDonations : [],
      donorID: firebase.auth().currentUser.email,
      donorName:''
    }
  this.requestRef= null
  }

  getRequestedBooksList =()=>{
    this.requestRef = db.collection('allDonations').where("donorID", "==", this.state.donorID)
    .onSnapshot((snapshot)=>{
      var allDonations = []
      snapshot.docs.map((doc) =>{
        var donation = doc.data()
        donation["doc_id"] = doc.id
        allDonations.push(donation)
      });
      this.setState({
        AllDonations : allDonations
      });
      });
    }
    getUserDetails = (userID)=>{
      db.collection("users").where('emailID','==', userID).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          this.setState({
            donorName  :doc.data().First_Name + " " + doc.data().Last_Name
          })
        })
      })
  }

  componentDidMount(){
    this.getRequestedBooksList()
    this.getUserDetails(this.state.donorID)
  }

  componentWillUnmount(){
    this.requestRef();
  }
  sendBook = (item) =>{
    if(item.status === "bookSent"){
      var status = "DonorInterested";
      db.collection("allDonations").doc(item.doc_id).update({
        status: "DonorInterested"
      })
      this.sendNotification(item, status);
    }
    else{
      var status = "bookSent";
      db.collection("allDonations").doc(item.doc_id).update({
        status: "bookSent"
      })
      this.sendNotification(item, status);
    }
  }
  sendNotification=(bookDetails,requestStatus)=>{
    var requestId = bookDetails.requestID
    var donorId = bookDetails.donorID
    db.collection("allNotifications")
    .where("requestID","==", requestId)
    .where("donorID","==",donorId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        var message = ""
        if(requestStatus === "bookSent"){
          message = this.state.donorName + " sent you book"
        }else{
           message =  this.state.donorName  + " has shown interest in donating the book"
        }
        db.collection("allNotifications").doc(doc.id).update({
          "message": message,
          "notificationStatus" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp()
        })
      });
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.bookName}
        subtitle={item.requestedBY}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={[styles.button,{backgroundColor:item.status === "bookSent"?"green":"red"}]} onPress = {()=>{
              this.sendBook(item)
            }}>
              <Text style={{color:'#ffff'}}>{item.status === "bookSent"?"bookSent":"SendBook"}</Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Donate Books"/>
        <View style={{flex:1}}>
          {
            this.state.AllDonations.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.AllDonations}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})