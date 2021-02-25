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
  Image,
  ScrollView} from 'react-native';
import firebase from 'firebase'
import db from '../config';
import BookDonate from '../screens/BookDonate';
import BookRequest from '../screens/BookRequest';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {StackNavigator} from './StackNaigator'

export const AppTabNavigator = createBottomTabNavigator({
    BookDonate:{screen:StackNavigator,
    navigationOptions:{
      tabBarIcon:<Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel: 'DonateBooks'
    }},

    BookRequest:{screen: BookRequest,
    navigationOptions:{
      tabBarIcon: <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel:'RequestBooks'
    }}
})

