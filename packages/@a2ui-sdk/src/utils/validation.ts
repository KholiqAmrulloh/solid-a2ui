// src/utils/validation.ts

// ✅ Export interface ValidationResult agar bisa diimport di tempat lain
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CheckRule {
  rule: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export function validateValue(value: any, rules: CheckRule[] = []): ValidationResult {
  const errors: string[] = [];

  for (const rule of rules) {
    if (!rule.rule) continue;
    let isValid = true;

    switch (rule.rule) {
      case 'required':
        isValid = value !== null && value !== undefined && value !== '';
        break;
      case 'min':
        isValid = typeof value === 'number' || typeof value === 'string' 
          ? Number(value) >= (rule.value ?? 0) 
          : true;
        break;
      case 'max':
        isValid = typeof value === 'number' || typeof value === 'string' 
          ? Number(value) <= (rule.value ?? Infinity) 
          : true;
        break;
      case 'pattern':
        isValid = typeof value === 'string' 
          ? new RegExp(rule.value as string).test(value) 
          : true;
        break;
      case 'custom':
        isValid = rule.validator ? rule.validator(value) : true;
        break;
      default:
        isValid = true;
    }

    if (!isValid) errors.push(rule.message);
  }

  return { valid: errors.length === 0, errors };
}

export function validateForm(
  formData: Record<string, any>,
  checksMap: Record<string, CheckRule[]>
): Record<string, ValidationResult> {
  const results: Record<string, ValidationResult> = {};
  for (const [field, rules] of Object.entries(checksMap)) {
    results[field] = validateValue(formData[field], rules);
  }
  return results;
}