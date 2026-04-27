/**
 * TextFieldComponent - Text input field with two-way binding (SolidJS).
 */

import { createMemo } from "solid-js";
import type { TextFieldComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding, useFormBinding } from "../../hooks/useDataBinding";
import { useValidation } from "../../hooks/useValidation";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";
import { Label } from "../ui/Label";
import { TextFieldInput, TextFieldTextArea } from "../ui/TextField";

/**
 * Maps variant to HTML input type.
 */
type InputType =
  | "text"
  | "number"
  | "password"
  | "button"
  | "search"
  | "time"
  | "image"
  | "hidden"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "month"
  | "radio"
  | "range"
  | "tel"
  | "url"
  | "week";

const inputTypeMap: Record<string, InputType> = {
  shortText: "text",
  longText: "text",
  number: "number",
  obscured: "password",
};

export function TextFieldComponent(
  props: A2UIComponentProps<TextFieldComponentProps>,
) {
  const {
    surfaceId,
    componentId,
    label,
    value: valueProp,
    variant = "shortText",
    checks,
    weight,
  } = props;

  // Solid hooks (diasumsikan return accessor + setter)
  const labelText = useStringBinding(surfaceId, label, "");
  const [value, setValue] = useFormBinding<string>(surfaceId, valueProp, "");
  const validation = useValidation(surfaceId, checks);

  const id = `textfield-${componentId}`;

  const inputType = createMemo(() => inputTypeMap[variant] || "text");
  const isLongText = createMemo(() => variant === "longText");

  const style = createMemo(() =>
    weight ? { "flex-grow": weight } : undefined,
  );

  const handleChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement | HTMLTextAreaElement;
    },
  ) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div class={cn("flex flex-col gap-2")} style={style()}>
      {labelText() && <Label for={id}>{labelText()}</Label>}

      {isLongText() ? (
        <TextFieldTextArea
          id={id}
          value={value()}
          onInput={handleChange}
          class={cn(
            "min-h-[100px]",
            !validation().valid && "border-destructive",
          )}
          aria-invalid={!validation().valid}
        />
      ) : (
        <TextFieldInput
          id={id}
          type={inputType()}
          value={value()}
          onInput={handleChange}
          class={cn(!validation().valid && "border-destructive")}
          aria-invalid={!validation().valid}
        />
      )}

      {validation().errors.length > 0 && (
        <div class="text-sm text-destructive">
          {validation().errors.map((error, _index) => (
            <p>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
