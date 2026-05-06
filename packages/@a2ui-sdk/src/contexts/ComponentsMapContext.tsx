/**
 * ComponentsMapContext - Context for custom component overrides.
 *
 * This context allows users to provide custom component implementations
 * that override or extend the default component registry.
 */
import { createContext, useContext, JSX, Component } from "solid-js";
import { hasOwn } from "../lib/utils";
import { A2UIComponentProps } from "../components/types";

/**
 * Type for a component in the components map.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type A2UIComponent = Component<A2UIComponentProps & any>;

/**
 * Context value for ComponentsMapContext.
 */
export interface ComponentsMapContextValue {
  /** Get a component by type name */
  getComponent: (type: string) => A2UIComponent | undefined;
}

/**
 * Context for custom component overrides.
 */
export const ComponentsMapContext =
  createContext<ComponentsMapContextValue | null>(null);

/**
 * Props for ComponentsMapProvider.
 */
export interface ComponentsMapProviderProps {
  /** Component registry */
  components: Record<string, A2UIComponent>;
  children: JSX.Element;
}

/**
 * Provider for component registry.
 *
 * @example
 * ```tsx
 * <ComponentsMapProvider components={catalog.components}>
 *   <App />
 * </ComponentsMapProvider>
 * ```
 */
export function ComponentsMapProvider(props: ComponentsMapProviderProps) {
  const getComponent = (type: string): A2UIComponent | undefined => {
    if (!hasOwn(props.components, type)) return undefined;

    const raw = props.components[type] as unknown;

    // Normalize module namespace objects (common interop mistakes)
    // e.g. someone may import a module with `import * as X from '...'` which
    // results in an object like { default: Component } — handle that.
    if (raw && typeof raw === "object") {
      if ("default" in raw && typeof (raw as any).default === "function") {
        return (raw as any).default as A2UIComponent;
      }
    }

    return props.components[type];
  };

  const value: ComponentsMapContextValue = {
    getComponent,
  };

  return (
    <ComponentsMapContext.Provider value={value}>
      {props.children}
    </ComponentsMapContext.Provider>
  );
}

/**
 * Hook to access the ComponentsMap context.
 *
 * @throws Error if used outside of ComponentsMapProvider
 */
export function useComponentsMapContext(): ComponentsMapContextValue {
  const context = useContext(ComponentsMapContext);
  if (!context) {
    throw new Error(
      "useComponentsMapContext must be used within a ComponentsMapProvider",
    );
  }
  return context;
}

/**
 * Hook to get a component by type name.
 * Returns custom component if available, otherwise default.
 *
 * @param type - The component type name
 * @returns The component or undefined if not found
 */
export function useComponentFromMap(type: string): A2UIComponent | undefined {
  const { getComponent } = useComponentsMapContext();
  return getComponent(type);
}
