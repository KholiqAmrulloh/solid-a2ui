/**
 * CheckBoxComponent - Checkbox input with two-way binding.
 */
import type { CheckBoxComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding, useFormBinding } from "../../hooks/useDataBinding";
import { useValidation } from "../../hooks/useValidation";
import { useScopeBasePath } from "../../contexts/ScopeContext";
import { For } from "solid-js";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";

/**
 * CheckBox component - checkbox input with label.
 */
export function CheckBoxComponent(
  props: A2UIComponentProps<CheckBoxComponentProps>,
) {
  const labelText = useStringBinding(props.surfaceId, props.label, "");
  const [checked, setChecked] = useFormBinding<boolean>(
    props.surfaceId,
    props.value,
    false,
  );
  const validation = useValidation(props.surfaceId, props.checks);
  const basePath = useScopeBasePath();

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
  };

  // Include basePath in ID to ensure uniqueness in templated lists
  const id = () =>
    basePath
      ? `checkbox-${props.componentId}-${basePath.replace(/\//g, "-")}`
      : `checkbox-${props.componentId}`;

  // Apply weight as flex-grow if set
  const style = () =>
    props.weight ? { "flex-grow": props.weight } : undefined;

  return (
    <div class={cn("flex flex-col gap-1")} style={style()}>
      <div class="flex items-center gap-3">
        <Checkbox
          id={id()}
          checked={checked()}
          onChange={handleChange}
          aria-invalid={!validation().valid}
        />
        {labelText() && (
          <Label for={id()} class="cursor-pointer">
            {labelText()}
          </Label>
        )}
      </div>
      {validation().errors.length > 0 && (
        <div class="text-sm text-destructive ml-6">
          <For each={validation().errors}>{(error) => <p>{error}</p>}</For>
        </div>
      )}
    </div>
  );
}
