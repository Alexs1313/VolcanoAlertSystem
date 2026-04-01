//  details screen

import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';

import type { exploresystmVolcanoType } from './Exploresystmsystlist';

import React, { useCallback, useState } from 'react';

import { Alert, Image, Share, StyleSheet, Text, View } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../Explorresyystmstrgg/explorresyystmcontxx';
import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

import MapView, { Marker } from 'react-native-maps';

const exploresystmSavedVolcanoesStorageKey = 'exploresystmSavedVolcanoIds';

const Exploresystmsystdet = () => {
  const navigation = useNavigation<any>();
  const { exploresystmDarkMapTheme } = useStore();
  const route = useRoute();
  const { exploresystmVolcano } = route.params as {
    exploresystmVolcano: exploresystmVolcanoType;
  };
  const [exploresystmIsSaved, setVolcLertIsSaved] = useState(false);

  const exploresystmLoadSavedState = useCallback(async () => {
    try {
      const exploresystmSavedIdsRaw = await AsyncStorage.getItem(
        exploresystmSavedVolcanoesStorageKey,
      );
      const exploresystmSavedIds: string[] = exploresystmSavedIdsRaw
        ? JSON.parse(exploresystmSavedIdsRaw)
        : [];
      setVolcLertIsSaved(exploresystmSavedIds.includes(exploresystmVolcano.id));
    } catch {
      setVolcLertIsSaved(false);
    }
  }, [exploresystmVolcano.id]);

  useFocusEffect(
    useCallback(() => {
      exploresystmLoadSavedState();
    }, [exploresystmLoadSavedState]),
  );

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleOpenMap = () => {
    navigation.navigate('Exploresystmsymap', {
      exploresystmTargetVolcano: {
        id: exploresystmVolcano.id,
        name: exploresystmVolcano.name,
        latitude: exploresystmVolcano.latitude,
        longitude: exploresystmVolcano.longitude,
      },
    });
  };

  const exploresystmHandleShare = () => {
    Share.share({
      title: exploresystmVolcano.name,
      message: `${exploresystmVolcano.name}\nLocation: ${exploresystmVolcano.location}\nCoordinates: ${exploresystmVolcano.coordinates}\nHeight: ${exploresystmVolcano.height}\n\n${exploresystmVolcano.description}`,
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
  };

  const exploresystmHandleToggleSave = async () => {
    try {
      const exploresystmSavedIdsRaw = await AsyncStorage.getItem(
        exploresystmSavedVolcanoesStorageKey,
      );
      const exploresystmSavedIds: string[] = exploresystmSavedIdsRaw
        ? JSON.parse(exploresystmSavedIdsRaw)
        : [];

      const exploresystmUpdatedSavedIds = exploresystmSavedIds.includes(
        exploresystmVolcano.id,
      )
        ? exploresystmSavedIds.filter(
            exploresystmSavedVolcanoId =>
              exploresystmSavedVolcanoId !== exploresystmVolcano.id,
          )
        : [...exploresystmSavedIds, exploresystmVolcano.id];

      await AsyncStorage.setItem(
        exploresystmSavedVolcanoesStorageKey,
        JSON.stringify(exploresystmUpdatedSavedIds),
      );
      setVolcLertIsSaved(
        exploresystmUpdatedSavedIds.includes(exploresystmVolcano.id),
      );
    } catch {
      Alert.alert('Error', 'Could not save volcano.');
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

          <View style={styles.exploresystmTopRightActions}>
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

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.exploresystmCard}
        >
          <View>
            <Text style={styles.exploresystmCardTitle}>
              {exploresystmVolcano.name}
            </Text>

            <View style={styles.exploresystmCardBodyWrap}>
              <View style={styles.exploresystmCardBodyInner}>
                <Image
                  source={exploresystmVolcano.image}
                  style={styles.exploresystmCardImage}
                  resizeMode="cover"
                />

                <View style={styles.exploresystmCardContent}>
                  <View style={styles.exploresystmCardButtonsRow}>
                    <TouchableOpacity
                      style={styles.exploresystmOpenMapButtonWrap}
                      activeOpacity={0.85}
                      onPress={exploresystmHandleOpenMap}
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
                      onPress={exploresystmHandleShare}
                    >
                      <Image
                        source={require('../../elements/images/volclertsyoshre.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.exploresystmSaveRoundButton,
                        exploresystmIsSaved &&
                          styles.exploresystmSaveRoundButtonActive,
                      ]}
                      activeOpacity={0.85}
                      onPress={exploresystmHandleToggleSave}
                    >
                      <Image
                        source={
                          exploresystmIsSaved
                            ? require('../../elements/images/volclertsmsaved.png')
                            : require('../../elements/images/volclertsmasv.png')
                        }
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
                </View>
              </View>
              <MapView
                style={styles.exploresystmMap}
                userInterfaceStyle={exploresystmDarkMapTheme ? 'dark' : 'light'}
                initialRegion={{
                  latitude: exploresystmVolcano.latitude,
                  longitude: exploresystmVolcano.longitude,
                  latitudeDelta: 1.2,
                  longitudeDelta: 1.2,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: exploresystmVolcano.latitude,
                    longitude: exploresystmVolcano.longitude,
                  }}
                  title={exploresystmVolcano.name}
                >
                  <Image
                    source={require('../../elements/images/volclertsyopin.png')}
                  />
                </Marker>
              </MapView>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsystdet;

const styles = StyleSheet.create({
  exploresystmTopIconButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  exploresystmContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 22,
  },

  exploresystmTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
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
  exploresystmCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 14,
  },
  exploresystmCardBodyWrap: {
    backgroundColor: '#0000004D',
    overflow: 'hidden',
    paddingBottom: 30,
  },
  exploresystmCardBodyInner: {
    padding: 7,
  },
  exploresystmCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 14,
  },
  exploresystmCardImage: {
    width: '100%',
    height: 190,
    borderRadius: 2,
  },
  exploresystmCardContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
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
  exploresystmSaveRoundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E26A35',
    paddingHorizontal: 12,
  },
  exploresystmSaveRoundButtonActive: {
    backgroundColor: '#E26A35',
  },
  exploresystmSaveRoundButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  exploresystmCardInfoText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  exploresystmCardInfoBold: {
    color: '#fff',
    fontWeight: '700',
  },
  exploresystmMap: {
    marginTop: 12,
    width: '100%',
    height: 250,
    borderRadius: 2,
  },
});
