import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import HeaderComponents from '../../components/HeaderComponents'
import { COLORS } from '../../theme/color'

const UserProfileForInsta = ({navigation}) => {

        let data=[
            {
                userimage:require('../../assets/post10.jpg')
            },
            {
                userimage:require('../../assets/post10.jpg')
            },
            {
                userimage:require('../../assets/post10.jpg')
            },
            {
                userimage:require('../../assets/post10.jpg')
            },
            {
                userimage:require('../../assets/post10.jpg')
            },
            {
                userimage:require('../../assets/post10.jpg')
            }
        ]
        const renderItemForList=({item})=>{
            return(
                <>
                <View style={{
                    marginLeft:5,
                    marginTop:5
                }}>
                        <Image source={item.userimage} style={{
                            height:120,
                            width:130,
                            resizeMode:"cover"
                        }}/>
                </View>
                </>
            )
        }

  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.secondary
    }}>
         <HeaderComponents title={''} isBackShow={true} navigation={navigation}/>

            <View 
            style={{
                marginTop:30,
                flexDirection:"row",
                alignItems:"center",
                paddingHorizontal:15,
                justifyContent:"space-between"
            }}>
                <View>
          <Image source={require('../../assets/default_user.png')} />
            <Text style={[styles.CountText,{marginTop:10}]}>User Name</Text>
                </View>
                <View>
                    <Text style={styles.CountText}>1</Text>
                    <Text style={styles.NameText}>Posts</Text>
                </View>
                <View>
                    <Text style={styles.CountText}>1</Text>
                    <Text style={styles.NameText}>Connects</Text>
                </View>
            </View>
            <View style={{
                marginTop:20,
                padding:16,
                paddingHorizontal:0
            }}>
                <FlatList 
                data={data}
                renderItem={renderItemForList}
                numColumns={3}
                />
            </View>

    </View>
  )
}
const styles=StyleSheet.create({
    CountText:{
        color:'#fff',
        fontSize:15,
        fontWeight:"600",
        textAlign:"center"
    },
    NameText:{
        color:'#fff',
        fontSize:18,
        fontWeight:"700",
    }
})
export default UserProfileForInsta