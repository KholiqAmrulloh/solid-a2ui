// src/components/a2ui-provider.tsx
import { JSX, createEffect, mergeProps } from 'solid-js';
import { SurfaceProvider, useSurfaceContext } from '../context/surface';
import { ActionProvider } from '../context/action';
import { CatalogProvider, type Catalog } from '../context/catalog';
import { DataModelProvider, useDataModelContext } from '../context/data-model';
import type { A2UIProviderProps, A2UIMessage, A2UIAction } from '../types/a2ui';

// Komponen internal untuk sync message data ke data model
function DataSyncEffect() {
  const { messages } = useSurfaceContext();
  const { initSurfaceData } = useDataModelContext();

  createEffect(() => {
    const msgs = messages();
    for (const msg of msgs) {
      if (msg.data) {
        initSurfaceData(msg.surface, msg.data);
      }
    }
  });

  return null;
}

export function A2UIProvider(props: A2UIProviderProps) {
  const merged = mergeProps({
    messages: [] as A2UIMessage[],
    catalog: undefined as Catalog | undefined,
    onAction: undefined as ((action: A2UIAction) => void) | undefined
  }, props);

  return (
    <DataModelProvider>
      <SurfaceProvider initialMessages={merged.messages}>
        <CatalogProvider catalog={merged.catalog}>
          <ActionProvider onAction={merged.onAction}>
            <DataSyncEffect /> {/* ← Otomatis sync data saat messages berubah */}
            {merged.children}
          </ActionProvider>
        </CatalogProvider>
      </SurfaceProvider>
    </DataModelProvider>
  );
}