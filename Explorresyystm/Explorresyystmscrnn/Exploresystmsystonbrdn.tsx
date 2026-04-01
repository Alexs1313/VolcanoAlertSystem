import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';

import { Animated, Image, StyleSheet, Text, View } from 'react-native';

import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';
import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

const exploresystmOnboardingData = [
  {
    id: 1,
    image: require('../../elements/images/volclertsyon1.png'),
    title: 'Welcome',
    buttonText: 'Next',
    description:
      'Welcome to our app. Discover the fascinating world of volcanoes and learn how these powerful natural forces shape our planet.',
  },
  {
    id: 2,
    image: require('../../elements/images/volclertsyon2.png'),
    title: 'Explore Volcanoes',
    buttonText: 'Next',
    description:
      'Learn about volcanoes from different parts of the world, including their location, height, and geological features.',
  },
  {
    id: 3,
    image: require('../../elements/images/volclertsyon3.png'),
    title: 'Interesting Facts and Stories',
    buttonText: 'Next',
    description:
      'Read fascinating facts and stories about famous eruptions and the history of volcanoes.',
  },
  {
    id: 4,
    image: require('../../elements/images/volclertsyon4.png'),
    title: 'Test Your Knowledge',
    buttonText: 'Next',
    description:
      'Challenge yourself with quizzes and see how much you know about volcanoes and volcanic activity.',
  },
  {
    id: 5,
    image: require('../../elements/images/volclertsyon5.png'),
    title: 'Start Exploring',
    buttonText: 'Get Started',
    description:
      'Begin your journey and discover the incredible power of volcanoes around the world.',
  },
];

const Exploresystmsystonbrdn = () => {
  const navigation = useNavigation<any>();
  const [exploresystmCurrIndex, setVolcLertCurrIndex] = useState(0);
  const [exploresystmTypedTitle, setVolcLertTypedTitle] = useState('');
  const [exploresystmTypedDescription, setVolcLertTypedDescription] =
    useState('');
  const exploresystmButtonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const exploresystmCurrentSlide =
      exploresystmOnboardingData[exploresystmCurrIndex];
    if (!exploresystmCurrentSlide) {
      return;
    }

    setVolcLertTypedTitle('');
    setVolcLertTypedDescription('');

    let exploresystmTitleIndex = 0;
    let exploresystmDescriptionIndex = 0;

    const exploresystmTypingInterval = setInterval(() => {
      if (exploresystmTitleIndex < exploresystmCurrentSlide.title.length) {
        exploresystmTitleIndex += 1;
        setVolcLertTypedTitle(
          exploresystmCurrentSlide.title.slice(0, exploresystmTitleIndex),
        );
        return;
      }

      if (
        exploresystmDescriptionIndex <
        exploresystmCurrentSlide.description.length
      ) {
        exploresystmDescriptionIndex += 1;
        setVolcLertTypedDescription(
          exploresystmCurrentSlide.description.slice(
            0,
            exploresystmDescriptionIndex,
          ),
        );
        return;
      }

      clearInterval(exploresystmTypingInterval);
    }, 18);

    return () => {
      clearInterval(exploresystmTypingInterval);
    };
  }, [exploresystmCurrIndex]);

  const exploresystmHandleNext = () => {
    exploresystmCurrIndex < 4
      ? setVolcLertCurrIndex(exploresystmCurrIndex + 1)
      : navigation.replace('Exploresystmsysthom' as never);
  };

  const exploresystmHandlePressIn = () => {
    Animated.spring(exploresystmButtonScaleAnim, {
      toValue: 0.96,
      speed: 28,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const exploresystmHandlePressOut = () => {
    Animated.spring(exploresystmButtonScaleAnim, {
      toValue: 1,
      speed: 24,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Exploresystmsystlay>
      <View style={exploresystmStyles.exploresystmContainer}>
        <Image
          source={exploresystmOnboardingData[exploresystmCurrIndex].image}
          style={
            exploresystmCurrIndex === 0 && {
              width: 200,
              height: 200,
              borderRadius: 52,
            }
          }
        />

        <Text style={exploresystmStyles.exploresystmTitle}>
          {exploresystmTypedTitle}
        </Text>
        <Text style={exploresystmStyles.exploresystmDescription}>
          {exploresystmTypedDescription}
        </Text>

        <Animated.View
          style={[
            exploresystmStyles.exploresystmButtonWrap,
            { transform: [{ scale: exploresystmButtonScaleAnim }] },
          ]}
        >
          <TouchableOpacity
            style={exploresystmStyles.exploresystmButtonTouchArea}
            onPress={exploresystmHandleNext}
            onPressIn={exploresystmHandlePressIn}
            onPressOut={exploresystmHandlePressOut}
            activeOpacity={1}
          >
            <LinearGradient
              colors={['#CF4E27', '#ED7635']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={exploresystmStyles.exploresystmButton}
            >
              <Text style={exploresystmStyles.exploresystmButtonText}>
                {exploresystmOnboardingData[exploresystmCurrIndex].buttonText}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsystonbrdn;

const exploresystmStyles = StyleSheet.create({
  exploresystmButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  exploresystmContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 60,
    paddingTop: 100,
  },
  exploresystmButton: {
    width: '75%',
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  exploresystmButtonWrap: {
    width: '100%',
  },
  exploresystmButtonTouchArea: {
    width: '100%',
  },

  exploresystmTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  exploresystmDescription: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E6B59F',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
  },
});
