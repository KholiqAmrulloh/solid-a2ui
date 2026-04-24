// src/context/surface.tsx
import { Accessor, createContext, useContext, createSignal, createMemo, JSX } from 'solid-js';
import type { A2UIMessage, Component } from '../types/a2ui';

export interface SurfaceContextValue {
  messages: Accessor<A2UIMessage[]>;
  components: Accessor<Map<string, Component>>;
  addMessage: (message: A2UIMessage) => void;
  clearSurfaces: () => void;
  getComponent: (surfaceId: string, componentId: string) => Component | undefined;
}

export const SurfaceContext = createContext<SurfaceContextValue>();

export function SurfaceProvider(props: {
  children: JSX.Element;
  initialMessages?: A2UIMessage[];
}) {
  const [messages, setMessages] = createSignal<A2UIMessage[]>(props.initialMessages || []);
  
  const components = createMemo(() => {
    const map = new Map<string, Component>();
    for (const msg of messages()) {
      const process = (comp: Component, parentId?: string) => {
        const key = `${msg.surface}:${comp.id}`;
        map.set(key, comp);
        if (comp.children) {
          for (const child of comp.children) {
            if (typeof child === 'object' && child !== null && 'type' in child) {
              process(child as Component, comp.id);
            }
          }
        }
      };
      for (const comp of msg.components) {
        process(comp);
      }
    }
    return map;
  });

  const addMessage = (message: A2UIMessage) => {
    setMessages(prev => {
      const exists = prev.find(m => m.id === message.id);
      if (exists) {
        return prev.map(m => m.id === message.id ? message : m);
      }
      return [...prev, message];
    });
  };

  const clearSurfaces = () => setMessages([]);

  const getComponent = (surfaceId: string, componentId: string) => {
    return components().get(`${surfaceId}:${componentId}`);
  };

  const value: SurfaceContextValue = {
    messages,
    components,
    addMessage,
    clearSurfaces,
    getComponent
  };

  return (
    <SurfaceContext.Provider value={value}>
      {props.children}
    </SurfaceContext.Provider>
  );
}

export function useSurfaceContext() {
  const ctx = useContext(SurfaceContext);
  if (!ctx) {
    throw new Error('useSurfaceContext must be used within SurfaceProvider');
  }
  return ctx;
}