// // import { View, Text, Button, DevSettings } from 'react-native'
// // import React from 'react'
// // import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, AUDIENCE_DEFAULT_CONFIG }
// //   from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
// // import { useState } from 'react'
// // import { APP_ID, APP_Sign } from '../../ApiServices/ConfigBaseUrl'
// // const Livestream = ({ isHost, navigation, UserId, liveId }) => {


// //   console.log('isHost------', isHost);
// //   console.log('UserId------', UserId);
// //   console.log('liveId------', liveId);

// //   return (


// //     <View
// //       style={{
// //         flex: 1,
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         zIndex: 0,
// //       }}>
// //       <ZegoUIKitPrebuiltLiveStreaming
// //           appID={APP_ID}
// //           appSign={APP_Sign}
// //           userID={String(UserId)}
// //           userName={'raj'}
// //           liveID={String(liveId)}
// //           config={{
// //             ...HOST_DEFAULT_CONFIG,

// //             onLeaveLiveStreaming: () => {
// //               console.log('onLeaveLiveStreaming the live streaming session'),
// //               navigation.reset({
// //                 index: 0,
// //                 routes: [{ name: 'Home' }],
// //               });
// //             },
// //             onLiveStreamingEnded: () => {
// //               navigation.reset({
// //                 index: 0,
// //                 routes: [{ name: 'Home' }],
// //               });
// //             },
// //             onJoinLiveStreaming: () => {
// //               console.log('Joined the live streaming session');
// //             },
// //             showInRoomMessageButton:false
// //           }}
// //       />
// //     </View>
// //   )
// // }

// // export default Livestream

import React, { useRef, useEffect, useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices, } from 'react-native-webrtc';
import requestCameraAndAudioPermission from '../../components/Permission';
import { COLORS } from '../../theme/color';
import WebSocket from 'ws';
import { io } from 'socket.io-client';

const Livestream = ({ navigation }) => {

  const [localStream, setLocalStream] = useState(null);
  const peerConnection = useRef(null);
  // Handling Mic status
  const [localMicOn, setlocalMicOn] = useState(true);

  // Handling Camera status
  const [localWebcamOn, setlocalWebcamOn] = useState(true);
  useEffect(() => {
    const socket = io('http://192.168.2.240:3001');
    const initialize = async () => {

      try {
        const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
        console.log('stream live data',stream.toURL());
        setLocalStream(stream);


        // Connect to the signaling server

   // Log when the connection is established
          socket.on('connect', () => {
            console.log('Connected to the server');
          });

          // Log when the connection is lost
          socket.on('disconnect', () => {
            console.log('Disconnected from the server');
          });

        // Initialize the WebRTC peer connection
        peerConnection.current =  new RTCPeerConnection({
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302',
            },
            {
              urls: 'stun:stun1.l.google.com:19302',
            },
            {
              urls: 'stun:stun2.l.google.com:19302',
            },
          ],
        })

        // Add local stream to the peer connection
        // peerConnection.current.addStream(stream);

        // //Handle ICE candidate events
        // peerConnection.current.onicecandidate = (event) => {
        //   if (event.candidate) {
        //     socket.emit('ice-candidate', event.candidate);
        //   }
        // };
        // peerConnection.current.onicecandidate = (event) => {
        //   if (event.candidate) {
        //     console.log('Broadcaster ICE Candidate:-----------', event.candidate);
        //     socket.emit('ice-candidate', event.candidate);
        //   }
        // };
        // Create and send an offer to the audiencestream
         socket.emit('stream', stream);

         socket.emit('test', { message: 'This is a test message' });
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initialize();

    return () => {
      // Cleanup when the component unmounts
      if (localStream) {
        localStream.release();
      }

      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);



    function switchCamera() {
      localStream.getVideoTracks().forEach((track) => {
        track._switchCamera();
      });
    }

    function toggleCamera() {
      localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
      localStream.getVideoTracks().forEach((track) => {
        localWebcamOn ? (track.enabled = false) : (track.enabled = true);
      });
    }


    function toggleMic() {
      localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
      localStream.getAudioTracks().forEach((track) => {
        localMicOn ? (track.enabled = false) : (track.enabled = true);
      });
    }

      const CloseApp = () => {
        peerConnection.current.close();
        setLocalStream(null);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      };
  return (
    <>
      {
        localStream ?
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.LiveView}>
                <Text style={styles.liveText}>• Live</Text>
              </View>
              <View style={{
                flexDirection: 'row'
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
                      tintColor: '#000'
                    }}
                  />
                </TouchableOpacity>
              </View>

            </View>
            <RTCView
              streamURL={localStream.toURL()}
              style={styles.camera}
              objectFit={'cover'}
            />

            <View style={styles.controls}>
              <TouchableOpacity style={styles.toggleButton} onPress={toggleCamera}>
                {localWebcamOn ?
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

              <TouchableOpacity style={styles.toggleButton} onPress={toggleMic}>
                {
                  localMicOn ?
                    <Image
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
              <TouchableOpacity style={styles.toggleButton} onPress={switchCamera}>
                <Image source={require('../../assets/switch-camera.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* <Button title="Start Streaming" onPress={startStreaming} /> */}
          </View> :
          <Text>Loading...</Text>
      }

    </>

  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
    // backgroundColor: '#fff',
  },
  CloseBtn: {
    backgroundColor: COLORS.textPlaceHolder,
    padding: 8,
    borderRadius: 34,
    marginLeft: 10
  },
  camera: {
    height: '100%',
    width: '100%'
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
    width: '100%',
    top: 25
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
export default Livestream;



