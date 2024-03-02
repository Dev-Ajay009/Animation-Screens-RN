import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Button
} from 'react-native';

import Swiper from 'react-native-deck-swiper';
import { Transitioning, Transition } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const stackSize = 4;
const colors = {
  red: 'red',
  blue: 'green',
  gray: '#777777',
  white: '#ffffff',
  black: '#000000'
};
const ANIMATION_DURATION = 200;

const data = [
  {
    id: '40454230',
    price: '$129.00',
    name: 'BINGSTA',
    image:
      'https://www.ikea.com/us/en/images/products/bingsta-armchair__0793271_PE765307_S5.JPG?f=xs'
  },
  {
    id: '70078463',
    price: '$49.99',
    name: 'PELLO',
    image:
      'https://www.ikea.com/us/en/images/products/pello-armchair__38296_PE130209_S5.JPG?f=xs'
  },
  {
    id: '29221746',
    price: '$149.00',
    name: 'KOARP',
    image:
      'https://www.ikea.com/us/en/images/products/koarp-armchair__0522337_PE643233_S5.JPG?f=xs'
  },
  {
    id: '89129085',
    price: '$249.00',
    name: 'EKTORP',
    image:
      'https://www.ikea.com/us/en/images/products/ektorp-armchair__0386173_PE559138_S5.JPG?f=xs'
  },
  {
    id: '40344760',
    price: '$159.00',
    name: 'REMSTA',
    image:
      'https://www.ikea.com/us/en/images/products/remsta-armchair-djuparp-dark-green-blue__0474490_PE615066_S5.JPG?f=xs'
  },
  {
    id: '00425777',
    price: '$279.00',
    name: 'STRANDMON',
    image:
      'https://www.ikea.com/us/en/images/products/strandmon-wing-chair__0392556_PE560378_S5.JPG?f=xs'
  },
  {
    id: '69299012',
    price: '$160.00',
    name: 'BUSKBO',
    image:
      'https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=xs'
  },
  {
    id: '40262877',
    price: '$149.00',
    name: 'EKERÖ',
    image:
      'https://www.ikea.com/us/en/images/products/ekeroe-armchair__0204749_PE359788_S5.JPG?f=xs'
  },
  {
    id: '10407136',
    price: '$69.99',
    name: 'IKEA PS LÖMSK',
    image:
      'https://www.ikea.com/us/en/images/products/ikea-ps-loemsk-swivel-armchair-white-red__0726690_PE735385_S5.JPG?f=xs'
  },
  {
    id: '10233532',
    price: '$39.99',
    name: 'NOLMYRA',
    image:
      'https://www.ikea.com/us/en/images/products/nolmyra-easy-chair__0152020_PE310348_S5.JPG?f=xs'
  },
  {
    id: '90359848',
    price: '$279.00',
    name: 'STRANDMON',
    image:
      'https://www.ikea.com/us/en/images/products/strandmon-wing-chair__0531313_PE647261_S5.JPG?f=xs'
  },
  {
    id: '30299032',
    price: '$269.00',
    name: 'MUREN',
    image:
      'https://www.ikea.com/us/en/images/products/muren-recliner__0325257_PE517991_S5.JPG?f=xs'
  },
]
const transition = (
  <Transition.Sequence>
    <Transition.Out
      type='slide-bottom'
      durationMs={ANIMATION_DURATION}
      interpolation='easeIn'
    />
    <Transition.Together>
      <Transition.In
        type='fade'
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type='slide-bottom'
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation='easeOut'
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef = React.createRef();
const transitionRef = React.createRef();

const Card = ({ card }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
    </View>
  );
};

const CardDetails = ({ index }) => (
  <View key={data[index].id} style={{ alignItems: 'center' }}>
    <Text style={[styles.text, styles.heading]} numberOfLines={2}>
      {data[index].name}
    </Text>
    <Text style={[styles.text, styles.price]}>{data[index].price}</Text>
  </View>
);

export default function TinderLikeAnimeted() {
  const [index, setIndex] = React.useState(0);
  const onSwiped = () => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % data.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button
        name='crop-square'
        size={width}
        color={colors.blue}
        style={{
          opacity: 0.05,
          transform: [{ rotate: '45deg' }, { scale: 1.6 }],
          position: 'absolute',
          left: -15,
          top: 30
        }}
      /> */}
      <StatusBar hidden={true} />
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={data}
          cardIndex={index}
          renderCard={card => <Card card={card} />}
          infinite
          backgroundColor={'transparent'}
          onSwiped={onSwiped}
          onTapCard={() => swiperRef.current.swipeLeft()}
          cardVerticalMargin={50}
          stackSize={stackSize}
          stackScale={10}
          stackSeparation={14}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: colors.red,
                  borderColor: colors.red,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: -20
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: colors.blue,
                  borderColor: colors.blue,
                  color: colors.white,
                  borderWidth: 1,
                  fontSize: 24
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 20,
                  marginLeft: 20
                }
              }
            }
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Transitioning.View
          ref={transitionRef}
          transition={transition}
          style={styles.bottomContainerMeta}
        >
          <CardDetails index={index} />
        </Transitioning.View>
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  swiperContainer: {
    flex: 1.5
  },
  bottomContainer: {
    flex: 0.4,
    justifyContent: 'space-evenly'
  },
  bottomContainerMeta: { alignContent: 'flex-end', alignItems: 'center' },
  bottomContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cardImage: {
    width: 160,
    flex: 1,
    resizeMode: 'contain'
  },
  card: {
    flex: 0.85,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.white,
    backgroundColor: 'transparent'
  },
  text: { fontFamily: 'Courier' },
  heading: { fontSize: 24, marginBottom: 10, color: colors.gray },
  price: { color: colors.blue, fontSize: 32, fontWeight: '500' }
});
