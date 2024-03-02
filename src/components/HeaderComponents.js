import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/color'
import { DrawerActions } from '@react-navigation/native';

const HeaderComponents = ({ navigation, title,isBackShow=false }) => {
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View>
      <View
        style={{
          height: 55,
          backgroundColor: COLORS.primary
        }}>
        <View style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}>

          <View>
            {isBackShow?
            <TouchableOpacity onPress={()=>{
              navigation.goBack()
            }}>
                            <Image
                source={require('../assets/arrow_back.png')}
                style={{ width: 20, height: 20, marginLeft: 10,tintColor:'#fff' }}
              />
            </TouchableOpacity>
            :<TouchableOpacity onPress={() => {
              toggleDrawer()
            }} style={{ paddingRight: 2, marginRight: 0 }} >
              <Image
                source={require('../assets/menu.png')}
                style={{ width: 20, height: 20, marginLeft: 10,tintColor:'#fff' }}
              />
            </TouchableOpacity>}
          </View>
          <View>
            <Text style={{
              fontSize: 20,
              color: '#fff',
              fontWeight: '700'
            }}>{title}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              // toggleDrawer()
            }} style={{ paddingRight: 2, marginRight: 0 }} >
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 30, height: 30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>

  )
}

export default HeaderComponents