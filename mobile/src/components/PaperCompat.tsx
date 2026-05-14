/**
 * Web-compatible replacements for react-native-paper components.
 * react-native-paper internally uses react-native-web which is incompatible with React 19.
 * These use only React Native core APIs that work on both native and web.
 */
import React from 'react';
import {
  Text as RNText,
  View,
  TextInput as RNTextInput,
  Button as RNButton,
  Switch as RNSwitch,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { ActivityIndicator } from 'react-native';

export { ActivityIndicator };

// --- Text ---
export function Text({ variant, style, children, ...props }: any) {
  return (
    <RNText style={[getTextStyle(variant), style]} {...props}>
      {children}
    </RNText>
  );
}

function getTextStyle(variant?: string): TextStyle {
  switch (variant) {
    case 'headlineLarge': return { fontSize: 28, fontWeight: '700' };
    case 'headlineMedium': return { fontSize: 24, fontWeight: '600' };
    case 'headlineSmall': return { fontSize: 20, fontWeight: '600' };
    case 'titleLarge': return { fontSize: 18, fontWeight: '600' };
    case 'titleMedium': return { fontSize: 16, fontWeight: '500' };
    case 'titleSmall': return { fontSize: 14, fontWeight: '500' };
    case 'bodyLarge': return { fontSize: 16 };
    case 'bodyMedium': return { fontSize: 14 };
    case 'bodySmall': return { fontSize: 12 };
    default: return { fontSize: 14 };
  }
}

// --- TextInput ---
export function TextInput({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  disabled,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  testID,
  mode,
  ...props
}: any) {
  const [focused, setFocused] = React.useState(false);
  return (
    <View>
      {label && (
        <RNText style={[styles.inputLabel, error && { color: '#D32F2F' }]}>
          {label}
        </RNText>
      )}
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={(e: any) => { setFocused(false); onBlur?.(e); }}
        onFocus={() => setFocused(true)}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        testID={testID}
        placeholderTextColor="#9E9E9E"
        style={[
          styles.textInput,
          focused && { borderColor: '#6200EE' },
          error && { borderColor: '#D32F2F' },
          disabled && { backgroundColor: '#F5F5F5', color: '#9E9E9E' },
        ]}
        {...props}
      />
    </View>
  );
}

// --- Button ---
export function Button({
  mode = 'contained',
  onPress,
  loading,
  disabled,
  children,
  style,
  labelStyle,
  contentStyle,
  textColor,
  ...props
}: any) {
  const isDisabled = disabled || loading;
  let bgColor = 'transparent';
  let borderColor = 'transparent';
  let txtColor = textColor || '#6200EE';

  if (mode === 'contained') {
    bgColor = '#6200EE';
    txtColor = '#FFFFFF';
  } else if (mode === 'outlined') {
    bgColor = 'transparent';
    borderColor = '#6200EE';
    txtColor = textColor || '#6200EE';
  }

  return (
    <RNButton
      onPress={onPress}
      disabled={isDisabled}
      color={bgColor}
      style={[
        styles.button,
        mode !== 'text' && { backgroundColor: bgColor, borderRadius: 8 },
        mode === 'outlined' && { borderWidth: 1, borderColor },
        isDisabled && { opacity: 0.5 },
        style,
      ]}
      labelStyle={[
        styles.buttonLabel,
        { color: mode === 'contained' ? '#FFFFFF' : txtColor },
        labelStyle,
      ]}
      contentStyle={[{ paddingVertical: 8 }, contentStyle]}
      loading={loading}
      {...props}
    >
      {children}
    </RNButton>
  );
}

// --- Card ---
export function Card({ children, style, onPress, ...props }: any) {
  const content = React.Children.toArray(children).find(
    (c: any) => c?.type === CardContent
  );
  const rest = React.Children.toArray(children).filter(
    (c: any) => c?.type !== CardContent
  );

  const cardStyle: ViewStyle[] = [styles.card];
  if (style) cardStyle.push(style as ViewStyle);

  if (onPress) {
    return (
      <View style={cardStyle} {...props}>
        {content}
      </View>
    );
  }
  return (
    <View style={cardStyle} {...props}>
      {content}
    </View>
  );
}

export function CardContent({ children, style }: any) {
  return <View style={[styles.cardContent, style]}>{children}</View>;
}

// --- Avatar ---
export function Avatar({ children, size = 40, style, ...props }: any) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

export function AvatarText({ size = 40, label, style, ...props }: any) {
  return (
    <View
      style={[
        styles.avatar,
        styles.avatarText,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      {...props}
    >
      <RNText style={[styles.avatarLabel, { fontSize: size * 0.4 }]}>{label}</RNText>
    </View>
  );
}

// --- HelperText ---
export function HelperText({ type = 'info', visible = true, children, style }: any) {
  if (!visible) return null;
  return (
    <RNText style={[styles.helperText, type === 'error' && { color: '#D32F2F' }, style]}>
      {children}
    </RNText>
  );
}

// --- Switch ---
export function Switch({ value, onValueChange, disabled, ...props }: any) {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{ false: '#E0E0E0', true: '#BB86FC' }}
      thumbColor={value ? '#FFFFFF' : '#F5F5F5'}
      {...props}
    />
  );
}

// --- ProgressBar ---
export function ProgressBar({ progress, color = '#6200EE', style }: any) {
  return (
    <View style={[styles.progressBarBg, style]}>
      <View
        style={[
          styles.progressBarFill,
          { width: `${Math.round(progress * 100)}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

// --- Chip ---
export function Chip({
  children,
  selected,
  onPress,
  style,
  showSelectedOverlay,
  textStyle,
  ...props
}: any) {
  return (
    <View
      style={[
        styles.chip,
        selected && { backgroundColor: '#E8DEF8', borderColor: '#6200EE' },
        style,
      ]}
      {...props}
    >
      {typeof children === 'string' ? (
        <RNText
          onPress={onPress}
          style={[
            styles.chipText,
            selected && { color: '#6200EE', fontWeight: '600' },
            textStyle,
          ]}
        >
          {children}
        </RNText>
      ) : (
        <View onTouchEnd={onPress}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#FFFFFF',
  },
  button: {
    borderRadius: 8,
    minWidth: 88,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  avatar: {
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {},
  avatarLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 13,
    color: '#212121',
  },
});
