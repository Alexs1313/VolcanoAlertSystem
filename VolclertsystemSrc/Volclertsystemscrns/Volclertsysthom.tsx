// home screen

import Sound from 'react-native-sound';

import type { volcLertVolcanoType } from './Volclertsystlist';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Volclertsystlay from '../Volclertsystemcmpnt/Volclertsystlay';
import LinearGradient from 'react-native-linear-gradient';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../Volclertsystemstorg/volclertsystcntx';

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

const volcLertHomeVolcanoes: volcLertVolcanoType[] = [
  {
    id: 'etna',
    name: 'Mount Etna',
    status: 'active',
    location: 'Sicily, Italy',
    coordinates: '37.7510° N, 14.9934° E',
    height: '3329 m',
    description:
      'Mount Etna is one of the most active volcanoes in the world and the largest active volcano in Europe. It erupts frequently, producing lava flows, ash clouds, and volcanic gases.',
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
      'Mount Fuji is the highest mountain in Japan and an iconic stratovolcano. Its last eruption occurred in 1707, and it is still carefully monitored.',
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
      'Kilauea is one of the most active volcanoes on Earth. It is known for its continuous lava flows and lava lakes.',
    latitude: 19.421,
    longitude: -155.287,
    image: require('../../elements/images/volclertsyovolc2.png'),
  },
  {
    id: 'rainier',
    name: 'Mount Rainier',
    status: 'dormant',
    location: 'Washington, United States',
    coordinates: '46.8523° N, 121.7603° W',
    height: '4392 m',
    description:
      'Mount Rainier is a large stratovolcano in the Cascade Range and is considered one of the potentially dangerous volcanoes in the United States.',
    latitude: 46.8523,
    longitude: -121.7603,
    image: require('../../elements/images/volclertsyovolc6.png'),
  },
  {
    id: 'thielsen',
    name: 'Mount Thielsen',
    status: 'extinct',
    location: 'Oregon, United States',
    coordinates: '43.153° N, 122.056° W',
    height: '2799 m',
    description:
      'Mount Thielsen is an extinct volcano in the Cascade Range, known for its sharp peak formed by erosion.',
    latitude: 43.153,
    longitude: -122.056,
    image: require('../../elements/images/volclertsyovolc9.png'),
  },
];

const Volclertsysthom = () => {
  const navigation = useNavigation<any>();
  const volcLertInterestingFact = useMemo(() => {
    const volcLertRandomIndex = Math.floor(
      Math.random() * volcLertInterestingFacts.length,
    );
    return volcLertInterestingFacts[volcLertRandomIndex];
  }, []);
  const [volcLertBackgroundMusicIdx, setVolcLertBackgroundMusicIdx] =
    useState(0);
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
    }, []),
  );

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

  const volcLertHandleOpenRandomVolcano = () => {
    const volcLertRandomIndex = Math.floor(
      Math.random() * volcLertHomeVolcanoes.length,
    );
    const volcLertRandomVolcano = volcLertHomeVolcanoes[volcLertRandomIndex];
    if (!volcLertRandomVolcano) {
      Alert.alert('Error', 'Could not open random volcano details.');
      return;
    }

    navigation.navigate('Volclertsystdet', {
      volcLertVolcano: volcLertRandomVolcano,
    });
  };

  const volcLertHandleShareFact = () => {
    Share.share({
      message: volcLertInterestingFact,
      title: 'Interesting volcano fact',
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleExploreVolcanoes = () => {
    navigation.navigate('Volclertsymap' as never);
  };

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
        <TouchableOpacity
          style={styles.volcLertSettingsButton}
          onPress={volcLertHandleOpenSettings}
          activeOpacity={0.8}
        >
          <Image source={require('../../elements/images/volclertsysett.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.volcLertTopActionWrap}
          onPress={volcLertHandleOpenRandomVolcano}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.volcLertTopActionButton}
          >
            <Text style={styles.volcLertTopActionText}>
              Open a random volcano
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.volcLertFactCard}
        >
          <View style={styles.volcLertFactCardContent}>
            <Text style={styles.volcLertFactTitle}>Interesting fact</Text>
            <Text style={styles.volcLertFactDescription}>
              {volcLertInterestingFact}
            </Text>

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
                <Text style={styles.volcLertShareButtonText}>
                  Share the fact
                </Text>
                <Image
                  source={require('../../elements/images/volclertsyoshre.png')}
                />
              </LinearGradient>
            </TouchableOpacity>
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
  volcLertFactCard: {
    marginTop: 18,
    borderRadius: 20,
  },
  volcLertFactCardContent: {
    padding: 20,
  },
  volcLertFactTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  volcLertFactDescription: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#F6E8DF',
    textAlign: 'center',
  },
  volcLertShareButton: {
    marginTop: 18,
    minHeight: 40,
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
    paddingVertical: 10,
  },
  volcLertMenuCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  volcLertMenuCardIcon: {
    fontSize: 31,
  },
  volcLertMenuCardTitle: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    flex: 1,
  },
  volcLertMenuCardDescription: {
    color: '#EDDDCF',
    fontSize: 15,
    lineHeight: 22,
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
