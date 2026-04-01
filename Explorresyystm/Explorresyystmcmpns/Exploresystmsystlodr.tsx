// WelcomeLoader.tsx

import WebView from 'react-native-webview';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const exploresystmLoaderHTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  html, body {
    margin: 0;
    padding: 0;
    background: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }

  .box {
    width: 20px;
    height: 20px;
    margin: 0 8px;
    border-radius: 50%;
    animation: jump 1s ease-in-out infinite;
  }

  .box:nth-child(1) {
    background-color: #4e4e4e;
    animation-delay: 0.2s;
  }

  .box:nth-child(2) {
    background-color: #bdbdbd;
    animation-delay: 0.4s;
  }

  .box:nth-child(3) {
    background-color: #4e4e4e;
    animation-delay: 0.6s;
  }

  .box:nth-child(4) {
    background-color: #bdbdbd;
    animation-delay: 0.8s;
  }

  @keyframes jump {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
  }
</style>
</head>
<body>
  <div class="loader">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</body>
</html>
`;

const Exploresystmsystlodr = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const exploresystmTimer = setTimeout(() => {
      navigation.replace('Exploresystmsystonbrdn' as never);
    }, 6000);

    return () => clearTimeout(exploresystmTimer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../elements/images/volclertsystloadrback.png')}
      style={styles.exploresystmImageBackground}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.exploresystmWebviewDock}>
          <WebView
            originWhitelist={['*']}
            source={{ html: exploresystmLoaderHTML }}
            style={styles.exploresystmWebview}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Exploresystmsystlodr;

const styles = StyleSheet.create({
  exploresystmImageBackground: {
    flex: 1,
  },
  exploresystmWebviewDock: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  exploresystmWebview: {
    backgroundColor: 'transparent',
    width: 260,
    height: 250,
  },
});
