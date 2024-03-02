
import {View, Text, LogBox, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import DrawRoutes from './src/navigation/Routes/DrawRoutes';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

const App = () => {
 
  return (
    <Provider store={configureStore}>
     
      <NavigationContainer>
        <DrawRoutes />
      </NavigationContainer>
   
   
    </Provider>
  );
};

export default App;
