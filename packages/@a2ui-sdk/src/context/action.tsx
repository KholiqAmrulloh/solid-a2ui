// src/context/action.tsx
import { createContext, useContext, JSX } from 'solid-js';
import type { A2UIAction } from '../types/a2ui';

export interface ActionContextValue {
  dispatch: (surfaceId: string, componentId: string, action: A2UIAction) => void;
  onAction?: (action: A2UIAction) => void;
}

export const ActionContext = createContext<ActionContextValue>();

export function ActionProvider(props: {
  children: JSX.Element;
  onAction?: (action: A2UIAction) => void;
}) {
  const dispatch = (surfaceId: string, componentId: string, action: A2UIAction) => {
    const enrichedAction: A2UIAction = {
      ...action,
      context: {
        ...action.context,
        $surface: surfaceId,
        $component: componentId
      }
    };
    props.onAction?.(enrichedAction);
  };

  const value: ActionContextValue = { dispatch, onAction: props.onAction };

  return (
    <ActionContext.Provider value={value}>
      {props.children}
    </ActionContext.Provider>
  );
}

export function useActionContext() {
  const ctx = useContext(ActionContext);
  if (!ctx) {
    throw new Error('useActionContext must be used within ActionProvider');
  }
  return ctx;
}