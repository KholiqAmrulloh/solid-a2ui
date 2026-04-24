// src/types/a2ui.ts
import type { JSX } from 'solid-js';

export type DynamicString = string | { $bind: string };
export type DynamicNumber = number | { $bind: string };
export type DynamicBoolean = boolean | { $bind: string };
export type DynamicValue<T = any> = T | { $bind: string };

export interface A2UIAction {
  name: string;
  context?: Record<string, any>;
  target?: string;
}

export interface Component<T = any> {
  type: string;
  id: string;
  props?: T;
  children?: ChildList;
  action?: A2UIAction;
  checks?: CheckRule[];
}

export type ChildList = (Component | string | number)[];

export interface A2UIMessage {
  id: string;
  surface: string;
  components: Component[];
  data?: Record<string, any>;
  actions?: Record<string, A2UIAction>;
}

export interface CheckRule {
  rule: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ComponentsMap {
  [key: string]: (props: any) => JSX.Element;
}

export interface Catalog {
  components: ComponentsMap;
}

export interface A2UIProviderProps {
  children: JSX.Element;
  messages?: A2UIMessage[];
  catalog?: Catalog;
  onAction?: (action: A2UIAction) => void;
}

export interface A2UIRendererProps {
  onAction?: (action: A2UIAction) => void;
}