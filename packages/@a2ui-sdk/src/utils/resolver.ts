// src/utils/resolver.ts
import type { DynamicValue, DynamicBinding, TemplateBinding } from '../types/binding';

export type DataGetter = (surfaceId: string, path: string) => any;

/** Resolve nilai dinamis menjadi nilai primitif/objek */
export function resolveDynamicValue<T = any>(
  value: DynamicValue<T>,
  getData: DataGetter,
  surfaceId: string
): T | undefined {
  if (typeof value !== 'object' || value === null) {
    return value as T;
  }

  if ('$bind' in value) {
    const binding = value as DynamicBinding<T>;
    let resolved = getData(surfaceId, binding.$bind);
    if (resolved === undefined) resolved = binding.$fallback;
    if (binding.$transform && resolved !== undefined) {
      return binding.$transform(resolved);
    }
    return resolved;
  }

  if ('$template' in value) {
    return resolveTemplate(value as TemplateBinding, getData, surfaceId) as T;
  }

  return value as T;
}

/** Resolve template string */
function resolveTemplate(
  template: TemplateBinding,
  getData: DataGetter,
  surfaceId: string
): string {
  let result = template.$template;
  const context = template.$context || {};

  return result.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const pathOrValue = context[key];
    if (typeof pathOrValue === 'string' && pathOrValue.startsWith('$bind.')) {
      const bindPath = pathOrValue.replace('$bind.', '');
      return String(getData(surfaceId, bindPath) ?? '');
    }
    return String(pathOrValue ?? '');
  });
}