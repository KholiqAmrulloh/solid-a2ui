// src/hooks/use-validation.ts
import { createSignal, createMemo } from 'solid-js';
import { validateValue, type ValidationResult } from '../utils/validation';
import type { CheckRule } from '../types/a2ui';

export function useValidation(initialValue?: any, rules: CheckRule[] = []) {
  const [value, setValue] = createSignal(initialValue);
  const [isTouched, setIsTouched] = createSignal(false);

  const validationResult = createMemo<ValidationResult>(() => {
    if (!isTouched()) return { valid: true, errors: [] };
    return validateValue(value(), rules);
  });

  // ✅ Simple setter - no generic complexity
  const setValueWithTouch = (val: any) => {
    const next = typeof val === 'function' ? val(value()) : val;
    setValue(next);
    if (!isTouched()) setIsTouched(true);
  };

  const reset = () => {
    setValue(initialValue); // ✅ initialValue: any, tidak ada type conflict
    setIsTouched(false);
  };

  return {
    value,
    setValue: setValueWithTouch,
    isValid: () => validationResult().valid,
    errors: () => validationResult().errors,
    isTouched,
    reset,
    validate: () => validateValue(value(), rules)
  };
}