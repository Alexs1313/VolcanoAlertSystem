import Exploresystmsystlay from '../Explorresyystmcmpns/Exploresystmsystlay';
import type { exploresystmStoryType } from './Exploresystmsysttries';

import React from 'react';

import { Alert, Image, Share, StyleSheet, Text, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import TouchableOpacity from '../Explorresyystmcmpns/Exploresystmsystprs';

const Exploresystmsysttrdet = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { exploresystmStory } = route.params as {
    exploresystmStory: exploresystmStoryType;
  };

  const exploresystmHandleBack = () => {
    navigation.goBack();
  };

  const exploresystmHandleOpenSettings = () => {
    navigation.navigate('Exploresystmsysettngs' as never);
  };

  const exploresystmHandleShareStory = () => {
    Share.share({
      title: exploresystmStory.title,
      message: `${exploresystmStory.title}\n\n${exploresystmStory.preview}`,
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
            <Image
              source={require('../../elements/images/volclertsyoback.png')}
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

        <LinearGradient
          colors={['#612F47', '#8A3844', '#B13D2F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.exploresystmStoryCard}
        >
          <Text style={styles.exploresystmStoryTitle}>
            {exploresystmStory.title}
          </Text>

          <View style={styles.exploresystmStoryTextWrap}>
            <Text style={styles.exploresystmStoryText}>
              {exploresystmStory.preview}
            </Text>
          </View>
        </LinearGradient>

        <TouchableOpacity
          style={styles.exploresystmShareButtonWrap}
          onPress={exploresystmHandleShareStory}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#CF4E27', '#ED7635']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.exploresystmShareButton}
          >
            <Text style={styles.exploresystmShareButtonText}>
              Share the story
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

export default Exploresystmsysttrdet;

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
    paddingBottom: 40,
    paddingHorizontal: 22,
  },
  exploresystmTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  exploresystmStoryCard: {
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },

  exploresystmStoryTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  exploresystmStoryTextWrap: {
    backgroundColor: '#0000004D',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 320,
  },
  exploresystmStoryText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '200',
  },
  exploresystmShareButtonWrap: {
    marginTop: 24,
  },
  exploresystmShareButton: {
    minHeight: 40,
    borderRadius: 199,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  exploresystmShareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
