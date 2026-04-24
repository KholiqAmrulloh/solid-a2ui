// src/components/component-renderer.tsx
import { JSX, Show, Switch, Match, For } from 'solid-js';
import { useDataBinding } from '../hooks/use-data-binding';
import { useDispatchAction } from '../hooks/use-dispatch-action';
import type { Component, ComponentsMap, A2UIAction } from '../types/a2ui';

export interface ComponentRendererProps {
  surfaceId: string;
  component: Component;
  catalog: ComponentsMap;
  onAction?: (action: A2UIAction) => void;
}

export function ComponentRenderer(props: ComponentRendererProps) {
  const dispatchAction = useDispatchAction();
  
  const ComponentImpl = () => {
    const Impl = props.catalog[props.component.type];
    
    if (!Impl) {
      console.warn(`Component "${props.component.type}" not found in catalog`);
      return null;
    }

    const handleClick = () => {
      if (props.component.action) {
        dispatchAction(props.surfaceId, props.component.id, props.component.action);
      }
    };

    return (
      <Impl
        {...props.component.props}
        surfaceId={props.surfaceId}
        componentId={props.component.id}
        onClick={props.component.action ? handleClick : undefined}
      >
        <Show when={props.component.children}>
          {(children) => (
            <For each={children()}>
              {(child) =>
                typeof child === 'object' && child !== null && 'type' in child ? (
                  <ComponentRenderer
                    surfaceId={props.surfaceId}
                    component={child as Component}
                    catalog={props.catalog}
                    onAction={props.onAction}
                  />
                ) : (
                  <span>{String(child)}</span>
                )
              }
            </For>
          )}
        </Show>
      </Impl>
    );
  };

  return <ComponentImpl />;
}