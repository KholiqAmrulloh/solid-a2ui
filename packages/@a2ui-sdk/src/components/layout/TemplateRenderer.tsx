/**
 * TemplateRenderer - SolidJS version
 */

import type { TemplateBinding, DataModel } from "@a2ui-sdk/types/0.9";
import { ScopeProvider } from "../../contexts/ScopeContext";
import { ComponentRenderer } from "../ComponentRenderer";
import { getValueByPath, resolvePath } from "@a2ui-sdk/utils/0.9";
import { For, Show } from "solid-js";

/**
 * Props for TemplateRenderer.
 */
export interface TemplateRendererProps {
  surfaceId: string;
  template: TemplateBinding;
  dataModel: DataModel;
  basePath: string | null;
}

export function TemplateRenderer(props: TemplateRendererProps) {
  const { componentId, path } = props.template;

  const resolvedPath = () => resolvePath(path, props.basePath);
  const data = () => getValueByPath(props.dataModel, resolvedPath());

  // ---------- guards ----------
  const isNil = () => data() === undefined || data() === null;
  const isArray = () => Array.isArray(data());
  const isObject = () => typeof data() === "object" && !Array.isArray(data());

  return (
    <>
      {/* ❌ null / undefined */}
      <Show
        when={!isNil()}
        fallback={(() => {
          console.warn(
            `[A2UI 0.9] Template binding path "${resolvedPath()}" resolved to undefined or null.`,
          );
          return null;
        })()}
      >
        {/* ✅ Array */}
        <Show when={isArray()}>
          <For each={data() as unknown[]}>
            {(_, index) => {
              const itemPath = () => `${resolvedPath()}/${index()}`;

              return (
                <ScopeProvider basePath={itemPath()}>
                  <ComponentRenderer
                    surfaceId={props.surfaceId}
                    componentId={componentId}
                  />
                </ScopeProvider>
              );
            }}
          </For>
        </Show>

        {/* ✅ Object */}
        <Show when={isObject()}>
          <For each={Object.keys(data() as Record<string, unknown>)}>
            {(key) => {
              const itemPath = () => `${resolvedPath()}/${key}`;

              return (
                <ScopeProvider basePath={itemPath()}>
                  <ComponentRenderer
                    surfaceId={props.surfaceId}
                    componentId={componentId}
                  />
                </ScopeProvider>
              );
            }}
          </For>
        </Show>

        {/* ❌ Non-iterable */}
        <Show when={!isArray() && !isObject()}>
          {(() => {
            console.warn(
              `[A2UI 0.9] Template binding path "${resolvedPath()}" resolved to non-iterable value:`,
              data(),
            );
            return null;
          })()}
        </Show>
      </Show>
    </>
  );
}
