
import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignIn from '../../screens/SignIn/SignIn';
// import Home from '../../screens/HomeScreen/Home';
import { useEffect } from 'react';
import { getDataForAsync } from '../../CommanFunctions/CommanFunction';
import { useState } from 'react';
import AlretModel from '../../components/AlretModel';
import DrawbleStack from '../DrawbleStack';
import Home from '../../screens/AnimtedScreen/E-commecer-Animated/Home';
import ProductDetails from '../../screens/AnimtedScreen/E-commecer-Animated/ProductDetails';
import ScrollableTabViewReanimated from '../../screens/AnimtedScreen/ScrollableTabViewReanimated';
import IntroAnimtedscreen from '../../screens/AnimtedScreen/IntroAnimtedscreen';
import SKeletenAnimationLoading from '../../screens/AnimtedScreen/SKeletenAnimationLoading';
import TinderNolibrey from '../../screens/AnimtedScreen/TinderNolibrey';
import SwipableList from '../../screens/AnimtedScreen/SwipableList';

const Stack = createStackNavigator();
const DrawRoutes = () => {
    let options={
        headerShown: false,
        gestureEnabled: true, // If you want to swipe back like iOS on Android
        ...TransitionPresets.SlideFromRightIOS
    }
    return (
        <>
            <Stack.Navigator screenOptions={{ animation: 'flip' }}>

                <>
                <Stack.Screen
                        name="SwipableList"
                        component={SwipableList}
                        options={options}

                    />
                <Stack.Screen
                        name="IntroAnimtedscreen"
                        component={IntroAnimtedscreen}
                        options={options}

                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={options}

                    />
                    <Stack.Screen
                        name="ProductDetails"
                        component={ProductDetails}
                        options={options}

                    />
                     
                    <Stack.Screen
                        name="DrawbleStack"
                        component={DrawbleStack}
                          options={options}
                    />
                  <Stack.Screen
                        name="TinderNolibrey"
                        component={TinderNolibrey}
                          options={options}
                    />
                    <Stack.Screen
                        name="AlretModel"
                        component={AlretModel}
                          options={options}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                          options={options}
                    />

                </>



            </Stack.Navigator>
        </>
    );
};

export default DrawRoutes;
