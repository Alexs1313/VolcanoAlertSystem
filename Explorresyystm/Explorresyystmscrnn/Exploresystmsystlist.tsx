// cards list

import LinearGradient from 'react-native-linear-gradient';

import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';

import React, { useCallback, useMemo, useState } from 'react';

import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

type exploresystmVolcanoStatus = 'active' | 'dormant' | 'extinct';
type exploresystmFilterStatus = exploresystmVolcanoStatus | 'all';

export type exploresystmVolcanoType = {
  id: string;
  name: string;
  status: exploresystmVolcanoStatus;
  location: string;
  coordinates: string;
  height: string;
  description: string;
  latitude: number;
  longitude: number;
  image: number;
};

const exploresystmVolcanoes: exploresystmVolcanoType[] = [
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

const exploresystmFilterOptions: {
  id: exploresystmFilterStatus;
  label: string;
}[] = [
  { id: 'active', label: 'Active Volcanoes' },
  { id: 'dormant', label: 'Dormant Volcanoes' },
  { id: 'extinct', label: 'Extinct Volcanoes' },
  { id: 'all', label: 'All' },
];

const exploresystmFilterTitles: Record<exploresystmFilterStatus, string> = {
  active: '🌋 Active Volcanoes',
  dormant: '🌋 Dormant Volcanoes',
  extinct: '🌋 Extinct Volcanoes',
  all: '🌋 All Volcanoes',
};

const exploresystmSavedVolcanoesStorageKey = 'exploresystmSavedVolcanoIds';

const Exploresystmsystlist = () => {
  const navigation = useNavigation<any>();
  const [exploresystmSearchValue, setVolcLertSearchValue] = useState('');
  const [exploresystmSelectedFilter, setVolcLertSelectedFilter] =
    useState<exploresystmFilterStatus>('all');
  const [exploresystmIsFilterOpen, setVolcLertIsFilterOpen] = useState(false);
  const [exploresystmSavedVolcanoIds, setVolcLertSavedVolcanoIds] = useState<
    string[]
  >([]);

  const exploresystmFilteredVolcanoes = useMemo(() => {
    return exploresystmVolcanoes.filter(exploresystmVolcano => {
      const exploresystmMatchesStatus =
        exploresystmSelectedFilter === 'all' ||
        exploresystmVolcano.status === exploresystmSelectedFilter;
      const exploresystmMatchesSearch = exploresystmVolcano.name
        .toLowerCase()
        .includes(exploresystmSearchValue.trim().toLowerCase());
      return exploresystmMatchesStatus && exploresystmMatchesSearch;
    });
  }, [exploresystmSearchValue, exploresystmSelectedFilter]);

  const exploresystmLoadSavedVolcanoIds = useCallback(async () => {
    try {
      const exploresystmSavedIdsRaw = await AsyncStorage.getItem(
        exploresystmSavedVolcanoesStorageKey,
      );
      const exploresystmSavedIds: string[] = exploresystmSavedIdsRaw
        ? JSON.parse(exploresystmSavedIdsRaw)
        : [];
      setVolcLertSavedVolcanoIds(exploresystmSavedIds);
    } catch {
      setVolcLertSavedVolcanoIds([]);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      exploresystmLoadSavedVolcanoIds();
    }, [exploresystmLoadSavedVolcanoIds]),
  );

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleToggleFilter = () => {
    setVolcLertIsFilterOpen(exploresystmPrevState => !exploresystmPrevState);
  };

  const exploresystmHandleSelectFilter = (
    exploresystmFilter: exploresystmFilterStatus,
  ) => {
    setVolcLertSelectedFilter(exploresystmFilter);
    setVolcLertIsFilterOpen(false);
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleOpenVolcanoDetails = (
    exploresystmVolcano: exploresystmVolcanoType,
  ) => {
    navigation.navigate(
      'Exploresystmsystdet' as never,
      { exploresystmVolcano } as never,
    );
  };

  const exploresystmHandleOpenRandomVolcano = () => {
    if (exploresystmFilteredVolcanoes.length === 0) {
      return;
    }

    const exploresystmRandomIndex = Math.floor(
      Math.random() * exploresystmFilteredVolcanoes.length,
    );
    const exploresystmRandomVolcano =
      exploresystmFilteredVolcanoes[exploresystmRandomIndex];
    exploresystmHandleOpenVolcanoDetails(exploresystmRandomVolcano);
  };

  return (
    <>
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

            <View style={styles.exploresystmTopRightActions}>
              <TouchableOpacity
                style={styles.exploresystmTopSmallRoundButton}
                onPress={exploresystmHandleToggleFilter}
                activeOpacity={0.8}
              >
                <Image
                  source={require('../../elements/images/volclertsyomenu.png')}
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
          </View>

          {exploresystmIsFilterOpen && (
            <View style={styles.exploresystmFilterMenu}>
              {exploresystmFilterOptions.map(exploresystmOption => (
                <TouchableOpacity
                  key={exploresystmOption.id}
                  style={styles.exploresystmFilterMenuItem}
                  activeOpacity={0.85}
                  onPress={() =>
                    exploresystmHandleSelectFilter(exploresystmOption.id)
                  }
                >
                  <Text style={styles.exploresystmFilterMenuItemText}>
                    {exploresystmOption.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.exploresystmSearchWrap}>
            <Image
              source={require('../../elements/images/volclertsyoserc.png')}
            />
            <TextInput
              value={exploresystmSearchValue}
              onChangeText={setVolcLertSearchValue}
              placeholder="Find a volcano by name"
              placeholderTextColor="#E8D8CEB0"
              style={styles.exploresystmSearchInput}
            />
          </View>

          {exploresystmFilteredVolcanoes.length === 0 ? (
            <View style={styles.exploresystmEmptyWrap}>
              <Text style={styles.exploresystmEmptyText}>
                No volcanoes found.
              </Text>
            </View>
          ) : (
            exploresystmFilteredVolcanoes.map(exploresystmVolcano => (
              <TouchableOpacity
                key={exploresystmVolcano.id}
                activeOpacity={0.9}
                onPress={() =>
                  exploresystmHandleOpenVolcanoDetails(exploresystmVolcano)
                }
                style={styles.exploresystmCardWrap}
              >
                <LinearGradient
                  colors={['#612F47', '#8A3844', '#B13D2F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmCard}
                >
                  <View>
                    <View style={styles.exploresystmCardTitleRow}>
                      <Text style={styles.exploresystmCardTitle}>
                        {exploresystmVolcano.name}
                      </Text>

                      {exploresystmSavedVolcanoIds.includes(
                        exploresystmVolcano.id,
                      ) && (
                        <Image
                          source={require('../../elements/images/volclertsmsaved.png')}
                          style={styles.exploresystmSavedIcon}
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
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          )}
        </View>
      </Exploresystmsystlay>
      <TouchableOpacity
        style={styles.exploresystmRandomButtonWrap}
        activeOpacity={0.85}
        onPress={exploresystmHandleOpenRandomVolcano}
      >
        <LinearGradient
          colors={['#CF4E27', '#ED7635']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.exploresystmRandomButton}
        >
          <Text style={styles.exploresystmRandomButtonText}>
            Open a random volcano
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default Exploresystmsystlist;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 110,
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
  exploresystmTopRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  exploresystmTopSmallRoundButton: {
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: '#D4572E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmFilterIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  exploresystmFilterMenu: {
    position: 'absolute',
    top: 86,
    right: 75,
    width: 190,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#D4572E',
    zIndex: 10,
  },
  exploresystmFilterMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  exploresystmFilterMenuItemText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  exploresystmSearchWrap: {
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
  exploresystmSearchIcon: {
    color: '#fff',
    fontSize: 20,
  },
  exploresystmSearchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  exploresystmSectionTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
  },
  exploresystmRandomButtonWrap: {
    position: 'absolute',
    bottom: 35,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  exploresystmRandomButton: {
    minHeight: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmRandomButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  exploresystmEmptyWrap: {
    marginTop: 24,
    alignItems: 'center',
  },
  exploresystmEmptyText: {
    color: '#fff',
    fontSize: 16,
  },
  exploresystmCardWrap: {
    marginTop: 14,
  },
  exploresystmCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  exploresystmCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 12,
    marginBottom: 15,
  },
  exploresystmCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exploresystmSavedIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15,
  },
  exploresystmCardImage: {
    width: '100%',
    height: 130,
  },
  exploresystmCardInfoWrap: {
    marginTop: 10,
    marginBottom: 4,
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
import Exploresystmsystlay from '../Exploresystmsystemcmpnt/Exploresystmsystlay';

type exploresystmVolcanoStatus = 'active' | 'dormant' | 'extinct';
type exploresystmFilterStatus = exploresystmVolcanoStatus | 'all';

export type exploresystmVolcanoType = {
  id: string;
  name: string;
  status: exploresystmVolcanoStatus;
  location: string;
  coordinates: string;
  height: string;
  description: string;
  latitude: number;
  longitude: number;
  image: number;
};

const exploresystmVolcanoes: exploresystmVolcanoType[] = [
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

const exploresystmFilterOptions: { id: exploresystmFilterStatus; label: string }[] = [
  { id: 'active', label: 'Active Volcanoes' },
  { id: 'dormant', label: 'Dormant Volcanoes' },
  { id: 'extinct', label: 'Extinct Volcanoes' },
  { id: 'all', label: 'All' },
];

const exploresystmFilterTitles: Record<exploresystmFilterStatus, string> = {
  active: '🌋 Active Volcanoes',
  dormant: '🌋 Dormant Volcanoes',
  extinct: '🌋 Extinct Volcanoes',
  all: '🌋 All Volcanoes',
};

const Exploresystmsystlist = () => {
  const navigation = useNavigation();
  const [exploresystmSearchValue, setVolcLertSearchValue] = useState('');
  const [exploresystmSelectedFilter, setVolcLertSelectedFilter] =
    useState<exploresystmFilterStatus>('all');
  const [exploresystmIsFilterOpen, setVolcLertIsFilterOpen] = useState(false);

  const exploresystmFilteredVolcanoes = useMemo(() => {
    return exploresystmVolcanoes.filter(exploresystmVolcano => {
      const exploresystmMatchesStatus =
        exploresystmSelectedFilter === 'all' ||
        exploresystmVolcano.status === exploresystmSelectedFilter;
      const exploresystmMatchesSearch = exploresystmVolcano.name
        .toLowerCase()
        .includes(exploresystmSearchValue.trim().toLowerCase());
      return exploresystmMatchesStatus && exploresystmMatchesSearch;
    });
  }, [exploresystmSearchValue, exploresystmSelectedFilter]);

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleToggleFilter = () => {
    setVolcLertIsFilterOpen(exploresystmPrevState => !exploresystmPrevState);
  };

  const exploresystmHandleSelectFilter = (exploresystmFilter: exploresystmFilterStatus) => {
    setVolcLertSelectedFilter(exploresystmFilter);
    setVolcLertIsFilterOpen(false);
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleOpenVolcanoDetails = (
    exploresystmVolcano: exploresystmVolcanoType,
  ) => {
    navigation.navigate(
      'Exploresystmsystdet' as never,
      { exploresystmVolcano } as never,
    );
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
            <Text style={styles.exploresystmBackIcon}>↩</Text>
          </TouchableOpacity>

          <View style={styles.exploresystmTopRightActions}>
            <TouchableOpacity
              style={styles.exploresystmTopSmallRoundButton}
              onPress={exploresystmHandleToggleFilter}
              activeOpacity={0.8}
            >
              <Text style={styles.exploresystmFilterIcon}>☰</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={exploresystmHandleOpenSettings} activeOpacity={0.8}>
              <Image source={require('../../elements/images/volclertsysett.png')} />
            </TouchableOpacity>
          </View>
        </View>

        {exploresystmIsFilterOpen && (
          <View style={styles.exploresystmFilterMenu}>
            {exploresystmFilterOptions.map(exploresystmOption => (
              <TouchableOpacity
                key={exploresystmOption.id}
                style={styles.exploresystmFilterMenuItem}
                activeOpacity={0.85}
                onPress={() => exploresystmHandleSelectFilter(exploresystmOption.id)}
              >
                <Text style={styles.exploresystmFilterMenuItemText}>
                  {exploresystmOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.exploresystmSearchWrap}>
          <Text style={styles.exploresystmSearchIcon}>⌕</Text>
          <TextInput
            value={exploresystmSearchValue}
            onChangeText={setVolcLertSearchValue}
            placeholder="Find a volcano by name"
            placeholderTextColor="#E8D8CEB0"
            style={styles.exploresystmSearchInput}
          />
        </View>

        <Text style={styles.exploresystmSectionTitle}>
          {exploresystmFilterTitles[exploresystmSelectedFilter]}
        </Text>

        {exploresystmFilteredVolcanoes.length === 0 ? (
          <View style={styles.exploresystmEmptyWrap}>
            <Text style={styles.exploresystmEmptyText}>No volcanoes found.</Text>
          </View>
        ) : (
          exploresystmFilteredVolcanoes.map(exploresystmVolcano => (
            <TouchableOpacity
              key={exploresystmVolcano.id}
              activeOpacity={0.9}
              onPress={() => exploresystmHandleOpenVolcanoDetails(exploresystmVolcano)}
              style={styles.exploresystmCardWrap}
            >
              <LinearGradient
                colors={['#612F47', '#8A3844', '#B13D2F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.exploresystmCard}
              >
                <Text style={styles.exploresystmCardTitle}>{exploresystmVolcano.name}</Text>

                <Image
                  source={exploresystmVolcano.image}
                  style={styles.exploresystmCardImage}
                  resizeMode="cover"
                />

                <View style={styles.exploresystmCardInfoWrap}>
                  <Text style={styles.exploresystmCardInfoText}>
                    <Text style={styles.exploresystmCardInfoBold}>Location: </Text>
                    {exploresystmVolcano.location}
                  </Text>
                  <Text style={styles.exploresystmCardInfoText}>
                    <Text style={styles.exploresystmCardInfoBold}>Height: </Text>
                    {exploresystmVolcano.height}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))
        )}
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsystlist;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 40,
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
  exploresystmTopRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  exploresystmTopSmallRoundButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4572E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmFilterIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  exploresystmFilterMenu: {
    position: 'absolute',
    top: 86,
    right: 72,
    width: 190,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#D4572E',
    zIndex: 10,
  },
  exploresystmFilterMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  exploresystmFilterMenuItemText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
  },
  exploresystmSearchWrap: {
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
  exploresystmSearchIcon: {
    color: '#fff',
    fontSize: 20,
  },
  exploresystmSearchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  exploresystmSectionTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
  },
  exploresystmEmptyWrap: {
    marginTop: 24,
    alignItems: 'center',
  },
  exploresystmEmptyText: {
    color: '#fff',
    fontSize: 16,
  },
  exploresystmCardWrap: {
    marginTop: 14,
  },
  exploresystmCard: {
    borderRadius: 24,
    padding: 10,
    overflow: 'hidden',
  },
  exploresystmCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  exploresystmCardImage: {
    width: '100%',
    height: 190,
  },
  exploresystmCardInfoWrap: {
    marginTop: 10,
    marginBottom: 4,
  },
  exploresystmCardInfoText: {
    color: '#F4E6DC',
    fontSize: 28,
    lineHeight: 28,
    marginTop: 2,
  },
  exploresystmCardInfoBold: {
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
import Exploresystmsystlay from '../Exploresystmsystemcmpnt/Exploresystmsystlay';

type exploresystmVolcanoStatus = 'active' | 'dormant' | 'extinct';
type exploresystmFilterStatus = exploresystmVolcanoStatus | 'all';

type exploresystmVolcanoType = {
  id: string;
  name: string;
  status: exploresystmVolcanoStatus;
  location: string;
  coordinates: string;
  height: string;
  description: string;
  image: number;
};

const exploresystmVolcanoes: exploresystmVolcanoType[] = [
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

const exploresystmFilterOptions: { id: exploresystmFilterStatus; label: string }[] = [
  { id: 'active', label: 'Active Volcanoes' },
  { id: 'dormant', label: 'Dormant Volcanoes' },
  { id: 'extinct', label: 'Extinct Volcanoes' },
  { id: 'all', label: 'All' },
];

const exploresystmFilterTitles: Record<exploresystmFilterStatus, string> = {
  active: '🌋 Active Volcanoes',
  dormant: '🌋 Dormant Volcanoes',
  extinct: '🌋 Extinct Volcanoes',
  all: '🌋 All Volcanoes',
};

const Exploresystmsystlist = () => {
  const navigation = useNavigation();
  const [exploresystmSearchValue, setVolcLertSearchValue] = useState('');
  const [exploresystmSelectedFilter, setVolcLertSelectedFilter] =
    useState<exploresystmFilterStatus>('all');
  const [exploresystmIsFilterOpen, setVolcLertIsFilterOpen] = useState(false);
  const [exploresystmExpandedVolcanoId, setVolcLertExpandedVolcanoId] = useState<
    string | null
  >(null);

  const exploresystmFilteredVolcanoes = useMemo(() => {
    return exploresystmVolcanoes.filter(exploresystmVolcano => {
      const exploresystmMatchesStatus =
        exploresystmSelectedFilter === 'all' ||
        exploresystmVolcano.status === exploresystmSelectedFilter;
      const exploresystmMatchesSearch = exploresystmVolcano.name
        .toLowerCase()
        .includes(exploresystmSearchValue.trim().toLowerCase());
      return exploresystmMatchesStatus && exploresystmMatchesSearch;
    });
  }, [exploresystmSearchValue, exploresystmSelectedFilter]);

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleToggleFilter = () => {
    setVolcLertIsFilterOpen(exploresystmPrevState => !exploresystmPrevState);
  };

  const exploresystmHandleSelectFilter = (exploresystmFilter: exploresystmFilterStatus) => {
    setVolcLertSelectedFilter(exploresystmFilter);
    setVolcLertIsFilterOpen(false);
    setVolcLertExpandedVolcanoId(null);
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleCardPress = (exploresystmVolcanoId: string) => {
    setVolcLertExpandedVolcanoId(exploresystmPrevId =>
      exploresystmPrevId === exploresystmVolcanoId ? null : exploresystmVolcanoId,
    );
  };

  const exploresystmHandleOpenMap = (exploresystmVolcano: exploresystmVolcanoType) => {
    const exploresystmMapQuery = encodeURIComponent(
      `${exploresystmVolcano.name} ${exploresystmVolcano.coordinates}`,
    );
    const exploresystmMapUrl = `https://www.google.com/maps/search/?api=1&query=${exploresystmMapQuery}`;

    Linking.openURL(exploresystmMapUrl).catch(() => {
      Alert.alert('Error', 'Could not open map.');
    });
  };

  const exploresystmHandleShare = (exploresystmVolcano: exploresystmVolcanoType) => {
    Share.share({
      title: exploresystmVolcano.name,
      message: `${exploresystmVolcano.name}\nLocation: ${exploresystmVolcano.location}\nCoordinates: ${exploresystmVolcano.coordinates}\nHeight: ${exploresystmVolcano.height}\n\n${exploresystmVolcano.description}`,
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
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
            <Text style={styles.exploresystmBackIcon}>↩</Text>
          </TouchableOpacity>

          <View style={styles.exploresystmTopRightActions}>
            <TouchableOpacity
              style={styles.exploresystmTopSmallRoundButton}
              onPress={exploresystmHandleToggleFilter}
              activeOpacity={0.8}
            >
              <Text style={styles.exploresystmFilterIcon}>☰</Text>
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
        </View>

        {exploresystmIsFilterOpen && (
          <View style={styles.exploresystmFilterMenu}>
            {exploresystmFilterOptions.map(exploresystmOption => (
              <TouchableOpacity
                key={exploresystmOption.id}
                style={styles.exploresystmFilterMenuItem}
                activeOpacity={0.85}
                onPress={() => exploresystmHandleSelectFilter(exploresystmOption.id)}
              >
                <Text style={styles.exploresystmFilterMenuItemText}>
                  {exploresystmOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.exploresystmSearchWrap}>
          <Text style={styles.exploresystmSearchIcon}>⌕</Text>
          <TextInput
            value={exploresystmSearchValue}
            onChangeText={setVolcLertSearchValue}
            placeholder="Find a volcano by name"
            placeholderTextColor="#E8D8CEB0"
            style={styles.exploresystmSearchInput}
          />
        </View>

        <Text style={styles.exploresystmSectionTitle}>
          {exploresystmFilterTitles[exploresystmSelectedFilter]}
        </Text>

        {exploresystmFilteredVolcanoes.length === 0 ? (
          <View style={styles.exploresystmEmptyWrap}>
            <Text style={styles.exploresystmEmptyText}>No volcanoes found.</Text>
          </View>
        ) : (
          exploresystmFilteredVolcanoes.map(exploresystmVolcano => {
            const exploresystmIsExpanded =
              exploresystmExpandedVolcanoId === exploresystmVolcano.id;

            return (
              <TouchableOpacity
                key={exploresystmVolcano.id}
                activeOpacity={0.9}
                onPress={() => exploresystmHandleCardPress(exploresystmVolcano.id)}
                style={styles.exploresystmCardWrap}
              >
                <LinearGradient
                  colors={['#612F47', '#8A3844', '#B13D2F']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.exploresystmCard}
                >
                  <Text style={styles.exploresystmCardTitle}>
                    {exploresystmVolcano.name}
                  </Text>

                  <Image
                    source={exploresystmVolcano.image}
                    style={styles.exploresystmCardImage}
                    resizeMode="cover"
                  />

                  {!exploresystmIsExpanded ? (
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
                  ) : (
                    <View style={styles.exploresystmCardExpanded}>
                      <View style={styles.exploresystmCardButtonsRow}>
                        <TouchableOpacity
                          style={styles.exploresystmOpenMapButtonWrap}
                          activeOpacity={0.85}
                          onPress={() => exploresystmHandleOpenMap(exploresystmVolcano)}
                        >
                          <LinearGradient
                            colors={['#CF4E27', '#ED7635']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.exploresystmOpenMapButton}
                          >
                            <Text style={styles.exploresystmOpenMapButtonText}>
                              Open map
                            </Text>
                            <Image
                              source={require('../../elements/images/volclertsmarkr.png')}
                            />
                          </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.exploresystmShareRoundButton}
                          activeOpacity={0.85}
                          onPress={() => exploresystmHandleShare(exploresystmVolcano)}
                        >
                          <Image
                            source={require('../../elements/images/volclertsyoshre.png')}
                          />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.exploresystmCardInfoText}>
                        <Text style={styles.exploresystmCardInfoBold}>
                          Location:{' '}
                        </Text>
                        {exploresystmVolcano.location}
                      </Text>
                      <Text style={styles.exploresystmCardInfoText}>
                        <Text style={styles.exploresystmCardInfoBold}>
                          Coordinates:{' '}
                        </Text>
                        {exploresystmVolcano.coordinates}
                      </Text>
                      <Text style={styles.exploresystmCardInfoText}>
                        <Text style={styles.exploresystmCardInfoBold}>
                          Height:{' '}
                        </Text>
                        {exploresystmVolcano.height}
                      </Text>
                      <Text style={styles.exploresystmCardInfoText}>
                        <Text style={styles.exploresystmCardInfoBold}>
                          Description:{' '}
                        </Text>
                        {exploresystmVolcano.description}
                      </Text>

                      <Image
                        source={exploresystmVolcano.image}
                        style={styles.exploresystmCardMapPreview}
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
    </Exploresystmsystlay>
  );
};

export default Exploresystmsystlist;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 40,
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
  exploresystmTopRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  exploresystmTopSmallRoundButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D4572E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmFilterIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  exploresystmFilterMenu: {
    position: 'absolute',
    top: 86,
    right: 72,
    width: 190,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#D4572E',
    zIndex: 10,
  },
  exploresystmFilterMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  exploresystmFilterMenuItemText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '500',
  },
  exploresystmSearchWrap: {
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
  exploresystmSearchIcon: {
    color: '#fff',
    fontSize: 20,
  },
  exploresystmSearchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 8,
  },
  exploresystmSectionTitle: {
    marginTop: 16,
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
  },
  exploresystmEmptyWrap: {
    marginTop: 24,
    alignItems: 'center',
  },
  exploresystmEmptyText: {
    color: '#fff',
    fontSize: 16,
  },
  exploresystmCardWrap: {
    marginTop: 14,
  },
  exploresystmCard: {
    borderRadius: 24,
    padding: 10,
    overflow: 'hidden',
  },
  exploresystmCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
  },
  exploresystmCardImage: {
    width: '100%',
    height: 190,
    borderRadius: 2,
  },
  exploresystmCardInfoWrap: {
    marginTop: 10,
    marginBottom: 4,
  },
  exploresystmCardInfoText: {
    color: '#F4E6DC',
    fontSize: 28,
    lineHeight: 28,
    marginTop: 2,
  },
  exploresystmCardInfoBold: {
    color: '#fff',
    fontWeight: '700',
  },
  exploresystmCardExpanded: {
    marginTop: 10,
  },
  exploresystmCardButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  exploresystmOpenMapButtonWrap: {
    flex: 1,
  },
  exploresystmOpenMapButton: {
    minHeight: 56,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  exploresystmOpenMapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  exploresystmShareRoundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E26A35',
  },
  exploresystmCardMapPreview: {
    marginTop: 12,
    width: '100%',
    height: 250,
    borderRadius: 2,
  },
});
*/
