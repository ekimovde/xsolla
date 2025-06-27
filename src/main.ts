import { createTone } from './functions/createTone';
import { createPalette } from './functions/createPalette';
import type { InputModel } from './types';
import type {
  ColorsBlue,
  ColorsBlueBrightness,
  ColorsBlueLowBrightness,
  ColorsBlueMediumBrightness,
  ColorsBlueHighBrightness,
  ColorsBlueUltraBrightness,
  ColorsBlueDepth,
  ColorsBlue8BitDepth,
  ColorsBlue16BitDepth,
  ColorsBlue24BitDepth
} from './types/AdvancedTypes';

// Исходные данные
const input: InputModel = {
  red: {
    main: 'red',
    dark: 'darkred',
    light: 'lightred',
    extra: 'extrared',
  },
  green: {
    main: 'green',
    dark: 'darkgreen',
    light: 'lightgreen',
    extra: 'extragreen',
  },
  blue: {
    main: 'blue',
    dark: 'darkblue',
    light: 'lightblue',
    extra: 'extrablue',
  },
  yellow: {
    main: 'yellow',
    dark: 'darkyellow',
    light: 'lightyellow',
    extra: 'extrayellow',
  },
};

// Создаем тоны
const baseColors = createTone((data) => ({
  background: data.main,
  color: data.main,
}));

const brightness = createTone((data) => ({
  foreground: data.main,
  customProp: '#f0f0f0'
}), {
  name: 'brightness',
  subtone: {
    low: (data) => ({ white: data.light }),
    medium: (data) => ({ shadow: data.main }),
    high: (data) => ({
      someProp: 'transparent',
      anotherProp: '#fff',
      thirdCustomProp: data.main,
    }),
    ultra: (data) => ({ intensive: data.extra }),
  },
});

const depths = createTone((data) => ({
  background: data.light,
  foreground: data.main,
  color: data.extra,
}), {
  name: 'depth',
  subtone: {
    '8-bit': (data) => ({
      borderColor: data.main,
    }),
    '16-bit': (data) => ({
      borderColor: data.main,
      anotherColor: data.light,
    }),
    '24-bit': (data) => ({
      extraColor: data.extra,
    }),
  },
});

// Создаем палитру
const colors = createPalette(input, {
  base: baseColors,
  tones: {
    brightness,
    depths
  },
});

// Выводим результат в консоль
console.log('Generated Color Palette:', colors);

// Отладочная информация
console.log('Available keys:', Object.keys(colors));
console.log('blue_8-bit_depths exists:', 'blue_8-bit_depths' in colors);
console.log('blue_8-bit_depths value:', colors['blue_8-bit_depths']);

// Отображаем результат на странице
const app = document.getElementById('app');
const output = document.getElementById('output');
const colorPreview = document.getElementById('colorPreview');

if (app && output && colorPreview) {
  app.innerHTML = '<h2>Результат генерации палитры:</h2>';

  // Выводим JSON
  output.textContent = JSON.stringify(colors, null, 2);

  // Создаем визуальный превью цветов
  const colorItems = Object.entries(colors).map(([key, value]) => {
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';

    const colorName = document.createElement('div');
    colorName.className = 'color-item__name';
    colorName.textContent = key;

    const colorValue = document.createElement('div');
    colorValue.className = 'color-item__value';
    colorValue.textContent = JSON.stringify(value, null, 2);

    colorItem.appendChild(colorName);
    colorItem.appendChild(colorValue);

    return colorItem;
  });

  colorItems.forEach(item => colorPreview.appendChild(item));
}

// Примеры типизации (для демонстрации)
const colorsBlue: ColorsBlue = colors.blue;
const colorsBlueBrightness: ColorsBlueBrightness = colors.blue_brightness;
const colorsBlueLowBrightness: ColorsBlueLowBrightness = colors.blue_low_brightness;
const colorsBlueMediumBrightness: ColorsBlueMediumBrightness = colors.blue_medium_brightness;
const colorsBlueHighBrightness: ColorsBlueHighBrightness = colors.blue_high_brightness;
const colorsBlueUltraBrightness: ColorsBlueUltraBrightness = colors.blue_ultra_brightness;
const colorsBlueDepths: ColorsBlueDepth = colors.blue_depths;
const colorsBlue8BitDepths: ColorsBlue8BitDepth = colors['blue_8-bit_depths'];
const colorsBlue16BitDepths: ColorsBlue16BitDepth = colors['blue_16-bit_depths'];
const colorsBlue24BitDepths: ColorsBlue24BitDepth = colors['blue_24-bit_depths'];

console.log('Type examples:');
console.log('colorsBlue:', colorsBlue);
console.log('colorsBlueBrightness:', colorsBlueBrightness);
console.log('colorsBlueLowBrightness:', colorsBlueLowBrightness);
console.log('colorsBlueMediumBrightness', colorsBlueMediumBrightness);
console.log('colorsBlueHighBrightness', colorsBlueHighBrightness);
console.log('colorsBlueUltraBrightness', colorsBlueUltraBrightness);
console.log('colorsBlueDepths', colorsBlueDepths);
console.log('colorsBlue8BitDepths:', colorsBlue8BitDepths);
console.log('colorsBlue16BitDepths', colorsBlue16BitDepths);
console.log('colorsBlue24BitDepths', colorsBlue24BitDepths);

// Демонстрация автодополнения
console.log('Background color:', colorsBlue.background);
console.log('Foreground color:', colorsBlueBrightness.foreground);
console.log('White color:', colorsBlueLowBrightness.white);
console.log('Border color:', colorsBlue8BitDepths.borderColor);
