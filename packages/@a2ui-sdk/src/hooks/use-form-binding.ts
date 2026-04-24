// src/hooks/use-form-binding.ts
import { createMemo, Setter } from 'solid-js';
import { useDataModelContext } from '../context/data-model';
import type { DynamicValue } from '../types/a2ui';

// ✅ Custom setter type yang lebih sederhana & cocok untuk form binding
export type FormSetter<T> = (val: T | ((prev: T | undefined) => T | undefined)) => void;

export function useFormBinding<T = any>(
  surfaceId: string,
  value: DynamicValue<T>,
  fallback?: T
): [() => T | undefined, FormSetter<T | undefined>] {
  const { getData, setData } = useDataModelContext();

  // Getter reaktif
  const getter = createMemo(() => {
    if (typeof value === 'object' && value !== null && '$bind' in value) {
      return getData(surfaceId, value.$bind) ?? fallback;
    }
    return value as T;
  });

  // ✅ Setter dengan custom type - tidak perlu return value, tidak bentrok dengan SolidJS Setter
  const setter = ((val: any) => {
  if (typeof value === 'object' && value !== null && '$bind' in value) {
    const nextVal = typeof val === 'function' ? val(getter()) : val;
    setData(surfaceId, value.$bind, nextVal);
    return nextVal;
  }
  return undefined;
}) as Setter<T | undefined>;

  return [getter, setter];
}