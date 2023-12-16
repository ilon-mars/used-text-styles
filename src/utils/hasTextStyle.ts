import { TextStyleType, TextWithFontStyle } from '@/types';

export const hasTextStyle = (style: TextStyleType): style is TextWithFontStyle =>
  Object.hasOwn(style, 'name');
