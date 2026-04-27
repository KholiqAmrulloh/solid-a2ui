/**
 * DateTimeInputComponent - SolidJS + Flatpickr
 */

import { onMount, onCleanup, createMemo } from "solid-js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { CalendarIcon, ClockIcon } from "lucide-solid";

import type { DateTimeInputComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";

import { useStringBinding, useFormBinding } from "../../hooks/useDataBinding";
import { useValidation } from "../../hooks/useValidation";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";
import { Label } from "../ui/Label";

export function DateTimeInputComponent(
  props: A2UIComponentProps<DateTimeInputComponentProps>,
) {
  const {
    surfaceId,
    componentId,
    label,
    value: valueProp,
    enableDate = true,
    enableTime = false,
    checks,
    weight,
  } = props;

  const labelText = useStringBinding(surfaceId, label, "");
  const validation = useValidation(surfaceId, checks);

  const [dateValue, setDateValue] = useFormBinding<string>(
    surfaceId,
    valueProp,
    "",
  );

  let inputRef: HTMLInputElement | undefined;
  let fp: flatpickr.Instance | undefined;

  const id = `datetime-${componentId}`;

  const style = createMemo(() =>
    weight ? { "flex-grow": weight } : undefined,
  );

  const Icon = enableDate ? CalendarIcon : ClockIcon;

  onMount(() => {
    if (!inputRef) return;

    fp = flatpickr(inputRef, {
      enableTime,
      noCalendar: !enableDate,
      dateFormat:
        enableDate && enableTime ? "Y-m-d H:i" : enableDate ? "Y-m-d" : "H:i",
      defaultDate: dateValue() || undefined,
      onChange: (_selectedDates, dateStr) => {
        setDateValue(dateStr);
      },
    });
  });

  onCleanup(() => {
    fp?.destroy();
  });

  return (
    <div class={cn("flex flex-col gap-2")} style={style()}>
      {labelText() && <Label for={id}>{labelText()}</Label>}

      <div class="relative">
        <input
          ref={inputRef}
          id={id}
          value={dateValue()}
          readOnly
          aria-invalid={!validation().valid}
          class={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:border-destructive pr-9",
            !validation().valid && "border-destructive",
          )}
        />

        <Icon class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      {validation().errors.length > 0 && (
        <div class="text-sm text-destructive">
          {validation().errors.map((error) => (
            <p>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
