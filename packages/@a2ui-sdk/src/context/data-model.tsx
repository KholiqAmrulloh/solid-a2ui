// src/context/data-model.tsx
import { createContext, useContext, JSX } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

export interface DataModelContextValue {
  /** Ambil nilai dari path dot-notation (contoh: "user.profile.name") */
  getData: (surfaceId: string, path: string) => any;
  
  /** Set nilai ke path tertentu. Otomatis membuat objek nested jika belum ada */
  setData: (surfaceId: string, path: string, value: any) => void;
  
  /** Inisialisasi/replace data surface dari A2UIMessage.data */
  initSurfaceData: (surfaceId: string, data: Record<string, any>) => void;
  
  /** Reset data surface tertentu */
  resetSurface: (surfaceId: string) => void;
  
  /** Reset seluruh data model */
  resetAll: () => void;
}

export const DataModelContext = createContext<DataModelContextValue>();

/** Utility: resolve path dot-notation dengan aman */
function resolvePath(obj: any, path: string): any {
  if (!path) return obj;
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

export function DataModelProvider(props: { children: JSX.Element }) {
  // Struktur: { [surfaceId]: { nested... data } }
  const [store, setStore] = createStore<Record<string, Record<string, any>>>({});

  const getData = (surfaceId: string, path: string): any => {
    const surfaceData = store[surfaceId] ?? {};
    return resolvePath(surfaceData, path);
  };

  const setData = (surfaceId: string, path: string, value: any): void => {
    // Pastikan surface sudah ada di store
    if (!store[surfaceId]) {
      setStore(surfaceId, {});
    }
    // solid-js/store native support path array untuk nested update
    setStore(surfaceId, path.split('.'), value);
  };

  const initSurfaceData = (surfaceId: string, data: Record<string, any>): void => {
    // `reconcile` memastikan sinyal tetap terhubung saat data di-replace
    setStore(surfaceId, reconcile(data));
  };

  const resetSurface = (surfaceId: string): void => {
    setStore(surfaceId, {});
  };

  const resetAll = (): void => {
    setStore({});
  };

  const value: DataModelContextValue = {
    getData,
    setData,
    initSurfaceData,
    resetSurface,
    resetAll
  };

  return (
    <DataModelContext.Provider value={value}>
      {props.children}
    </DataModelContext.Provider>
  );
}

export function useDataModelContext(): DataModelContextValue {
  const ctx = useContext(DataModelContext);
  if (!ctx) {
    throw new Error('useDataModelContext must be used within DataModelProvider');
  }
  return ctx;
}