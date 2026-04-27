/**
 * DividerComponent - Displays a separator line.
 */
import type { DividerComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { A2UIComponentProps } from "../types";
import { Separator } from "../ui/Separator";

/**
 * Divider component for visual separation.
 */
export function DividerComponent(
  props: A2UIComponentProps<DividerComponentProps>,
) {
  const axis = () => props.axis ?? "horizontal";

  return (
    <Separator
      orientation={axis()}
      class={axis() === "vertical" ? "self-stretch h-auto!" : "w-full"}
    />
  );
}
