import React, { useCallback, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

type volcLertSavedVolcanoType = {
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

const volcLertSavedVolcanoesStorageKey = 'volcLertSavedVolcanoIds';
const volcLertSavedFactsStorageKey = 'volcLertSavedFacts';

const volcLertAllVolcanoes: volcLertSavedVolcanoType[] = [
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

const Volclertsysavedplaces = () => {
  const navigation = useNavigation<any>();
  const [volcLertSavedIds, setVolcLertSavedIds] = useState<string[]>([]);
  const [volcLertSavedFacts, setVolcLertSavedFacts] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      const volcLertLoadSavedIds = async () => {
        try {
          const [volcLertSavedIdsRaw, volcLertSavedFactsRaw] =
            await Promise.all([
              AsyncStorage.getItem(volcLertSavedVolcanoesStorageKey),
              AsyncStorage.getItem(volcLertSavedFactsStorageKey),
            ]);
          const volcLertParsedIds: string[] = volcLertSavedIdsRaw
            ? JSON.parse(volcLertSavedIdsRaw)
            : [];
          const volcLertParsedFacts: string[] = volcLertSavedFactsRaw
            ? JSON.parse(volcLertSavedFactsRaw)
            : [];
          setVolcLertSavedIds(volcLertParsedIds);
          setVolcLertSavedFacts(volcLertParsedFacts);
        } catch {
          setVolcLertSavedIds([]);
          setVolcLertSavedFacts([]);
        }
      };

      volcLertLoadSavedIds();
    }, []),
  );

  const volcLertSavedVolcanoCards = useMemo(() => {
    return volcLertAllVolcanoes.filter(volcLertVolcano =>
      volcLertSavedIds.includes(volcLertVolcano.id),
    );
  }, [volcLertSavedIds]);

  const volcLertHasNoSavedAtAll =
    volcLertSavedVolcanoCards.length === 0 && volcLertSavedFacts.length === 0;

  const volcLertDisplayedVolcanoCards = useMemo(() => {
    if (volcLertSavedVolcanoCards.length > 0) {
      return volcLertSavedVolcanoCards.map(volcLertVolcano => ({
        volcLertVolcano,
        volcLertIsDemo: false,
      }));
    }

    if (!volcLertHasNoSavedAtAll) {
      return [];
    }

    const volcLertDemoVolcano = volcLertAllVolcanoes[0];
    if (!volcLertDemoVolcano) {
      return [];
    }

    return [{ volcLertVolcano: volcLertDemoVolcano, volcLertIsDemo: true }];
  }, [volcLertHasNoSavedAtAll, volcLertSavedVolcanoCards]);

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs');
  };

  const volcLertHandleOpenVolcanoDetails = (
    volcLertVolcano: volcLertSavedVolcanoType,
  ) => {
    navigation.navigate('Volclertsystdet', {
      volcLertVolcano,
    });
  };

  const volcLertHandleRemoveSavedVolcano = async (
    volcLertVolcanoId: string,
  ) => {
    try {
      const volcLertUpdatedIds = volcLertSavedIds.filter(
        volcLertSavedId => volcLertSavedId !== volcLertVolcanoId,
      );
      await AsyncStorage.setItem(
        volcLertSavedVolcanoesStorageKey,
        JSON.stringify(volcLertUpdatedIds),
      );
      setVolcLertSavedIds(volcLertUpdatedIds);
    } catch {
      // Keep current state when storage update fails.
    }
  };

  const volcLertHandleRemoveSavedFact = async (volcLertFactValue: string) => {
    try {
      const volcLertUpdatedFacts = volcLertSavedFacts.filter(
        volcLertSavedFact => volcLertSavedFact !== volcLertFactValue,
      );
      await AsyncStorage.setItem(
        volcLertSavedFactsStorageKey,
        JSON.stringify(volcLertUpdatedFacts),
      );
      setVolcLertSavedFacts(volcLertUpdatedFacts);
    } catch {
      // Keep current state when storage update fails.
    }
  };

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
          <Text style={styles.volcLertTitle}>My Saved</Text>
          <TouchableOpacity
            onPress={volcLertHandleOpenSettings}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../elements/images/volclertsysett.png')}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.volcLertScrollContent}
        >
          {volcLertHasNoSavedAtAll && (
            <View style={styles.volcLertEmptyWrap}>
              <Text style={styles.volcLertEmptyText}>
                You have no saved yet.
              </Text>
            </View>
          )}

          {volcLertDisplayedVolcanoCards.map(
            ({ volcLertVolcano, volcLertIsDemo }) => (
              <TouchableOpacity
                key={volcLertVolcano.id}
                style={styles.volcLertCardWrap}
                activeOpacity={0.9}
                onPress={() =>
                  volcLertHandleOpenVolcanoDetails(volcLertVolcano)
                }
              >
                <LinearGradient
                  colors={['#612F47', '#8A3844', '#B13D2F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertCard}
                >
                  <View style={styles.volcLertCardHeader}>
                    <Text style={styles.volcLertCardTitle}>
                      {volcLertVolcano.name}
                    </Text>
                    {volcLertIsDemo ? (
                      <View style={styles.volcLertDemoBadge}>
                        <Text style={styles.volcLertDemoBadgeText}>Demo</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={volcLertEvent => {
                          volcLertEvent.stopPropagation();
                          volcLertHandleRemoveSavedVolcano(volcLertVolcano.id);
                        }}
                        activeOpacity={0.85}
                      >
                        <Image
                          source={require('../../elements/images/volclertsmsaved.png')}
                          style={styles.volcLertSavedIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.volcLertCardBody}>
                    <Image
                      source={volcLertVolcano.image}
                      style={styles.volcLertCardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.volcLertCardInfoWrap}>
                      <Text style={styles.volcLertCardInfoText}>
                        <Text style={styles.volcLertCardInfoBold}>
                          Location:{' '}
                        </Text>
                        {volcLertVolcano.location}
                      </Text>
                      <Text style={styles.volcLertCardInfoText}>
                        <Text style={styles.volcLertCardInfoBold}>
                          Height:{' '}
                        </Text>
                        {volcLertVolcano.height}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ),
          )}

          {volcLertSavedFacts.length > 0 &&
            volcLertSavedFacts.map(volcLertSavedFact => (
              <LinearGradient
                key={volcLertSavedFact}
                colors={['#612F47', '#8A3844', '#B13D2F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.volcLertFactCard}
              >
                <View style={styles.volcLertFactCardContent}>
                  <View style={styles.volcLertFactCardHeader}>
                    <Text style={styles.volcLertFactCardTitle}>
                      Interesting fact
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        volcLertHandleRemoveSavedFact(volcLertSavedFact)
                      }
                      activeOpacity={0.85}
                    >
                      <Image
                        source={require('../../elements/images/volclertsmsaved.png')}
                        style={styles.volcLertSavedIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.volcLertFactCardText}>
                    {volcLertSavedFact}
                  </Text>
                </View>
              </LinearGradient>
            ))}
        </ScrollView>
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsysavedplaces;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 22,
    paddingBottom: 30,
  },
  volcLertTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  volcLertTopIconButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  volcLertEmptyWrap: {
    marginTop: 30,
    alignItems: 'center',
  },
  volcLertEmptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  volcLertEmptySubText: {
    marginTop: 6,
    color: '#F4E6DC',
    fontSize: 13,
    textAlign: 'center',
  },
  volcLertCardWrap: {
    marginTop: 14,
  },
  volcLertScrollContent: {
    paddingBottom: 30,
  },
  volcLertCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  volcLertCardHeader: {
    minHeight: 46,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volcLertCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  volcLertSavedIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  volcLertDemoBadge: {
    paddingHorizontal: 10,
    minHeight: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CF4E27',
  },
  volcLertDemoBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  volcLertCardBody: {
    backgroundColor: '#0000004D',
    padding: 10,
  },
  volcLertCardImage: {
    width: '100%',
    height: 130,
  },
  volcLertCardInfoWrap: {
    marginTop: 10,
  },
  volcLertCardInfoText: {
    color: '#F4E6DC',
    fontSize: 12,
    lineHeight: 22,
    marginTop: 2,
    fontWeight: '400',
  },
  volcLertCardInfoBold: {
    color: '#fff',
    fontWeight: '700',
  },
  volcLertSectionTitle: {
    marginTop: 20,
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  volcLertFactCard: {
    marginTop: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  volcLertFactCardContent: {
    padding: 14,
  },
  volcLertFactCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  volcLertFactCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  volcLertFactCardText: {
    color: '#F4E6DC',
    fontSize: 14,
    lineHeight: 20,
  },
});
