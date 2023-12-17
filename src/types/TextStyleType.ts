export type BaseText = {
  id: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
};

export type TextWithFontStyle = BaseText & {
  name: string;
};

type TextWithoutFontStyle = BaseText & {
  fontName: string;
};

export type TextStyleType = TextWithFontStyle | TextWithoutFontStyle;
