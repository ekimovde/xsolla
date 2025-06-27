import type { InputModel, ToneFunction } from '.';

// Типы для создания палитры с правильной типизацией
export type CreatePaletteKeys<
  C extends InputModel,
  T extends Record<string, ToneFunction>
> =
  | keyof C
  | `${keyof C & string}_${keyof T & string}`
  | `${keyof C & string}_${string}_${keyof T & string}`;

export type CreatePaletteResult<
  C extends InputModel,
  T extends Record<string, ToneFunction>
> = {
  [K in CreatePaletteKeys<C, T>]: K extends keyof C
    ? C[K] & any // Базовый цвет + результат базового тона
    : K extends `${infer _Color}_${infer _Tone}`
      ? any // Результат основного тона
      : K extends `${infer _Color}_${infer _Subtone}_${infer _Tone}`
        ? any // Результат подтона
        : never;
};

// Типы для конкретных примеров из ТЗ
export type ColorsBlue = {
  main: string;
  dark: string;
  light: string;
  extra: string;
  background: string;
  color: string;
};

export type ColorsBlueBrightness = {
  foreground: string;
  customProp: string;
};

export type ColorsBlueLowBrightness = {
  white: string;
};

export type ColorsBlueMediumBrightness = {
  shadow: string;
};

export type ColorsBlueHighBrightness = {
  someProp: string;
  anotherProp: string;
  thirdCustomProp: string;
};

export type ColorsBlueUltraBrightness = {
  intensive: string;
};

export type ColorsBlueDepth = {
  background: string;
  foreground: string;
  color: string;
};

export type ColorsBlue8BitDepth = {
  borderColor: string;
};

export type ColorsBlue16BitDepth = {
  borderColor: string;
  anotherColor: string;
};

export type ColorsBlue24BitDepth = {
  extraColor: string;
};
