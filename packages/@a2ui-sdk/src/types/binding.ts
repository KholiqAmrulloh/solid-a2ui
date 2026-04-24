export type BindingPath = string;

export interface DynamicBinding<T = any> {
  $bind: BindingPath;
  $fallback?: T;
  $transform?: (value: T) => any;
}

export interface TemplateBinding {
  $template: string;
  $context?: Record<string, BindingPath | string>;
}

/** Union type untuk semua nilai dinamis di A2UI */
export type DynamicValue<T = any> = T | DynamicBinding<T> | TemplateBinding;

export interface BindingOptions {
  surfaceId: string;
  componentId: string;
  strict?: boolean;
}