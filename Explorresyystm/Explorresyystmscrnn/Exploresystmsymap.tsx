// map screen
import MapView, { Marker } from 'react-native-maps';

import Orientation from 'react-native-orientation-locker';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../Explorresyystmstrgg/explorresyystmcontxx';
import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

type exploresystmMapVolcanoType = {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  height: string;
  description: string;
  latitude: number;
  longitude: number;
  image: number;
};

type exploresystmMapRouteParams = {
  exploresystmTargetVolcano?: exploresystmMapVolcanoType;
};

const exploresystmMapVolcanoes: exploresystmMapVolcanoType[] = [
  {
    id: 'etna',
    name: 'Mount Etna',
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
    location: 'Hawaii, United States',
    coordinates: '19.421° N, 155.287° W',
    height: '1247 m',
    description:
      'Kilauea is one of the most active volcanoes on Earth, known for continuous lava flows and lava lakes.',
    latitude: 19.421,
    longitude: -155.287,
    image: require('../../elements/images/volclertsyovolc2.png'),
  },
  {
    id: 'sakurajima',
    name: 'Sakurajima',
    location: 'Kagoshima, Japan',
    coordinates: '31.585° N, 130.657° E',
    height: '1117 m',
    description:
      "Sakurajima is one of Japan's most active volcanoes with frequent explosive eruptions.",
    latitude: 31.585,
    longitude: 130.657,
    image: require('../../elements/images/volclertsyovolc3.png'),
  },
  {
    id: 'fuji',
    name: 'Mount Fuji',
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
    location: 'Washington, United States',
    coordinates: '46.8523° N, 121.7603° W',
    height: '4392 m',
    description:
      'Mount Rainier is a large stratovolcano considered potentially dangerous due to nearby population.',
    latitude: 46.8523,
    longitude: -121.7603,
    image: require('../../elements/images/volclertsyovolc6.png'),
  },
  {
    id: 'kohala',
    name: 'Kohala',
    location: 'Hawaii, United States',
    coordinates: '20.13° N, 155.80° W',
    height: '1670 m',
    description:
      'Kohala is the oldest volcano on the island of Hawaii and is considered extinct.',
    latitude: 20.13,
    longitude: -155.8,
    image: require('../../elements/images/volclertsyovolc7.png'),
  },
  {
    id: 'arthur-seat',
    name: "Arthur's Seat",
    location: 'Edinburgh, Scotland',
    coordinates: '55.944° N, 3.161° W',
    height: '251 m',
    description:
      "Arthur's Seat is an ancient extinct volcano located in Holyrood Park.",
    latitude: 55.944,
    longitude: -3.161,
    image: require('../../elements/images/volclertsyovolc8.png'),
  },
  {
    id: 'thielsen',
    name: 'Mount Thielsen',
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

const Exploresystmsymap = () => {
  const navigation = useNavigation<any>();
  const { exploresystmDarkMapTheme } = useStore();
  const route = useRoute();
  const { exploresystmTargetVolcano } =
    (route.params as exploresystmMapRouteParams) || {};
  const exploresystmMapRef = useRef<MapView | null>(null);
  const exploresystmMarkerRefs = useRef<Record<string, any>>({});
  const [exploresystmSearchValue, setVolcLertSearchValue] = useState('');
  const [exploresystmSelectedVolcano, setVolcLertSelectedVolcano] =
    useState<exploresystmMapVolcanoType | null>(null);
  const [exploresystmLastRandomVolcanoId, setVolcLertLastRandomVolcanoId] =
    useState<string | null>(null);

  const exploresystmVisibleVolcanoes = useMemo(() => {
    const exploresystmNormalizedQuery = exploresystmSearchValue
      .trim()
      .toLowerCase();
    if (!exploresystmNormalizedQuery) {
      return exploresystmMapVolcanoes;
    }

    return exploresystmMapVolcanoes.filter(exploresystmVolcano =>
      exploresystmVolcano.name
        .toLowerCase()
        .includes(exploresystmNormalizedQuery),
    );
  }, [exploresystmSearchValue]);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  useEffect(() => {
    if (exploresystmTargetVolcano) {
      const exploresystmMatchedVolcano =
        exploresystmMapVolcanoes.find(
          exploresystmVolcano =>
            exploresystmVolcano.id === exploresystmTargetVolcano.id,
        ) || null;
      if (exploresystmMatchedVolcano) {
        setVolcLertSelectedVolcano(exploresystmMatchedVolcano);
      }
      setVolcLertSearchValue(exploresystmTargetVolcano.name);
      exploresystmMapRef.current?.animateToRegion(
        {
          latitude: exploresystmTargetVolcano.latitude,
          longitude: exploresystmTargetVolcano.longitude,
          latitudeDelta: 6,
          longitudeDelta: 6,
        },
        600,
      );

      // Wait for map animation/render and then focus the exact marker.
      const exploresystmMarkerFocusTimeout = setTimeout(() => {
        exploresystmMarkerRefs.current[
          exploresystmTargetVolcano.id
        ]?.showCallout();
      }, 700);

      return () => {
        clearTimeout(exploresystmMarkerFocusTimeout);
      };
    }

    if (!exploresystmVisibleVolcanoes.length) {
      return;
    }

    const exploresystmFirstMatch = exploresystmVisibleVolcanoes[0];
    exploresystmMapRef.current?.animateToRegion(
      {
        latitude: exploresystmFirstMatch.latitude,
        longitude: exploresystmFirstMatch.longitude,
        latitudeDelta: 20,
        longitudeDelta: 20,
      },
      500,
    );
  }, [exploresystmTargetVolcano, exploresystmVisibleVolcanoes]);

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleOpenRandomVolcano = () => {
    const exploresystmPool = exploresystmMapVolcanoes;
    let exploresystmRandomIndex = Math.floor(
      Math.random() * exploresystmPool.length,
    );
    let exploresystmRandomVolcano = exploresystmPool[exploresystmRandomIndex];

    if (exploresystmPool.length > 1) {
      while (exploresystmRandomVolcano.id === exploresystmLastRandomVolcanoId) {
        exploresystmRandomIndex = Math.floor(
          Math.random() * exploresystmPool.length,
        );
        exploresystmRandomVolcano = exploresystmPool[exploresystmRandomIndex];
      }
    }

    setVolcLertSearchValue(exploresystmRandomVolcano.name);
    setVolcLertSelectedVolcano(exploresystmRandomVolcano);
    setVolcLertLastRandomVolcanoId(exploresystmRandomVolcano.id);
    exploresystmMapRef.current?.animateToRegion(
      {
        latitude: exploresystmRandomVolcano.latitude,
        longitude: exploresystmRandomVolcano.longitude,
        latitudeDelta: 14,
        longitudeDelta: 14,
      },
      600,
    );
  };

  const exploresystmHandleOpenSelectedVolcanoDetails = () => {
    if (!exploresystmSelectedVolcano) {
      return;
    }

    navigation.navigate('Exploresystmsystdet', {
      exploresystmVolcano: exploresystmSelectedVolcano,
    });
  };

  return (
    <View style={styles.exploresystmContainer}>
      <MapView
        userInterfaceStyle={exploresystmDarkMapTheme ? 'dark' : 'light'}
        ref={exploresystmMapRef}
        style={styles.exploresystmMap}
        initialRegion={{
          latitude: 15,
          longitude: 60,
          latitudeDelta: 80,
          longitudeDelta: 80,
        }}
      >
        {exploresystmVisibleVolcanoes.map(exploresystmVolcano => (
          <Marker
            key={exploresystmVolcano.id}
            ref={exploresystmMarker => {
              exploresystmMarkerRefs.current[exploresystmVolcano.id] =
                exploresystmMarker;
            }}
            coordinate={{
              latitude: exploresystmVolcano.latitude,
              longitude: exploresystmVolcano.longitude,
            }}
            title={exploresystmVolcano.name}
            onSelect={() => {
              setVolcLertSelectedVolcano(exploresystmVolcano);
            }}
            onPress={() => {
              setVolcLertSelectedVolcano(exploresystmVolcano);
            }}
          >
            <Image
              source={require('../../elements/images/volclertsysmappin.png')}
              style={[
                styles.exploresystmMapPinImage,
                { tintColor: exploresystmDarkMapTheme ? '#fff' : '#ED7635' },
              ]}
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.exploresystmTopActions}>
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
          <Image source={require('../../elements/images/volclertsysett.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.exploresystmSearchWrap}>
        <Image source={require('../../elements/images/volclertsyoserc.png')} />
        <TextInput
          value={exploresystmSearchValue}
          onChangeText={setVolcLertSearchValue}
          placeholder="Find a volcano by name"
          placeholderTextColor="#E8D8CEB0"
          style={styles.exploresystmSearchInput}
        />
      </View>

      {exploresystmSelectedVolcano && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={exploresystmHandleOpenSelectedVolcanoDetails}
          style={styles.exploresystmSelectedVolcanoCard}
        >
          <LinearGradient
            colors={['#612F47', '#8A3844', '#B13D2F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.exploresystmSelectedVolcanoCardInner}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={styles.exploresystmSelectedVolcanoCloseButton}
                onPress={() => {
                  setVolcLertSelectedVolcano(null);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.exploresystmSelectedVolcanoCloseButtonText}>
                  ×
                </Text>
              </TouchableOpacity>
              <View style={styles.exploresystmSelectedVolcanoCardInner}>
                <Image
                  source={exploresystmSelectedVolcano.image}
                  style={styles.exploresystmSelectedVolcanoImage}
                />

                <View style={styles.exploresystmSelectedVolcanoCardBodyWrap}>
                  <View style={styles.exploresystmSelectedVolcanoCardBody}>
                    <Text style={styles.exploresystmSelectedVolcanoTitle}>
                      {exploresystmSelectedVolcano.name}
                    </Text>
                    <Text style={styles.exploresystmSelectedVolcanoText}>
                      {exploresystmSelectedVolcano.location}
                    </Text>
                    <Text style={styles.exploresystmSelectedVolcanoText}>
                      {exploresystmSelectedVolcano.coordinates}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.exploresystmRandomButtonWrap}
        onPress={exploresystmHandleOpenRandomVolcano}
        activeOpacity={0.85}
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
    </View>
  );
};

export default Exploresystmsymap;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
  },
  exploresystmMap: {
    ...StyleSheet.absoluteFillObject,
  },
  exploresystmMarkerIcon: {
    width: 18,
    height: 24,
    resizeMode: 'contain',
  },
  exploresystmMapPinImage: {
    width: 50,
    height: 34,
    resizeMode: 'contain',
  },
  exploresystmTopActions: {
    position: 'absolute',
    top: 60,
    left: 22,
    right: 22,
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
  exploresystmSearchWrap: {
    position: 'absolute',
    top: 122,
    left: 22,
    right: 22,
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
  exploresystmRandomButtonWrap: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 35,
  },
  exploresystmRandomButton: {
    minHeight: 50,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmRandomButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  exploresystmSelectedVolcanoCard: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 105,
    borderRadius: 18,
    overflow: 'hidden',
    minHeight: 110,
  },
  exploresystmSelectedVolcanoCardInner: {
    flexDirection: 'row',
    gap: 10,
  },
  exploresystmSelectedVolcanoCardBodyWrap: {
    flex: 1,
  },
  exploresystmSelectedVolcanoImage: {
    width: 120,
    height: 96,
    borderRadius: 10,
  },
  exploresystmSelectedVolcanoCardBody: {
    justifyContent: 'center',
    flex: 1,
  },
  exploresystmSelectedVolcanoCloseButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmSelectedVolcanoCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '700',
    bottom: 1,
  },
  exploresystmSelectedVolcanoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  exploresystmSelectedVolcanoText: {
    color: '#F5E1D8',
    fontSize: 12,
    marginBottom: 3,
  },
});
