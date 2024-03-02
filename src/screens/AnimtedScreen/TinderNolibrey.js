import { View, Text, Dimensions, Image, Animated } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
const { height, width } = Dimensions.get('window');
import {

    PanResponder,
    TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const TinderCard = ({ item, isFirst, swipe, ...rest }) => {
    const rotate = swipe.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['8deg', '0deg', '-8deg'],
    });
    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        
    });

    const rejectOpacity = swipe.x.interpolate({
        inputRange: [-100, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    console.log('swipe',swipe.x);
    const renderChoice = useCallback(() => {
        console.log('likeOpacity',likeOpacity);
        console.log('rejectOpacity',rejectOpacity);
        return (
            <>
                <Animated.View
                    style={[
                        { position: 'absolute', top: 100, left: 20 },
                        { opacity: likeOpacity },
                    ]}>
                    <View>
                        <Text
                            style={{
                                fontSize: 40,
                                textTransform: 'uppercase',
                                letterSpacing: 4,
                                fontWeight: 'bold',
                                color: '#00eda6',
                                borderWidth: 5,
                                borderColor: '#00eda6',
                                padding: 5,
                                borderRadius: 10,
                                transform: [{ rotate: '-30deg' }],
                            }}>
                            Like
                        </Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        { position: 'absolute', top: 100, right: 20 },
                        { opacity: rejectOpacity },
                    ]}>
                    <View>
                        <Text
                            style={{
                                fontSize: 40,
                                textTransform: 'uppercase',
                                letterSpacing: 4,
                                fontWeight: 'bold',
                                color: '#FF0060',
                                borderWidth: 5,
                                borderColor: '#FF0060',
                                padding: 5,
                                borderRadius: 10,
                                transform: [{ rotate: '30deg' }],
                            }}>
                            Nope
                        </Text>
                    </View>
                </Animated.View>
            </>
        );
    }, []);
    return (
        <Animated.View
            style={[
                {
                    width: width - 20,
                    height: height - 200,
                    position: 'absolute',
                    top: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                },
                isFirst && {
                    transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
                },
            ]}
            {...rest}>
            <Image
                source={item.image}
                style={{ width: '100%', height: '100%', borderRadius: 20 }}
            />
            {isFirst && renderChoice()}
            <LinearGradient
                colors={['transparent', 'transparent', 'rgba(0,0,0,0.5)']}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    borderRadius: 20,
                }}>
                <Text
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 30,
                        fontSize: 40,
                        color: '#FFF',
                    }}>
                    {item.title}
                </Text>
            </LinearGradient>
        </Animated.View>
    );
};




const TinderNolibrey = () => {
    const [data, setData] = useState([
        { image: require('../../assets/post10.jpg'), id: 1, title: 'Hulk' },
        { image: require('../../assets/hulk.webp'), id: 2, title: 'Ironman' },
        { image: require('../../assets/post10.jpg'), id: 3, title: 'Thor' },
        { image: require('../../assets/ironman.webp'), id: 4, title: 'Superman' },
        { image: require('../../assets/post10.jpg'), id: 5, title: 'Groot' },
        { image: require('../../assets/hulk.webp'), id: 1, title: 'Hulk' },
        { image: require('../../assets/post10.jpg'), id: 2, title: 'Ironman' },
        { image: require('../../assets/hulk.webp'), id: 3, title: 'Thor' },
        { image: require('../../assets/post10.jpg'), id: 4, title: 'Superman' },
        { image: require('../../assets/post10.jpg'), id: 5, title: 'Groot' },
    ]);
    // useEffect(() => {
    //     if (!data.length) {
    //         setData([
    //             { image: require('../../assets/post10.jpg'), id: 1, title: 'Hulk' },
    //             { image: require('../../assets/hulk.webp'), id: 2, title: 'Ironman' },
    //             { image: require('../../assets/post10.jpg'), id: 3, title: 'Thor' },
    //             { image: require('../../assets/ironman.webp'), id: 4, title: 'Superman' },
    //             { image: require('../../assets/post10.jpg'), id: 5, title: 'Groot' },
    //             { image: require('../../assets/hulk.webp'), id: 1, title: 'Hulk' },
    //             { image: require('../../assets/post10.jpg'), id: 2, title: 'Ironman' },
    //             { image: require('../../assets/hulk.webp'), id: 3, title: 'Thor' },
    //             { image: require('../../assets/post10.jpg'), id: 4, title: 'Superman' },
    //             { image: require('../../assets/post10.jpg'), id: 5, title: 'Groot' },

    //         ]);
    //     }
    // }, [data]);
    const swipe = useRef(new Animated.ValueXY()).current;
    const rotate = useRef(new Animated.Value(0)).current;

    const panResponser = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
            console.log('dx:' + dx + ' dy:' + dy);
            swipe.setValue({ x: dx, y: dy });
        },

        onPanResponderRelease: (_, { dx, dy }) => {
            console.log('released:' + 'dx:' + dx + ' dy:' + dy);
            let direction = Math.sign(dx);
            let isActionActive = Math.abs(dx) > 200;
            if (isActionActive) {

                
                Animated.timing(swipe, {
                    toValue: { x: 500 * dx, y: dy },
                    useNativeDriver: true,
                    duration: 500,
                }).start(removeCard);
            
            } else {
                Animated.spring(swipe, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });
    const removeCard = useCallback(() => {
        setData(prepState => prepState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);

    const handelSelection = useCallback(

        direction => {
            Animated.timing(swipe, {
                toValue: { x: direction * 500, y: 0 },
                useNativeDriver: true,
                duration: 500,
            }).start(removeCard);
        },
        [removeCard],
    );
    return (
        <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: "gray"
        }}>

            {data
                .map((item, index) => {
                    let isFirst = index === 0;
                    let dragHanlders = isFirst ? panResponser.panHandlers : {};
                    return (
                        <TinderCard
                            item={item}
                            rotate={rotate}
                            isFirst={isFirst}
                            swipe={swipe}
                            {...dragHanlders}
                        />
                    );
                })
                .reverse()}

            <View style={{
                position: 'absolute',
                bottom: 10
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: '100%',
                    }}>
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            backgroundColor: '#fff',
                            elevation: 5,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        onPress={() => {
                            handelSelection(-1);
                            alert('nope')
                        }}>
                        <Image
                            source={require('../../assets/close.png')}
                            style={{ width: 34, height: 34 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            backgroundColor: '#fff',
                            elevation: 5,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            handelSelection(1);
                            alert('like')
                        }}>
                        <Image
                            source={require('../../assets/heart.png')}
                            style={{ width: 40, height: 40, tintColor: '#00FFC8' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};
export default TinderNolibrey;