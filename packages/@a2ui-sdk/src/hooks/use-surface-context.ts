import { createMemo } from 'solid-js';
import { useSurfaceContext, type SurfaceContextValue } from '../context/surface';
import { useDataModelContext } from '../context/data-model';

export interface SurfaceHelper {
  surfaceId: string;
  components: () => any[];
  data: () => Record<string, any>;
  setMessage: SurfaceContextValue['addMessage'];
  clearSurface: () => void;
}

export function useSurface(surfaceId: string): SurfaceHelper {
  const surfaceCtx = useSurfaceContext();
  const dataModel = useDataModelContext();

  const components = createMemo(() => {
    const map = surfaceCtx.components();
    const result: any[] = [];
    map.forEach((comp, key) => {
      if (key.startsWith(`${surfaceId}:`)) result.push(comp);
    });
    return result;
  });

  const surfaceData = createMemo(() => dataModel.getData(surfaceId, '') || {});

  return {
    surfaceId,
    components,
    data: surfaceData,
    setMessage: surfaceCtx.addMessage,
    clearSurface: () => surfaceCtx.clearSurfaces()
  };
}

// Re-export context hook agar tidak breaking change
export { useSurfaceContext } from '../context/surface';
export type { SurfaceContextValue } from '../context/surface';