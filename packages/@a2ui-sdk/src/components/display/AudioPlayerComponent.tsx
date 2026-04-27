/**
 * AudioPlayerComponent - Displays an audio player.
 */
import type { AudioPlayerComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding } from "../../hooks/useDataBinding";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";

/**
 * AudioPlayer component for playing audio content.
 */
export function AudioPlayerComponent(
  props: A2UIComponentProps<AudioPlayerComponentProps>,
) {
  const audioUrl = useStringBinding(props.surfaceId, props.url, "");
  const descriptionText = useStringBinding(
    props.surfaceId,
    props.description,
    "",
  );

  if (!audioUrl()) {
    return null;
  }

  // Apply weight as flex-grow if set
  const style = () =>
    props.weight ? { "flex-grow": props.weight } : undefined;

  return (
    <div class={cn("flex flex-col gap-2")} style={style()}>
      {descriptionText() && (
        <p class="text-sm text-muted-foreground">{descriptionText()}</p>
      )}
      <audio src={audioUrl()} controls class="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
