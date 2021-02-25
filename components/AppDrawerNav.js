import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {AppTabNavigator} from './AppTab';
import SideBar from './SideBar';
import { createDrawerNavigator } from 'react-navigation-drawer';
import UpdateScreen from '../screens/UpdatingScreen';
import MyDonations from '../screens/MyDonations';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    MyDonations:{screen:MyDonations},
    Setting: {screen: UpdateScreen},
    Notification:{screen:NotificationScreen}


}, 
{
    contentComponent: SideBar
},
{
    intialRouteName: 'Home'
})
