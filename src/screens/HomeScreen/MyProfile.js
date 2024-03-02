import { View, Text } from 'react-native'
import React from 'react'
import HeaderComponents from '../../components/HeaderComponents'
import { Image } from 'react-native'
import CustomInput from '../../components/CustomInput'
import { useState } from 'react'

const MyProfile = ({ navigation }) => {
    const [data, setData] = useState({
        mail: '',
        password: '',
    });
    const handler = (v, i) => {
        setData(e => ({ ...e, [i]: v }));
    };

  return (
    <View>
          <HeaderComponents navigation={navigation} title={'MyProfile'} />
                <View style={{
                    alignItems:"center",
                    marginTop:20
                }}>
                    <Image source={require('../../assets/icon_user.png')}
                    style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                    }}
                    />
                </View>
                <View style={{
                    paddingHorizontal:20,
                    marginTop:20
                }}>
              <CustomInput
                  Placeholder={'Enter Namw'}
                  Value={'user'}
                  attrName={'password'}
                  updateMasterState={handler}
                  isPasswordField={true}

              />
              <CustomInput
                  Placeholder={'Enter Namw'}
                  Value={'abc'}
                  attrName={'password'}
                  updateMasterState={handler}
                  isPasswordField={true}

              />
              <CustomInput
                  Placeholder={'Enter Namw'}
                  Value={'xyz@gmail.com'}
                  attrName={'password'}
                  updateMasterState={handler}
                  isPasswordField={true}

              />
                </View>
    </View>
  )
}

export default MyProfile