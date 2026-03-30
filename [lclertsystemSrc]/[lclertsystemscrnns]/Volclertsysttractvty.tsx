import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';
import { useStore } from '../[lclertsystemstorggee]/volclertsystcntx';

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
import LinearGradient from 'react-native-linear-gradient';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

type volcLertRiskOptionType = {
  text: string;
  points: number;
};

type volcLertRiskQuestionType = {
  id: number;
  title: string;
  options: [volcLertRiskOptionType, volcLertRiskOptionType];
};

const volcLertRiskQuestions: volcLertRiskQuestionType[] = [
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

const Volclertsysttractvty = () => {
  const navigation = useNavigation<any>();
  const { volcLertVibration } = useStore();
  const [volcLertQuestionIndex, setVolcLertQuestionIndex] = useState(0);
  const [volcLertTotalRiskScore, setVolcLertTotalRiskScore] = useState(0);
  const [volcLertSelectedOptionIndex, setVolcLertSelectedOptionIndex] =
    useState<number | null>(null);
  const [volcLertSelectedOptionPoints, setVolcLertSelectedOptionPoints] =
    useState<number | null>(null);
  const [volcLertIsFinished, setVolcLertIsFinished] = useState(false);
  const volcLertShakeAnim = useRef(new Animated.Value(0)).current;

  const volcLertCurrentQuestion = volcLertRiskQuestions[volcLertQuestionIndex];

  const volcLertRiskLevel = useMemo(() => {
    if (volcLertTotalRiskScore <= 4) {
      return 'Low Risk';
    }
    if (volcLertTotalRiskScore <= 8) {
      return 'Moderate Risk';
    }
    if (volcLertTotalRiskScore <= 13) {
      return 'High Risk';
    }
    return 'Extreme Risk';
  }, [volcLertTotalRiskScore]);

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs');
  };

  const volcLertHandleSelectOption = (
    volcLertOptionIndex: number,
    volcLertOptionPoints: number,
  ) => {
    setVolcLertSelectedOptionIndex(volcLertOptionIndex);
    setVolcLertSelectedOptionPoints(volcLertOptionPoints);
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
    if (
      volcLertSelectedOptionIndex === null ||
      volcLertSelectedOptionPoints === null ||
      !volcLertCurrentQuestion
    ) {
      volcLertHandleMissingOptionFeedback();
      return;
    }

    const volcLertNextScore =
      volcLertTotalRiskScore + volcLertSelectedOptionPoints;
    const volcLertNextIndex = volcLertQuestionIndex + 1;

    setVolcLertTotalRiskScore(volcLertNextScore);
    setVolcLertSelectedOptionIndex(null);
    setVolcLertSelectedOptionPoints(null);

    if (volcLertNextIndex >= volcLertRiskQuestions.length) {
      setVolcLertIsFinished(true);
      return;
    }

    setVolcLertQuestionIndex(volcLertNextIndex);
  };

  const volcLertHandleRestart = () => {
    setVolcLertQuestionIndex(0);
    setVolcLertTotalRiskScore(0);
    setVolcLertSelectedOptionIndex(null);
    setVolcLertSelectedOptionPoints(null);
    setVolcLertIsFinished(false);
  };

  const volcLertHandleShareResult = () => {
    Share.share({
      title: 'Volcano Risk Test Result',
      message: `Volcano risk test result: ${volcLertRiskLevel} (${volcLertTotalRiskScore}/19).`,
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
            source={require('../../elements/images/volclertsydang.png')}
            style={styles.volcLertDangerImage}
          />
        )}

        {!volcLertIsFinished ? (
          <View style={styles.volcLertCard}>
            <Text style={styles.volcLertCardTitle}>
              {volcLertCurrentQuestion.title}
            </Text>

            <View style={styles.volcLertQuestionBody}>
              {volcLertCurrentQuestion.options.map(
                (volcLertOption, volcLertIndex) => (
                  <TouchableOpacity
                    key={`${volcLertCurrentQuestion.id}-${volcLertOption.text}`}
                    style={[
                      styles.volcLertOptionButton,
                      volcLertSelectedOptionIndex === volcLertIndex &&
                        styles.volcLertOptionButtonActive,
                    ]}
                    onPress={() =>
                      volcLertHandleSelectOption(
                        volcLertIndex,
                        volcLertOption.points,
                      )
                    }
                    activeOpacity={0.85}
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
                style={styles.volcLertPrimaryButtonWrap}
                onPress={volcLertHandleNext}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertPrimaryButton}
                >
                  <Text style={styles.volcLertPrimaryButtonText}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          <>
            <Image
              source={require('../../elements/images/volclertsydangres.png')}
              style={styles.volcLertDangerResultImage}
            />
            <LinearGradient
              colors={['#612F47', '#8A3844', '#B13D2F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.volcLertResultCard}
            >
              <View style={styles.volcLertResultCardContent}>
                <Text style={styles.volcLertResultLabel}>Your volcano has</Text>
                <Text style={styles.volcLertResultValue}>
                  {volcLertRiskLevel}
                </Text>
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
          </>
        )}
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsysttractvty;

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
  volcLertBackIcon: {
    fontSize: 34,
    color: '#FF8E3A',
    fontWeight: '700',
  },
  volcLertHeaderImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  volcLertDangerImage: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  volcLertDangerResultImage: {
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  volcLertCard: {
    backgroundColor: '#8A3844',
    borderRadius: 24,
    overflow: 'hidden',

    paddingBottom: 22,
  },
  volcLertCardTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 30,
    backgroundColor: '#0000004D',
  },
  volcLertQuestionBody: {
    paddingHorizontal: 24,
    paddingTop: 36,
    rowGap: 14,
    marginBottom: 20,
  },
  volcLertOptionButton: {
    minHeight: 80,
    borderRadius: 12,
    backgroundColor: '#7D3545',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    textAlign: 'center',
  },
  volcLertPrimaryButtonWrap: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  volcLertPrimaryButton: {
    minHeight: 50,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  volcLertPrimaryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  volcLertResultCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 8,

    alignItems: 'center',
  },
  volcLertResultCardContent: {
    padding: 34,
  },
  volcLertResultLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
  },
  volcLertResultValue: {
    color: '#fff',
    fontSize: 28,

    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
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
