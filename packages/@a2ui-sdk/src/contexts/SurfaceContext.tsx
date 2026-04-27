/**
 * SurfaceContext - Manages the Surface state for A2UI 0.9 rendering.
 *
 * A Surface is the top-level container that holds:
 * - surfaceId: Unique identifier
 * - catalogId: The catalog ID for this surface
 * - components: Map of all components (adjacency list)
 * - dataModel: The data model for this surface
 */
import type {
  ComponentDefinition,
  DataModel,
  SurfaceState,
} from "@a2ui-sdk/types/0.9";
import { setValueByPath } from "@a2ui-sdk/utils/0.9";
import { createContext, createSignal, JSX, useContext } from "solid-js";

/**
 * Surface context value interface.
 */
export interface SurfaceContextValue {
  /** Map of all surfaces by surfaceId */
  surfaces: () => Map<string, SurfaceState>;

  /**
   * Creates a new surface.
   * If the surface already exists, logs an error and ignores.
   */
  createSurface: (surfaceId: string, catalogId: string) => void;

  /** Updates components in a surface (upsert semantics) */
  updateComponents: (
    surfaceId: string,
    components: ComponentDefinition[],
  ) => void;

  /** Updates the data model at a path */
  updateDataModel: (surfaceId: string, path?: string, value?: unknown) => void;

  /** Deletes a surface */
  deleteSurface: (surfaceId: string) => void;

  /** Gets a surface by ID */
  getSurface: (surfaceId: string) => SurfaceState | undefined;

  /** Gets a component from a surface */
  getComponent: (
    surfaceId: string,
    componentId: string,
  ) => ComponentDefinition | undefined;

  /** Gets the data model for a surface */
  getDataModel: (surfaceId: string) => DataModel;

  /** Sets a value in the data model (for two-way binding) */
  setDataValue: (surfaceId: string, path: string, value: unknown) => void;

  /** Clears all surfaces */
  clearSurfaces: () => void;
}

/**
 * Surface context for A2UI 0.9 rendering.
 */
export const SurfaceContext = createContext<SurfaceContextValue | null>(null);

/**
 * Props for SurfaceProvider.
 */
export interface SurfaceProviderProps {
  children: JSX.Element;
}

/**
 * Provider component for Surface state management.
 */
export function SurfaceProvider(props: SurfaceProviderProps) {
  const [surfaces, setSurfaces] = createSignal<Map<string, SurfaceState>>(
    new Map(),
  );

  const createSurface = (surfaceId: string, catalogId: string) => {
    setSurfaces((prev) => {
      if (prev.has(surfaceId)) {
        console.error(
          `[A2UI 0.9] Surface "${surfaceId}" already exists. Ignoring createSurface.`,
        );
        return prev;
      }

      const next = new Map(prev);
      next.set(surfaceId, {
        surfaceId,
        catalogId,
        components: new Map(),
        dataModel: {},
        created: true,
      });
      return next;
    });
  };

  const updateComponents = (
    surfaceId: string,
    components: ComponentDefinition[],
  ) => {
    setSurfaces((prev) => {
      const surface = prev.get(surfaceId);

      if (!surface) {
        console.warn(
          `[A2UI 0.9] updateComponents called for non-existent surface "${surfaceId}". ` +
            "Components will be buffered until createSurface is received.",
        );
        return prev;
      }

      const next = new Map(prev);
      const componentMap = new Map(surface.components);

      for (const comp of components) {
        componentMap.set(comp.id, comp);
      }

      next.set(surfaceId, {
        ...surface,
        components: componentMap,
      });

      return next;
    });
  };

  const updateDataModel = (
    surfaceId: string,
    path?: string,
    value?: unknown,
  ) => {
    setSurfaces((prev) => {
      const surface = prev.get(surfaceId);

      if (!surface) {
        console.warn(
          `[A2UI 0.9] updateDataModel called for non-existent surface "${surfaceId}".`,
        );
        return prev;
      }

      const next = new Map(prev);
      const normalizedPath = path ?? "/";

      const updatedDataModel = setValueByPath(
        surface.dataModel,
        normalizedPath,
        value,
      );

      next.set(surfaceId, {
        ...surface,
        dataModel: updatedDataModel,
      });

      return next;
    });
  };

  const deleteSurface = (surfaceId: string) => {
    setSurfaces((prev) => {
      const next = new Map(prev);
      next.delete(surfaceId);
      return next;
    });
  };

  const getSurface = (surfaceId: string): SurfaceState | undefined => {
    return surfaces().get(surfaceId);
  };

  const getComponent = (
    surfaceId: string,
    componentId: string,
  ): ComponentDefinition | undefined => {
    return surfaces().get(surfaceId)?.components.get(componentId);
  };

  const getDataModel = (surfaceId: string): DataModel => {
    return surfaces().get(surfaceId)?.dataModel ?? {};
  };

  const setDataValue = (surfaceId: string, path: string, value: unknown) => {
    updateDataModel(surfaceId, path, value);
  };

  const clearSurfaces = () => {
    setSurfaces(new Map());
  };

  const value: SurfaceContextValue = {
    surfaces,
    createSurface,
    updateComponents,
    updateDataModel,
    deleteSurface,
    getSurface,
    getComponent,
    getDataModel,
    setDataValue,
    clearSurfaces,
  };

  return (
    <SurfaceContext.Provider value={value}>
      {props.children}
    </SurfaceContext.Provider>
  );
}

/**
 * Hook to access the Surface context.
 *
 * @throws Error if used outside of SurfaceProvider
 */
export function useSurfaceContext(): SurfaceContextValue {
  const context = useContext(SurfaceContext);
  if (!context) {
    throw new Error("useSurfaceContext must be used within a SurfaceProvider");
  }
  return context;
}
