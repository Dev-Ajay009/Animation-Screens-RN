import {
    Image,
    PanResponder,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import BackIcon from "../E-commecer-Animated/Assets/SVG/BackIcon";
  import HeartIcon from "../E-commecer-Animated/Assets/SVG/HeartIcon";

  import Animated, {
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
  } from "react-native-reanimated";
import { useRef } from "react";
  const SuggestedProducts = [
    {
      id: 1,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Air-Max-97-Air-Force.png"),
      title: "Nike Air Max",
    },
    {
      id: 2,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Air-Max-Sneakers-red-white.png"),
      title: "Sneakers",
    },
    {
      id: 3,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Shoe-Running.png"),
      title: "Running Shoe",
    },
    {
        id: 4,
        thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Air-Max-Sneakers-red-white.png"),
        title: "Sneakers",
      },
  ];
  const ProductDetails = ({navigation}) => {
    const { params } = useRoute();
    const { goBack } = useNavigation();
    const [isFav, setIsFav] = useState(false);
    console.log("params:", params?.data);
    const { navigate } = useNavigation();
    const [data,setData]=useState(params?.data)
    const scrollA = useRef(new Animated.Value(0)).current;
    const pan = useRef(new Animated.Value(0)).current;

    const panResponder = Animated.event(
        [{nativeEvent: {contentOffset: {y: pan}}}],
        {useNativeDriver: true},
      );
    return (
      <Animated.ScrollView 
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollA}}}],
        {useNativeDriver: true},
      )}
      scrollEventThrottle={16}
      style={styles.container}>
        {/* header */}
        <Animated.View entering={FadeInUp.delay(200).duration(1000)} style={[styles.greyBackground]}>
          <SafeAreaView />
          {/* Header Icons */}
          <View style={styles.iconsContainer}>
            <Animated.View entering={FadeInLeft.delay(200).duration(400)}>
              <TouchableOpacity onPress={() => goBack()} style={styles.iconBox}>
                <BackIcon />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View entering={FadeInRight.delay(200).duration(400)}>
              <TouchableOpacity
                onPress={() => setIsFav(!isFav)}
                style={styles.iconBox}
              >
                <HeartIcon isFav={isFav} />
              </TouchableOpacity>
            </Animated.View>
          </View>
          {/* Image */}
       
          <Animated.Image
            sharedTransitionTag={`T${data.id}`}
            style={[styles.image, ]}
            {...panResponder.panHandlers}

            source={data.thumbnail}
          />
    
        </Animated.View>
      
        {/* body */}
        <View style={styles.bodyContainer}>
          <View style={styles.box}>
            <Animated.Text
              entering={FadeInLeft.delay(400).duration(900)}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <View style={styles.innerBox}>
              <Animated.Text
                entering={FadeInRight.delay(400).duration(900)}
                style={styles.price}
              >
                <Text style={styles.currency}>$</Text>
                {data.price}
              </Animated.Text>
              <Animated.Text
                entering={FadeInRight.delay(400).duration(900)}
                style={styles.rating}
              >
                ⭐️{data.rating}{" "}
              </Animated.Text>
            </View>
          </View>
  
          {/* Description */}
          <Animated.Text
            entering={FadeInLeft.delay(400).duration(900)}
            style={styles.description}
          >
            {data.description}
          </Animated.Text>
          <Animated.View entering={FadeInLeft.delay(400).duration(900)}>
            <TouchableOpacity  onPress={()=>{
                            // setData(value)
                             navigation.navigate("Home");
                    }}
                    style={styles.btn}>
              <Text style={styles.btnTitle}>Shop Now</Text>
            </TouchableOpacity>
          </Animated.View>
  
          {/* Suggested Products */}
          <Animated.Text
            entering={FadeInLeft.delay(400).duration(900)}
            style={styles.suggestedTitle}
          >
            Suggested Products
          </Animated.Text>
          <ScrollView horizontal>
            {SuggestedProducts.map((value, index) => {
              return (
                <Animated.View
                style={styles.suggestedProductContainer}
                  entering={FadeInDown.delay(400).duration(600)}
                  key={value.id.toString()}
                >
                    <TouchableOpacity onPress={()=>{
                            // setData(value)
                            // navigate("ProductDetails", { data: value });
                    }}>
                    <Image source={value.thumbnail} style={styles.suggestedImg} />
                  <Text style={styles.suggestedProductTitle}>{value.title}</Text>
                    </TouchableOpacity>
                 
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>
      </Animated.ScrollView>
    );
  };
  
  export default ProductDetails;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#ffe0cc"
    },
    greyBackground: {
        // height: 350,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: "lightgrey",
    },
    iconsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop:10
    },
    iconBox: {
      backgroundColor: "#fff",
      height: 50,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
   
    bodyContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    box: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 24,
      color: "#000",
      fontWeight: "bold",
    },
    price: {
      fontSize: 24,
      color: "#000",
      fontWeight: "bold",
    },
    currency: {
      color: "#24a8af",
    },
    rating: {
      fontSize: 18,
      color: "#000",
    },
    innerBox: {
      alignItems: "center",
    },
    description: {
      fontSize: 16,
      color: "#000",
      marginVertical: 30,
    },
    btn: {
      backgroundColor: "#24a8af",
      width: "30%",
      padding: 10,
      alignItems: "center",
      borderRadius: 25,
    },
    btnTitle: {
      fontSize: 18,
      color: "#fff",
    },
    suggestedTitle: {
      fontSize: 24,
      color: "#000",
      fontWeight: "bold",
      marginTop: 20,
    },
    suggestedImg: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      alignSelf: "center",
    },
    suggestedProductTitle: {
      fontSize: 16,
      color: "#000",
      fontWeight: "bold",
      textAlign: "center",
    },
    suggestedProductContainer: {
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    margin:20,
    marginLeft:0,
    backgroundColor:'lightgrey',
    borderRadius:16,
    paddingHorizontal:20,
    paddingVertical:10
    },
    image: {
        height: 250,
        width: 300,
        resizeMode: "contain",
        alignSelf: "center",
      },
  });

  let BANNER_H=350
