import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { setDataInAsync } from '../CommanFunctions/CommanFunction'
import { COLORS } from '../theme/color'

const CustomDrawer = (props) => {
    const {navigation} = props
 

    const onLogout = () => {
        // Implement your logout logic here
        // For example, clear authentication token, navigate to the login screen, etc.
        (() => {
            setDataInAsync("Login", false);
        })();
        Alert.alert('Logout', 'Do you want to logout', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.replace('SignIn') },
        ])
    };
  return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff',flex:1,padding:10 }}>

                <View style={{
                    padding:10
                }}>
              <View style={{ padding: 16, backgroundColor: COLORS.primary, marginBottom: 10 }}>
                  <Text style={{
                      fontSize: 16,
                      color: '#fff',
                      fontWeight: "700",
                      textAlign: "center"
                  }}>User Name</Text>
              </View>
                </View>
                        

          {/* Drawer items */}
          <DrawerItemList {...props} />

          {/* Custom drawer items */}
          <TouchableOpacity onPress={onLogout} style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#000' }}>
              <Text style={{
                color:'#000',
                fontSize:14,
                fontWeight:"700"
              }}>Logout</Text>
          </TouchableOpacity>
      </DrawerContentScrollView>
  )
}

export default CustomDrawer