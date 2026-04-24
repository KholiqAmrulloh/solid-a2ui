// src/hooks/use-data-binding.ts
import { createMemo, Accessor } from 'solid-js';
import { useDataModelContext } from '../context/data-model';
import type { DynamicValue } from '../types/a2ui';

export function useDataBinding<T = any>(
  surfaceId: string,
  value: DynamicValue<T>,
  fallback?: T
): Accessor<T | undefined> {
  const { getData } = useDataModelContext();
  
  return createMemo(() => {
    if (typeof value === 'object' && value !== null && '$bind' in value) {
      const path = value.$bind;
      const result = getData(surfaceId, path);
      return (result as T) ?? fallback;
    }
    return value as T;
  });
}