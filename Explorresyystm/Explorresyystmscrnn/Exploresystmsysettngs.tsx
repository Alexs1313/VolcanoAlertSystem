// settings

import { useStore } from '../Explorresyystmstrgg/explorresyystmcontxx';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { Alert, Image, Linking, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';

import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';

import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

const Exploresystmsysettngs = () => {
  const navigation = useNavigation();
  const {
    exploresystmVibration,
    setVolcLertVibration,
    exploresystmBackgroundMusic,
    setVolcLertBackgroundMusic,
  } = useStore();

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleShareMap = () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/volcan-system-alert/id6761497203',
    );
  };

  const exploresystmToggleBackgroundMusic = async (selectedValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleVolcLertBackgroundMusic',
        JSON.stringify(selectedValue),
      );
      setVolcLertBackgroundMusic(selectedValue);
    } catch (error) {
      console.log('Error background music', error);
    }
  };

  const exploresystmToggleVibration = async (selectedValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleVolcLertVibration',
        JSON.stringify(selectedValue),
      );
      setVolcLertVibration(selectedValue);
    } catch (error) {
      console.log('Error vibration', error);
    }
  };

  const exploresystmToggleDarkMapTheme = async (selectedValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'toggleVolcLertDarkMapTheme',
        JSON.stringify(selectedValue),
      );
      setVolcLertDarkMapTheme(selectedValue);
    } catch (error) {
      console.log('Error map theme', error);
    }
  };

  const exploresystmHandleDeleteAllSaved = () => {
    Alert.alert(
      'Delete all saved',
      'Are you sure you want to delete all saved places and facts?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await Promise.all([
                AsyncStorage.removeItem('exploresystmSavedVolcanoIds'),
                AsyncStorage.removeItem('exploresystmSavedFacts'),
              ]);
              Alert.alert('Done', 'All saved data was deleted.');
            } catch (error) {
              console.log('Error delete saved', error);
              Alert.alert('Error', 'Could not delete saved data.');
            }
          },
        },
      ],
    );
  };

  return (
    <Exploresystmsystlay>
      <View style={styles.exploresystmContainer}>
        <TouchableOpacity
          style={styles.exploresystmBackButton}
          onPress={exploresystmHandleBack}
          activeOpacity={0.8}
        >
          <Image
            source={require('../../elements/images/volclertsyoback.png')}
          />
        </TouchableOpacity>

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.exploresystmSettingsCard}
        >
          <View style={styles.exploresystmSettingsCardInner}>
            <View style={styles.exploresystmSettingsRow}>
              <Text style={styles.exploresystmSettingsLabel}>Vibration</Text>
              <TouchableOpacity
                onPress={() =>
                  exploresystmToggleVibration(!exploresystmVibration)
                }
                activeOpacity={0.8}
              >
                {exploresystmVibration ? (
                  <Image
                    source={require('../../elements/images/volclertsyswact.png')}
                  />
                ) : (
                  <Image
                    source={require('../../elements/images/volclertsyswinact.png')}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.exploresystmDivider} />

            <View style={styles.exploresystmSettingsRow}>
              <Text style={styles.exploresystmSettingsLabel}>Music</Text>
              <TouchableOpacity
                onPress={() =>
                  exploresystmToggleBackgroundMusic(
                    !exploresystmBackgroundMusic,
                  )
                }
                activeOpacity={0.8}
              >
                {exploresystmBackgroundMusic ? (
                  <Image
                    source={require('../../elements/images/volclertsyswact.png')}
                  />
                ) : (
                  <Image
                    source={require('../../elements/images/volclertsyswinact.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.exploresystmShareButtonWrap}
          onPress={exploresystmHandleShareMap}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.exploresystmShareButton}
          >
            <Text style={styles.exploresystmShareButtonText}>
              Share the app
            </Text>
            <Image
              source={require('../../elements/images/volclertsyoshre.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Exploresystmsystlay>
  );
};

export default Exploresystmsysettngs;

const styles = StyleSheet.create({
  exploresystmContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 22,
  },
  exploresystmBackButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  exploresystmBackIcon: {
    fontSize: 34,
    color: '#FF8E3A',
    fontWeight: '700',
  },
  exploresystmSettingsCard: {
    marginTop: 20,
    borderRadius: 24,
  },
  exploresystmSettingsCardInner: {
    padding: 20,
  },
  exploresystmSettingsRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exploresystmSettingsLabel: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  exploresystmDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginVertical: 4,
    marginBottom: 10,
  },
  exploresystmShareButtonWrap: {
    marginTop: 'auto',
  },
  exploresystmShareButton: {
    minHeight: 60,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  exploresystmShareButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  exploresystmDeleteButtonWrap: {
    marginTop: 12,
  },
  exploresystmDeleteButton: {
    minHeight: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploresystmDeleteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
