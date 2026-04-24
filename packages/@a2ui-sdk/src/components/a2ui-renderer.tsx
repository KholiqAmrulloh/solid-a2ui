// src/components/a2ui-renderer.tsx
import { For, JSX } from 'solid-js';
import { useSurfaceContext } from '../context/surface';
import { useCatalog } from '../context/catalog';
import { ComponentRenderer } from './component-renderer';
import type { A2UIRendererProps } from '../types/a2ui';

export function A2UIRenderer(props: A2UIRendererProps) {
  const { messages } = useSurfaceContext();
  const { components: catalog } = useCatalog();

  return (
    <For each={messages()}>
      {(message) => (
        <For each={message.components}>
          {(component) => (
            <ComponentRenderer
              surfaceId={message.surface}
              component={component}
              catalog={catalog}
              onAction={props.onAction}
            />
          )}
        </For>
      )}
    </For>
  );
}