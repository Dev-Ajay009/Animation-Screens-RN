import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../theme/color';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remoteContainerContent: {
    paddingHorizontal: 2.5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  roleText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    zIndex: 3,
    position: 'absolute'
  },
  LiveView: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  liveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    position: "absolute",
    right: 10,
    zIndex: 4,
    top: 20,
    backgroundColor: COLORS.textPlaceHolder,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  infoText: {
    color: '#000',
    marginLeft: 8,
  },
  UserCountText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5
  },
  videoContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  backgroundVideo: {
    flex: 1,
  },
  
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: "absolute",
    bottom: 20,
    zIndex:8
  },
  likeButton: {

    marginLeft: 10
  },
  likeCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,

  },
  commentInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  sendButton: {
    // padding: 8,
    // borderRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
