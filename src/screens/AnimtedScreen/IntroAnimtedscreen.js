// import LottieView from 'lottie-react-native';
// import React from 'react';
// import {
//   SafeAreaView,
//   Image,
//   StyleSheet,
//   FlatList,
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const COLORS = { primary: '#fff', white: '#000' };



// const slides = [
//   {
//     id: '1',
//     image: require('../../assets/image1.png'),
//     AnimationData:require('../../assets/Lottie-img/Animation1.json'),
//     title: 'Best Way Find Your Self',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     backgroundColor:'#b380ff'
//   },
//   {
//     id: '2',
//     image: require('../../assets/image2.png'),
//     title: 'Achieve Your Goals',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     backgroundColor:'#ffc299',
//     AnimationData:require('../../assets/Lottie-img/Animation3.json'),
//   },
//   {
//     id: '3',
//     image: require('../../assets/image3.png'),
//     title: 'Increase Your Value',
//     subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     backgroundColor:'pink',
//     AnimationData:require('../../assets/Lottie-img/Animation2.json'),
//   },
  
// ];

// const Slide = ({ item }) => {
//   return (
//     <View style={{ alignItems: 'center'}}>
//       {/* <Image
//         source={item?.image}
//         style={{ height: '75%', width, resizeMode: 'contain' }}
//       /> */}
//       <View>
//       <LottieView source={item?.AnimationData}
//          style={{ height: height/2, width:width, resizeMode: 'contain' }}
//       autoPlay loop />
//       </View>
//       <View style={{
//         marginTop:30
//       }}>
//         <Text style={styles.title}>{item?.title}</Text>
//         <Text style={styles.subtitle}>{item?.subtitle}</Text>
//       </View>
//     </View>
//   );
// };

// const IntroAnimtedscreen = ({ navigation }) => {
//   const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
//   const ref = React.useRef();
//   const updateCurrentSlideIndex = e => {
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / width);
//     setCurrentSlideIndex(currentIndex);
//   };

//   const goToNextSlide = () => {
//     const nextSlideIndex = currentSlideIndex + 1;
//     if (nextSlideIndex != slides.length) {
//       const offset = nextSlideIndex * width;
//       ref?.current.scrollToOffset({ offset });
//       setCurrentSlideIndex(currentSlideIndex + 1);
//     }
//   };

//   const skip = () => {
//     const lastSlideIndex = slides.length - 1;
//     const offset = lastSlideIndex * width;
//     ref?.current.scrollToOffset({ offset });
//     setCurrentSlideIndex(lastSlideIndex);
//   };
//   console.log('currentSlideIndex', currentSlideIndex);
//   const Footer = () => {
//     return (
    
//         <View
//           style={{
//             flexDirection: 'row',
//              justifyContent: 'center',
//              alignItems: 'center',
//             paddingHorizontal: 30,
//             backgroundColor: 'rgba(255, 255, 255, 0.6)',
//             paddingVertical:20
//           }}>

//             {/* <TouchableOpacity
//               activeOpacity={0.8}
//               style={[
//                 styles.btn,

//               ]}
//               onPress={skip}>
//               <Text
//                 style={{
//                   fontWeight: 'bold',
//                   fontSize: 15,
//                   color: COLORS.white,
//                 }}>
//                {currentSlideIndex != slides.length - 1? 'Skip':''}
//               </Text>
//             </TouchableOpacity>  */}
//           {/* Render indicator */}
//           <View style={{
//             flexDirection: 'row'
//           }}>
//             {slides.map((_, index) => (
//               <View
//                 key={index}
//                 style={[
//                   styles.indicator,
//                   currentSlideIndex == index && {
//                     backgroundColor: '#944dff',
//                     width: 25,
//                     height: 3.5,
//                   },
//                 ]}
//               />
//             ))}
//           </View>

//           {/* <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => {
//               currentSlideIndex == slides.length - 1 ? navigation.navigate('Home') : goToNextSlide()
//             }}

//             style={styles.btn}>
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: 15,
//                 color: '#000'
//               }}>
//               {currentSlideIndex == slides.length - 1 ? 'Done' : 'Next'}
//             </Text>
//           </TouchableOpacity> */}
//         </View>

//     );
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor:  COLORS.primary  }}>
//       {/* <StatusBar backgroundColor={ COLORS.primary } />
//    */}
//         <FlatList
//           ref={ref}
//           onMomentumScrollEnd={updateCurrentSlideIndex}
//           contentContainerStyle={{ flexGrow: 1 }}
//           showsHorizontalScrollIndicator={false}
//           horizontal
//           data={slides}
//           pagingEnabled
//           renderItem={({ item }) => <Slide item={item} />}
//         />
//         <View style={{}}>
//         <Footer />
//         </View>
    
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   subtitle: {
//     color: COLORS.white,
//     fontSize: 13,
//     marginTop: 10,
//     maxWidth: '70%',
//     textAlign: 'center',
//     lineHeight: 23,
//   },
//   title: {
//     color: COLORS.white,
//     fontSize: 22,
//     fontWeight: 'bold',
   
//     textAlign: 'center',
//   },
//   image: {
//     height: '100%',
//     width: '100%',
//     resizeMode: 'contain',
//   },
//   indicator: {
//     height: 3,
//     width: 12,
//     backgroundColor: 'grey',
//     marginHorizontal: 3,
//     borderRadius: 2,
//   },
//   btn: {
//     // flex: 1,    
//     // justifyContent: 'flex-start',
//     // alignItems: 'center',
//   },
// });
// export default IntroAnimtedscreen;


import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image, Button } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { COLORS } from '../../theme/color';
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window');

const SIZE = width * 0.7;


const slides = [
  {
    id: '1',
    image: require('../../assets/image1.png'),
    AnimationData:require('../../assets/Lottie-img/Animation1.json'),
    title: 'Best Way Find Your Self',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    backgroundColor:'#b380ff'
  },
  {
    id: '2',
    image: require('../../assets/image2.png'),
    title: 'Achieve Your Travels',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    backgroundColor:'#ffc299',
    AnimationData:require('../../assets/Lottie-img/Animation3.json'),
  },
  {
    id: '3',
    image: require('../../assets/image3.png'),
    title: 'Travels All The World',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    backgroundColor:'pink',
    AnimationData:require('../../assets/Lottie-img/Animation2.json'),
  },
  
];



export default function IntroAnimtedscreen() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const Page = ({ index, translateX, item }) => {
    const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];
  
    const rStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        translateX.value,
        inputRange,
        [0, 1, 0],
        Extrapolate.CLAMP
      );
  
      const borderRadius = interpolate(
        translateX.value,
        inputRange,
        [0, SIZE / 2, 0],
        Extrapolate.CLAMP
      );
  
      return {
        borderRadius,
        transform: [{ scale }],
      };
    });
  
    const rTextStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        translateX.value,
        inputRange,
        [height / 2, 0, -height / 2],
        Extrapolate.CLAMP
      );
  
      const opacity = interpolate(
        translateX.value,
        inputRange,
        [-2, 1, -2],
        Extrapolate.CLAMP
      );
  
      return {
        opacity,
        transform: [{ translateY: translateY }],
      };
    });
  
    return (
      <View
        style={[
          styles.containers,
          { backgroundColor: `rgba(0,0,256, 0.${index + 1})` },
        ]}
      >
        <Animated.View style={[styles.square, rStyle]} />
        <Animated.View style={[styles.textContainer, rTextStyle]}>
        <LottieView source={item?.AnimationData}
            style={{ height: height/2, width:width, resizeMode: 'contain' }}
          autoPlay loop />

        <View style={{
              marginTop:30
            }}>
              <Text style={styles.title}>{item?.title}</Text>
              <Text style={styles.subtitle}>{item?.subtitle}</Text>
            </View>
        </Animated.View>
       
      </View>
    );
  };

  return (
    <Animated.ScrollView
    onScroll={scrollHandler}
    pagingEnabled
    scrollEventThrottle={16}
    horizontal
    style={styles.container}
  >
    {slides.map((item, index) => {
      return (
        <Page
          key={index.toString()}
          item={item}
          translateX={translateX}
          index={index}
        />
      );
    })}
  </Animated.ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containers: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    // width: SIZE,
    // height: SIZE,
    // backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign:'center'
  },
  textContainer: { position: 'absolute' ,alignItems:"center"},
   subtitle: {
    color: COLORS.black,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
