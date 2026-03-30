import React, { useMemo, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  type GestureResponderEvent,
  type TouchableOpacityProps,
} from 'react-native';

const Volclertsystprs = ({
  style,
  activeOpacity = 1,
  onPressIn,
  onPressOut,
  ...restProps
}: TouchableOpacityProps) => {
  const volcLertScaleAnim = useRef(new Animated.Value(1)).current;

  const volcLertAnimatedStyle = useMemo(() => {
    const volcLertFlattenedStyle = StyleSheet.flatten(style) || {};
    const volcLertExistingTransform = Array.isArray(
      volcLertFlattenedStyle.transform,
    )
      ? volcLertFlattenedStyle.transform
      : [];

    return [
      volcLertFlattenedStyle,
      { transform: [...volcLertExistingTransform, { scale: volcLertScaleAnim }] },
    ];
  }, [style, volcLertScaleAnim]);

  const volcLertHandlePressIn = (volcLertEvent: GestureResponderEvent) => {
    Animated.spring(volcLertScaleAnim, {
      toValue: 0.97,
      speed: 26,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
    onPressIn?.(volcLertEvent);
  };

  const volcLertHandlePressOut = (volcLertEvent: GestureResponderEvent) => {
    Animated.spring(volcLertScaleAnim, {
      toValue: 1,
      speed: 24,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
    onPressOut?.(volcLertEvent);
  };

  return (
    <Animated.View style={volcLertAnimatedStyle}>
      <TouchableOpacity
        {...restProps}
        activeOpacity={activeOpacity}
        onPressIn={volcLertHandlePressIn}
        onPressOut={volcLertHandlePressOut}
      />
    </Animated.View>
  );
};

export default Volclertsystprs;
