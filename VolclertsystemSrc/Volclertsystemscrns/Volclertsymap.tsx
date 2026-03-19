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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type volcLertMapVolcanoType = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

const volcLertMapVolcanoes: volcLertMapVolcanoType[] = [
  { id: 'etna', name: 'Mount Etna', latitude: 37.751, longitude: 14.9934 },
  { id: 'kilauea', name: 'Kilauea', latitude: 19.421, longitude: -155.287 },
  {
    id: 'sakurajima',
    name: 'Sakurajima',
    latitude: 31.585,
    longitude: 130.657,
  },
  { id: 'fuji', name: 'Mount Fuji', latitude: 35.3606, longitude: 138.7274 },
  {
    id: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    latitude: -3.0674,
    longitude: 37.3556,
  },
  {
    id: 'rainier',
    name: 'Mount Rainier',
    latitude: 46.8523,
    longitude: -121.7603,
  },
  { id: 'kohala', name: 'Kohala', latitude: 20.13, longitude: -155.8 },
  {
    id: 'arthur-seat',
    name: "Arthur's Seat",
    latitude: 55.944,
    longitude: -3.161,
  },
  {
    id: 'thielsen',
    name: 'Mount Thielsen',
    latitude: 43.153,
    longitude: -122.056,
  },
];

const Volclertsymap = () => {
  const navigation = useNavigation();
  const volcLertMapRef = useRef<MapView | null>(null);
  const [volcLertSearchValue, setVolcLertSearchValue] = useState('');
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
  }, [volcLertVisibleVolcanoes]);

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
            coordinate={{
              latitude: volcLertVolcano.latitude,
              longitude: volcLertVolcano.longitude,
            }}
            title={volcLertVolcano.name}
          >
            <Image
              source={require('../../elements/images/volclertsysmappin.png')}
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
});
