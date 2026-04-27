/**
 * SliderComponent - Slider input with two-way binding (SolidJS).
 */

import { createMemo } from "solid-js";
import type { SliderComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding, useFormBinding } from "../../hooks/useDataBinding";
import { useValidation } from "../../hooks/useValidation";
import { Slider, SliderTrack, SliderFill, SliderThumb } from "../ui/Slider";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";
import { Label } from "../ui/Label";

export function SliderComponent(
  props: A2UIComponentProps<SliderComponentProps>,
) {
  const {
    surfaceId,
    componentId,
    label,
    min = 0,
    max = 100,
    value: valueProp,
    checks,
    weight,
  } = props;

  const labelText = useStringBinding(surfaceId, label, "");
  const validation = useValidation(surfaceId, checks);

  const [sliderValue, setSliderValue] = useFormBinding<number>(
    surfaceId,
    valueProp,
    min,
  );

  const id = `slider-${componentId}`;

  const style = createMemo(() =>
    weight ? { "flex-grow": weight } : undefined,
  );

  return (
    <div class={cn("flex flex-col gap-2 py-2")} style={style()}>
      {labelText() && <Label for={id}>{labelText()}</Label>}

      <Slider
        id={id}
        value={[sliderValue()]}
        onChange={(values) => {
          if (values.length > 0) {
            setSliderValue(values[0]!);
          }
        }}
        minValue={min}
        maxValue={max}
        step={1}
        class={cn(!validation().valid && "opacity-70")}
      >
        <SliderTrack>
          <SliderFill />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <div class="flex justify-between text-sm text-muted-foreground">
        <span>{min}</span>
        <span class="font-medium text-foreground">{sliderValue()}</span>
        <span>{max}</span>
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
