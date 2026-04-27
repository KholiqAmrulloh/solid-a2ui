/**
 * ListComponent - List container (SolidJS).
 */

import type {
  ListComponentProps,
  Align,
} from "@a2ui-sdk/types/0.9/standard-catalog";

import { useDataModel } from "../../hooks/useDataBinding";
import { useScope } from "../../contexts/ScopeContext";

import { ComponentRenderer } from "../ComponentRenderer";
import { TemplateRenderer } from "./TemplateRenderer";

import { For, Show } from "solid-js";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";

/**
 * Maps align values to Tailwind align-items classes.
 */
const alignStyles: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function ListComponent(props: A2UIComponentProps<ListComponentProps>) {
  const dataModel = useDataModel(props.surfaceId);
  const { basePath } = useScope();

  const className = () =>
    cn(
      "flex gap-3",
      props.direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
      alignStyles[props.align ?? "stretch"],
    );

  const style = () =>
    props.weight ? { "flex-grow": props.weight } : undefined;

  // ---------- Static children ----------
  const isStatic = () => Array.isArray(props.children);

  // ---------- Template binding ----------
  const isTemplate = () =>
    props.children &&
    typeof props.children === "object" &&
    "componentId" in props.children;

  return (
    <div class={className()} style={style()}>
      {/* Static list */}
      <Show when={isStatic()}>
        <For each={props.children as string[]}>
          {(childId) => (
            <ComponentRenderer
              surfaceId={props.surfaceId}
              componentId={childId}
            />
          )}
        </For>
      </Show>

      {/* Template binding */}
      <Show when={isTemplate()}>
        <TemplateRenderer
          surfaceId={props.surfaceId}
          template={props.children as any}
          dataModel={dataModel()}
          basePath={basePath}
        />
      </Show>
    </div>
  );
}
