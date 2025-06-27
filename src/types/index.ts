// Базовые типы
export type ColorsUnion = 'red' | 'green' | 'blue' | 'yellow';

export type ColorData = {
  main: string;
  dark: string;
  light: string;
  extra: string;
};

export type InputModel = Record<ColorsUnion, ColorData>;

// Типы для тонов
export type ToneTransformer<T = any> = (data: ColorData) => T;

export type SubtoneConfig = {
  [key: string]: ToneTransformer<any>;
};

export type ToneConfig = {
  name?: string;
  subtone?: SubtoneConfig;
};

export type ToneFunction = (
  transformer: ToneTransformer<any>,
  config?: ToneConfig
) => ToneTransformer<any>;

// Типы для палитры
export type PaletteConfig = {
  base?: ToneFunction;
  tones?: Record<string, ToneFunction>;
};

// Типы для результирующего объекта
export type BaseColorResult<T> = ColorData & T;

export type ToneResult<T> = T;

export type SubtoneResult<T> = T;

// Комбинированные типы для ключей палитры
export type PaletteKeys<C extends InputModel, T extends Record<string, ToneFunction>> =
  | keyof C
  | `${keyof C & string}_${keyof T & string}`
  | `${keyof C & string}_${string}_${keyof T & string}`;

// Тип для результирующей палитры
export type PaletteResult<C extends InputModel, T extends Record<string, ToneFunction>> = {
  [K in PaletteKeys<C, T>]: K extends keyof C
    ? BaseColorResult<any>
    : K extends `${infer _Color}_${infer _Tone}`
      ? ToneResult<any>
      : K extends `${infer _Color}_${infer _Subtone}_${infer _Tone}`
        ? SubtoneResult<any>
        : never;
};
