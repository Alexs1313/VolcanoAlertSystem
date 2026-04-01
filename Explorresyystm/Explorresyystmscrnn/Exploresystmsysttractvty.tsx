import LinearGradient from 'react-native-linear-gradient';

import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';
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

type exploresystmRiskOptionType = {
  text: string;
  points: number;
};

type exploresystmRiskQuestionType = {
  id: number;
  title: string;
  options: [exploresystmRiskOptionType, exploresystmRiskOptionType];
};

const exploresystmRiskQuestions: exploresystmRiskQuestionType[] = [
  {
    id: 1,
    title: 'Volcano activity',
    options: [
      { text: 'My volcano is active', points: 3 },
      { text: 'My volcano is not active', points: 0 },
    ],
  },
  {
    id: 2,
    title: 'Recent eruptions',
    options: [
      { text: 'My volcano erupted within the last 50 years', points: 3 },
      { text: 'My volcano has not erupted in the last 50 years', points: 0 },
    ],
  },
  {
    id: 3,
    title: 'Historical eruptions',
    options: [
      { text: 'My volcano erupted within the last 200 years', points: 2 },
      { text: 'My volcano has not erupted in the last 200 years', points: 0 },
    ],
  },
  {
    id: 4,
    title: 'Volcano height',
    options: [
      { text: 'My volcano is higher than 3000 meters', points: 1 },
      { text: 'My volcano is lower than 3000 meters', points: 0 },
    ],
  },
  {
    id: 5,
    title: 'Nearby population',
    options: [
      {
        text: 'There are cities or populated areas near my volcano',
        points: 2,
      },
      { text: 'There are no cities near my volcano', points: 0 },
    ],
  },
  {
    id: 6,
    title: 'Tectonic location',
    options: [
      { text: 'My volcano is near a tectonic plate boundary', points: 2 },
      { text: 'My volcano is not near a tectonic plate boundary', points: 0 },
    ],
  },
  {
    id: 7,
    title: 'Explosive eruptions',
    options: [
      { text: 'My volcano had strong explosive eruptions (VEI 4+)', points: 2 },
      { text: 'My volcano did not have strong explosive eruptions', points: 0 },
    ],
  },
  {
    id: 8,
    title: 'Crater size',
    options: [
      {
        text: 'My volcano has a large crater or caldera (over 1 km)',
        points: 1,
      },
      { text: 'My volcano has a small crater', points: 0 },
    ],
  },
  {
    id: 9,
    title: 'Seismic activity',
    options: [
      { text: 'There is seismic activity near my volcano', points: 2 },
      { text: 'There is no seismic activity near my volcano', points: 0 },
    ],
  },
  {
    id: 10,
    title: 'Geothermal activity',
    options: [
      {
        text: 'There are hot springs or fumaroles near my volcano',
        points: 1,
      },
      { text: 'There are no hot springs near my volcano', points: 0 },
    ],
  },
];

const Exploresystmsysttractvty = () => {
  const navigation = useNavigation<any>();
  const { exploresystmVibration } = useStore();
  const [exploresystmQuestionIndex, setVolcLertQuestionIndex] = useState(0);
  const [exploresystmTotalRiskScore, setVolcLertTotalRiskScore] = useState(0);
  const [exploresystmSelectedOptionIndex, setVolcLertSelectedOptionIndex] =
    useState<number | null>(null);
  const [exploresystmSelectedOptionPoints, setVolcLertSelectedOptionPoints] =
    useState<number | null>(null);
  const [exploresystmIsFinished, setVolcLertIsFinished] = useState(false);
  const exploresystmShakeAnim = useRef(new Animated.Value(0)).current;

  const exploresystmCurrentQuestion =
    exploresystmRiskQuestions[exploresystmQuestionIndex];

  const exploresystmRiskLevel = useMemo(() => {
    if (exploresystmTotalRiskScore <= 4) {
      return 'Low Risk';
    }
    if (exploresystmTotalRiskScore <= 8) {
      return 'Moderate Risk';
    }
    if (exploresystmTotalRiskScore <= 13) {
      return 'High Risk';
    }
    return 'Extreme Risk';
  }, [exploresystmTotalRiskScore]);

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs');
  };

  const exploresystmHandleSelectOption = (
    exploresystmOptionIndex: number,
    exploresystmOptionPoints: number,
  ) => {
    setVolcLertSelectedOptionIndex(exploresystmOptionIndex);
    setVolcLertSelectedOptionPoints(exploresystmOptionPoints);
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
      exploresystmSelectedOptionPoints === null ||
      !exploresystmCurrentQuestion
    ) {
      exploresystmHandleMissingOptionFeedback();
      return;
    }

    const exploresystmNextScore =
      exploresystmTotalRiskScore + exploresystmSelectedOptionPoints;
    const exploresystmNextIndex = exploresystmQuestionIndex + 1;

    setVolcLertTotalRiskScore(exploresystmNextScore);
    setVolcLertSelectedOptionIndex(null);
    setVolcLertSelectedOptionPoints(null);

    if (exploresystmNextIndex >= exploresystmRiskQuestions.length) {
      setVolcLertIsFinished(true);
      return;
    }

    setVolcLertQuestionIndex(exploresystmNextIndex);
  };

  const exploresystmHandleRestart = () => {
    setVolcLertQuestionIndex(0);
    setVolcLertTotalRiskScore(0);
    setVolcLertSelectedOptionIndex(null);
    setVolcLertSelectedOptionPoints(null);
    setVolcLertIsFinished(false);
  };

  const exploresystmHandleShareResult = () => {
    Share.share({
      title: 'Volcano Risk Test Result',
      message: `Volcano risk test result: ${exploresystmRiskLevel} (${exploresystmTotalRiskScore}/19).`,
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
            source={require('../../elements/images/volclertsydang.png')}
            style={styles.exploresystmDangerImage}
          />
        )}

        {!exploresystmIsFinished ? (
          <View style={styles.exploresystmCard}>
            <Text style={styles.exploresystmCardTitle}>
              {exploresystmCurrentQuestion.title}
            </Text>

            <View style={styles.exploresystmQuestionBody}>
              {exploresystmCurrentQuestion.options.map(
                (exploresystmOption, exploresystmIndex) => (
                  <TouchableOpacity
                    key={`${exploresystmCurrentQuestion.id}-${exploresystmOption.text}`}
                    style={[
                      styles.exploresystmOptionButton,
                      exploresystmSelectedOptionIndex === exploresystmIndex &&
                        styles.exploresystmOptionButtonActive,
                    ]}
                    onPress={() =>
                      exploresystmHandleSelectOption(
                        exploresystmIndex,
                        exploresystmOption.points,
                      )
                    }
                    activeOpacity={0.85}
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
                style={styles.exploresystmPrimaryButtonWrap}
                onPress={exploresystmHandleNext}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmPrimaryButton}
                >
                  <Text style={styles.exploresystmPrimaryButtonText}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <>
            <Image
              source={require('../../elements/images/volclertsydangres.png')}
              style={styles.exploresystmDangerResultImage}
            />
            <LinearGradient
              colors={['#612F47', '#8A3844', '#B13D2F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.exploresystmResultCard}
            >
              <View style={styles.exploresystmResultCardContent}>
                <Text style={styles.exploresystmResultLabel}>
                  Your volcano has
                </Text>
                <Text style={styles.exploresystmResultValue}>
                  {exploresystmRiskLevel}
                </Text>
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
          </>
        )}
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsysttractvty;

const styles = StyleSheet.create({
  exploresystmOptionButtonActive: {
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },

  exploresystmOptionText: {
    color: '#EFDCD0',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
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
  exploresystmTopIconButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmBackIcon: {
    fontSize: 34,
    color: '#FF8E3A',
    fontWeight: '700',
  },
  exploresystmHeaderImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  exploresystmDangerImage: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  exploresystmDangerResultImage: {
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  exploresystmCard: {
    backgroundColor: '#8A3844',
    borderRadius: 24,
    overflow: 'hidden',

    paddingBottom: 22,
  },
  exploresystmCardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 30,
    backgroundColor: '#0000004D',
  },
  exploresystmQuestionBody: {
    paddingHorizontal: 24,
    paddingTop: 36,
    rowGap: 14,
    marginBottom: 20,
  },
  exploresystmOptionButton: {
    minHeight: 80,
    borderRadius: 12,
    backgroundColor: '#7D3545',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  exploresystmPrimaryButtonWrap: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  exploresystmPrimaryButton: {
    minHeight: 50,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  exploresystmPrimaryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  exploresystmResultCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 8,

    alignItems: 'center',
  },
  exploresystmResultCardContent: {
    padding: 34,
  },
  exploresystmResultLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  exploresystmResultValue: {
    color: '#fff',
    fontSize: 28,

    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
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
