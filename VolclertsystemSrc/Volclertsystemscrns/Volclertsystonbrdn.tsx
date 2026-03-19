import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Volclertsystlay from '../Volclertsystemcmpnt/Volclertsystlay';

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
    image: require('../../elements/images/volclertsyon4.png'),
    title: 'Start Exploring',
    buttonText: 'Get Started',
    description:
      'Begin your journey and discover the incredible power of volcanoes around the world.',
  },
];

const Volclertsystonbrdn = () => {
  const navigation = useNavigation();
  const [volcLertCurrIndex, setVolcLertCurrIndex] = useState(0);

  const volcLertHandleNext = () => {
    volcLertCurrIndex < 4
      ? setVolcLertCurrIndex(volcLertCurrIndex + 1)
      : navigation.replace('Volclertsysthom' as never);
  };

  return (
    <Volclertsystlay>
      <View style={volcLertStyles.volcLertContainer}>
        <Image source={volcLertOnboardingData[volcLertCurrIndex].image} />

        <Text style={volcLertStyles.volcLertTitle}>
          {volcLertOnboardingData[volcLertCurrIndex].title}
        </Text>
        <Text style={volcLertStyles.volcLertDescription}>
          {volcLertOnboardingData[volcLertCurrIndex].description}
        </Text>

        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={volcLertHandleNext}
          activeOpacity={0.8}
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
