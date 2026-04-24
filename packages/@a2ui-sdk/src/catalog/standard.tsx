// src/catalog/standard.tsx
import type { JSX } from 'solid-js';
import type { ComponentsMap } from '../types/a2ui';
import { useDataBinding } from '../hooks/use-data-binding';

// Button Component
export function Button(props: {
  children?: JSX.Element;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  [key: string]: any;
}) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      class={`btn btn-${props.variant || 'primary'}`}
      {...Object.fromEntries(
        Object.entries(props).filter(([k]) => 
          !['children', 'onClick', 'variant', 'disabled', 'surfaceId', 'componentId'].includes(k)
        )
      )}
    >
      {props.children}
    </button>
  );
}

// Text Component
export function Text(props: {
  value?: string;
  $bind?: string;
  surfaceId?: string;
  [key: string]: any;
}) {
  const text = useDataBinding<string>(
    props.surfaceId || '',
    props.$bind ? { $bind: props.$bind } : props.value || '',
    ''
  );
  
  return <span {...props}>{text()}</span>;
}

// Input Component
export function Input(props: {
  $bind?: string;
  surfaceId?: string;
  placeholder?: string;
  type?: string;
  [key: string]: any;
}) {
  // Implementation with useFormBinding...
  return <input type={props.type || 'text'} placeholder={props.placeholder} {...props} />;
}

// Export standard catalog
export const standardCatalog: { components: ComponentsMap } = {
  components: {
    Button,
    Text,
    Input,
    // ... add more standard components
  }
};