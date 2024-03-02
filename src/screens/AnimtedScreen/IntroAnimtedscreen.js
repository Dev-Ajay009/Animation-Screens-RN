import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#fff', white: '#000' };



const slides = [
  {
    id: '1',
    image: require('../../assets/image1.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    backgroundColor:'#b380ff'
  },
  {
    id: '2',
    image: require('../../assets/image2.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    backgroundColor:'#ffc299'
  },
  {
    id: '3',
    image: require('../../assets/image3.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    backgroundColor:'pink'
  },
  
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: 'center'}}>
      <Image
        source={item?.image}
        style={{ height: '75%', width, resizeMode: 'contain' }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const IntroAnimtedscreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };
  console.log('currentSlideIndex', currentSlideIndex);
  const Footer = () => {
    return (
    
        <View
          style={{
            flexDirection: 'row',
             justifyContent: 'space-between',
             alignItems: 'center',
            paddingHorizontal: 30,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            paddingVertical:20
          }}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,

              ]}
              onPress={skip}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: COLORS.white,
                }}>
               {currentSlideIndex != slides.length - 1? 'Skip':''}
              </Text>
            </TouchableOpacity> 
          {/* Render indicator */}
          <View style={{
            flexDirection: 'row'
          }}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: '#944dff',
                    width: 25,
                    height: 3.5,
                  },
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              currentSlideIndex == slides.length - 1 ? navigation.navigate('Home') : goToNextSlide()
            }}

            style={styles.btn}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000'
              }}>
              {currentSlideIndex == slides.length - 1 ? 'Done' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>

    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: slides[currentSlideIndex]?.backgroundColor || COLORS.primary  }}>
      <StatusBar backgroundColor={slides[currentSlideIndex]?.backgroundColor || COLORS.primary } />
  
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({ item }) => <Slide item={item} />}
        />
        <View style={{}}>
        <Footer />
        </View>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 3,
    width: 12,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    // flex: 1,    
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
});
export default IntroAnimtedscreen;