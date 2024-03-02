import { View, Text, TextInput, Image, Platform, Dimensions } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../theme/color';
import EyeOn from '../assets/eye.png'
import EyeOff from '../assets/eye_off.png'

const CustomInput = ({
  Placeholder,
  Value,
  attrName,
  updateMasterState,
  RemoveText = '',
  onChange,
  isPasswordField = false,
}) => {
  useEffect(() => {
    updateMasterState(attrName, Value);
  }, []);
  const [PressToclick, seetPressToclick] = useState()

  const onChangeText = e => {
    updateMasterState(e, attrName);
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingVertical: Platform.OS === 'ios' ? 7 : 0,
      }}>
      <View>
        <View>
          <TextInput
            value={Value}
            placeholder={Placeholder}
            onChangeText={e => {
              onChangeText(e);
            }}
            secureTextEntry={PressToclick ? true : false}
            style={{
              fontSize: 16,
              color: '#000000',
              borderBottomWidth: 1,
              borderColor: '#000',
              fontWeight: '500',
              width: "100%"
            }}
          />
        </View>

        {isPasswordField ? <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 15,
          }}>

          <TouchableOpacity
            onPress={() => {
              seetPressToclick(!PressToclick)
            }}>
            <Image
              source={PressToclick ? require('../assets/eye_off.png') : require('../assets/eye.png')} style={{
                width: 20,
                height: 20,
                //right:15,
                tintColor: COLORS.primary,

              }} />
          </TouchableOpacity>
        </View>
          : <View></View>
        }

      </View>

    </View>
  );
};

export default CustomInput