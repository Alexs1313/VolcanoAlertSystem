// home screen

import Sound from 'react-native-sound';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Alert, Image, Share, StyleSheet, Text, View } from 'react-native';

import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';

import LinearGradient from 'react-native-linear-gradient';
import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../Explorresyystmstrgg/explorresyystmcontxx';

import AsyncStorage from '@react-native-async-storage/async-storage';

const exploresystmInterestingFacts = [
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

const exploresystmHomeCards = [
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

const exploresystmRandomVolcanoes = [
  {
    id: 'etna',
    name: 'Mount Etna',
    status: 'active',
    location: 'Sicily, Italy',
    coordinates: '37.7510° N, 14.9934° E',
    height: '3329 m',
    description:
      'Mount Etna is one of the most active volcanoes in the world and the largest active volcano in Europe.',
    latitude: 37.751,
    longitude: 14.9934,
    image: require('../../elements/images/volclertsyovolc1.png'),
  },
  {
    id: 'fuji',
    name: 'Mount Fuji',
    status: 'dormant',
    location: 'Honshu, Japan',
    coordinates: '35.3606° N, 138.7274° E',
    height: '3776 m',
    description:
      'Mount Fuji is the highest mountain in Japan and an iconic stratovolcano.',
    latitude: 35.3606,
    longitude: 138.7274,
    image: require('../../elements/images/volclertsyovolc4.png'),
  },
  {
    id: 'kilauea',
    name: 'Kilauea',
    status: 'active',
    location: 'Hawaii, United States',
    coordinates: '19.421° N, 155.287° W',
    height: '1247 m',
    description:
      'Kilauea is one of the most active volcanoes on Earth, known for continuous lava flows.',
    latitude: 19.421,
    longitude: -155.287,
    image: require('../../elements/images/volclertsyovolc2.png'),
  },
];

const Exploresystmsysthom = () => {
  const navigation = useNavigation<any>();
  const exploresystmSavedFactsStorageKey = 'exploresystmSavedFacts';
  const exploresystmInterestingFact = useMemo(() => {
    const exploresystmRandomIndex = Math.floor(
      Math.random() * exploresystmInterestingFacts.length,
    );
    return exploresystmInterestingFacts[exploresystmRandomIndex];
  }, []);
  const [exploresystmBackgroundMusicIdx, setVolcLertBackgroundMusicIdx] =
    useState(0);
  const [exploresystmIsCurrentFactSaved, setVolcLertIsCurrentFactSaved] =
    useState(false);
  const [sound, setSound] = useState(null);
  const exploresystmBackgroundMusicTracksCycle = [
    'lexin_music-world-travel-142838.mp3',
    'lexin_music-world-travel-142838.mp3',
  ];
  const {
    exploresystmBackgroundMusic,
    setVolcLertBackgroundMusic,
    setVolcLertVibration,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadVolcLertBackgroundMusic();
      loadVolcLertVibration();
    }, []),
  );

  useEffect(() => {
    playVolcLertBackgroundMusic(exploresystmBackgroundMusicIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [exploresystmBackgroundMusicIdx]);

  const playVolcLertBackgroundMusic = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const exploresystmBackgroundMusicTrackPath =
      exploresystmBackgroundMusicTracksCycle[index];

    const newVolcLertBackgroundMusicSound = new Sound(
      exploresystmBackgroundMusicTrackPath,

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
                (prevIndex + 1) % exploresystmBackgroundMusicTracksCycle.length,
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
        const exploresystmBackgroundMusicValue = await AsyncStorage.getItem(
          'toggleVolcLertBackgroundMusic',
        );

        const isVolcLertBackgroundMusicOn = JSON.parse(
          exploresystmBackgroundMusicValue,
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
      sound.setVolume(exploresystmBackgroundMusic ? 1 : 0);
    }
  }, [exploresystmBackgroundMusic]);

  useEffect(() => {
    const exploresystmLoadSavedFactState = async () => {
      try {
        const exploresystmSavedFactsRaw = await AsyncStorage.getItem(
          exploresystmSavedFactsStorageKey,
        );
        const exploresystmSavedFacts: string[] = exploresystmSavedFactsRaw
          ? JSON.parse(exploresystmSavedFactsRaw)
          : [];
        setVolcLertIsCurrentFactSaved(
          exploresystmSavedFacts.includes(exploresystmInterestingFact),
        );
      } catch {
        setVolcLertIsCurrentFactSaved(false);
      }
    };

    exploresystmLoadSavedFactState();
  }, [exploresystmInterestingFact]);

  const loadVolcLertVibration = async () => {
    try {
      const exploresystmVibrationValue = await AsyncStorage.getItem(
        'toggleVolcLertVibration',
      );
      if (exploresystmVibrationValue !== null) {
        const isVolcLertVibrationOn = JSON.parse(exploresystmVibrationValue);
        setVolcLertVibration(isVolcLertVibrationOn);
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  const loadVolcLertBackgroundMusic = async () => {
    try {
      const exploresystmBackgroundMusicValue = await AsyncStorage.getItem(
        'toggleVolcLertBackgroundMusic',
      );
      if (exploresystmBackgroundMusicValue !== null) {
        const isVolcLertBackgroundMusicOn = JSON.parse(
          exploresystmBackgroundMusicValue,
        );
        setVolcLertBackgroundMusic(isVolcLertBackgroundMusicOn);
      }
    } catch (error) {
      console.error('Error loading settings =>', error);
    }
  };

  const exploresystmHandleOpenRandomVolcano = () => {
    const exploresystmRandomIndex = Math.floor(
      Math.random() * exploresystmRandomVolcanoes.length,
    );
    const exploresystmRandomVolcano =
      exploresystmRandomVolcanoes[exploresystmRandomIndex];
    if (!exploresystmRandomVolcano) {
      Alert.alert('Error', 'Could not open random volcano details.');
      return;
    }
    navigation.navigate('Exploresystmsystdet', {
      exploresystmVolcano: exploresystmRandomVolcano,
    });
  };

  const exploresystmHandleShareFact = () => {
    Share.share({
      message: exploresystmInterestingFact,
      title: 'Interesting volcano fact',
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
  };

  const exploresystmHandleToggleSaveFact = async () => {
    try {
      const exploresystmSavedFactsRaw = await AsyncStorage.getItem(
        exploresystmSavedFactsStorageKey,
      );
      const exploresystmSavedFacts: string[] = exploresystmSavedFactsRaw
        ? JSON.parse(exploresystmSavedFactsRaw)
        : [];

      const exploresystmUpdatedSavedFacts = exploresystmSavedFacts.includes(
        exploresystmInterestingFact,
      )
        ? exploresystmSavedFacts.filter(
            exploresystmSavedFact =>
              exploresystmSavedFact !== exploresystmInterestingFact,
          )
        : [...exploresystmSavedFacts, exploresystmInterestingFact];

      await AsyncStorage.setItem(
        exploresystmSavedFactsStorageKey,
        JSON.stringify(exploresystmUpdatedSavedFacts),
      );
      setVolcLertIsCurrentFactSaved(
        exploresystmUpdatedSavedFacts.includes(exploresystmInterestingFact),
      );
    } catch {
      Alert.alert('Error', 'Could not save fact.');
    }
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleExploreVolcanoes = () => {
    navigation.navigate('Exploresystmsymap' as never);
  };

  const exploresystmHandleOpenMenuCard = (exploresystmCardId: number) => {
    if (exploresystmCardId === 1) {
      navigation.navigate('Exploresystmsystlist' as never);
      return;
    }
    if (exploresystmCardId === 2) {
      navigation.navigate('Exploresystmsysttractvty' as never);
      return;
    }
    if (exploresystmCardId === 3) {
      navigation.navigate('Exploresystmsysttries' as never);
      return;
    }
    if (exploresystmCardId === 4) {
      navigation.navigate('Exploresystmsysttrqizz' as never);
      return;
    }

    Alert.alert('Coming soon', 'This section is coming soon.');
  };

  return (
    <Exploresystmsystlay>
      <View style={styles.exploresystmContainer}>
        <View style={{}}>
          {/* <TouchableOpacity
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
              navigation.navigate('Exploresystmsysavedplaces' as never)
            }
          >
            <Image
              source={require('../../elements/images/volclertsmsaved.png')}
            />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.exploresystmSettingsButton}
            onPress={exploresystmHandleOpenSettings}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsysett.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.exploresystmTopActionWrap}
          onPress={exploresystmHandleOpenRandomVolcano}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.exploresystmTopActionButton}
          >
            <Text style={styles.exploresystmTopActionText}>
              Open a random volcano
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.exploresystmFactCard}
        >
          <View style={styles.exploresystmFactCardContent}>
            <View style={{ width: '80%' }}>
              <Text style={styles.exploresystmFactTitle}>Interesting fact</Text>
              <Text style={styles.exploresystmFactDescription}>
                {exploresystmInterestingFact}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={exploresystmHandleShareFact}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmShareButton}
                >
                  <Image
                    source={require('../../elements/images/volclertsyoshre.png')}
                  />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={exploresystmHandleToggleSaveFact}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#CF4E27', '#ED7635']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmSaveFactButton}
                >
                  <Image
                    source={
                      exploresystmIsCurrentFactSaved
                        ? require('../../elements/images/volclertsmsaved.png')
                        : require('../../elements/images/volclertsmasv.png')
                    }
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.exploresystmCardsGrid}>
          {exploresystmHomeCards.map(exploresystmCard => (
            <TouchableOpacity
              key={exploresystmCard.id}
              activeOpacity={0.85}
              style={styles.exploresystmMenuCardWrap}
              onPress={() =>
                exploresystmHandleOpenMenuCard(exploresystmCard.id)
              }
            >
              <LinearGradient
                colors={['#612F47', '#8A3844', '#B13D2F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.exploresystmMenuCard}
              >
                <View style={{}}>
                  <View style={styles.exploresystmMenuCardTopRow}>
                    <Image source={exploresystmCard.icon} />
                    <Text style={styles.exploresystmMenuCardTitle}>
                      {exploresystmCard.title}
                    </Text>
                  </View>
                </View>
                <View style={styles.exploresystmMenuCardFooter}>
                  <Text style={styles.exploresystmMenuCardDescription}>
                    {exploresystmCard.description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.exploresystmBottomActionWrap}
          onPress={exploresystmHandleExploreVolcanoes}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.exploresystmBottomActionButton}
          >
            <Text style={styles.exploresystmBottomActionText}>
              Explore Volcanoes
            </Text>
            <Image
              source={require('../../elements/images/volclertsmarkr.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsysthom;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 44,
    paddingHorizontal: 22,
  },
  exploresystmSettingsButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmSettingsIcon: {
    fontSize: 24,
  },
  exploresystmTopActionWrap: {
    marginTop: 20,
  },
  exploresystmTopActionButton: {
    borderRadius: 100,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmTopActionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  exploresystmFactCard: {
    marginTop: 18,
    borderRadius: 20,
  },
  exploresystmFactCardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploresystmFactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  exploresystmFactDescription: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#F6E8DF',
  },
  exploresystmShareButton: {
    marginTop: 18,
    minHeight: 40,
    width: 40,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmShareButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  exploresystmSaveFactButton: {
    marginTop: 10,
    minHeight: 40,
    width: 40,
    borderRadius: 100,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmCardsGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  exploresystmMenuCardWrap: {
    width: '48%',
  },
  exploresystmMenuCard: {
    minHeight: 152,
    borderRadius: 24,
    justifyContent: 'space-between',
  },
  exploresystmMenuCardFooter: {
    backgroundColor: '#0000004D',
    width: '100%',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    paddingVertical: 7,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  exploresystmMenuCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },
  exploresystmMenuCardIcon: {
    fontSize: 31,
  },
  exploresystmMenuCardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  exploresystmMenuCardDescription: {
    color: '#EDDDCF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 2,
  },
  exploresystmBottomActionWrap: {
    marginTop: 'auto',
    paddingTop: 24,
  },
  exploresystmBottomActionButton: {
    borderRadius: 999,
    minHeight: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  exploresystmBottomActionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});
