/**
 * ChoicePickerComponent - Choice picker with two-way binding.
 * Renamed from MultipleChoice in 0.8. Supports both single selection (dropdown) and multi-selection (checkboxes).
 */

import type { DynamicString } from "@a2ui-sdk/types/0.9";
import type { ChoicePickerComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding, useFormBinding } from "../../hooks/useDataBinding";
import { useValidation } from "../../hooks/useValidation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { For } from "solid-js";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/Checkbox";

/**
 * Helper component to resolve option labels.
 */
function OptionLabel(props: {
  surfaceId: string;
  label: DynamicString | undefined;
}) {
  const labelText = useStringBinding(props.surfaceId, props.label, "");
  return <>{labelText()}</>;
}

/**
 * ChoicePicker component - choice picker input.
 * When variant === 'mutuallyExclusive', renders as a dropdown.
 * When variant === 'multipleSelection' or undefined, renders as checkboxes.
 */
export function ChoicePickerComponent(
  props: A2UIComponentProps<ChoicePickerComponentProps>,
) {
  const labelText = useStringBinding(props.surfaceId, props.label, "");
  const isSingleSelection = () => props.variant === "mutuallyExclusive";
  const validation = useValidation(props.surfaceId, props.checks);

  const [selectedValue, setSelectedValue] = useFormBinding<string | string[]>(
    props.surfaceId,
    props.value,
    isSingleSelection() ? "" : [],
  );

  const handleSingleChange = (value: string | null) => {
    setSelectedValue(value ?? "");
  };

  const handleMultiChange = (value: string, checked: boolean) => {
    const current = selectedValue();
    const currentSelections = Array.isArray(current)
      ? current
      : current
        ? [current]
        : [];

    if (checked) {
      setSelectedValue([...currentSelections, value]);
    } else {
      setSelectedValue(currentSelections.filter((v) => v !== value));
    }
  };

  const id = `choicepicker-${props.componentId}`;

  // Apply weight as flex-grow if set
  const style = () =>
    props.weight ? { "flex-grow": props.weight } : undefined;

  const currentSelections = () => {
    const current = selectedValue();
    return Array.isArray(current) ? current : current ? [current] : [];
  };

  const currentSingleValue = () => {
    const current = selectedValue();
    return Array.isArray(current) ? current[0] || "" : current;
  };

  return (
    <>
      {props.options && props.options.length > 0 && (
        <>
          {isSingleSelection() ? (
            // Single selection mode - use dropdown
            <div class={cn("flex flex-col gap-2")} style={style()}>
              {labelText() && <Label for={id}>{labelText()}</Label>}
              <Select
                value={currentSingleValue()}
                onChange={handleSingleChange}
                aria-invalid={!validation().valid}
                options={props.options.map((o) => o.value)}
                itemComponent={(prop) => (
                  <SelectItem item={prop?.item}>
                    {prop?.item?.rawValue}
                  </SelectItem>
                )}
              >
                <SelectTrigger
                  id={id}
                  class={cn(!validation().valid && "border-destructive")}
                >
                  <SelectValue<string>>
                    {(state) => state.selectedOption() ?? "Select an option"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
              {validation().errors.length > 0 && (
                <div class="text-sm text-destructive">
                  <For each={validation().errors}>
                    {(error) => <p>{error}</p>}
                  </For>
                </div>
              )}
            </div>
          ) : (
            // Multi-selection mode - use checkboxes
            <div class={cn("flex flex-col gap-2")} style={style()}>
              {labelText() && <Label>{labelText()}</Label>}
              <For each={props.options}>
                {(option) => {
                  const isChecked = () =>
                    currentSelections().includes(option.value);
                  const checkboxId = `${id}-${option.value}`;

                  return (
                    <div class="flex items-center gap-2">
                      <Checkbox
                        id={checkboxId}
                        checked={isChecked()}
                        onChange={(checked) =>
                          handleMultiChange(option.value, checked === true)
                        }
                      />
                      <Label for={checkboxId} class="cursor-pointer">
                        <OptionLabel
                          surfaceId={props.surfaceId}
                          label={option.label}
                        />
                      </Label>
                    </div>
                  );
                }}
              </For>
              {validation().errors.length > 0 && (
                <div class="text-sm text-destructive">
                  <For each={validation().errors}>
                    {(error) => <p>{error}</p>}
                  </For>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
