// src/index.ts

import { defaultRegistry } from './catalog/registry';
import { standardCatalog } from './catalog/standard';
import { A2UIProvider } from './components/a2ui-provider';
import { A2UIRenderer } from './components/a2ui-renderer';
import { ComponentRenderer } from './components/component-renderer';
import { useActionContext } from './context/action';
import { useCatalog } from './context/catalog';
import { useDataModelContext } from './context/data-model';
import { useSurfaceContext } from './context/surface';
import { useDataBinding } from './hooks/use-data-binding';
import { useDispatchAction } from './hooks/use-dispatch-action';
import { useFormBinding } from './hooks/use-form-binding';
import { useScope } from './hooks/use-scope';
import { useSurface } from './hooks/use-surface-context';
import { useValidation } from './hooks/use-validation';

// Context
export { SurfaceProvider, useSurfaceContext, type SurfaceContextValue } from './context/surface';
export { ActionProvider, useActionContext } from './context/action';
export { CatalogProvider, useCatalog, standardCatalog } from './context/catalog';
export { DataModelProvider, useDataModelContext } from './context/data-model';

// Components
export { A2UIProvider } from './components/a2ui-provider';
export { A2UIRenderer } from './components/a2ui-renderer';
export { ComponentRenderer } from './components/component-renderer';

// Hooks
export { useDataBinding } from './hooks/use-data-binding';
export { useFormBinding } from './hooks/use-form-binding';
export { useDispatchAction } from './hooks/use-dispatch-action';
export { useValidation } from './hooks/use-validation';
export { useA2UIMessageHandler } from './hooks/use-a2ui-message-handler';

// Catalog & Registry
export { ComponentRegistry, defaultRegistry } from './catalog/registry';
export type { RegistryConfig } from './catalog/registry';

// Utils
export { resolveDynamicValue } from './utils/resolver';
export { validateValue, validateForm } from './utils/validation';

// Types
export type {
  A2UIMessage, A2UIAction, Component, ChildList,
  CheckRule, ValidationResult, Catalog, ComponentsMap,
  A2UIProviderProps, A2UIRendererProps
} from './types/a2ui';

export type {
  DynamicValue, DynamicBinding, TemplateBinding, BindingPath, BindingOptions
} from './types/binding';

export type {
  BaseComponentProps, InteractiveComponentProps, FormComponentProps,
  ComponentCategory, ComponentDefinition
} from './types/component';

// Versioned namespace (optional)
export const v0_9 = {
  A2UIProvider, A2UIRenderer, ComponentRenderer,
  standardCatalog, defaultRegistry,
  useSurfaceContext, useDataModelContext, useActionContext, useCatalog,
  useDataBinding, useFormBinding, useDispatchAction, useValidation, useSurface, useScope
};