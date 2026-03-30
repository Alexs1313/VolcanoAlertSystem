//  details screen

import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';

import type { volcLertVolcanoType } from './Volclertsystlist';
import React, { useCallback, useState } from 'react';
import { Alert, Image, Share, StyleSheet, Text, View } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../[lclertsystemstorggee]/volclertsystcntx';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

import MapView, { Marker } from 'react-native-maps';

const volcLertSavedVolcanoesStorageKey = 'volcLertSavedVolcanoIds';

const Volclertsystdet = () => {
  const navigation = useNavigation<any>();
  const { volcLertDarkMapTheme } = useStore();
  const route = useRoute();
  const { volcLertVolcano } = route.params as {
    volcLertVolcano: volcLertVolcanoType;
  };
  const [volcLertIsSaved, setVolcLertIsSaved] = useState(false);

  const volcLertLoadSavedState = useCallback(async () => {
    try {
      const volcLertSavedIdsRaw = await AsyncStorage.getItem(
        volcLertSavedVolcanoesStorageKey,
      );
      const volcLertSavedIds: string[] = volcLertSavedIdsRaw
        ? JSON.parse(volcLertSavedIdsRaw)
        : [];
      setVolcLertIsSaved(volcLertSavedIds.includes(volcLertVolcano.id));
    } catch {
      setVolcLertIsSaved(false);
    }
  }, [volcLertVolcano.id]);

  useFocusEffect(
    useCallback(() => {
      volcLertLoadSavedState();
    }, [volcLertLoadSavedState]),
  );

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleOpenMap = () => {
    navigation.navigate('Volclertsymap', {
      volcLertTargetVolcano: {
        id: volcLertVolcano.id,
        name: volcLertVolcano.name,
        latitude: volcLertVolcano.latitude,
        longitude: volcLertVolcano.longitude,
      },
    });
  };

  const volcLertHandleShare = () => {
    Share.share({
      title: volcLertVolcano.name,
      message: `${volcLertVolcano.name}\nLocation: ${volcLertVolcano.location}\nCoordinates: ${volcLertVolcano.coordinates}\nHeight: ${volcLertVolcano.height}\n\n${volcLertVolcano.description}`,
    }).catch(() => {
      Alert.alert('Error', 'Could not open share dialog.');
    });
  };

  const volcLertHandleToggleSave = async () => {
    try {
      const volcLertSavedIdsRaw = await AsyncStorage.getItem(
        volcLertSavedVolcanoesStorageKey,
      );
      const volcLertSavedIds: string[] = volcLertSavedIdsRaw
        ? JSON.parse(volcLertSavedIdsRaw)
        : [];

      const volcLertUpdatedSavedIds = volcLertSavedIds.includes(
        volcLertVolcano.id,
      )
        ? volcLertSavedIds.filter(
            volcLertSavedVolcanoId =>
              volcLertSavedVolcanoId !== volcLertVolcano.id,
          )
        : [...volcLertSavedIds, volcLertVolcano.id];

      await AsyncStorage.setItem(
        volcLertSavedVolcanoesStorageKey,
        JSON.stringify(volcLertUpdatedSavedIds),
      );
      setVolcLertIsSaved(volcLertUpdatedSavedIds.includes(volcLertVolcano.id));
    } catch {
      Alert.alert('Error', 'Could not save volcano.');
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

          <View style={styles.volcLertTopRightActions}>
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

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.volcLertCard}
        >
          <View>
            <Text style={styles.volcLertCardTitle}>{volcLertVolcano.name}</Text>

            <View style={styles.volcLertCardBodyWrap}>
              <View style={styles.volcLertCardBodyInner}>
                <Image
                  source={volcLertVolcano.image}
                  style={styles.volcLertCardImage}
                  resizeMode="cover"
                />

                <View style={styles.volcLertCardContent}>
                  <View style={styles.volcLertCardButtonsRow}>
                    <TouchableOpacity
                      style={styles.volcLertOpenMapButtonWrap}
                      activeOpacity={0.85}
                      onPress={volcLertHandleOpenMap}
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
                      onPress={volcLertHandleShare}
                    >
                      <Image
                        source={require('../../elements/images/volclertsyoshre.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.volcLertSaveRoundButton,
                        volcLertIsSaved && styles.volcLertSaveRoundButtonActive,
                      ]}
                      activeOpacity={0.85}
                      onPress={volcLertHandleToggleSave}
                    >
                      <Image
                        source={
                          volcLertIsSaved
                            ? require('../../elements/images/volclertsmsaved.png')
                            : require('../../elements/images/volclertsmasv.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.volcLertCardInfoText}>
                    <Text style={styles.volcLertCardInfoBold}>Location: </Text>
                    {volcLertVolcano.location}
                  </Text>
                  <Text style={styles.volcLertCardInfoText}>
                    <Text style={styles.volcLertCardInfoBold}>
                      Coordinates:{' '}
                    </Text>
                    {volcLertVolcano.coordinates}
                  </Text>
                  <Text style={styles.volcLertCardInfoText}>
                    <Text style={styles.volcLertCardInfoBold}>Height: </Text>
                    {volcLertVolcano.height}
                  </Text>
                  <Text style={styles.volcLertCardInfoText}>
                    <Text style={styles.volcLertCardInfoBold}>
                      Description:{' '}
                    </Text>
                    {volcLertVolcano.description}
                  </Text>
                </View>
              </View>
              <MapView
                style={styles.volcLertMap}
                userInterfaceStyle={volcLertDarkMapTheme ? 'dark' : 'light'}
                initialRegion={{
                  latitude: volcLertVolcano.latitude,
                  longitude: volcLertVolcano.longitude,
                  latitudeDelta: 1.2,
                  longitudeDelta: 1.2,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: volcLertVolcano.latitude,
                    longitude: volcLertVolcano.longitude,
                  }}
                  title={volcLertVolcano.name}
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
    </Volclertsystlay>
  );
};

export default Volclertsystdet;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 22,
  },
  volcLertTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
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
  volcLertCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 14,
  },
  volcLertCardBodyWrap: {
    backgroundColor: '#0000004D',
    overflow: 'hidden',
    paddingBottom: 30,
  },
  volcLertCardBodyInner: {
    padding: 7,
  },
  volcLertCardTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 14,
  },
  volcLertCardImage: {
    width: '100%',
    height: 190,
    borderRadius: 2,
  },
  volcLertCardContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
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
  volcLertSaveRoundButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E26A35',
    paddingHorizontal: 12,
  },
  volcLertSaveRoundButtonActive: {
    backgroundColor: '#E26A35',
  },
  volcLertSaveRoundButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  volcLertCardInfoText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  volcLertCardInfoBold: {
    color: '#fff',
    fontWeight: '700',
  },
  volcLertMap: {
    marginTop: 12,
    width: '100%',
    height: 250,
    borderRadius: 2,
  },
});
