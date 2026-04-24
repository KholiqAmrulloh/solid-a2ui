import { createMemo } from 'solid-js';

export interface ScopeContext {
  path: string;
  resolve: (bindingPath: string) => string;
  push: (segment: string) => ScopeContext;
}

export function useScope(basePath: string = ''): ScopeContext {
  const resolve = (bindingPath: string): string => {
    return basePath ? `${basePath}.${bindingPath}` : bindingPath;
  };

  const push = (segment: string): ScopeContext => {
    return useScope(basePath ? `${basePath}.${segment}` : segment);
  };

  return { path: basePath, resolve, push };
}

/** Helper untuk mengambil base path dari context (jika diimplementasikan nanti) */
export function useScopeBasePath(): () => string {
  // Placeholder: bisa diganti useContext(ScopeContext) di versi lengkap
  return createMemo(() => '');
}