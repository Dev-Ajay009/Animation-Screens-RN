import { View, Text, TouchableHighlight, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/HomeScreen/Home';
import CustomDrawer from '../components/CustomDrawer';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../screens/HomeScreen/MyProfile';
import Settings from '../screens/HomeScreen/Settings';
import { useEffect } from 'react';
import { useState } from 'react';
import CustomLiveStream from '../screens/LivestreanDemo/CustomLiveStream';
import AudienceStream from '../screens/LivestreanDemo/AudienceStream';
import Livestream from '../screens/LivestreanDemo/Livestream';
import { db, getDataForAsync } from '../CommanFunctions/CommanFunction';

const Drawer = createDrawerNavigator();
const DrawbleStack = ({navigation} ) => {
  const [userId, setUserId] = useState('');
  const [liveId, setLiveId] = useState('');
  const [Uniq, setUniq] = useState('');
  const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users',
          [],
          (_, resultSet) => {
            const users = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              users.push(resultSet.rows.item(i));
            }
            resolve(users);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };
  
  useEffect(() => {
    setUserId(Math.floor(Math.random() * 100000));
    setLiveId(982323);
    getAllUsers()
    .then((users) => {
      console.log('All users:---', users);
    })
    .catch((error) => {
      console.error('Error getting all users:', error);
    });
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="#28489F" 
   
      />
      <Drawer.Navigator
        screenOptions={{
          
          headerStyle: {
            backgroundColor: '#000', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontSize: 18,
            alignContent:'center',
            justifyContent:'center'
          },
          drawerLabelStyle: {
            color: '#000',
            textAlign: "left" 
          },
          drawerStyle: {
            backgroundColor: '#ecf0f1',
          },
        }}
      drawerContent={(props) => <CustomDrawer {...props}  />}>
        <Drawer.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Drawer.Screen name="Settings" component={Settings} options={{headerShown:false}} />
        <Drawer.Screen name="MyProfile" component={MyProfile} options={{headerShown:false}} />
      </Drawer.Navigator>

   </>
  )
}

export default DrawbleStack