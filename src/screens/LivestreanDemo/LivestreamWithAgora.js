// import React, { useState, useEffect, useRef } from 'react';
// import {
//     Image,
//     Modal,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import RtcEngine, {
//     RtcLocalView,
//     RtcRemoteView,
//     VideoRenderMode,
//     ClientRole,
//     ChannelProfile,
// } from 'react-native-agora';

// import requestCameraAndAudioPermission from '../../components/Permission';
// import styles from '../../components/Style';

// const token = '007eJxTYChmT+XmVlyy3nS/k0vLjhMMq/XSxQ7O/XIno1N0fkNBT74CQ4qZpYWFWXKahaVFoollsqlFcrKhkbmFWaqhhbm5qaGl0JzM1IZARoaYM39ZGBkgEMRnYShJLS5hYAAAmFAdfw==';
// const appId = 'd69886cf898a49c58cc12786e1877519';
// const channelName = 'test';
// const LivestreamWithAgora = () => {
//     const [isHost, setIsHost] = useState(true);
//     const [joinSucceed, setJoinSucceed] = useState(false);
//     const [comment, setComment] = useState('');
//     const [peerIds, setPeerIds] = useState([]);
//     const [modalVisible, setModalVisible] = useState(false);
//     const engineRef = useRef(null);

//     useEffect(() => {
//         const init = async () => {
//             engineRef.current = await RtcEngine.create(appId);
//             await engineRef.current.enableVideo();
//             await engineRef.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
//             await engineRef.current.setClientRole(
//                 isHost ? ClientRole.Broadcaster : ClientRole.Audience
//             );
//             await requestCameraAndAudioPermission(); 
//             engineRef.current.addListener('Warning', (warn) => {
//                 console.log('Warning', warn);
//             });

//             engineRef.current.addListener('Error', (err) => {
//                 console.log('Error0---=-=', err);
//             });

//             engineRef.current.addListener('UserJoined', (uid, elapsed) => {
//                 console.log('UserJoined', uid, elapsed);
//                 // Get current peer IDs
//                 if (peerIds.indexOf(uid) === -1) {
//                     setPeerIds((prevPeerIds) => [...prevPeerIds, uid]);
//                 }
//             });

//             engineRef.current.addListener('UserOffline', (uid, reason) => {
//                 console.log('UserOffline', uid, reason);
//                 setPeerIds((prevPeerIds) => prevPeerIds.filter((id) => id !== uid));
//             });

//             engineRef.current.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
//                 console.log('JoinChannelSuccess', channel, uid, elapsed);
//                 setJoinSucceed(true);
//             });
//         };

//         init();

//         return () => {
//             engineRef.current?.destroy();
//         };
//     }, [isHost, peerIds]);

//     const startCall = async () => {
//         const sanitizedChannelName = channelName.trim();
//         await engineRef.current?.joinChannel(token, channelName, null, 0);
//         setModalVisible(true);
//     };

//     const endCall = async () => {
//         try {
//             await engineRef.current?.leaveChannel();
//             setPeerIds([]);
//             setJoinSucceed(false);
//             setModalVisible(false);
//         } catch (error) {
//             console.error('Error ending call:', error);
//             // Handle or log the error accordingly
//         }
//     };

//     const toggleRoll = async () => {
//         setIsHost((prevIsHost) => !prevIsHost);
//         await engineRef.current?.setClientRole(isHost ? ClientRole.Broadcaster : ClientRole.Audience);
//     };

//     const renderVideos = () => {
//         return joinSucceed ? (
//             <View style={styles.fullView}>
//                 <TouchableOpacity onPress={endCall} style={{ position: 'absolute', zIndex: 4, right: 10, top: 10 }}>
//                     <Image source={require('../../assets/close.png')} style={{ height: 15, width: 15, resizeMode: 'cover' ,tintColor:'red'}} />
//                 </TouchableOpacity>
//                 <View style={{ top: 20 }}>
//                     <View style={styles.header}>
//                         <View style={styles.LiveView}>
//                             <Text style={styles.liveText}>• Live</Text>
//                         </View>
//                     </View>

//                     <TouchableOpacity style={styles.infoContainer}>
//                         <Image source={require('../../assets/eye.png')} style={{ height: 15, width: 15, resizeMode: 'cover' }} />
//                         <Text style={styles.UserCountText}>4</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.bottomSection}>
//                     <View style={styles.commentContainer}>
//                         <TextInput
//                             style={styles.commentInput}
//                             placeholder="Type your comment..."
//                             value={comment}
//                             onChangeText={(text) => setComment(text)}
//                         />
//                         <TouchableOpacity onPress={()=>{

//                         }} style={styles.sendButton}>
//                             <Image source={require('../../assets/send_message.png')} style={{
//                                 height: 30,
//                                 width: 30,
//                                 resizeMode: 'cover'
//                             }} />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={()=>{
                            
//                         }} style={styles.likeButton}>
//                             <Image source={require('../../assets/heart.png')} style={{
//                                 height: 30,
//                                 width: 30,
//                                 resizeMode: 'cover',
//                                 tintColor: "red"
//                             }} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 {isHost ? (
//                     <RtcLocalView.SurfaceView
//                         style={styles.max}
//                         channelId={channelName}
//                         renderMode={VideoRenderMode.Hidden}
//                     />
//                 ) : (
//                     <></>
//                 )}
//                 {renderRemoteVideos()}
//             </View>
//         ) : null;
//     };

//     const renderRemoteVideos = () => {
//         return (
//             <ScrollView
//                 style={styles.remoteContainer}
//                 contentContainerStyle={styles.remoteContainerContent}
//                 horizontal={true}
//             >
//                 {peerIds.map((value) => (
//                     <RtcRemoteView.SurfaceView
//                         key={value}
//                         style={styles.remote}
//                         uid={value}
//                         channelId={channelName}
//                         renderMode={VideoRenderMode.Hidden}
//                         zOrderMediaOverlay={true}
//                     />
//                 ))}
//             </ScrollView>
//         );
//     };

//     return (
//         <SafeAreaView style={styles.max}>
//             <View style={styles.max}>
//                 <Text style={styles.roleText}>
//                     You're {isHost ? 'a broadcaster' : 'the audience'}
//                 </Text>
//                 <View style={styles.buttonHolder}>
//                     <TouchableOpacity onPress={toggleRoll} style={styles.button}>
//                         <Text style={styles.buttonText}> Toggle Role </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={startCall} style={styles.button}>
//                         <Text style={styles.buttonText}> Start Call </Text>
//                     </TouchableOpacity>
//                 </View>
        
//                {
//                     modalVisible?
//                       <Modal animationType="slide" transparent={false} visible={modalVisible}>
//                         {renderVideos()}
//                     </Modal>:
//                        <>
//                             {/* {renderVideos()} */}
//                        </> 
//                }
//             </View>
//         </SafeAreaView>
//     );
// };

// export default LivestreamWithAgora;