/**
 * ComponentRenderer - Routes component rendering based on type.
 *
 * Uses the flat discriminator format from 0.9 protocol where
 * the component type is a property on the component itself.
 * Props are spread directly to components like in v0.8.
 */
import { useContext } from "solid-js";
import { ComponentsMapContext } from "../contexts/ComponentsMapContext";
import { useComponent } from "../hooks/useComponent";
import { UnknownComponent } from "./UnknownComponent";
import { Dynamic } from "solid-js/web";

/**
 * Props for ComponentRenderer.
 */
export interface ComponentRendererProps {
  surfaceId: string;
  componentId: string;
}

/**
 * Set of component IDs currently being rendered (for circular reference detection).
 */
const renderingComponents = new Set<string>();

/**
 * Renders a component based on its type from the component registry.
 * Supports custom component overrides via ComponentsMapContext.
 *
 * @example
 * ```tsx
 * // Render a component by ID
 * <ComponentRenderer surfaceId="surface-1" componentId="text-1" />
 * ```
 */
export function ComponentRenderer(props: ComponentRendererProps) {
  const component = useComponent(props.surfaceId, props.componentId);
  const componentsMapContext = useContext(ComponentsMapContext);

  // Check for circular reference
  const renderKey = `${props.surfaceId}:${props.componentId}`;
  if (renderingComponents.has(renderKey)) {
    console.error(
      `[A2UI 0.9] Circular reference detected for component "${props.componentId}" on surface "${props.surfaceId}". Skipping render.`,
    );
    return null;
  }

  const currentComponent = component();

  if (!currentComponent) {
    console.warn(
      `[A2UI 0.9] Component not found: ${props.componentId} on surface ${props.surfaceId}`,
    );
    return null;
  }

  // Get the component type from the discriminator property
  const componentType = currentComponent.component;

  const ComponentImpl = componentsMapContext?.getComponent(componentType);

  // If component type is unknown, render the fallback
  if (!ComponentImpl || typeof ComponentImpl !== "function") {
  console.warn(`[A2UI] Component "${componentType}" is not a valid function`)
  return (
    <UnknownComponent
      surfaceId={props.surfaceId}
      componentId={props.componentId}
      componentType={componentType}
    />
  )
}

  // Extract props from component, excluding 'component' (the type discriminator) and 'id'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { component: _type, id: _id, ...restProps } = currentComponent;

  // Add to rendering set for circular reference detection
  renderingComponents.add(renderKey);
  // Remove from rendering set after render
  renderingComponents.delete(renderKey);

  return (
    <Dynamic
      component={ComponentImpl}
      surfaceId={props.surfaceId}
      componentId={props.componentId}
      {...restProps}
    />
  );
}
