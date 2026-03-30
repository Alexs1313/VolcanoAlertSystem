// cards list

import LinearGradient from 'react-native-linear-gradient';

import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

type volcLertVolcanoStatus = 'active' | 'dormant' | 'extinct';
type volcLertFilterStatus = volcLertVolcanoStatus | 'all';

export type volcLertVolcanoType = {
  id: string;
  name: string;
  status: volcLertVolcanoStatus;
  location: string;
  coordinates: string;
  height: string;
  description: string;
  latitude: number;
  longitude: number;
  image: number;
};

const volcLertVolcanoes: volcLertVolcanoType[] = [
  {
    id: 'etna',
    name: 'Mount Etna',
    status: 'active',
    location: 'Sicily, Italy',
    coordinates: '37.7510° N, 14.9934° E',
    height: '3329 m',
    description:
      'Mount Etna is one of the most active volcanoes in the world and the largest active volcano in Europe. It erupts frequently, producing lava flows, ash clouds, and volcanic gases. Due to its activity, nearby towns are closely monitored by scientists.',
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
      "Kilauea is one of the most active volcanoes on Earth. It is known for its continuous lava flows and lava lakes. The volcano is part of Hawai'i Volcanoes National Park and has been erupting frequently in recent decades.",
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
      "Sakurajima is one of Japan's most active volcanoes. It frequently produces explosive eruptions that send ash high into the atmosphere. The nearby city of Kagoshima is located only a few kilometers away.",
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
      'Mount Fuji is the highest mountain in Japan and an iconic stratovolcano. Its last eruption occurred in 1707. Although it is currently dormant, scientists still monitor it because it may erupt again in the future.',
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
      'Mount Kilimanjaro is the tallest mountain in Africa and a dormant volcano. It consists of three volcanic cones: Kibo, Mawenzi, and Shira. Although it has not erupted for thousands of years, geothermal activity still exists beneath the surface.',
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
      'Mount Rainier is a large stratovolcano located in the Cascade Range. It last erupted about 1,000 years ago. Because of its glaciers and nearby population, it is considered one of the most potentially dangerous volcanoes in the United States.',
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
      'Kohala is the oldest volcano on the island of Hawaii. It last erupted more than 60,000 years ago and is now considered extinct. Over time, erosion has shaped its valleys and cliffs.',
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
      "Arthur's Seat is an ancient extinct volcano located in Holyrood Park in Edinburgh. It erupted about 340 million years ago. Today it is a popular hiking destination with panoramic views of the city.",
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
      'Mount Thielsen is an extinct volcano in the Cascade Range. Its sharp peak was formed by erosion over thousands of years. Because lightning strikes it frequently, it is sometimes called the "Lightning Rod of the Cascades".',
    latitude: 43.153,
    longitude: -122.056,
    image: require('../../elements/images/volclertsyovolc9.png'),
  },
];

const volcLertFilterOptions: { id: volcLertFilterStatus; label: string }[] = [
  { id: 'active', label: 'Active Volcanoes' },
  { id: 'dormant', label: 'Dormant Volcanoes' },
  { id: 'extinct', label: 'Extinct Volcanoes' },
  { id: 'all', label: 'All' },
];

const volcLertFilterTitles: Record<volcLertFilterStatus, string> = {
  active: '🌋 Active Volcanoes',
  dormant: '🌋 Dormant Volcanoes',
  extinct: '🌋 Extinct Volcanoes',
  all: '🌋 All Volcanoes',
};

const volcLertSavedVolcanoesStorageKey = 'volcLertSavedVolcanoIds';

const Volclertsystlist = () => {
  const navigation = useNavigation<any>();
  const [volcLertSearchValue, setVolcLertSearchValue] = useState('');
  const [volcLertSelectedFilter, setVolcLertSelectedFilter] =
    useState<volcLertFilterStatus>('all');
  const [volcLertIsFilterOpen, setVolcLertIsFilterOpen] = useState(false);
  const [volcLertSavedVolcanoIds, setVolcLertSavedVolcanoIds] = useState<
    string[]
  >([]);

  const volcLertFilteredVolcanoes = useMemo(() => {
    return volcLertVolcanoes.filter(volcLertVolcano => {
      const volcLertMatchesStatus =
        volcLertSelectedFilter === 'all' ||
        volcLertVolcano.status === volcLertSelectedFilter;
      const volcLertMatchesSearch = volcLertVolcano.name
        .toLowerCase()
        .includes(volcLertSearchValue.trim().toLowerCase());
      return volcLertMatchesStatus && volcLertMatchesSearch;
    });
  }, [volcLertSearchValue, volcLertSelectedFilter]);

  const volcLertLoadSavedVolcanoIds = useCallback(async () => {
    try {
      const volcLertSavedIdsRaw = await AsyncStorage.getItem(
        volcLertSavedVolcanoesStorageKey,
      );
      const volcLertSavedIds: string[] = volcLertSavedIdsRaw
        ? JSON.parse(volcLertSavedIdsRaw)
        : [];
      setVolcLertSavedVolcanoIds(volcLertSavedIds);
    } catch {
      setVolcLertSavedVolcanoIds([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      volcLertLoadSavedVolcanoIds();
    }, [volcLertLoadSavedVolcanoIds]),
  );

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleToggleFilter = () => {
    setVolcLertIsFilterOpen(volcLertPrevState => !volcLertPrevState);
  };

  const volcLertHandleSelectFilter = (volcLertFilter: volcLertFilterStatus) => {
    setVolcLertSelectedFilter(volcLertFilter);
    setVolcLertIsFilterOpen(false);
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleOpenVolcanoDetails = (
    volcLertVolcano: volcLertVolcanoType,
  ) => {
    navigation.navigate(
      'Volclertsystdet' as never,
      { volcLertVolcano } as never,
    );
  };

  const volcLertHandleOpenRandomVolcano = () => {
    if (volcLertFilteredVolcanoes.length === 0) {
      return;
    }

    const volcLertRandomIndex = Math.floor(
      Math.random() * volcLertFilteredVolcanoes.length,
    );
    const volcLertRandomVolcano =
      volcLertFilteredVolcanoes[volcLertRandomIndex];
    volcLertHandleOpenVolcanoDetails(volcLertRandomVolcano);
  };

  return (
    <>
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

            <View style={styles.volcLertTopRightActions}>
              <TouchableOpacity
                style={styles.volcLertTopSmallRoundButton}
                onPress={volcLertHandleToggleFilter}
                activeOpacity={0.8}
              >
                <Image
                  source={require('../../elements/images/volclertsyomenu.png')}
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
          </View>

          {volcLertIsFilterOpen && (
            <View style={styles.volcLertFilterMenu}>
              {volcLertFilterOptions.map(volcLertOption => (
                <TouchableOpacity
                  key={volcLertOption.id}
                  style={styles.volcLertFilterMenuItem}
                  activeOpacity={0.85}
                  onPress={() => volcLertHandleSelectFilter(volcLertOption.id)}
                >
                  <Text style={styles.volcLertFilterMenuItemText}>
                    {volcLertOption.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.volcLertSearchWrap}>
            <Image
              source={require('../../elements/images/volclertsyoserc.png')}
            />
            <TextInput
              value={volcLertSearchValue}
              onChangeText={setVolcLertSearchValue}
              placeholder="Find a volcano by name"
              placeholderTextColor="#E8D8CEB0"
              style={styles.volcLertSearchInput}
            />
          </View>

          {volcLertFilteredVolcanoes.length === 0 ? (
            <View style={styles.volcLertEmptyWrap}>
              <Text style={styles.volcLertEmptyText}>No volcanoes found.</Text>
            </View>
          ) : (
            volcLertFilteredVolcanoes.map(volcLertVolcano => (
              <TouchableOpacity
                key={volcLertVolcano.id}
                activeOpacity={0.9}
                onPress={() =>
                  volcLertHandleOpenVolcanoDetails(volcLertVolcano)
                }
                style={styles.volcLertCardWrap}
              >
                <LinearGradient
                  colors={['#612F47', '#8A3844', '#B13D2F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertCard}
                >
                  <View>
                    <View style={styles.volcLertCardTitleRow}>
                      <Text style={styles.volcLertCardTitle}>
                        {volcLertVolcano.name}
                      </Text>

                      {volcLertSavedVolcanoIds.includes(volcLertVolcano.id) && (
                        <Image
                          source={require('../../elements/images/volclertsmsaved.png')}
                          style={styles.volcLertSavedIcon}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        backgroundColor: '#0000004D',
                        padding: 10,
                      }}
                    >
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
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          )}
        </View>
      </Volclertsystlay>
      <TouchableOpacity
        style={styles.volcLertRandomButtonWrap}
        activeOpacity={0.85}
        onPress={volcLertHandleOpenRandomVolcano}
      >
        <LinearGradient
          colors={['#CF4E27', '#ED7635']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.volcLertRandomButton}
        >
          <Text style={styles.volcLertRandomButtonText}>
            Open a random volcano
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default Volclertsystlist;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 110,
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
  volcLertTopRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  volcLertTopSmallRoundButton: {
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: '#D4572E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertFilterIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  volcLertFilterMenu: {
    position: 'absolute',
    top: 86,
    right: 75,
    width: 190,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#D4572E',
    zIndex: 10,
  },
  volcLertFilterMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  volcLertFilterMenuItemText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  volcLertSearchWrap: {
    marginTop: 18,
    minHeight: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)',
    backgroundColor: '#00000099',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  volcLertSearchIcon: {
    color: '#fff',
    fontSize: 20,
  },
  volcLertSearchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  volcLertSectionTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
  },
  volcLertRandomButtonWrap: {
    position: 'absolute',
    bottom: 35,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  volcLertRandomButton: {
    minHeight: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertRandomButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  volcLertEmptyWrap: {
    marginTop: 24,
    alignItems: 'center',
  },
  volcLertEmptyText: {
    color: '#fff',
    fontSize: 16,
  },
  volcLertCardWrap: {
    marginTop: 14,
  },
  volcLertCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  volcLertCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 12,
    marginBottom: 15,
  },
  volcLertCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  volcLertSavedIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15,
  },
  volcLertCardImage: {
    width: '100%',
    height: 130,
  },
  volcLertCardInfoWrap: {
    marginTop: 10,
    marginBottom: 4,
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
});
/*
import React, { useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Volclertsystlay from '../Volclertsystemcmpnt/Volclertsystlay';

type volcLertVolcanoStatus = 'active' | 'dormant' | 'extinct';
type volcLertFilterStatus = volcLertVolcanoStatus | 'all';

export type volcLertVolcanoType = {
  id: string;
  name: string;
  status: volcLertVolcanoStatus;
  location: string;
  coordinates: string;
  height: string;
  description: string;
  latitude: number;
  longitude: number;
  image: number;
};

const volcLertVolcanoes: volcLertVolcanoType[] = [
  {
    id: 'etna',
    name: 'Mount Etna',
    status: 'active',
    location: 'Sicily, Italy',
    coordinates: '37.7510° N, 14.9934° E',
    height: '3329 m',
    description:
      'Mount Etna is one of the most active volcanoes in the world and the largest active volcano in Europe. It erupts frequently, producing lava flows, ash clouds, and volcanic gases. Due to its activity, nearby towns are closely monitored by scientists.',
    latitude: 37.751,
    longitude: 14.9934,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'kilauea',
    name: 'Kilauea',
    status: 'active',
    location: 'Hawaii, United States',
    coordinates: '19.421° N, 155.287° W',
    height: '1247 m',
    description:
      "Kilauea is one of the most active volcanoes on Earth. It is known for its continuous lava flows and lava lakes. The volcano is part of Hawai'i Volcanoes National Park and has been erupting frequently in recent decades.",
    latitude: 19.421,
    longitude: -155.287,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'sakurajima',
    name: 'Sakurajima',
    status: 'active',
    location: 'Kagoshima, Japan',
    coordinates: '31.585° N, 130.657° E',
    height: '1117 m',
    description:
      "Sakurajima is one of Japan's most active volcanoes. It frequently produces explosive eruptions that send ash high into the atmosphere. The nearby city of Kagoshima is located only a few kilometers away.",
    latitude: 31.585,
    longitude: 130.657,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'fuji',
    name: 'Mount Fuji',
    status: 'dormant',
    location: 'Honshu, Japan',
    coordinates: '35.3606° N, 138.7274° E',
    height: '3776 m',
    description:
      'Mount Fuji is the highest mountain in Japan and an iconic stratovolcano. Its last eruption occurred in 1707. Although it is currently dormant, scientists still monitor it because it may erupt again in the future.',
    latitude: 35.3606,
    longitude: 138.7274,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    status: 'dormant',
    location: 'Tanzania, Africa',
    coordinates: '3.0674° S, 37.3556° E',
    height: '5895 m',
    description:
      'Mount Kilimanjaro is the tallest mountain in Africa and a dormant volcano. It consists of three volcanic cones: Kibo, Mawenzi, and Shira. Although it has not erupted for thousands of years, geothermal activity still exists beneath the surface.',
    latitude: -3.0674,
    longitude: 37.3556,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'rainier',
    name: 'Mount Rainier',
    status: 'dormant',
    location: 'Washington, United States',
    coordinates: '46.8523° N, 121.7603° W',
    height: '4392 m',
    description:
      'Mount Rainier is a large stratovolcano located in the Cascade Range. It last erupted about 1,000 years ago. Because of its glaciers and nearby population, it is considered one of the most potentially dangerous volcanoes in the United States.',
    latitude: 46.8523,
    longitude: -121.7603,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'kohala',
    name: 'Kohala',
    status: 'extinct',
    location: 'Hawaii, United States',
    coordinates: '20.13° N, 155.80° W',
    height: '1670 m',
    description:
      'Kohala is the oldest volcano on the island of Hawaii. It last erupted more than 60,000 years ago and is now considered extinct. Over time, erosion has shaped its valleys and cliffs.',
    latitude: 20.13,
    longitude: -155.8,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'arthur-seat',
    name: "Arthur's Seat",
    status: 'extinct',
    location: 'Edinburgh, Scotland',
    coordinates: '55.944° N, 3.161° W',
    height: '251 m',
    description:
      "Arthur's Seat is an ancient extinct volcano located in Holyrood Park in Edinburgh. It erupted about 340 million years ago. Today it is a popular hiking destination with panoramic views of the city.",
    latitude: 55.944,
    longitude: -3.161,
    image: require('../../elements/images/volclertsyon5.png'),
  },
  {
    id: 'thielsen',
    name: 'Mount Thielsen',
    status: 'extinct',
    location: 'Oregon, United States',
    coordinates: '43.153° N, 122.056° W',
    height: '2799 m',
    description:
      'Mount Thielsen is an extinct volcano in the Cascade Range. Its sharp peak was formed by erosion over thousands of years. Because lightning strikes it frequently, it is sometimes called the "Lightning Rod of the Cascades".',
    latitude: 43.153,
    longitude: -122.056,
    image: require('../../elements/images/volclertsyon5.png'),
  },
];

const volcLertFilterOptions: { id: volcLertFilterStatus; label: string }[] = [
  { id: 'active', label: 'Active Volcanoes' },
  { id: 'dormant', label: 'Dormant Volcanoes' },
  { id: 'extinct', label: 'Extinct Volcanoes' },
  { id: 'all', label: 'All' },
];

const volcLertFilterTitles: Record<volcLertFilterStatus, string> = {
  active: '🌋 Active Volcanoes',
  dormant: '🌋 Dormant Volcanoes',
  extinct: '🌋 Extinct Volcanoes',
  all: '🌋 All Volcanoes',
};

const Volclertsystlist = () => {
  const navigation = useNavigation();
  const [volcLertSearchValue, setVolcLertSearchValue] = useState('');
  const [volcLertSelectedFilter, setVolcLertSelectedFilter] =
    useState<volcLertFilterStatus>('all');
  const [volcLertIsFilterOpen, setVolcLertIsFilterOpen] = useState(false);

  const volcLertFilteredVolcanoes = useMemo(() => {
    return volcLertVolcanoes.filter(volcLertVolcano => {
      const volcLertMatchesStatus =
        volcLertSelectedFilter === 'all' ||
        volcLertVolcano.status === volcLertSelectedFilter;
      const volcLertMatchesSearch = volcLertVolcano.name
        .toLowerCase()
        .includes(volcLertSearchValue.trim().toLowerCase());
      return volcLertMatchesStatus && volcLertMatchesSearch;
    });
  }, [volcLertSearchValue, volcLertSelectedFilter]);

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleToggleFilter = () => {
    setVolcLertIsFilterOpen(volcLertPrevState => !volcLertPrevState);
  };

  const volcLertHandleSelectFilter = (volcLertFilter: volcLertFilterStatus) => {
    setVolcLertSelectedFilter(volcLertFilter);
    setVolcLertIsFilterOpen(false);
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleOpenVolcanoDetails = (
    volcLertVolcano: volcLertVolcanoType,
  ) => {
    navigation.navigate(
      'Volclertsystdet' as never,
      { volcLertVolcano } as never,
    );
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
            <Text style={styles.volcLertBackIcon}>↩</Text>
          </TouchableOpacity>

          <View style={styles.volcLertTopRightActions}>
            <TouchableOpacity
              style={styles.volcLertTopSmallRoundButton}
              onPress={volcLertHandleToggleFilter}
              activeOpacity={0.8}
            >
              <Text style={styles.volcLertFilterIcon}>☰</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={volcLertHandleOpenSettings} activeOpacity={0.8}>
              <Image source={require('../../elements/images/volclertsysett.png')} />
            </TouchableOpacity>
          </View>
        </View>

        {volcLertIsFilterOpen && (
          <View style={styles.volcLertFilterMenu}>
            {volcLertFilterOptions.map(volcLertOption => (
              <TouchableOpacity
                key={volcLertOption.id}
                style={styles.volcLertFilterMenuItem}
                activeOpacity={0.85}
                onPress={() => volcLertHandleSelectFilter(volcLertOption.id)}
              >
                <Text style={styles.volcLertFilterMenuItemText}>
                  {volcLertOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.volcLertSearchWrap}>
          <Text style={styles.volcLertSearchIcon}>⌕</Text>
          <TextInput
            value={volcLertSearchValue}
            onChangeText={setVolcLertSearchValue}
            placeholder="Find a volcano by name"
            placeholderTextColor="#E8D8CEB0"
            style={styles.volcLertSearchInput}
          />
        </View>

        <Text style={styles.volcLertSectionTitle}>
          {volcLertFilterTitles[volcLertSelectedFilter]}
        </Text>

        {volcLertFilteredVolcanoes.length === 0 ? (
          <View style={styles.volcLertEmptyWrap}>
            <Text style={styles.volcLertEmptyText}>No volcanoes found.</Text>
          </View>
        ) : (
          volcLertFilteredVolcanoes.map(volcLertVolcano => (
            <TouchableOpacity
              key={volcLertVolcano.id}
              activeOpacity={0.9}
              onPress={() => volcLertHandleOpenVolcanoDetails(volcLertVolcano)}
              style={styles.volcLertCardWrap}
            >
              <LinearGradient
                colors={['#612F47', '#8A3844', '#B13D2F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.volcLertCard}
              >
                <Text style={styles.volcLertCardTitle}>{volcLertVolcano.name}</Text>

                <Image
                  source={volcLertVolcano.image}
                  style={styles.volcLertCardImage}
                  resizeMode="cover"
                />

                <View style={styles.volcLertCardInfoWrap}>
                  <Text style={styles.volcLertCardInfoText}>
                    <Text style={styles.volcLertCardInfoBold}>Location: </Text>
                    {volcLertVolcano.location}
                  </Text>
                  <Text style={styles.volcLertCardInfoText}>
                    <Text style={styles.volcLertCardInfoBold}>Height: </Text>
                    {volcLertVolcano.height}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))
        )}
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsystlist;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 40,
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
  volcLertTopRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  volcLertTopSmallRoundButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4572E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertFilterIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  volcLertFilterMenu: {
    position: 'absolute',
    top: 86,
    right: 72,
    width: 190,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#D4572E',
    zIndex: 10,
  },
  volcLertFilterMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  volcLertFilterMenuItemText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  volcLertSearchWrap: {
    marginTop: 18,
    minHeight: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: '#00000033',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  volcLertSearchIcon: {
    color: '#fff',
    fontSize: 20,
  },
  volcLertSearchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  volcLertSectionTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
  },
  volcLertEmptyWrap: {
    marginTop: 24,
    alignItems: 'center',
  },
  volcLertEmptyText: {
    color: '#fff',
    fontSize: 16,
  },
  volcLertCardWrap: {
    marginTop: 14,
  },
  volcLertCard: {
    borderRadius: 24,
    padding: 10,
    overflow: 'hidden',
  },
  volcLertCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  volcLertCardImage: {
    width: '100%',
    height: 190,
  },
  volcLertCardInfoWrap: {
    marginTop: 10,
    marginBottom: 4,
  },
  volcLertCardInfoText: {
    color: '#F4E6DC',
    fontSize: 28,
    lineHeight: 28,
    marginTop: 2,
  },
  volcLertCardInfoBold: {
    color: '#fff',
    fontWeight: '700',
  },
});
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Volclertsystlay from '../Volclertsystemcmpnt/Volclertsystlay';

type volcLertVolcanoStatus = 'active' | 'dormant' | 'extinct';
type volcLertFilterStatus = volcLertVolcanoStatus | 'all';

type volcLertVolcanoType = {
  id: string;
  name: string;
  status: volcLertVolcanoStatus;
  location: string;
  coordinates: string;
  height: string;
  description: string;
  image: number;
};

const volcLertVolcanoes: volcLertVolcanoType[] = [
  {
    id: 'etna',
    name: 'Mount Etna',
    status: 'active',
    location: 'Sicily, Italy',
    coordinates: '37.7510° N, 14.9934° E',
    height: '3329 m',
    description:
      'Mount Etna is one of the most active volcanoes in the world and the largest active volcano in Europe. It erupts frequently, producing lava flows, ash clouds, and volcanic gases. Due to its activity, nearby towns are closely monitored by scientists.',
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
      "Kilauea is one of the most active volcanoes on Earth. It is known for its continuous lava flows and lava lakes. The volcano is part of Hawai'i Volcanoes National Park and has been erupting frequently in recent decades.",
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
      "Sakurajima is one of Japan's most active volcanoes. It frequently produces explosive eruptions that send ash high into the atmosphere. The nearby city of Kagoshima is located only a few kilometers away.",
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
      'Mount Fuji is the highest mountain in Japan and an iconic stratovolcano. Its last eruption occurred in 1707. Although it is currently dormant, scientists still monitor it because it may erupt again in the future.',
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
      'Mount Kilimanjaro is the tallest mountain in Africa and a dormant volcano. It consists of three volcanic cones: Kibo, Mawenzi, and Shira. Although it has not erupted for thousands of years, geothermal activity still exists beneath the surface.',
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
      'Mount Rainier is a large stratovolcano located in the Cascade Range. It last erupted about 1,000 years ago. Because of its glaciers and nearby population, it is considered one of the most potentially dangerous volcanoes in the United States.',
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
      'Kohala is the oldest volcano on the island of Hawaii. It last erupted more than 60,000 years ago and is now considered extinct. Over time, erosion has shaped its valleys and cliffs.',
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
      "Arthur's Seat is an ancient extinct volcano located in Holyrood Park in Edinburgh. It erupted about 340 million years ago. Today it is a popular hiking destination with panoramic views of the city.",
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
      'Mount Thielsen is an extinct volcano in the Cascade Range. Its sharp peak was formed by erosion over thousands of years. Because lightning strikes it frequently, it is sometimes called the "Lightning Rod of the Cascades".',
    image: require('../../elements/images/volclertsyovolc9.png'),
  },
];

const volcLertFilterOptions: { id: volcLertFilterStatus; label: string }[] = [
  { id: 'active', label: 'Active Volcanoes' },
  { id: 'dormant', label: 'Dormant Volcanoes' },
  { id: 'extinct', label: 'Extinct Volcanoes' },
  { id: 'all', label: 'All' },
];

const volcLertFilterTitles: Record<volcLertFilterStatus, string> = {
  active: '🌋 Active Volcanoes',
  dormant: '🌋 Dormant Volcanoes',
  extinct: '🌋 Extinct Volcanoes',
  all: '🌋 All Volcanoes',
};

const Volclertsystlist = () => {
  const navigation = useNavigation();
  const [volcLertSearchValue, setVolcLertSearchValue] = useState('');
  const [volcLertSelectedFilter, setVolcLertSelectedFilter] =
    useState<volcLertFilterStatus>('all');
  const [volcLertIsFilterOpen, setVolcLertIsFilterOpen] = useState(false);
  const [volcLertExpandedVolcanoId, setVolcLertExpandedVolcanoId] = useState<
    string | null
  >(null);

  const volcLertFilteredVolcanoes = useMemo(() => {
    return volcLertVolcanoes.filter(volcLertVolcano => {
      const volcLertMatchesStatus =
        volcLertSelectedFilter === 'all' ||
        volcLertVolcano.status === volcLertSelectedFilter;
      const volcLertMatchesSearch = volcLertVolcano.name
        .toLowerCase()
        .includes(volcLertSearchValue.trim().toLowerCase());
      return volcLertMatchesStatus && volcLertMatchesSearch;
    });
  }, [volcLertSearchValue, volcLertSelectedFilter]);

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleToggleFilter = () => {
    setVolcLertIsFilterOpen(volcLertPrevState => !volcLertPrevState);
  };

  const volcLertHandleSelectFilter = (volcLertFilter: volcLertFilterStatus) => {
    setVolcLertSelectedFilter(volcLertFilter);
    setVolcLertIsFilterOpen(false);
    setVolcLertExpandedVolcanoId(null);
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleCardPress = (volcLertVolcanoId: string) => {
    setVolcLertExpandedVolcanoId(volcLertPrevId =>
      volcLertPrevId === volcLertVolcanoId ? null : volcLertVolcanoId,
    );
  };

  const volcLertHandleOpenMap = (volcLertVolcano: volcLertVolcanoType) => {
    const volcLertMapQuery = encodeURIComponent(
      `${volcLertVolcano.name} ${volcLertVolcano.coordinates}`,
    );
    const volcLertMapUrl = `https://www.google.com/maps/search/?api=1&query=${volcLertMapQuery}`;

    Linking.openURL(volcLertMapUrl).catch(() => {
      Alert.alert('Error', 'Could not open map.');
    });
  };

  const volcLertHandleShare = (volcLertVolcano: volcLertVolcanoType) => {
    Share.share({
      title: volcLertVolcano.name,
      message: `${volcLertVolcano.name}\nLocation: ${volcLertVolcano.location}\nCoordinates: ${volcLertVolcano.coordinates}\nHeight: ${volcLertVolcano.height}\n\n${volcLertVolcano.description}`,
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
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
            <Text style={styles.volcLertBackIcon}>↩</Text>
          </TouchableOpacity>

          <View style={styles.volcLertTopRightActions}>
            <TouchableOpacity
              style={styles.volcLertTopSmallRoundButton}
              onPress={volcLertHandleToggleFilter}
              activeOpacity={0.8}
            >
              <Text style={styles.volcLertFilterIcon}>☰</Text>
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
        </View>

        {volcLertIsFilterOpen && (
          <View style={styles.volcLertFilterMenu}>
            {volcLertFilterOptions.map(volcLertOption => (
              <TouchableOpacity
                key={volcLertOption.id}
                style={styles.volcLertFilterMenuItem}
                activeOpacity={0.85}
                onPress={() => volcLertHandleSelectFilter(volcLertOption.id)}
              >
                <Text style={styles.volcLertFilterMenuItemText}>
                  {volcLertOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.volcLertSearchWrap}>
          <Text style={styles.volcLertSearchIcon}>⌕</Text>
          <TextInput
            value={volcLertSearchValue}
            onChangeText={setVolcLertSearchValue}
            placeholder="Find a volcano by name"
            placeholderTextColor="#E8D8CEB0"
            style={styles.volcLertSearchInput}
          />
        </View>

        <Text style={styles.volcLertSectionTitle}>
          {volcLertFilterTitles[volcLertSelectedFilter]}
        </Text>

        {volcLertFilteredVolcanoes.length === 0 ? (
          <View style={styles.volcLertEmptyWrap}>
            <Text style={styles.volcLertEmptyText}>No volcanoes found.</Text>
          </View>
        ) : (
          volcLertFilteredVolcanoes.map(volcLertVolcano => {
            const volcLertIsExpanded =
              volcLertExpandedVolcanoId === volcLertVolcano.id;

            return (
              <TouchableOpacity
                key={volcLertVolcano.id}
                activeOpacity={0.9}
                onPress={() => volcLertHandleCardPress(volcLertVolcano.id)}
                style={styles.volcLertCardWrap}
              >
                <LinearGradient
                  colors={['#612F47', '#8A3844', '#B13D2F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.volcLertCard}
                >
                  <Text style={styles.volcLertCardTitle}>
                    {volcLertVolcano.name}
                  </Text>

                  <Image
                    source={volcLertVolcano.image}
                    style={styles.volcLertCardImage}
                    resizeMode="cover"
                  />

                  {!volcLertIsExpanded ? (
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
                  ) : (
                    <View style={styles.volcLertCardExpanded}>
                      <View style={styles.volcLertCardButtonsRow}>
                        <TouchableOpacity
                          style={styles.volcLertOpenMapButtonWrap}
                          activeOpacity={0.85}
                          onPress={() => volcLertHandleOpenMap(volcLertVolcano)}
                        >
                          <LinearGradient
                            colors={['#CF4E27', '#ED7635']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.volcLertOpenMapButton}
                          >
                            <Text style={styles.volcLertOpenMapButtonText}>
                              Open map
                            </Text>
                            <Image
                              source={require('../../elements/images/volclertsmarkr.png')}
                            />
                          </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.volcLertShareRoundButton}
                          activeOpacity={0.85}
                          onPress={() => volcLertHandleShare(volcLertVolcano)}
                        >
                          <Image
                            source={require('../../elements/images/volclertsyoshre.png')}
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.volcLertCardInfoText}>
                        <Text style={styles.volcLertCardInfoBold}>
                          Location:{' '}
                        </Text>
                        {volcLertVolcano.location}
                      </Text>
                      <Text style={styles.volcLertCardInfoText}>
                        <Text style={styles.volcLertCardInfoBold}>
                          Coordinates:{' '}
                        </Text>
                        {volcLertVolcano.coordinates}
                      </Text>
                      <Text style={styles.volcLertCardInfoText}>
                        <Text style={styles.volcLertCardInfoBold}>
                          Height:{' '}
                        </Text>
                        {volcLertVolcano.height}
                      </Text>
                      <Text style={styles.volcLertCardInfoText}>
                        <Text style={styles.volcLertCardInfoBold}>
                          Description:{' '}
                        </Text>
                        {volcLertVolcano.description}
                      </Text>

                      <Image
                        source={volcLertVolcano.image}
                        style={styles.volcLertCardMapPreview}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsystlist;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 40,
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
  volcLertTopRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  volcLertTopSmallRoundButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4572E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertFilterIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  volcLertFilterMenu: {
    position: 'absolute',
    top: 86,
    right: 72,
    width: 190,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#D4572E',
    zIndex: 10,
  },
  volcLertFilterMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  volcLertFilterMenuItemText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '500',
  },
  volcLertSearchWrap: {
    marginTop: 18,
    minHeight: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: '#00000033',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  volcLertSearchIcon: {
    color: '#fff',
    fontSize: 20,
  },
  volcLertSearchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  volcLertSectionTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
  },
  volcLertEmptyWrap: {
    marginTop: 24,
    alignItems: 'center',
  },
  volcLertEmptyText: {
    color: '#fff',
    fontSize: 16,
  },
  volcLertCardWrap: {
    marginTop: 14,
  },
  volcLertCard: {
    borderRadius: 24,
    padding: 10,
    overflow: 'hidden',
  },
  volcLertCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  volcLertCardImage: {
    width: '100%',
    height: 190,
    borderRadius: 2,
  },
  volcLertCardInfoWrap: {
    marginTop: 10,
    marginBottom: 4,
  },
  volcLertCardInfoText: {
    color: '#F4E6DC',
    fontSize: 28,
    lineHeight: 28,
    marginTop: 2,
  },
  volcLertCardInfoBold: {
    color: '#fff',
    fontWeight: '700',
  },
  volcLertCardExpanded: {
    marginTop: 10,
  },
  volcLertCardButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  volcLertOpenMapButtonWrap: {
    flex: 1,
  },
  volcLertOpenMapButton: {
    minHeight: 56,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  volcLertOpenMapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  volcLertShareRoundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E26A35',
  },
  volcLertCardMapPreview: {
    marginTop: 12,
    width: '100%',
    height: 250,
    borderRadius: 2,
  },
});
*/
