import Volclertsystlay from '../Volclertsystemcmpnt/Volclertsystlay';

import { useStore } from '../Volclertsystemstorg/volclertsystcntx';

import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type volcLertQuizOptionType = {
  text: string;
  isCorrect: boolean;
};

type volcLertQuizQuestionType = {
  id: number;
  question: string;
  options: volcLertQuizOptionType[];
};

const volcLertQuizQuestions: volcLertQuizQuestionType[] = [
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

const volcLertGetLevel = (volcLertScore: number) => {
  if (volcLertScore <= 2) {
    return 'Beginner';
  }
  if (volcLertScore <= 5) {
    return 'Explorer';
  }
  if (volcLertScore <= 8) {
    return 'Volcano Enthusiast';
  }
  return 'Volcano Expert';
};

const Volclertsysttrqizz = () => {
  const navigation = useNavigation<any>();
  const { volcLertVibration } = useStore();
  const [volcLertQuestionIndex, setVolcLertQuestionIndex] = useState(0);
  const [volcLertScore, setVolcLertScore] = useState(0);
  const [volcLertSelectedOptionIndex, setVolcLertSelectedOptionIndex] =
    useState<number | null>(null);
  const [volcLertIsFinished, setVolcLertIsFinished] = useState(false);
  const volcLertShakeAnim = useRef(new Animated.Value(0)).current;

  const volcLertCurrentQuestion = volcLertQuizQuestions[volcLertQuestionIndex];

  const volcLertLevel = useMemo(() => {
    return volcLertGetLevel(volcLertScore);
  }, [volcLertScore]);

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs');
  };

  const volcLertHandleSelectOption = (volcLertOptionIndex: number) => {
    setVolcLertSelectedOptionIndex(volcLertOptionIndex);
  };

  const volcLertHandleMissingOptionFeedback = () => {
    if (volcLertVibration) {
      Vibration.vibrate(130);
    }

    Animated.sequence([
      Animated.timing(volcLertShakeAnim, {
        toValue: 8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(volcLertShakeAnim, {
        toValue: -8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(volcLertShakeAnim, {
        toValue: 6,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(volcLertShakeAnim, {
        toValue: -6,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(volcLertShakeAnim, {
        toValue: 0,
        duration: 35,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const volcLertHandleNext = () => {
    if (volcLertSelectedOptionIndex === null || !volcLertCurrentQuestion) {
      volcLertHandleMissingOptionFeedback();
      return;
    }

    const volcLertIsCorrect =
      volcLertCurrentQuestion.options[volcLertSelectedOptionIndex]
        ?.isCorrect === true;
    const volcLertNextScore = volcLertIsCorrect
      ? volcLertScore + 1
      : volcLertScore;
    const volcLertNextQuestionIndex = volcLertQuestionIndex + 1;

    setVolcLertScore(volcLertNextScore);
    setVolcLertSelectedOptionIndex(null);

    if (volcLertNextQuestionIndex >= volcLertQuizQuestions.length) {
      setVolcLertIsFinished(true);
      return;
    }

    setVolcLertQuestionIndex(volcLertNextQuestionIndex);
  };

  const volcLertHandleRestart = () => {
    setVolcLertQuestionIndex(0);
    setVolcLertScore(0);
    setVolcLertSelectedOptionIndex(null);
    setVolcLertIsFinished(false);
  };

  const volcLertHandleShareResult = () => {
    Share.share({
      title: 'Quiz Result',
      message: `Quiz Result: ${volcLertScore}/${volcLertQuizQuestions.length}. Level: ${volcLertLevel}.`,
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
  };

  if (!volcLertCurrentQuestion && !volcLertIsFinished) {
    return null;
  }

  return (
    <Volclertsystlay>
      <View style={styles.volcLertContainer}>
        <View style={styles.volcLertTopBar}>
          <TouchableOpacity
            style={styles.volcLertTopIconButton}
            onPress={volcLertHandleBack}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsyoback.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={volcLertHandleOpenSettings}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsysett.png')}
            />
          </TouchableOpacity>
        </View>

        {!volcLertIsFinished && (
          <Image
            source={require('../../elements/images/volclertsysmqz.png')}
            style={styles.volcLertQuizImage}
          />
        )}

        {!volcLertIsFinished ? (
          <View style={styles.volcLertQuizCard}>
            <Text style={styles.volcLertProgressText}>
              {volcLertQuestionIndex + 1}/{volcLertQuizQuestions.length} Your
              score: {volcLertScore}
            </Text>

            <View style={styles.volcLertQuestionWrap}>
              <Text style={styles.volcLertQuestionText}>
                {volcLertCurrentQuestion.question}
              </Text>
            </View>

            <View style={styles.volcLertOptionsWrap}>
              {volcLertCurrentQuestion.options.map(
                (volcLertOption, volcLertIndex) => (
                  <TouchableOpacity
                    key={`${volcLertCurrentQuestion.id}-${volcLertOption.text}`}
                    activeOpacity={0.85}
                    onPress={() => volcLertHandleSelectOption(volcLertIndex)}
                    style={[
                      styles.volcLertOptionButton,
                      volcLertSelectedOptionIndex === volcLertIndex &&
                        styles.volcLertOptionButtonActive,
                    ]}
                  >
                    <Text style={styles.volcLertOptionText}>
                      {volcLertOption.text}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            <Animated.View
              style={{
                transform: [{ translateX: volcLertShakeAnim }],
              }}
            >
              <TouchableOpacity
                style={styles.volcLertNextButtonWrap}
                onPress={volcLertHandleNext}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertNextButton}
                >
                  <Text style={styles.volcLertNextButtonText}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <View style={styles.volcLertResultWrap}>
            <Image
              source={require('../../elements/images/volclertsysmqzres.png')}
              style={styles.volcLertResultImage}
            />

            <LinearGradient
              colors={['#612F47', '#8A3844', '#B13D2F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.volcLertResultCard}
            >
              <View style={styles.volcLertResultCardContent}>
                <Text style={styles.volcLertProgressText}>
                  {volcLertQuizQuestions.length}/{volcLertQuizQuestions.length}{' '}
                  Your score: {volcLertScore}
                </Text>

                <View style={styles.volcLertLevelWrap}>
                  <Text style={styles.volcLertLevelLabel}>Your LvL is</Text>
                  <Text style={styles.volcLertLevelValue}>{volcLertLevel}</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.volcLertResultActions}>
              <TouchableOpacity
                style={styles.volcLertShareButtonWrap}
                onPress={volcLertHandleShareResult}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertShareButton}
                >
                  <Text style={styles.volcLertShareButtonText}>
                    Share the result
                  </Text>
                  <Image
                    source={require('../../elements/images/volclertsyoshre.png')}
                  />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={volcLertHandleRestart}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertRestartButton}
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
    </Volclertsystlay>
  );
};

export default Volclertsysttrqizz;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 22,
  },
  volcLertTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volcLertTopIconButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertQuizImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  volcLertQuizCard: {
    borderRadius: 24,
    overflow: 'hidden',
    paddingBottom: 22,
    backgroundColor: '#8A3844',
  },
  volcLertProgressText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 15,
  },
  volcLertQuestionWrap: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0000001A',
  },
  volcLertQuestionText: {
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  volcLertOptionsWrap: {
    paddingHorizontal: 24,
    paddingTop: 16,
    rowGap: 12,
  },
  volcLertOptionButton: {
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: '#7D3545',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  volcLertOptionButtonActive: {
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  volcLertOptionText: {
    color: '#EFDCD0',
    fontSize: 16,
    fontWeight: '500',
  },
  volcLertNextButtonWrap: {
    marginTop: 22,
    paddingHorizontal: 24,
  },
  volcLertNextButton: {
    minHeight: 50,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertNextButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  volcLertResultWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  volcLertResultImage: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  volcLertResultCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 4,
    paddingBottom: 18,
  },
  volcLertResultCardContent: {
    padding: 30,
  },
  volcLertLevelWrap: {
    marginTop: 25,
    alignItems: 'center',
  },
  volcLertLevelLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 2,
  },
  volcLertLevelValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  volcLertResultActions: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  volcLertShareButtonWrap: {
    flex: 1,
  },
  volcLertShareButton: {
    minHeight: 52,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  volcLertShareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  volcLertRestartButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#D85E30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertRestartIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});
