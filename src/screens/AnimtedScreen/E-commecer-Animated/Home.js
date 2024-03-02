import {
    FlatList,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import MenuIcon from "../E-commecer-Animated/Assets/SVG/MenuIcon";
  import OptionIcon from "../E-commecer-Animated/Assets/SVG/OptionIcon";
  import ProductCard from "../E-commecer-Animated/components/ProductCard";

  import Animated, {
    FadeInDown,
    FadeInLeft,
    FadeInRight,
  } from "react-native-reanimated";
  import { useNavigation } from "@react-navigation/native";
  
  let productData =[
    {
      id: 1,
      title: "Nike Air Max 97",
      description:
        "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
      rating: 4.5,
      price: 19.99,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Air-Max-97-Air-Force.png"),
    },
    {
      id: 2,
      title: "Sneakers Red White",
      description:
        "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
      rating: 4.7,
      price: 24.99,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Air-Max-Sneakers-red-white.png"),
    },
    {
      id: 3,
      title: "Nike Shoe",
      description:
        "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
      rating: 4.2,
      price: 29.99,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Shoe-Running.png"),
    },
    {
      id: 4,
      title: "Sneakers Nike",
      description:
        "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
      rating: 4.0,
      price: 14.99,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Sneakers-Nike-Basketball.png"),
    },
    {
      id: 5,
      title: "Flywire Sneakers",
      description:
        "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
      rating: 4.8,
      price: 39.99,
      thumbnail: require("../E-commecer-Animated/Assets/Images/Sneakers-Nike-Flywire.png"),
    },
    {
        id: 1,
        title: "Nike Air Max 97",
        description:
          "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
        rating: 4.5,
        price: 19.99,
        thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Air-Max-97-Air-Force.png"),
      },
      {
        id: 2,
        title: "Sneakers Red White",
        description:
          "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
        rating: 4.7,
        price: 24.99,
        thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Air-Max-Sneakers-red-white.png"),
      },
      {
        id: 3,
        title: "Nike Shoe",
        description:
          "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
        rating: 4.2,
        price: 29.99,
        thumbnail: require("../E-commecer-Animated/Assets/Images/Nike-Shoe-Running.png"),
      },
      {
        id: 4,
        title: "Sneakers Nike",
        description:
          "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
        rating: 4.0,
        price: 14.99,
        thumbnail: require("../E-commecer-Animated/Assets/Images/Sneakers-Nike-Basketball.png"),
      },
      {
        id: 5,
        title: "Flywire Sneakers",
        description:
          "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
        rating: 4.8,
        price: 39.99,
        thumbnail: require("../E-commecer-Animated/Assets/Images/Sneakers-Nike-Flywire.png"),
      },
]
  const Home = ({navigation}) => {

    const renderItem = ({ item, index }) => {
      return (
        <Animated.View
        
          entering={FadeInDown.delay(index * 300)
            .duration(2000)
            .springify()
            .damping(12)}
        >
          <TouchableOpacity
         
            onPress={() => {
                navigation.navigate("ProductDetails", { data: item });
            }}
          >
            <ProductCard item={item} />
          </TouchableOpacity>
        </Animated.View>
      );
    };
  
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <StatusBar backgroundColor={'#ffe0cc'} />
        {/* Header */}
        <View style={styles.Header}>
          <Animated.View entering={FadeInLeft.delay(100).duration(400)}>
            <MenuIcon />
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(100).duration(400)}>
            <OptionIcon />
          </Animated.View>
        </View>
  
        {/* body */}
        <View style={styles.bodyContainer}>
          <Animated.Text
            entering={FadeInLeft.delay(200).duration(500)}
            style={styles.title}
          >
            Nike Shoes
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.delay(200).duration(500)}
            style={styles.subTitle}
          >
            Product of your Choice
          </Animated.Text>
        </View>
  
        {/* Products */}
                    <FlatList
                            data={productData}
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={renderItem}
                            numColumns={2}
                            contentContainerStyle={styles.contentContainerStyle}
                            showsVerticalScrollIndicator={false}
                            />

       
      </View>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#ffe0cc"
    },
    Header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
    },
    title: {
      fontSize: 30,
      color: "#000",
      fontWeight: "bold",
    },
    subTitle: {
      fontSize: 18,
      color: "#000",
    },
    bodyContainer: {
       paddingHorizontal: 30,
      marginTop: 20,
    },
    contentContainerStyle: {
       alignItems: "center",
    },
  });