import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { COLORS } from '../../theme/color';

const CustomLiveStream = ({ navigation }) => {
    const [isCameraOn, setCameraOn] = useState(true);
    const [isAudioOn, setAudioOn] = useState(true);
    const [isCameraFlip, setCameraFlip] = useState(true);
    const cameraRef = useRef(null);

    const toggleCamera = () => {
        setCameraOn((e) => !e);
    };

    const toggleAudio = () => {
        setAudioOn((e) => !e);
    };
    const toggleCameraFlip = () => {
        setCameraFlip((e) => !e);

    };
    const CloseApp = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };
    const renderCustomUI = () => {
        if (!isCameraOn) {
            return (
                <View style={styles.customUIContainer}>
                    <View style={{
                        backgroundColor: COLORS.textPlaceHolder,
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        <Text style={styles.customUIText}>user</Text>
                    </View>


                </View>
            );
        }

        return null; 
    };
    return (
        <View style={styles.container}>
          
            <View style={styles.header}>
                <View style={styles.LiveView}>
                    <Text style={styles.liveText}>• Live</Text>
                </View>
                <View style={{
                    flexDirection:'row'
                }}>
                <View style={styles.infoContainer}>
                <Image source={require('../../assets/eye.png')} style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'cover'
                }} />
                <Text style={styles.UserCountText}>1</Text>
            </View>
            <TouchableOpacity style={styles.CloseBtn} onPress={CloseApp}>
                <Image
                    source={require('../../assets/close.png')}
                    style={{
                        height: 12,
                        width: 12,
                        tintColor:'#000'
                    }}
                />
            </TouchableOpacity>
                </View>
               
            </View>
            

            {isCameraOn && (
                <RNCamera
                    ref={cameraRef}
                    style={styles.camera}
                    type={isCameraFlip ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                    captureAudio={isAudioOn}
                />
            )}
            {renderCustomUI()}
            <View style={styles.controls}>
                <TouchableOpacity style={styles.toggleButton} onPress={toggleCamera}>
                    {isCameraOn ?
                        <Image source={require('../../assets/video-camera.png')}
                            style={{
                                height: 20,
                                width: 20,
                            }}
                        /> :
                        <Image source={require('../../assets/no-video.png')}
                            style={{
                                height: 20,
                                width: 20,

                            }}
                        />
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.toggleButton} onPress={toggleAudio}>
                    {
                        isAudioOn ? <Image
                            source={require('../../assets/mic.png')}
                            style={{
                                height: 20,
                                width: 20,
                            }}
                        />
                            : <Image
                                source={require('../../assets/mic-off.png')}
                                style={{
                                    height: 20,
                                    width: 20,
                                }}
                            />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraFlip}>
                    <Image source={require('../../assets/switch-camera.png')}
                        style={{
                            height: 20,
                            width: 20,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    CloseBtn: {
        backgroundColor:COLORS.textPlaceHolder,
        padding:8,
        borderRadius:34,
        marginLeft:10
    },
    camera: {
        flex: 1,
    },
    controls: {
        position: 'absolute',
        bottom: 16,
        flexDirection: 'row',
        right: 20,
    },
    toggleButton: {

        backgroundColor: COLORS.textPlaceHolder,
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 5,
        marginLeft: 10
    },
    toggleButtonText: {
        fontSize: 16,
        color: 'black',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
        zIndex: 5,
        position: 'absolute',
        width:'100%',
        top:25
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: COLORS.textPlaceHolder,
        paddingHorizontal: 10,
        borderRadius: 18,

    },
    UserCountText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 5
    },
    customUIContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.secondary, 
    },
    customUIText: {
        color: COLORS.textDark,
        fontSize: 14,
        textAlign: "center",
        fontWeight: "700"
    },
    LiveView: {
        backgroundColor: "red",
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    liveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
   
});

export default CustomLiveStream