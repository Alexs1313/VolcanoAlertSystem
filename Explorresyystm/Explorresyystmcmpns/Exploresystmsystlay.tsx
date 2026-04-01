import React from 'react';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';

const Exploresystmsystlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageBackground
      source={require('../../elements/images/volclertsystbk.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Exploresystmsystlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
