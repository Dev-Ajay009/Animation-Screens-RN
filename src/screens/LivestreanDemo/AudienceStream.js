
// // import { View, Text, Button, DevSettings } from 'react-native'
// // import React from 'react'
// // import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG, AUDIENCE_DEFAULT_CONFIG }
// //     from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'
// // import { useState } from 'react'
// // import { APP_ID, APP_Sign } from '../../ApiServices/ConfigBaseUrl'
// // const AudienceStream = ({ isHost, navigation, UserId, liveId }) => {
// //     console.log('isHost------', isHost);
// //     console.log('UserId-- =======audiospage----', UserId);
// //     console.log('liveId-- =======audiospage----', liveId);
// //     return (


// //         <View 
// //         style={{
// //             flex: 1,
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             zIndex: 0,
// //         }}>
// //             <ZegoUIKitPrebuiltLiveStreaming
// //                 appID={APP_ID}
// //                 appSign={APP_Sign}
// //                 userID={String(UserId)}
// //                 userName={'vijay'}
// //                 liveID={String(liveId)}
// //                 config={{
// //                     ...AUDIENCE_DEFAULT_CONFIG,
// //                     onLeaveLiveStreaming: () => {
// //                         navigation.reset({
// //                             index: 0,
// //                             routes: [{ name: 'Home' }],
// //                           });
// //                     },
// //                     showInRoomMessageButton:false
// //                 }}
// //             />

// //         </View>
// //     )
// // }

// // export default AudienceStream

// // Audience.js

import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RTCPeerConnection, RTCView, MediaStream,mediaDevices } from 'react-native-webrtc';
import { io } from 'socket.io-client';
import { COLORS } from '../../theme/color';


const AudienceStream = ({navigation}) => {
   // State for managing local and remote streams
   const [localStream, setLocalStream] = useState();
   const [remoteStream, setRemoteStream] = useState();
 
   // Reference to the peer connection
   const peerConnection = useRef(
     new RTCPeerConnection({
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
   );
 
   // Reference to the socket connection

   useEffect(() => {
     const initialize = async () => {
       try {
         // Request access to the user's media devices
         const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
         setLocalStream(stream);
         const socket = io('http://192.168.2.240:3001');
         // Log when the connection is established
                socket.on('connect', () => {
                  console.log('Connected to the server audiance screen');
                });
      
                // Log when the connection is lost
                socket.on('disconnect', () => {
                  console.log('Disconnected from the audiance screen');
                });
            // Receive ICE candidates from the broadcaster
            socket.on('stream', (data) => {
              console.log('Received stream data:', data);
              setRemoteStream(data)
              // Handle the 'stream' event data
          });
          socket.on('test', (data) => {
            console.log('Received test data:-----', data);
        });
        //  Handle the arrival of the remote stream
        //  peerConnection.current.ontrack = (event) => {
        //    console.log('Received remote stream:--------------', event.streams[0]);
        //    setRemoteStream(event.streams[0]);
        //  };
 
        //  Request an offer from the broadcaster
      
       } catch (error) {
         console.error('Error accessing media devices:', error);
       }
     };
 
     initialize();
 
     // Cleanup when component unmounts
     return () => {
       if (localStream) {
         localStream.getTracks().forEach((track) => track.stop());
       }
       if (remoteStream) {
         setRemoteStream(null);
       }
      //  socket.current.disconnect();
     };
   }, []);


  
  console.log('remoteStream----00---',remoteStream);
  const CloseApp = () => {
    peerConnection.current.close();
    setLocalStream(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };
    return (
      <View style={styles.container}>
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
              streamURL={remoteStream?.toURL()}
              style={styles.camera}
              objectFit={'cover'}
            />

        
          </View> :
          <Text>Loading...</Text>
      }
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  camera: {
    flex: 1,
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
  CloseBtn: {
    backgroundColor: COLORS.textPlaceHolder,
    padding: 8,
    borderRadius: 34,
    marginLeft: 10
  },
});

export default AudienceStream;

