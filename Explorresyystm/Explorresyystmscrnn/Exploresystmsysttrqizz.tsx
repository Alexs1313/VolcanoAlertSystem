import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';

import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../Explorresyystmstrgg/explorresyystmcontxx';

import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Share,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

type exploresystmQuizOptionType = {
  text: string;
  isCorrect: boolean;
};

type exploresystmQuizQuestionType = {
  id: number;
  question: string;
  options: exploresystmQuizOptionType[];
};

const exploresystmQuizQuestions: exploresystmQuizQuestionType[] = [
  {
    id: 1,
    question: "What is magma called when it reaches the Earth's surface?",
    options: [
      { text: 'Rock', isCorrect: false },
      { text: 'Ash', isCorrect: false },
      { text: 'Lava', isCorrect: true },
      { text: 'Gas', isCorrect: false },
    ],
  },
  {
    id: 2,
    question: 'Which volcano destroyed Pompeii in 79 AD?',
    options: [
      { text: 'Mount Etna', isCorrect: false },
      { text: 'Mount Vesuvius', isCorrect: true },
      { text: 'Mount Fuji', isCorrect: false },
      { text: 'Mount Rainier', isCorrect: false },
    ],
  },
  {
    id: 3,
    question: 'Which country has the most active volcanoes?',
    options: [
      { text: 'Japan', isCorrect: false },
      { text: 'Indonesia', isCorrect: true },
      { text: 'Italy', isCorrect: false },
      { text: 'Mexico', isCorrect: false },
    ],
  },
  {
    id: 4,
    question: 'What is the Pacific Ring of Fire?',
    options: [
      { text: 'A volcanic island', isCorrect: false },
      { text: 'A region with many volcanoes', isCorrect: true },
      { text: 'A lava lake', isCorrect: false },
      { text: 'A mountain chain', isCorrect: false },
    ],
  },
  {
    id: 5,
    question: 'What type of volcano is Mount Fuji?',
    options: [
      { text: 'Shield volcano', isCorrect: false },
      { text: 'Stratovolcano', isCorrect: true },
      { text: 'Cinder cone', isCorrect: false },
      { text: 'Lava dome', isCorrect: false },
    ],
  },
  {
    id: 6,
    question: 'What can volcanic ash affect during eruptions?',
    options: [
      { text: 'Only the ground', isCorrect: false },
      { text: 'Air travel', isCorrect: true },
      { text: 'Ocean temperature', isCorrect: false },
      { text: 'Underground caves', isCorrect: false },
    ],
  },
  {
    id: 7,
    question: 'Which gas is commonly released during eruptions?',
    options: [
      { text: 'Nitrogen', isCorrect: false },
      { text: 'Sulfur dioxide', isCorrect: true },
      { text: 'Oxygen', isCorrect: false },
      { text: 'Hydrogen', isCorrect: false },
    ],
  },
  {
    id: 8,
    question:
      'Which volcano erupted in 2010 and disrupted air travel in Europe?',
    options: [
      { text: 'Eyjafjallajokull', isCorrect: true },
      { text: 'Etna', isCorrect: false },
      { text: 'Kilauea', isCorrect: false },
      { text: 'Kilimanjaro', isCorrect: false },
    ],
  },
  {
    id: 9,
    question: 'What is a pyroclastic flow?',
    options: [
      { text: 'Slow lava river', isCorrect: false },
      { text: 'Hot gas and ash moving fast', isCorrect: true },
      { text: 'Water near a volcano', isCorrect: false },
      { text: 'Smoke from magma', isCorrect: false },
    ],
  },
  {
    id: 10,
    question: 'Where are most volcanoes located?',
    options: [
      { text: 'In deserts', isCorrect: false },
      { text: 'Near tectonic plate boundaries', isCorrect: true },
      { text: 'In forests', isCorrect: false },
      { text: 'Near rivers', isCorrect: false },
    ],
  },
];

const exploresystmGetLevel = (exploresystmScore: number) => {
  if (exploresystmScore <= 2) {
    return 'Beginner';
  }
  if (exploresystmScore <= 5) {
    return 'Explorer';
  }
  if (exploresystmScore <= 8) {
    return 'Volcano Enthusiast';
  }
  return 'Volcano Expert';
};

const Exploresystmsysttrqizz = () => {
  const navigation = useNavigation<any>();
  const { exploresystmVibration } = useStore();
  const [exploresystmQuestionIndex, setVolcLertQuestionIndex] = useState(0);
  const [exploresystmScore, setVolcLertScore] = useState(0);
  const [exploresystmSelectedOptionIndex, setVolcLertSelectedOptionIndex] =
    useState<number | null>(null);
  const [exploresystmIsFinished, setVolcLertIsFinished] = useState(false);
  const exploresystmShakeAnim = useRef(new Animated.Value(0)).current;

  const exploresystmCurrentQuestion =
    exploresystmQuizQuestions[exploresystmQuestionIndex];

  const exploresystmLevel = useMemo(() => {
    return exploresystmGetLevel(exploresystmScore);
  }, [exploresystmScore]);

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs');
  };

  const exploresystmHandleSelectOption = (exploresystmOptionIndex: number) => {
    setVolcLertSelectedOptionIndex(exploresystmOptionIndex);
  };

  const exploresystmHandleMissingOptionFeedback = () => {
    if (exploresystmVibration) {
      Vibration.vibrate(130);
    }

    Animated.sequence([
      Animated.timing(exploresystmShakeAnim, {
        toValue: 8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(exploresystmShakeAnim, {
        toValue: -8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(exploresystmShakeAnim, {
        toValue: 6,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(exploresystmShakeAnim, {
        toValue: -6,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(exploresystmShakeAnim, {
        toValue: 0,
        duration: 35,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const exploresystmHandleNext = () => {
    if (
      exploresystmSelectedOptionIndex === null ||
      !exploresystmCurrentQuestion
    ) {
      exploresystmHandleMissingOptionFeedback();
      return;
    }

    const exploresystmIsCorrect =
      exploresystmCurrentQuestion.options[exploresystmSelectedOptionIndex]
        ?.isCorrect === true;
    const exploresystmNextScore = exploresystmIsCorrect
      ? exploresystmScore + 1
      : exploresystmScore;
    const exploresystmNextQuestionIndex = exploresystmQuestionIndex + 1;

    setVolcLertScore(exploresystmNextScore);
    setVolcLertSelectedOptionIndex(null);

    if (exploresystmNextQuestionIndex >= exploresystmQuizQuestions.length) {
      setVolcLertIsFinished(true);
      return;
    }

    setVolcLertQuestionIndex(exploresystmNextQuestionIndex);
  };

  const exploresystmHandleRestart = () => {
    setVolcLertQuestionIndex(0);
    setVolcLertScore(0);
    setVolcLertSelectedOptionIndex(null);
    setVolcLertIsFinished(false);
  };

  const exploresystmHandleShareResult = () => {
    Share.share({
      title: 'Quiz Result',
      message: `Quiz Result: ${exploresystmScore}/${exploresystmQuizQuestions.length}. Level: ${exploresystmLevel}.`,
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
  };

  if (!exploresystmCurrentQuestion && !exploresystmIsFinished) {
    return null;
  }

  return (
    <Exploresystmsystlay>
      <View style={styles.exploresystmContainer}>
        <View style={styles.exploresystmTopBar}>
          <TouchableOpacity
            style={styles.exploresystmTopIconButton}
            onPress={exploresystmHandleBack}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsyoback.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={exploresystmHandleOpenSettings}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsysett.png')}
            />
          </TouchableOpacity>
        </View>

        {!exploresystmIsFinished && (
          <Image
            source={require('../../elements/images/volclertsysmqz.png')}
            style={styles.exploresystmQuizImage}
          />
        )}

        {!exploresystmIsFinished ? (
          <View style={styles.exploresystmQuizCard}>
            <Text style={styles.exploresystmProgressText}>
              {exploresystmQuestionIndex + 1}/{exploresystmQuizQuestions.length}{' '}
              Your score: {exploresystmScore}
            </Text>

            <View style={styles.exploresystmQuestionWrap}>
              <Text style={styles.exploresystmQuestionText}>
                {exploresystmCurrentQuestion.question}
              </Text>
            </View>

            <View style={styles.exploresystmOptionsWrap}>
              {exploresystmCurrentQuestion.options.map(
                (exploresystmOption, exploresystmIndex) => (
                  <TouchableOpacity
                    key={`${exploresystmCurrentQuestion.id}-${exploresystmOption.text}`}
                    activeOpacity={0.85}
                    onPress={() =>
                      exploresystmHandleSelectOption(exploresystmIndex)
                    }
                    style={[
                      styles.exploresystmOptionButton,
                      exploresystmSelectedOptionIndex === exploresystmIndex &&
                        styles.exploresystmOptionButtonActive,
                    ]}
                  >
                    <Text style={styles.exploresystmOptionText}>
                      {exploresystmOption.text}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            <Animated.View
              style={{
                transform: [{ translateX: exploresystmShakeAnim }],
              }}
            >
              <TouchableOpacity
                style={styles.exploresystmNextButtonWrap}
                onPress={exploresystmHandleNext}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmNextButton}
                >
                  <Text style={styles.exploresystmNextButtonText}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <View style={styles.exploresystmResultWrap}>
            <Image
              source={require('../../elements/images/volclertsysmqzres.png')}
              style={styles.exploresystmResultImage}
            />

            <LinearGradient
              colors={['#612F47', '#8A3844', '#B13D2F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.exploresystmResultCard}
            >
              <View style={styles.exploresystmResultCardContent}>
                <Text style={styles.exploresystmProgressText}>
                  {exploresystmQuizQuestions.length}/
                  {exploresystmQuizQuestions.length} Your score:{' '}
                  {exploresystmScore}
                </Text>

                <View style={styles.exploresystmLevelWrap}>
                  <Text style={styles.exploresystmLevelLabel}>Your LvL is</Text>
                  <Text style={styles.exploresystmLevelValue}>
                    {exploresystmLevel}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.exploresystmResultActions}>
              <TouchableOpacity
                style={styles.exploresystmShareButtonWrap}
                onPress={exploresystmHandleShareResult}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmShareButton}
                >
                  <Text style={styles.exploresystmShareButtonText}>
                    Share the result
                  </Text>
                  <Image
                    source={require('../../elements/images/volclertsyoshre.png')}
                  />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={exploresystmHandleRestart}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmRestartButton}
                >
                  <Image
                    source={require('../../elements/images/volclertsysrel.png')}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsysttrqizz;

const styles = StyleSheet.create({
  exploresystmTopIconButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  exploresystmContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 30,

    paddingHorizontal: 22,
  },
  exploresystmTopBar: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },

  exploresystmQuizImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',

    marginTop: 10,
    marginBottom: 8,
  },

  exploresystmQuizCard: {
    borderRadius: 24,
    overflow: 'hidden',

    paddingBottom: 22,
    backgroundColor: '#8A3844',
  },

  exploresystmProgressText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',

    marginVertical: 15,
  },
  exploresystmQuestionWrap: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0000001A',
  },
  exploresystmQuestionText: {
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  exploresystmOptionsWrap: {
    paddingHorizontal: 24,
    paddingTop: 16,
    rowGap: 12,
  },
  exploresystmOptionButton: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#7D3545',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  exploresystmOptionButtonActive: {
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  exploresystmOptionText: {
    color: '#EFDCD0',
    fontSize: 16,
    fontWeight: '500',
  },
  exploresystmNextButtonWrap: {
    marginTop: 22,
    paddingHorizontal: 24,
  },
  exploresystmNextButton: {
    minHeight: 50,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmNextButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  exploresystmResultWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  exploresystmResultImage: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  exploresystmResultCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 4,
    paddingBottom: 18,
  },
  exploresystmResultCardContent: {
    padding: 30,
  },
  exploresystmLevelWrap: {
    marginTop: 25,
    alignItems: 'center',
  },
  exploresystmLevelLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 2,
  },
  exploresystmLevelValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  exploresystmResultActions: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exploresystmShareButtonWrap: {
    flex: 1,
  },
  exploresystmShareButton: {
    minHeight: 52,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  exploresystmShareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  exploresystmRestartButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#D85E30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmRestartIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});
