import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * Safely flattens style arrays for web compatibility
 * Fixes "Failed to set an indexed property on CSSStyleDeclaration" error in Brave/Chrome
 */
export const flattenStyle = (style: Style | Style[]): Style => {
  if (!style) return {};
  if (!Array.isArray(style)) return style;
  
  // Use StyleSheet.flatten for React Native Web compatibility
  return StyleSheet.flatten(style);
};

/**
 * Hook to safely merge styles with theme support
 */
export const useSafeStyle = (baseStyle: Style, dynamicStyle?: Style): Style => {
  if (!dynamicStyle) return baseStyle || {};
  return flattenStyle([baseStyle, dynamicStyle]);
};