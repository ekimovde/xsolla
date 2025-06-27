import type { InputModel, PaletteConfig } from '../types';

export function createPalette<C extends InputModel>(
  input: C,
  config?: PaletteConfig
): any {
  const result: any = {};

  // Добавляем базовые цвета с применением базового тона
  for (const [colorName, colorData] of Object.entries(input)) {
    let baseColor = { ...colorData };

    // Применяем базовый тон если есть
    if (config?.base) {
      const baseTone = config.base(() => ({}));
      const baseResult = baseTone(colorData);
      baseColor = { ...baseColor, ...baseResult };
    }

    result[colorName] = baseColor;
  }

  // Добавляем тоны и подтоны
  if (config?.tones) {
    for (const [toneName, toneFunction] of Object.entries(config.tones)) {
      for (const [colorName, colorData] of Object.entries(input)) {
        // Основной тон
        const tone = toneFunction(() => ({}));
        const toneResult = tone(colorData);
        result[`${colorName}_${toneName}`] = toneResult;

        // Подтоны
        const toneConfig = (toneFunction as any).__config;
        if (toneConfig?.subtone) {
          for (const [subtoneName, subtoneFunction] of Object.entries(toneConfig.subtone)) {
            const subtoneResult = (subtoneFunction as any)(colorData);
            result[`${colorName}_${subtoneName}_${toneName}`] = subtoneResult;
          }
        }
      }
    }
  }

  return result;
}
