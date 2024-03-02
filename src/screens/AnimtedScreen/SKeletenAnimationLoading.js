// import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

// let data = [
//     {
//         Uname: 'a1'
//     },
//     {
//         Uname: 'a2'
//     },
//     {
//         Uname: 'a3'
//     },
//     {
//         Uname: 'a4'
//     }
// ]
// const SKeletenAnimationLoading = () => {

//     const [Loading, setLoading] = useState(false)
//     useEffect(() => {
//         setTimeout(() => {
//             setLoading(true)
//         }, 8000)
//     }, [])
//     console.log('Loading', Loading);
//     const RenderItem = ({ item, index }) => {
//         return (
//             <>
//                 <View style={styles.stepsContainer}>
//                     <Image source={require('../../assets/default_user.png')} style={styles.photo} />
//                     <Text style={{
//                         color: 'gray'
//                     }}> {item?.Uname}</Text>

//                     <View style={styles.containerIcons}>
//                         <Image source={require('../../assets/eye.png')} style={styles.icons} />
//                         <Image source={require('../../assets/heart.png')} style={styles.icons} />
//                         <Image source={require('../../assets/plus.png')} style={styles.icons} />
//                     </View>
//                 </View>

//                 <View style={styles.lineCard} />
//             </>
//         )
//     }

//     return (
//         <View style={{
//             flex: 1,
//             backgroundColor: 'white',

//         }}>

//             {
//                 Loading
//                     ?
//                     <FlatList
//                         keyExtractor={(item, index) => index.toString()}
//                         data={data}
//                         renderItem={RenderItem}
//                     />
//                     : <SkeletonPlaceholder>
//                         <View style={styles.container}>
//                             {
//                                 data?.map((v,i)=>{
//                                     return(
//                                         <>
//                                         <View keyExtractor={i} style={styles.stepsContainer}>
//                                 <View style={styles.photo} />
//                                 <Text style={styles.name} />

//                                 <View style={styles.containerIcons}>
//                                     <Text style={styles.icons} />
//                                     <Text style={styles.icons} />
//                                     <Text style={styles.icons} />
//                                 </View>
//                             </View>

//                             <View style={styles.lineCard} />
//                                         </>
//                                     )
//                                 })
//                             }
//                         </View>
//                     </SkeletonPlaceholder>


//             }

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     containerCard: {
//         // padding:16,
//     },
//     container: {
//         // flex: 1,
//         // padding:16
//     },
//     containerHeader: {
//         marginTop: 20,
//         // padding: 20,
//         alignItems: 'center',
//         backgroundColor: '#025FA6'
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff'
//     },
//     containerCard: {
//         margin: 4,
//         backgroundColor: '#fff',
//         // paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 60,
//     },
//     container: {
//         height: '100%',
//     },
//     header: {
//         width: "100%",
//         height: 60,
//         marginBottom: 20
//     },
//     stepsContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         width: "100%",
//         justifyContent: "space-between",
//         paddingHorizontal: 10,
//         paddingVertical:10
//     },
//     photo: {
//         width: 60,
//         height: 60,
//         borderRadius: 100,
//         margin: 5
//     },
//     name: {
//         width: "40%",
//         height: 20,
//         borderRadius: 4,

//     },
//     containerIcons: {
//         flexDirection: "row"
//     },
//     icons: {
//         width: 32,
//         height: 30,
//         borderRadius: 100,
//         marginHorizontal: 5,
     
//     },
//     lineCard: {
//         width: "100%",
//         height: 1,
//         backgroundColor:'gray'
      
//     }
// })

// export default SKeletenAnimationLoading

import { View, Text } from 'react-native'
import React from 'react'

const SKeletenAnimationLoading = () => {
  return (
    <View>
      <Text>SKeletenAnimationLoading</Text>
    </View>
  )
}

export default SKeletenAnimationLoading