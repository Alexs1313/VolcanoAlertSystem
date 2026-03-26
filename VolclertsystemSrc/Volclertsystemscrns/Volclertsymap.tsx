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
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type volcLertMapVolcanoType = {
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

type volcLertMapRouteParams = {
  volcLertTargetVolcano?: volcLertMapVolcanoType;
};

const volcLertMapVolcanoes: volcLertMapVolcanoType[] = [
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

const Volclertsymap = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { volcLertTargetVolcano } =
    (route.params as volcLertMapRouteParams) || {};
  const volcLertMapRef = useRef<MapView | null>(null);
  const volcLertMarkerRefs = useRef<Record<string, any>>({});
  const [volcLertSearchValue, setVolcLertSearchValue] = useState('');
  const [volcLertSelectedVolcano, setVolcLertSelectedVolcano] =
    useState<volcLertMapVolcanoType | null>(null);
  const [volcLertLastRandomVolcanoId, setVolcLertLastRandomVolcanoId] =
    useState<string | null>(null);

  const volcLertVisibleVolcanoes = useMemo(() => {
    const volcLertNormalizedQuery = volcLertSearchValue.trim().toLowerCase();
    if (!volcLertNormalizedQuery) {
      return volcLertMapVolcanoes;
    }

    return volcLertMapVolcanoes.filter(volcLertVolcano =>
      volcLertVolcano.name.toLowerCase().includes(volcLertNormalizedQuery),
    );
  }, [volcLertSearchValue]);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  useEffect(() => {
    if (volcLertTargetVolcano) {
      const volcLertMatchedVolcano =
        volcLertMapVolcanoes.find(
          volcLertVolcano => volcLertVolcano.id === volcLertTargetVolcano.id,
        ) || null;
      if (volcLertMatchedVolcano) {
        setVolcLertSelectedVolcano(volcLertMatchedVolcano);
      }
      setVolcLertSearchValue(volcLertTargetVolcano.name);
      volcLertMapRef.current?.animateToRegion(
        {
          latitude: volcLertTargetVolcano.latitude,
          longitude: volcLertTargetVolcano.longitude,
          latitudeDelta: 6,
          longitudeDelta: 6,
        },
        600,
      );

      // Wait for map animation/render and then focus the exact marker.
      const volcLertMarkerFocusTimeout = setTimeout(() => {
        volcLertMarkerRefs.current[volcLertTargetVolcano.id]?.showCallout();
      }, 700);

      return () => {
        clearTimeout(volcLertMarkerFocusTimeout);
      };
    }

    if (!volcLertVisibleVolcanoes.length) {
      return;
    }

    const volcLertFirstMatch = volcLertVisibleVolcanoes[0];
    volcLertMapRef.current?.animateToRegion(
      {
        latitude: volcLertFirstMatch.latitude,
        longitude: volcLertFirstMatch.longitude,
        latitudeDelta: 20,
        longitudeDelta: 20,
      },
      500,
    );
  }, [volcLertTargetVolcano, volcLertVisibleVolcanoes]);

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleOpenRandomVolcano = () => {
    const volcLertPool = volcLertMapVolcanoes;
    let volcLertRandomIndex = Math.floor(Math.random() * volcLertPool.length);
    let volcLertRandomVolcano = volcLertPool[volcLertRandomIndex];

    if (volcLertPool.length > 1) {
      while (volcLertRandomVolcano.id === volcLertLastRandomVolcanoId) {
        volcLertRandomIndex = Math.floor(Math.random() * volcLertPool.length);
        volcLertRandomVolcano = volcLertPool[volcLertRandomIndex];
      }
    }

    setVolcLertSearchValue(volcLertRandomVolcano.name);
    setVolcLertSelectedVolcano(volcLertRandomVolcano);
    setVolcLertLastRandomVolcanoId(volcLertRandomVolcano.id);
    volcLertMapRef.current?.animateToRegion(
      {
        latitude: volcLertRandomVolcano.latitude,
        longitude: volcLertRandomVolcano.longitude,
        latitudeDelta: 14,
        longitudeDelta: 14,
      },
      600,
    );
  };

  const volcLertHandleOpenSelectedVolcanoDetails = () => {
    if (!volcLertSelectedVolcano) {
      return;
    }

    navigation.navigate('Volclertsystdet', {
      volcLertVolcano: volcLertSelectedVolcano,
    });
  };

  return (
    <View style={styles.volcLertContainer}>
      <MapView
        userInterfaceStyle="dark"
        ref={volcLertMapRef}
        style={styles.volcLertMap}
        initialRegion={{
          latitude: 15,
          longitude: 60,
          latitudeDelta: 80,
          longitudeDelta: 80,
        }}
      >
        {volcLertVisibleVolcanoes.map(volcLertVolcano => (
          <Marker
            key={volcLertVolcano.id}
            ref={volcLertMarker => {
              volcLertMarkerRefs.current[volcLertVolcano.id] = volcLertMarker;
            }}
            coordinate={{
              latitude: volcLertVolcano.latitude,
              longitude: volcLertVolcano.longitude,
            }}
            title={volcLertVolcano.name}
            onSelect={() => {
              setVolcLertSelectedVolcano(volcLertVolcano);
            }}
            onPress={() => {
              setVolcLertSelectedVolcano(volcLertVolcano);
            }}
          >
            <Image
              source={require('../../elements/images/volclertsysmappin.png')}
              style={styles.volcLertMapPinImage}
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.volcLertTopActions}>
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
          <Image source={require('../../elements/images/volclertsysett.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.volcLertSearchWrap}>
        <Image source={require('../../elements/images/volclertsyoserc.png')} />
        <TextInput
          value={volcLertSearchValue}
          onChangeText={setVolcLertSearchValue}
          placeholder="Find a volcano by name"
          placeholderTextColor="#E8D8CEB0"
          style={styles.volcLertSearchInput}
        />
      </View>

      {volcLertSelectedVolcano && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={volcLertHandleOpenSelectedVolcanoDetails}
          style={styles.volcLertSelectedVolcanoCard}
        >
          <LinearGradient
            colors={['#612F47', '#8A3844', '#B13D2F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.volcLertSelectedVolcanoCardInner}
          >
            <Image
              source={volcLertSelectedVolcano.image}
              style={styles.volcLertSelectedVolcanoImage}
            />
            <View style={styles.volcLertSelectedVolcanoCardBody}>
              <TouchableOpacity
                style={styles.volcLertSelectedVolcanoCloseButton}
                onPress={() => {
                  setVolcLertSelectedVolcano(null);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.volcLertSelectedVolcanoCloseButtonText}>
                  ×
                </Text>
              </TouchableOpacity>
              <Text style={styles.volcLertSelectedVolcanoTitle}>
                {volcLertSelectedVolcano.name}
              </Text>
              <Text style={styles.volcLertSelectedVolcanoText}>
                {volcLertSelectedVolcano.location}
              </Text>
              <Text style={styles.volcLertSelectedVolcanoText}>
                {volcLertSelectedVolcano.coordinates}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.volcLertRandomButtonWrap}
        onPress={volcLertHandleOpenRandomVolcano}
        activeOpacity={0.85}
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
    </View>
  );
};

export default Volclertsymap;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
  },
  volcLertMap: {
    ...StyleSheet.absoluteFillObject,
  },
  volcLertMarkerIcon: {
    width: 18,
    height: 24,
    resizeMode: 'contain',
  },
  volcLertMapPinImage: {
    width: 50,
    height: 34,
    resizeMode: 'contain',
  },
  volcLertTopActions: {
    position: 'absolute',
    top: 60,
    left: 22,
    right: 22,
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
  volcLertSearchWrap: {
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
  volcLertRandomButtonWrap: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 35,
  },
  volcLertRandomButton: {
    minHeight: 50,
    borderRadius: 199,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertRandomButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  volcLertSelectedVolcanoCard: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 105,
    borderRadius: 18,
    overflow: 'hidden',
    minHeight: 110,
  },
  volcLertSelectedVolcanoCardInner: {
    padding: 12,
    flexDirection: 'row',
    gap: 10,
  },
  volcLertSelectedVolcanoImage: {
    width: 120,
    height: 96,
    borderRadius: 10,
  },
  volcLertSelectedVolcanoCardBody: {
    flex: 1,
    justifyContent: 'center',
  },
  volcLertSelectedVolcanoCloseButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertSelectedVolcanoCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '700',
    bottom: 1,
  },
  volcLertSelectedVolcanoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  volcLertSelectedVolcanoText: {
    color: '#F5E1D8',
    fontSize: 12,
    marginBottom: 3,
  },
});
