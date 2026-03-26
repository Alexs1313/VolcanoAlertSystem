// settings

import { useStore } from '../Volclertsystemstorg/volclertsystcntx';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Volclertsystlay from '../Volclertsystemcmpnt/Volclertsystlay';

const Volclertsysettngs = () => {
  const navigation = useNavigation();
  const {
    volcLertVibration,
    setVolcLertVibration,
    volcLertBackgroundMusic,
    setVolcLertBackgroundMusic,
  } = useStore();

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleShareMap = () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/volcanoscoln-system/id6761206867',
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
          <View style={{ padding: 20 }}>
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
});
