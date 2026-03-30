import Volclertsystlay from '../lclertsystemcmpnts/Volclertsystlay';
import type { volcLertStoryType } from './Volclertsysttries';

import React from 'react';
import { Alert, Image, Share, StyleSheet, Text, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import TouchableOpacity from '../lclertsystemcmpnts/Volclertsystprs';

const Volclertsysttrdet = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { volcLertStory } = route.params as {
    volcLertStory: volcLertStoryType;
  };

  const volcLertHandleBack = () => {
    navigation.goBack();
  };

  const volcLertHandleOpenSettings = () => {
    navigation.navigate('Volclertsysettngs' as never);
  };

  const volcLertHandleShareStory = () => {
    Share.share({
      title: volcLertStory.title,
      message: `${volcLertStory.title}\n\n${volcLertStory.preview}`,
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
            <Image
              source={require('../../elements/images/volclertsyoback.png')}
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

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.volcLertStoryCard}
        >
          <Text style={styles.volcLertStoryTitle}>{volcLertStory.title}</Text>

          <View style={styles.volcLertStoryTextWrap}>
            <Text style={styles.volcLertStoryText}>
              {volcLertStory.preview}
            </Text>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.volcLertShareButtonWrap}
          onPress={volcLertHandleShareStory}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.volcLertShareButton}
          >
            <Text style={styles.volcLertShareButtonText}>Share the story</Text>
            <Image
              source={require('../../elements/images/volclertsyoshre.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Volclertsystlay>
  );
};

export default Volclertsysttrdet;

const styles = StyleSheet.create({
  volcLertContainer: {
    flex: 1,
    paddingTop: 60,
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
  volcLertStoryCard: {
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  volcLertStoryTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  volcLertStoryTextWrap: {
    backgroundColor: '#0000004D',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 320,
  },
  volcLertStoryText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '200',
  },
  volcLertShareButtonWrap: {
    marginTop: 24,
  },
  volcLertShareButton: {
    minHeight: 40,
    borderRadius: 199,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  volcLertShareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
