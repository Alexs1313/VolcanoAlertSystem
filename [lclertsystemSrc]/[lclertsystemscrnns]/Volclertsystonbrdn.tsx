import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

const volcLertOnboardingData = [
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

const Volclertsystonbrdn = () => {
  const navigation = useNavigation<any>();
  const [volcLertCurrIndex, setVolcLertCurrIndex] = useState(0);
  const [volcLertTypedTitle, setVolcLertTypedTitle] = useState('');
  const [volcLertTypedDescription, setVolcLertTypedDescription] = useState('');
  const volcLertButtonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const volcLertCurrentSlide = volcLertOnboardingData[volcLertCurrIndex];
    if (!volcLertCurrentSlide) {
      return;
    }

    setVolcLertTypedTitle('');
    setVolcLertTypedDescription('');

    let volcLertTitleIndex = 0;
    let volcLertDescriptionIndex = 0;

    const volcLertTypingInterval = setInterval(() => {
      if (volcLertTitleIndex < volcLertCurrentSlide.title.length) {
        volcLertTitleIndex += 1;
        setVolcLertTypedTitle(
          volcLertCurrentSlide.title.slice(0, volcLertTitleIndex),
        );
        return;
      }

      if (volcLertDescriptionIndex < volcLertCurrentSlide.description.length) {
        volcLertDescriptionIndex += 1;
        setVolcLertTypedDescription(
          volcLertCurrentSlide.description.slice(0, volcLertDescriptionIndex),
        );
        return;
      }

      clearInterval(volcLertTypingInterval);
    }, 18);

    return () => {
      clearInterval(volcLertTypingInterval);
    };
  }, [volcLertCurrIndex]);

  const volcLertHandleNext = () => {
    volcLertCurrIndex < 4
      ? setVolcLertCurrIndex(volcLertCurrIndex + 1)
      : navigation.replace('Volclertsysthom' as never);
  };

  const volcLertHandlePressIn = () => {
    Animated.spring(volcLertButtonScaleAnim, {
      toValue: 0.96,
      speed: 28,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const volcLertHandlePressOut = () => {
    Animated.spring(volcLertButtonScaleAnim, {
      toValue: 1,
      speed: 24,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Volclertsystlay>
      <View style={volcLertStyles.volcLertContainer}>
        <Image
          source={volcLertOnboardingData[volcLertCurrIndex].image}
          style={
            volcLertCurrIndex === 0 && {
              width: 200,
              height: 200,
              borderRadius: 52,
            }
          }
        />

        <Text style={volcLertStyles.volcLertTitle}>{volcLertTypedTitle}</Text>
        <Text style={volcLertStyles.volcLertDescription}>
          {volcLertTypedDescription}
        </Text>

        <Animated.View
          style={[
            volcLertStyles.volcLertButtonWrap,
            { transform: [{ scale: volcLertButtonScaleAnim }] },
          ]}
        >
          <TouchableOpacity
            style={volcLertStyles.volcLertButtonTouchArea}
            onPress={volcLertHandleNext}
            onPressIn={volcLertHandlePressIn}
            onPressOut={volcLertHandlePressOut}
            activeOpacity={1}
          >
            <LinearGradient
              colors={['#CF4E27', '#ED7635']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={volcLertStyles.volcLertButton}
            >
              <Text style={volcLertStyles.volcLertButtonText}>
                {volcLertOnboardingData[volcLertCurrIndex].buttonText}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsystonbrdn;

const volcLertStyles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 60,
    paddingTop: 100,
  },
  volcLertButton: {
    width: '75%',
    height: 70,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  volcLertButtonWrap: {
    width: '100%',
  },
  volcLertButtonTouchArea: {
    width: '100%',
  },
  volcLertButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  volcLertTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 30,
  },
  volcLertDescription: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E6B59F',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
  },
});
