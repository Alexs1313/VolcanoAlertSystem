import React, { useMemo, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  type GestureResponderEvent,
  type TouchableOpacityProps,
} from 'react-native';

const Exploresystmsystprs = ({
  style,
  activeOpacity = 1,
  onPressIn,
  onPressOut,
  ...restProps
}: TouchableOpacityProps) => {
  const exploresystmScaleAnim = useRef(new Animated.Value(1)).current;

  const exploresystmAnimatedStyle = useMemo(() => {
    const exploresystmFlattenedStyle = StyleSheet.flatten(style) || {};
    const exploresystmExistingTransform = Array.isArray(
      exploresystmFlattenedStyle.transform,
    )
      ? exploresystmFlattenedStyle.transform
      : [];

    return [
      exploresystmFlattenedStyle,
      { transform: [...exploresystmExistingTransform, { scale: exploresystmScaleAnim }] },
    ];
  }, [style, exploresystmScaleAnim]);

  const exploresystmHandlePressIn = (exploresystmEvent: GestureResponderEvent) => {
    Animated.spring(exploresystmScaleAnim, {
      toValue: 0.97,
      speed: 26,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
    onPressIn?.(exploresystmEvent);
  };

  const exploresystmHandlePressOut = (exploresystmEvent: GestureResponderEvent) => {
    Animated.spring(exploresystmScaleAnim, {
      toValue: 1,
      speed: 24,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
    onPressOut?.(exploresystmEvent);
  };

  return (
    <Animated.View style={exploresystmAnimatedStyle}>
      <TouchableOpacity
        {...restProps}
        activeOpacity={activeOpacity}
        onPressIn={exploresystmHandlePressIn}
        onPressOut={exploresystmHandlePressOut}
      />
    </Animated.View>
  );
};

export default Exploresystmsystprs;
