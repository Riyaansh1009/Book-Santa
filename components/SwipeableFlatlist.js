import React,{Component} from 'react';
// import { StyleSheet, Text, View,TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {
  View,
  Animated,
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
import {Header,Icon,Badge, ListItem} from 'react-native-elements'
import { Dimensions } from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view'
export default class SwipeableFlastList extends Component{
    constructor(props){
        super(props);
        this.state = {allNotifications:this.props.allNotifications}
    }

    // renderItem = data =>(
    //   <Animated.View>
   
    //       <ListItem
    //         leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
    //         title={data.item.bookName}
    //         titleStyle={{ color: 'black', fontWeight: 'bold' }}
    //         subtitle={data.item.message}
    //         bottomDivider
    //       />
        
    //     </Animated.View>
    // )
    renderItem = ({item,index}) =>{
      return (
        <ListItem
          key={index}
          leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
          title={item.bookName}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={item.message}
          bottomDivider
        />
      )
 }
   renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Mark as read</Text>
      </View>
    </View>
  );

    OnSwipeValueChange = (swipeData) =>{
        var allNotifications = this.state.allNotifications();
        const{key,value} = swipeData;
        if(value<-Dimensions.get('window').width){
            const newData = [...allNotifications]
            this.updateMarkisRead(allNotifications[key])
            newData.splice(key,1);
            this.setState({allNotifications:newData})
        }
    }
    updateMarkisRead = (notifications)=>{
            db.collection('allNotifications').doc(notifications.doc_id).update({notificationStatus: "read"})
    }
    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView 
                disableRightSwipe
                data = {this.state.allNotifications}
                renderItem = {this.renderItem()}
                renderHiddenItem = {this.renderHiddenItem()}
                rightOpenValue = {-Dimensions.get("window").width}
                previewRowKey = {"0"}
                previewOpenValue = {-40}
                previewOpenDelay = {3000}
                onSwipeValueChange = {this.OnSwipeValueChange()}
                keyExtractor = {(item,index)=>{index.toString()}} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1
    },
    backTextWhite: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 15,
      textAlign: "center",
      alignSelf: "flex-start"
    },
    rowBack: {
      alignItems: "center",
      backgroundColor: "#29b6f6",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 15
    },
    backRightBtn: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      width: 100
    },
    backRightBtnRight: {
      backgroundColor: "#29b6f6",
      right: 0
    }
  });