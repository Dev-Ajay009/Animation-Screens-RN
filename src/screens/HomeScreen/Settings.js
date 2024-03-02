import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeaderComponents from '../../components/HeaderComponents'
import CustomInput from '../../components/CustomInput'
import { useState } from 'react'

const Settings = ({navigation}) => {

    const [data, setData] = useState({
        mail: '',
        password: '',
        conformpassword:''
    });
    const handler = (v, i) => {
        setData(e => ({ ...e, [i]: v }));
    };


  return (
    <View>
          <HeaderComponents navigation={navigation} title={'Settings'} />
          <View style={{
            padding:20
          }}>

              <View>
                  <Text style={styles.HeadText}>Change password</Text>
              </View>  
              <View style={{
                marginTop:20
              }}>
                  <CustomInput
                      Placeholder={'Enter our password'}
                      Value={data?.mail}
                      attrName={'mail'}
                      updateMasterState={handler}
                      isPasswordField={true}
                  />
                  <CustomInput
                      Placeholder={'Enter new password'}
                      Value={data?.password}
                      attrName={'password'}
                      updateMasterState={handler}
                      isPasswordField={true}
                  />
                  <CustomInput
                      Placeholder={'Enter comform password'}
                      Value={data?.conformpassword}
                      attrName={'conformpassword'}
                      updateMasterState={handler}
                      isPasswordField={true}
                  />
              </View>

          </View>
                     
    </View>
  )
}
const styles=StyleSheet.create({
    HeadText:{
        fontSize:18,
        color:"#000",
        fontWeight:'700'
    }
})

export default Settings