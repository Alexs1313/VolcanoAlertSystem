import React, { useCallback, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';
import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

type exploresystmSavedVolcanoType = {
  id: string;
  name: string;
  status: 'active' | 'dormant' | 'extinct';
  location: string;
  coordinates: string;
  height: string;
  description: string;
  latitude: number;
  longitude: number;
  image: number;
};

const exploresystmSavedVolcanoesStorageKey = 'exploresystmSavedVolcanoIds';
const exploresystmSavedFactsStorageKey = 'exploresystmSavedFacts';

const exploresystmAllVolcanoes: exploresystmSavedVolcanoType[] = [
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
    id: 'kilauea',
    name: 'Kilauea',
    status: 'active',
    location: 'Hawaii, United States',
    coordinates: '19.421° N, 155.287° W',
    height: '1247 m',
    description:
      'Kilauea is one of the most active volcanoes on Earth and is known for its continuous lava flows.',
    latitude: 19.421,
    longitude: -155.287,
    image: require('../../elements/images/volclertsyovolc2.png'),
  },
  {
    id: 'sakurajima',
    name: 'Sakurajima',
    status: 'active',
    location: 'Kagoshima, Japan',
    coordinates: '31.585° N, 130.657° E',
    height: '1117 m',
    description:
      "Sakurajima is one of Japan's most active volcanoes and frequently produces explosive eruptions.",
    latitude: 31.585,
    longitude: 130.657,
    image: require('../../elements/images/volclertsyovolc3.png'),
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
    id: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    status: 'dormant',
    location: 'Tanzania, Africa',
    coordinates: '3.0674° S, 37.3556° E',
    height: '5895 m',
    description:
      'Mount Kilimanjaro is the tallest mountain in Africa and a dormant volcano.',
    latitude: -3.0674,
    longitude: 37.3556,
    image: require('../../elements/images/volclertsyovolc5.png'),
  },
  {
    id: 'rainier',
    name: 'Mount Rainier',
    status: 'dormant',
    location: 'Washington, United States',
    coordinates: '46.8523° N, 121.7603° W',
    height: '4392 m',
    description:
      'Mount Rainier is a large stratovolcano in the Cascade Range and is potentially dangerous.',
    latitude: 46.8523,
    longitude: -121.7603,
    image: require('../../elements/images/volclertsyovolc6.png'),
  },
  {
    id: 'kohala',
    name: 'Kohala',
    status: 'extinct',
    location: 'Hawaii, United States',
    coordinates: '20.13° N, 155.80° W',
    height: '1670 m',
    description:
      'Kohala is the oldest volcano on the island of Hawaii and is now considered extinct.',
    latitude: 20.13,
    longitude: -155.8,
    image: require('../../elements/images/volclertsyovolc7.png'),
  },
  {
    id: 'arthur-seat',
    name: "Arthur's Seat",
    status: 'extinct',
    location: 'Edinburgh, Scotland',
    coordinates: '55.944° N, 3.161° W',
    height: '251 m',
    description:
      "Arthur's Seat is an ancient extinct volcano in Holyrood Park in Edinburgh.",
    latitude: 55.944,
    longitude: -3.161,
    image: require('../../elements/images/volclertsyovolc8.png'),
  },
  {
    id: 'thielsen',
    name: 'Mount Thielsen',
    status: 'extinct',
    location: 'Oregon, United States',
    coordinates: '43.153° N, 122.056° W',
    height: '2799 m',
    description:
      'Mount Thielsen is an extinct volcano in the Cascade Range with a sharp eroded peak.',
    latitude: 43.153,
    longitude: -122.056,
    image: require('../../elements/images/volclertsyovolc9.png'),
  },
];

const Exploresystmsysavedplaces = () => {
  const navigation = useNavigation<any>();
  const [exploresystmSavedIds, setVolcLertSavedIds] = useState<string[]>([]);
  const [exploresystmSavedFacts, setVolcLertSavedFacts] = useState<string[]>(
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const exploresystmLoadSavedIds = async () => {
        try {
          const [exploresystmSavedIdsRaw, exploresystmSavedFactsRaw] =
            await Promise.all([
              AsyncStorage.getItem(exploresystmSavedVolcanoesStorageKey),
              AsyncStorage.getItem(exploresystmSavedFactsStorageKey),
            ]);
          const exploresystmParsedIds: string[] = exploresystmSavedIdsRaw
            ? JSON.parse(exploresystmSavedIdsRaw)
            : [];
          const exploresystmParsedFacts: string[] = exploresystmSavedFactsRaw
            ? JSON.parse(exploresystmSavedFactsRaw)
            : [];
          setVolcLertSavedIds(exploresystmParsedIds);
          setVolcLertSavedFacts(exploresystmParsedFacts);
        } catch {
          setVolcLertSavedIds([]);
          setVolcLertSavedFacts([]);
        }
      };

      exploresystmLoadSavedIds();
    }, []),
  );

  const exploresystmSavedVolcanoCards = useMemo(() => {
    return exploresystmAllVolcanoes.filter(exploresystmVolcano =>
      exploresystmSavedIds.includes(exploresystmVolcano.id),
    );
  }, [exploresystmSavedIds]);

  const exploresystmHasNoSavedAtAll =
    exploresystmSavedVolcanoCards.length === 0 &&
    exploresystmSavedFacts.length === 0;

  const exploresystmDisplayedVolcanoCards = useMemo(() => {
    if (exploresystmSavedVolcanoCards.length > 0) {
      return exploresystmSavedVolcanoCards.map(exploresystmVolcano => ({
        exploresystmVolcano,
        exploresystmIsDemo: false,
      }));
    }

    if (!exploresystmHasNoSavedAtAll) {
      return [];
    }

    const exploresystmDemoVolcano = exploresystmAllVolcanoes[0];
    if (!exploresystmDemoVolcano) {
      return [];
    }

    return [
      {
        exploresystmVolcano: exploresystmDemoVolcano,
        exploresystmIsDemo: true,
      },
    ];
  }, [exploresystmHasNoSavedAtAll, exploresystmSavedVolcanoCards]);

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs');
  };

  const exploresystmHandleOpenVolcanoDetails = (
    exploresystmVolcano: exploresystmSavedVolcanoType,
  ) => {
    navigation.navigate('Exploresystmsystdet', {
      exploresystmVolcano,
    });
  };

  const exploresystmHandleRemoveSavedVolcano = async (
    exploresystmVolcanoId: string,
  ) => {
    try {
      const exploresystmUpdatedIds = exploresystmSavedIds.filter(
        exploresystmSavedId => exploresystmSavedId !== exploresystmVolcanoId,
      );
      await AsyncStorage.setItem(
        exploresystmSavedVolcanoesStorageKey,
        JSON.stringify(exploresystmUpdatedIds),
      );
      setVolcLertSavedIds(exploresystmUpdatedIds);
    } catch {
      // Keep current state when storage update fails.
    }
  };

  const exploresystmHandleRemoveSavedFact = async (
    exploresystmFactValue: string,
  ) => {
    try {
      const exploresystmUpdatedFacts = exploresystmSavedFacts.filter(
        exploresystmSavedFact =>
          exploresystmSavedFact !== exploresystmFactValue,
      );
      await AsyncStorage.setItem(
        exploresystmSavedFactsStorageKey,
        JSON.stringify(exploresystmUpdatedFacts),
      );
      setVolcLertSavedFacts(exploresystmUpdatedFacts);
    } catch {
      // Keep current state when storage update fails.
    }
  };

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
          <Text style={styles.exploresystmTitle}>My Saved</Text>
          <TouchableOpacity
            onPress={exploresystmHandleOpenSettings}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsysett.png')}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.exploresystmScrollContent}
        >
          {exploresystmHasNoSavedAtAll && (
            <View style={styles.exploresystmEmptyWrap}>
              <Text style={styles.exploresystmEmptyText}>
                You have no saved yet.
              </Text>
            </View>
          )}

          {exploresystmDisplayedVolcanoCards.map(
            ({ exploresystmVolcano, exploresystmIsDemo }) => (
              <TouchableOpacity
                key={exploresystmVolcano.id}
                style={styles.exploresystmCardWrap}
                activeOpacity={0.9}
                onPress={() =>
                  exploresystmHandleOpenVolcanoDetails(exploresystmVolcano)
                }
              >
                <LinearGradient
                  colors={['#612F47', '#8A3844', '#B13D2F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmCard}
                >
                  <View style={styles.exploresystmCardHeader}>
                    <Text style={styles.exploresystmCardTitle}>
                      {exploresystmVolcano.name}
                    </Text>
                    {exploresystmIsDemo ? (
                      <View style={styles.exploresystmDemoBadge}>
                        <Text style={styles.exploresystmDemoBadgeText}>
                          Demo
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={exploresystmEvent => {
                          exploresystmEvent.stopPropagation();
                          exploresystmHandleRemoveSavedVolcano(
                            exploresystmVolcano.id,
                          );
                        }}
                        activeOpacity={0.85}
                      >
                        <Image
                          source={require('../../elements/images/volclertsmsaved.png')}
                          style={styles.exploresystmSavedIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.exploresystmCardBody}>
                    <Image
                      source={exploresystmVolcano.image}
                      style={styles.exploresystmCardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.exploresystmCardInfoWrap}>
                      <Text style={styles.exploresystmCardInfoText}>
                        <Text style={styles.exploresystmCardInfoBold}>
                          Location:{' '}
                        </Text>
                        {exploresystmVolcano.location}
                      </Text>
                      <Text style={styles.exploresystmCardInfoText}>
                        <Text style={styles.exploresystmCardInfoBold}>
                          Height:{' '}
                        </Text>
                        {exploresystmVolcano.height}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ),
          )}

          {exploresystmSavedFacts.length > 0 &&
            exploresystmSavedFacts.map(exploresystmSavedFact => (
              <LinearGradient
                key={exploresystmSavedFact}
                colors={['#612F47', '#8A3844', '#B13D2F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.exploresystmFactCard}
              >
                <View style={styles.exploresystmFactCardContent}>
                  <View style={styles.exploresystmFactCardHeader}>
                    <Text style={styles.exploresystmFactCardTitle}>
                      Interesting fact
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        exploresystmHandleRemoveSavedFact(exploresystmSavedFact)
                      }
                      activeOpacity={0.85}
                    >
                      <Image
                        source={require('../../elements/images/volclertsmsaved.png')}
                        style={styles.exploresystmSavedIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.exploresystmFactCardText}>
                    {exploresystmSavedFact}
                  </Text>
                </View>
              </LinearGradient>
            ))}
        </ScrollView>
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsysavedplaces;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 30,
  },
  exploresystmTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  exploresystmTopIconButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  exploresystmEmptyWrap: {
    marginTop: 30,
    alignItems: 'center',
  },
  exploresystmEmptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exploresystmEmptySubText: {
    marginTop: 6,
    color: '#F4E6DC',
    fontSize: 13,
    textAlign: 'center',
  },
  exploresystmCardWrap: {
    marginTop: 14,
  },
  exploresystmScrollContent: {
    paddingBottom: 30,
  },
  exploresystmCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  exploresystmCardHeader: {
    minHeight: 46,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exploresystmCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  exploresystmSavedIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  exploresystmDemoBadge: {
    paddingHorizontal: 10,
    minHeight: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CF4E27',
  },
  exploresystmDemoBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  exploresystmCardBody: {
    backgroundColor: '#0000004D',
    padding: 10,
  },
  exploresystmCardImage: {
    width: '100%',
    height: 130,
  },
  exploresystmCardInfoWrap: {
    marginTop: 10,
  },
  exploresystmCardInfoText: {
    color: '#F4E6DC',
    fontSize: 12,
    lineHeight: 22,
    marginTop: 2,
    fontWeight: '400',
  },
  exploresystmCardInfoBold: {
    color: '#fff',
    fontWeight: '700',
  },
  exploresystmSectionTitle: {
    marginTop: 20,
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  exploresystmFactCard: {
    marginTop: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  exploresystmFactCardContent: {
    padding: 14,
  },
  exploresystmFactCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  exploresystmFactCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  exploresystmFactCardText: {
    color: '#F4E6DC',
    fontSize: 14,
    lineHeight: 20,
  },
});
