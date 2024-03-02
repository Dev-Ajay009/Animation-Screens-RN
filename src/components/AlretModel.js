import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AlretModel = ({
    Title,
    Msg,
    OkOnpress,
  navigation
}) => {

  return (
    <View>
      {
        Alert.alert(Title, Msg, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
          { text: 'OK', onPress: () => navigation.navigate('SignIn')},
    ])
      }
    </View>
  )
}

export default AlretModel