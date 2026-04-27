import { SurfaceProvider } from "./SurfaceContext";
import { ComponentsMapProvider } from "./ComponentsMapContext";
import type { A2UIMessage } from "@a2ui-sdk/types/0.9";
import { useA2UIMessageHandler } from "../hooks/useA2UIMessageHandler";
import { standardCatalog, type Catalog } from "..";
import { JSX, createEffect, on } from "solid-js";

/**
 * Props for A2UIProvider.
 */
export interface A2UIProviderProps {
  messages?: A2UIMessage[];
  catalog?: Catalog;
  children: JSX.Element;
}

/**
 * Internal component that handles message processing.
 */
function A2UIMessageProcessor(props: {
  messages?: A2UIMessage[];
  children: JSX.Element;
}) {
  const { processMessages, clear } = useA2UIMessageHandler();

  // Process messages when they change
  createEffect(
    on(
      () => props.messages,
      (messages) => {
        clear();
        if (messages && messages.length > 0) {
          processMessages(messages);
        }
      },
    ),
  );

  return <>{props.children}</>;
}

/**
 * Combined provider for all A2UI 0.9 contexts.
 */
export function A2UIProvider(props: A2UIProviderProps) {
  const effectiveCatalog = () => props.catalog ?? standardCatalog;

  return (
    <SurfaceProvider>
      <ComponentsMapProvider components={effectiveCatalog().components}>
        <A2UIMessageProcessor messages={props.messages}>
          {props.children}
        </A2UIMessageProcessor>
      </ComponentsMapProvider>
    </SurfaceProvider>
  );
}