
import { View, Text, LogBox } from 'react-native';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Routes from './src/navigation/Routes/Routes';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

const AuthApp = () => {
 
    return (
        <Provider store={configureStore}>


            <NavigationContainer>
                <Routes />
            </NavigationContainer>
        </Provider>
    );
};

export default AuthApp;
