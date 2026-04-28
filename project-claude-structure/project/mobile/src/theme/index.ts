import { colors, type Colors } from './colors';
import { spacing, type Spacing } from './spacing';

export const theme = {
  colors,
  spacing,
} as const;

export type Theme = {
  colors: Colors;
  spacing: Spacing;
};

export { colors, spacing };
export type { Colors, Spacing };