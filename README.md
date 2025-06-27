# Xsolla Color Palette System

## Описание

Типобезопасная система для создания и управления цветовыми палитрами с поддержкой тонов и подтонов. Вся логика и типы разнесены по директориям для удобства поддержки и масштабирования.

## Структура проекта

```
xsolla/
├── .github/workflows/deploy.yml      # CI/CD для GitHub Pages
├── src/
│   ├── assets/
│   │   └── styles.css                # Стили
│   ├── functions/
│   │   ├── createTone.ts             # Логика createTone
│   │   └── createPalette.ts          # Логика createPalette
│   ├── types/
│   │   ├── index.ts                  # Основные типы
│   │   └── AdvancedTypes.ts          # Расширенные типы для автодополнения
│   └── main.ts                       # Точка входа, пример использования
├── index.html                        # HTML с подключением стилей и main.ts
├── vite.config.ts                    # Vite config (base: '/xsolla/')
├── package.json                      # Сборка, зависимости, homepage
├── tsconfig.json                     # TypeScript config
└── README.md                         # Документация
```

## Быстрый старт

```bash
npm install
npm run dev
```

## Сборка и деплой на GitHub Pages

1. Убедись, что в `vite.config.ts` прописан `base: '/xsolla/'`.
2. В `package.json` должен быть `homepage: "https://ekimovde.github.io/xsolla"`.
3. Пуш в ветку `main` автоматически запустит GitHub Actions и задеплоит проект в GitHub Pages.
4. После успешного билда проект будет доступен по адресу: https://ekimovde.github.io/xsolla

## Использование

- Вся логика работы с палитрами — в `src/functions/`
- Типы и автодополнение — в `src/types/`
- Стили — в `src/assets/styles.css`
- Пример использования и визуализация — в `src/main.ts`

## Пример импорта

```ts
import { createTone } from './functions/createTone';
import { createPalette } from './functions/createPalette';
import type { InputModel } from './types';
import type { ColorsBlue } from './types/AdvancedTypes';
```

## Важно
- Все пути к ассетам и скриптам в `index.html` должны быть относительными к `/xsolla/` для корректной работы на GitHub Pages.
- Для деплоя используется GitHub Actions (`.github/workflows/deploy.yml`).

---

Если что-то не работает — проверь структуру директорий и пути в импортах/HTML.
