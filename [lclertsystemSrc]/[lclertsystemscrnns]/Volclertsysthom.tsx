// home screen

import Sound from 'react-native-sound';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, Share, StyleSheet, Text, View } from 'react-native';
import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';
import LinearGradient from 'react-native-linear-gradient';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../[lclertsystemstorggee]/volclertsystcntx';

import AsyncStorage from '@react-native-async-storage/async-storage';

const volcLertInterestingFacts = [
  'Volcanoes form when magma from deep inside the Earth rises to the surface.',
  "The Pacific Ring of Fire contains about 75% of the world's active volcanoes.",
  'Lava can reach temperatures of over 1,200C (2,200F).',
  'Mauna Loa in Hawaii is the largest volcano on Earth by volume.',
  'Some volcanoes erupt underwater and create new islands.',
  'Volcanic ash is made of tiny pieces of rock and glass.',
  'The word "volcano" comes from Vulcan, the Roman god of fire.',
  'The tallest volcano in the solar system is Olympus Mons on Mars.',
  'Some volcanoes can stay dormant for hundreds of years.',
  'Volcanic soil is very fertile and great for farming.',
  'Pyroclastic flows can move faster than 700 km/h.',
  'Mount Vesuvius destroyed the Roman city of Pompeii in 79 AD.',
  'Iceland has more than 30 active volcanic systems.',
  'Most volcanoes are found along tectonic plate boundaries.',
  'Lava flows usually move slowly but can still destroy buildings.',
  'Some volcanic eruptions can affect global climate.',
  'The eruption of Mount Tambora in 1815 caused the "Year Without Summer."',
  'Volcanoes release gases such as water vapor, carbon dioxide, and sulfur dioxide.',
  'Some volcanoes have large craters called calderas.',
  'Volcanic lightning can occur during explosive eruptions.',
  'New volcanic islands can appear in the ocean after eruptions.',
  'The loudest volcanic eruption recorded was Krakatoa in 1883.',
  'Volcano monitoring helps scientists predict possible eruptions.',
  "Magma becomes lava once it reaches the Earth's surface.",
  'Some volcanoes are covered by glaciers and ice caps.',
  'The Hawaiian Islands were formed by volcanic activity.',
  'Volcanoes can create geothermal energy used for electricity.',
  'There are more than 1,500 potentially active volcanoes on Earth.',
  'Many mountains around the world are actually ancient volcanoes.',
  'Even dormant volcanoes can become active again.',
];

const volcLertHomeCards = [
  {
    id: 1,
    icon: require('../../elements/images/volclertsyomen1.png'),
    title: 'Volcano\nList',
    description: 'Explore volcanoes\nworldwide',
  },
  {
    id: 2,
    icon: require('../../elements/images/volclertsyomen2.png'),
    title: 'Danger\nTest',
    description: 'Check your\nvolcano risk',
  },
  {
    id: 3,
    icon: require('../../elements/images/volclertsyomen3.png'),
    title: 'Stories',
    description: 'Famous eruptions\nand events',
  },
  {
    id: 4,
    icon: require('../../elements/images/volclertsyomen4.png'),
    title: 'Volcano\nQuiz',
    description: 'Test your volcano\nknowledge',
  },
];

const Volclertsysthom = () => {
  const navigation = useNavigation<any>();
  const volcLertSavedFactsStorageKey = 'volcLertSavedFacts';
  const volcLertSavedVolcanoesStorageKey = 'volcLertSavedVolcanoIds';
  const volcLertInterestingFact = useMemo(() => {
    const volcLertRandomIndex = Math.floor(
      Math.random() * volcLertInterestingFacts.length,
    );
    return volcLertInterestingFacts[volcLertRandomIndex];
  }, []);
  const [volcLertBackgroundMusicIdx, setVolcLertBackgroundMusicIdx] =
    useState(0);
  const [volcLertIsCurrentFactSaved, setVolcLertIsCurrentFactSaved] =
    useState(false);
  const [volcLertSavedItemsCount, setVolcLertSavedItemsCount] = useState(0);
  const [volcLertNowDate, setVolcLertNowDate] = useState(new Date());
  const [sound, setSound] = useState(null);
  const volcLertBackgroundMusicTracksCycle = [
    'lexin_music-world-travel-142838.mp3',
    'lexin_music-world-travel-142838.mp3',
  ];
  const {
    volcLertBackgroundMusic,
    setVolcLertBackgroundMusic,
    setVolcLertVibration,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadVolcLertBackgroundMusic();
      loadVolcLertVibration();
      loadVolcLertSavedItemsCount();
    }, []),
  );

  useEffect(() => {
    const volcLertTimer = setInterval(() => {
      setVolcLertNowDate(new Date());
    }, 60000);

    return () => {
      clearInterval(volcLertTimer);
    };
  }, []);

  useEffect(() => {
    playVolcLertBackgroundMusic(volcLertBackgroundMusicIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [volcLertBackgroundMusicIdx]);

  const playVolcLertBackgroundMusic = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const volcLertBackgroundMusicTrackPath =
      volcLertBackgroundMusicTracksCycle[index];

    const newVolcLertBackgroundMusicSound = new Sound(
      volcLertBackgroundMusicTrackPath,

      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('Error =>', error);
          return;
        }

        newVolcLertBackgroundMusicSound.play(success => {
          if (success) {
            setVolcLertBackgroundMusicIdx(
              prevIndex =>
                (prevIndex + 1) % volcLertBackgroundMusicTracksCycle.length,
            );
          } else {
            console.log('Error =>');
          }
        });
        setSound(newVolcLertBackgroundMusicSound);
      },
    );
  };

  useEffect(() => {
    const setVolumeVolcLertBackgroundMusic = async () => {
      try {
        const volcLertBackgroundMusicValue = await AsyncStorage.getItem(
          'toggleVolcLertBackgroundMusic',
        );

        const isVolcLertBackgroundMusicOn = JSON.parse(
          volcLertBackgroundMusicValue,
        );
        setVolcLertBackgroundMusic(isVolcLertBackgroundMusicOn);
        if (sound) {
          sound.setVolume(isVolcLertBackgroundMusicOn ? 1 : 0);
        }
      } catch (error) {
        console.error('Error =>', error);
      }
    };

    setVolumeVolcLertBackgroundMusic();
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(volcLertBackgroundMusic ? 1 : 0);
    }
  }, [volcLertBackgroundMusic]);

  useEffect(() => {
    const volcLertLoadSavedFactState = async () => {
      try {
        const volcLertSavedFactsRaw = await AsyncStorage.getItem(
          volcLertSavedFactsStorageKey,
        );
        const volcLertSavedFacts: string[] = volcLertSavedFactsRaw
          ? JSON.parse(volcLertSavedFactsRaw)
          : [];
        setVolcLertIsCurrentFactSaved(
          volcLertSavedFacts.includes(volcLertInterestingFact),
        );
      } catch {
        setVolcLertIsCurrentFactSaved(false);
      }
    };

    volcLertLoadSavedFactState();
  }, [volcLertInterestingFact]);

  const loadVolcLertVibration = async () => {
    try {
      const volcLertVibrationValue = await AsyncStorage.getItem(
        'toggleVolcLertVibration',
      );
      if (volcLertVibrationValue !== null) {
        const isVolcLertVibrationOn = JSON.parse(volcLertVibrationValue);
        setVolcLertVibration(isVolcLertVibrationOn);
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  const loadVolcLertBackgroundMusic = async () => {
    try {
      const volcLertBackgroundMusicValue = await AsyncStorage.getItem(
        'toggleVolcLertBackgroundMusic',
      );
      if (volcLertBackgroundMusicValue !== null) {
        const isVolcLertBackgroundMusicOn = JSON.parse(
          volcLertBackgroundMusicValue,
        );
        setVolcLertBackgroundMusic(isVolcLertBackgroundMusicOn);
      }
    } catch (error) {
      console.error('Error loading settings =>', error);
    }
  };

  const loadVolcLertSavedItemsCount = async () => {
    try {
      const [volcLertSavedVolcanoesRaw, volcLertSavedFactsRaw] =
        await Promise.all([
          AsyncStorage.getItem(volcLertSavedVolcanoesStorageKey),
          AsyncStorage.getItem(volcLertSavedFactsStorageKey),
        ]);
      const volcLertSavedVolcanoes: string[] = volcLertSavedVolcanoesRaw
        ? JSON.parse(volcLertSavedVolcanoesRaw)
        : [];
      const volcLertSavedFacts: string[] = volcLertSavedFactsRaw
        ? JSON.parse(volcLertSavedFactsRaw)
        : [];
      setVolcLertSavedItemsCount(
        volcLertSavedVolcanoes.length + volcLertSavedFacts.length,
      );
    } catch {
      setVolcLertSavedItemsCount(0);
    }
  };

  const volcLertHandleShareFact = () => {
    Share.share({
      message: volcLertInterestingFact,
      title: 'Interesting volcano fact',
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
  };

  const volcLertHandleToggleSaveFact = async () => {
    try {
      const volcLertSavedFactsRaw = await AsyncStorage.getItem(
        volcLertSavedFactsStorageKey,
      );
      const volcLertSavedFacts: string[] = volcLertSavedFactsRaw
        ? JSON.parse(volcLertSavedFactsRaw)
        : [];

      const volcLertUpdatedSavedFacts = volcLertSavedFacts.includes(
        volcLertInterestingFact,
      )
        ? volcLertSavedFacts.filter(
            volcLertSavedFact => volcLertSavedFact !== volcLertInterestingFact,
          )
        : [...volcLertSavedFacts, volcLertInterestingFact];

      await AsyncStorage.setItem(
        volcLertSavedFactsStorageKey,
        JSON.stringify(volcLertUpdatedSavedFacts),
      );
      setVolcLertIsCurrentFactSaved(
        volcLertUpdatedSavedFacts.includes(volcLertInterestingFact),
      );
    } catch {
      Alert.alert('Error', 'Could not save fact.');
    }
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleExploreVolcanoes = () => {
    navigation.navigate('Volclertsymap' as never);
  };

  const volcLertDateText = `${String(volcLertNowDate.getDate()).padStart(
    2,
    '0',
  )}.${String(volcLertNowDate.getMonth() + 1).padStart(
    2,
    '0',
  )}.${volcLertNowDate.getFullYear()}`;
  const volcLertTimeText = `${String(volcLertNowDate.getHours()).padStart(
    2,
    '0',
  )}:${String(volcLertNowDate.getMinutes()).padStart(2, '0')}`;
  const volcLertSavedStatusText =
    volcLertSavedItemsCount === 0
      ? 'NO SAVED'
      : `${volcLertSavedItemsCount} SAVES`;

  const volcLertHandleOpenMenuCard = (volcLertCardId: number) => {
    if (volcLertCardId === 1) {
      navigation.navigate('Volclertsystlist' as never);
      return;
    }
    if (volcLertCardId === 2) {
      navigation.navigate('Volclertsysttractvty' as never);
      return;
    }
    if (volcLertCardId === 3) {
      navigation.navigate('Volclertsysttries' as never);
      return;
    }
    if (volcLertCardId === 4) {
      navigation.navigate('Volclertsysttrqizz' as never);
      return;
    }

    Alert.alert('Coming soon', 'This section is coming soon.');
  };

  return (
    <Volclertsystlay>
      <View style={styles.volcLertContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E26A35',
            }}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Volclertsysavedplaces' as never)
            }
          >
            <Image
              source={require('../../elements/images/volclertsmsaved.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.volcLertSettingsButton}
            onPress={volcLertHandleOpenSettings}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsysett.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.volcLertInfoRow}>
          <View style={styles.volcLertInfoCard}>
            <View style={styles.volcLertInfoIconWrap}>
              <Image
                source={require('../../elements/images/volclertscal.png')}
                tintColor="#ED7635"
              />
            </View>
            <Text style={styles.volcLertInfoText}>{volcLertDateText}</Text>
          </View>

          <View style={styles.volcLertInfoCard}>
            <View style={styles.volcLertInfoIconWrap}>
              <Image
                source={require('../../elements/images/volclertsmatime.png')}
                tintColor="#ED7635"
              />
            </View>
            <Text style={styles.volcLertInfoText}>{volcLertTimeText}</Text>
          </View>

          <TouchableOpacity
            style={styles.volcLertInfoCard}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Volclertsysavedplaces' as never)
            }
          >
            <View style={styles.volcLertInfoIconWrap}>
              <Image
                source={require('../../elements/images/volclertsmsaved.png')}
              />
              <Text style={styles.volcLertInfoText}>
                {volcLertSavedStatusText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.volcLertFactCard}
        >
          <View style={styles.volcLertFactCardContent}>
            <View style={{ width: '80%' }}>
              <Text style={styles.volcLertFactTitle}>Interesting fact</Text>
              <Text style={styles.volcLertFactDescription}>
                {volcLertInterestingFact}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={volcLertHandleShareFact}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertShareButton}
                >
                  <Image
                    source={require('../../elements/images/volclertsyoshre.png')}
                  />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={volcLertHandleToggleSaveFact}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertSaveFactButton}
                >
                  <Image
                    source={
                      volcLertIsCurrentFactSaved
                        ? require('../../elements/images/volclertsmsaved.png')
                        : require('../../elements/images/volclertsmasv.png')
                    }
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.volcLertCardsGrid}>
          {volcLertHomeCards.map(volcLertCard => (
            <TouchableOpacity
              key={volcLertCard.id}
              activeOpacity={0.85}
              style={styles.volcLertMenuCardWrap}
              onPress={() => volcLertHandleOpenMenuCard(volcLertCard.id)}
            >
              <LinearGradient
                colors={['#612F47', '#8A3844', '#B13D2F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.volcLertMenuCard}
              >
                <View style={{}}>
                  <View style={styles.volcLertMenuCardTopRow}>
                    <Image source={volcLertCard.icon} />
                    <Text style={styles.volcLertMenuCardTitle}>
                      {volcLertCard.title}
                    </Text>
                  </View>
                </View>
                <View style={styles.volcLertMenuCardFooter}>
                  <Text style={styles.volcLertMenuCardDescription}>
                    {volcLertCard.description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.volcLertBottomActionWrap}
          onPress={volcLertHandleExploreVolcanoes}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.volcLertBottomActionButton}
          >
            <Text style={styles.volcLertBottomActionText}>
              Explore Volcanoes
            </Text>
            <Image
              source={require('../../elements/images/volclertsmarkr.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsysthom;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 44,
    paddingHorizontal: 22,
  },
  volcLertSettingsButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertSettingsIcon: {
    fontSize: 24,
  },
  volcLertTopActionWrap: {
    marginTop: 20,
  },
  volcLertTopActionButton: {
    borderRadius: 100,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertTopActionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  volcLertInfoRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  volcLertInfoCard: {
    flex: 1,
    minHeight: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: '#00000059',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 2,
  },
  volcLertInfoIconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  volcLertInfoIconText: {
    fontSize: 12,
  },
  volcLertInfoSavedIcon: {
    width: 11,
    height: 11,
    resizeMode: 'contain',
  },
  volcLertInfoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  volcLertFactCard: {
    marginTop: 18,
    borderRadius: 20,
  },
  volcLertFactCardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  volcLertFactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  volcLertFactDescription: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#F6E8DF',
  },
  volcLertShareButton: {
    marginTop: 18,
    minHeight: 40,
    width: 40,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertShareButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  volcLertSaveFactButton: {
    marginTop: 10,
    minHeight: 40,
    width: 40,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertCardsGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  volcLertMenuCardWrap: {
    width: '48%',
  },
  volcLertMenuCard: {
    minHeight: 152,
    borderRadius: 24,
    justifyContent: 'space-between',
  },
  volcLertMenuCardFooter: {
    backgroundColor: '#0000004D',
    width: '100%',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    paddingVertical: 7,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  volcLertMenuCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },
  volcLertMenuCardIcon: {
    fontSize: 31,
  },
  volcLertMenuCardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  volcLertMenuCardDescription: {
    color: '#EDDDCF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 2,
  },
  volcLertBottomActionWrap: {
    marginTop: 'auto',
    paddingTop: 24,
  },
  volcLertBottomActionButton: {
    borderRadius: 999,
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  volcLertBottomActionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});
