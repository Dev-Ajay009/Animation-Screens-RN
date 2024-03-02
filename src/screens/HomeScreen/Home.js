import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { getDataForAsync } from '../../CommanFunctions/CommanFunction';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderComponents from '../../components/HeaderComponents';
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';
import UserInsta from './UserInsta';
import { COLORS } from '../../theme/color';

const Home = ({navigation}) => {
  const Data = useSelector(state => {
    return state.GetData;
  });
  const [data, setData] = useState({
    mail: '',
    password: '',
  });
  const handler = (v, i) => {
    setData(e => ({ ...e, [i]: v }));
  };

console.log('data---0000------',Data);
  return (
    <View style={{
      backgroundColor:COLORS.secondary,

    }}>
      <UserInsta navigation={navigation} /> 
    </View>
  )
}
const styles = StyleSheet.create({

  BottomViewContainer: {

    height: 50,
    backgroundColor: COLORS.primary,
  },
  ViewMain: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingHorizontal: 30
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
})

export default Home