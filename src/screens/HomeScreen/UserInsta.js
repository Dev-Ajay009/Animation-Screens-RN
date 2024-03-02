import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../theme/color'
import HeaderComponents from '../../components/HeaderComponents'

import Volume from '../../assets/volume.png'
import Mute from '../../assets/mute.png'


const Alldata = [
    {
        username: 'xyz',
        userimage: require('../../assets/post10.jpg'),
        uservideo: '',
    },
    {
        username: 'xyz',
        userimage: '',
        uservideo: ''
    },
    {
        username: 'xyz',
        userimage: require('../../assets/post10.jpg'),
        uservideo: '',
    },
    {
        username: 'xyz',
        userimage: '',
        uservideo: ''
    },
];

const UserInsta = ({ navigation }) => {

    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    const data = Array.from({ length: 50 }, (_, index) => ({ key: index.toString(), text: `Item ${index}` }));
    const BottomMenu = () => {
        return (

            <View style={styles.BottomViewContainer} >
                <View style={styles.ViewMain}>

                    <TouchableOpacity onPress={() => {

                    }}>
                        <Image source={require('../../assets/home.png')} style={{
                            height: 20,
                            width: 20,
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../assets/search.png')} style={{
                            height: 20,
                            width: 20,
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../assets/plus.png')} style={{
                            height: 20,
                            width: 20,
                            tintColor: '#fff',
                            backgroundColor: '#ccc',
                            borderRadius: 16
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('UserProfileForInsta')
                    }}>
                        <Image source={require('../../assets/default_user.png')} style={{
                            height: 20,
                            width: 20,
                        }} />
                    </TouchableOpacity>

                </View>
            </View>

        )
    }
    const renderItem = ({ item }) => (
        <View style={styles.MainView}>
            <View style={{
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('UserProfileForInsta')
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Image source={require('../../assets/default_user.png')} style={{
                        height: 30,
                        width: 30
                    }} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: '700'
                        }}>
                            Username
                        </Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={{
                        color: COLORS.text,
                        fontWeight: '700'
                    }}>•  Connect</Text>
                </View>
            </View>
            <View style={styles.containerimage}>
                {item?.userimage ?
                    <Image
                        source={item.userimage}
                        style={styles.image}
                    />
                    :
                    <>
                        {/* <Video
                  source={item.uservideo}
                    style={styles.image}
                    resizeMode="cover"
                    repeat
                    muted={!isMuted}
                /> */}
                        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
                            <Image
                                source={isMuted ? require('../../assets/volume.png') : require('../../assets/mute.png')}
                                style={{
                                    height: 20,
                                    width: 20,

                                }}

                            />
                        </TouchableOpacity>
                    </>
                }

            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                paddingHorizontal: 15,
                justifyContent: "space-between"
            }}>
                <View style={{
                    flexDirection: "row",
                }}>
                    <View>
                        <Image source={require('../../assets/heart.png')}
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: COLORS.primary
                            }}
                        />
                    </View>
                    <View style={{
                        marginLeft: 15
                    }}>
                        <Image source={require('../../assets/chat-bubble.png')}
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: COLORS.primary
                            }}
                        />
                    </View>
                    <View style={{
                        marginLeft: 15
                    }}>
                        <Image source={require('../../assets/share.png')}
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: COLORS.primary
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '700'
                    }}>2023-11-28 05:26</Text>
                </View>
            </View>

        </View>
    );

    return (
        <View style={{
            width: '100%',
            height: '100%',
        }}>
            <HeaderComponents navigation={navigation} title={'Home'} />
            <FlatList
                data={Alldata}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}

            />

            <View>
                <BottomMenu />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',

    },
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
    MainView: {
        flex: 1
    },
    containerimage: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    muteButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 8,
        borderRadius: 34,
        backgroundColor: 'rgb(120, 120, 120)',
    },
})

export default UserInsta


