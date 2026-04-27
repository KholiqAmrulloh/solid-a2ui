/**
 * UnknownComponent - Fallback for unknown component types.
 *
 * In development mode, renders a visible placeholder to help developers
 * identify missing or misspelled component types.
 * In production mode, this should log a warning but render minimally.
 */

import { A2UIComponentProps } from "./types";

/**
 * Props for UnknownComponent.
 */
export interface UnknownComponentProps {
  componentType: string;
}

/**
 * Fallback component for unknown types.
 *
 * Displays a warning box with the unknown component type name
 * to help developers identify configuration issues.
 */
export function UnknownComponent(
  props: A2UIComponentProps<UnknownComponentProps>,
) {
  // Log warning in both dev and production
  if (process?.env?.["VITE_APP_ENVIRONMENT"] === "dev") {
    console.warn(
      `[A2UI 0.9] Unknown component type "${props.componentType}" (id: ${props.componentId}). ` +
        "Make sure the component type is correct or provide a custom component.",
    );
  }

  return (
    <div
      style={{
        padding: "8px 12px",
        margin: "4px",
        "background-color": "#fff3cd",
        border: "1px solid #ffc107",
        "border-radius": "4px",
        color: "#856404",
        "font-size": "12px",
        "font-family": "monospace",
      }}
    >
      <strong>Unknown component:</strong> {props.componentType}
      <br />
      <span style={{ opacity: "0.7" }}>ID: {props.componentId}</span>
    </div>
  );
}
