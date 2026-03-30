// settings

import { useStore } from '../[lclertsystemstorggee]/volclertsystcntx';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, Image, Linking, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

const Volclertsysettngs = () => {
  const navigation = useNavigation();
  const {
    volcLertVibration,
    setVolcLertVibration,
    volcLertBackgroundMusic,
    setVolcLertBackgroundMusic,
    volcLertDarkMapTheme,
    setVolcLertDarkMapTheme,
  } = useStore();

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleShareMap = () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/volcanoscoln-system/id6761371181',
    );
  };

  const volcLertToggleBackgroundMusic = async (selectedValue: boolean) => {
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

  const volcLertToggleVibration = async (selectedValue: boolean) => {
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

  const volcLertToggleDarkMapTheme = async (selectedValue: boolean) => {
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

  const volcLertHandleDeleteAllSaved = () => {
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
                AsyncStorage.removeItem('volcLertSavedVolcanoIds'),
                AsyncStorage.removeItem('volcLertSavedFacts'),
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
    <Volclertsystlay>
      <View style={styles.volcLertContainer}>
        <TouchableOpacity
          style={styles.volcLertBackButton}
          onPress={volcLertHandleBack}
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
          style={styles.volcLertSettingsCard}
        >
          <View style={styles.volcLertSettingsCardInner}>
            <View style={styles.volcLertSettingsRow}>
              <Text style={styles.volcLertSettingsLabel}>Vibration</Text>
              <TouchableOpacity
                onPress={() => volcLertToggleVibration(!volcLertVibration)}
                activeOpacity={0.8}
              >
                {volcLertVibration ? (
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

            <View style={styles.volcLertDivider} />

            <View style={styles.volcLertSettingsRow}>
              <Text style={styles.volcLertSettingsLabel}>Music</Text>
              <TouchableOpacity
                onPress={() =>
                  volcLertToggleBackgroundMusic(!volcLertBackgroundMusic)
                }
                activeOpacity={0.8}
              >
                {volcLertBackgroundMusic ? (
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

            <View style={styles.volcLertDivider} />

            <View style={styles.volcLertSettingsRow}>
              <Text style={styles.volcLertSettingsLabel}>Dark map</Text>
              <TouchableOpacity
                onPress={() =>
                  volcLertToggleDarkMapTheme(!volcLertDarkMapTheme)
                }
                activeOpacity={0.8}
              >
                {volcLertDarkMapTheme ? (
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
          style={styles.volcLertShareButtonWrap}
          onPress={volcLertHandleShareMap}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.volcLertShareButton}
          >
            <Text style={styles.volcLertShareButtonText}>Share the app</Text>
            <Image
              source={require('../../elements/images/volclertsyoshre.png')}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.volcLertDeleteButtonWrap}
          onPress={volcLertHandleDeleteAllSaved}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#8F2B2B', '#C53D3D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.volcLertDeleteButton}
          >
            <Text style={styles.volcLertDeleteButtonText}>
              Delete all saved
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsysettngs;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 22,
  },
  volcLertBackButton: {
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  volcLertBackIcon: {
    fontSize: 34,
    color: '#FF8E3A',
    fontWeight: '700',
  },
  volcLertSettingsCard: {
    marginTop: 20,
    borderRadius: 24,
  },
  volcLertSettingsCardInner: {
    padding: 20,
  },
  volcLertSettingsRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volcLertSettingsLabel: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  volcLertDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginVertical: 4,
    marginBottom: 10,
  },
  volcLertShareButtonWrap: {
    marginTop: 'auto',
  },
  volcLertShareButton: {
    minHeight: 60,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  volcLertShareButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  volcLertDeleteButtonWrap: {
    marginTop: 12,
  },
  volcLertDeleteButton: {
    minHeight: 56,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volcLertDeleteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
