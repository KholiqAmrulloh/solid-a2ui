// src/context/catalog.tsx
import { createContext, useContext, JSX } from 'solid-js';
import type { Catalog, ComponentsMap } from '../types/a2ui';
import { standardCatalog } from '../catalog/standard';

// Export type Catalog agar bisa diimport dari file ini
export type { Catalog, ComponentsMap } from '../types/a2ui';

export const CatalogContext = createContext<Catalog>(standardCatalog);

export function CatalogProvider(props: {
  children: JSX.Element;
  catalog?: Catalog;
}) {
  const catalog = props.catalog || standardCatalog;
  
  return (
    <CatalogContext.Provider value={catalog}>
      {props.children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);
  if (!catalog) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return catalog;
}

export { standardCatalog };