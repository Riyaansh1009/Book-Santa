import React from 'react';
import BookDonate from '../screens/BookDonate';
import RecieverDetails from '../screens/RecieverDetails';
import {createStackNavigator} from 'react-navigation-stack';

export const StackNavigator = createStackNavigator({
    BookDonate: {screen:BookDonate},
    RecieverDetails: {screen:RecieverDetails}
},
{
    initialRouteName: 'BookDonate'
})