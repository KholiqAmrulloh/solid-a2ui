import type { JSX } from 'solid-js';
import type { A2UIAction, CheckRule } from './a2ui';
import type { DynamicValue } from './binding';

export interface BaseComponentProps {
  surfaceId: string;
  componentId: string;
  children?: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties;
  hidden?: boolean | DynamicValue<boolean>;
  disabled?: boolean | DynamicValue<boolean>;
  readonly?: boolean | DynamicValue<boolean>;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  action?: A2UIAction;
  onClick?: () => void;
  onInput?: (value: any) => void;
  onChange?: (value: any) => void;
}

export interface FormComponentProps extends InteractiveComponentProps {
  value?: DynamicValue<any>;
  name?: string;
  placeholder?: DynamicValue<string>;
  checks?: CheckRule[];
}

export type ComponentCategory = 'layout' | 'input' | 'display' | 'navigation' | 'custom';

export interface ComponentDefinition {
  type: string;
  category: ComponentCategory;
  propsSchema?: Record<string, any>;
  defaultProps?: Record<string, any>;
}