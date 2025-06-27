import type { ToneTransformer, ToneConfig, ToneFunction } from '../types';

export function createTone<T = any>(
  transformer: ToneTransformer<T>,
  config?: ToneConfig
): ToneFunction {
  const toneFunction = (mainTransformer: ToneTransformer<any>) => {
    return (data: any) => {
      const baseResult = transformer(data);
      const mainResult = mainTransformer(data);

      return {
        ...baseResult,
        ...mainResult
      };
    };
  };

  // Сохраняем конфигурацию для доступа к подтонам
  (toneFunction as any).__config = config;

  return toneFunction;
}
