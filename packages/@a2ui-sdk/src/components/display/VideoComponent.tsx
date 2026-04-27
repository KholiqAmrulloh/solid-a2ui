/**
 * VideoComponent - Displays video content.
 */
import type { VideoComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding } from "../../hooks/useDataBinding";

import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";
/**
 * Video component for displaying video content.
 */
export function VideoComponent(props: A2UIComponentProps<VideoComponentProps>) {
  const videoUrl = useStringBinding(props.surfaceId, props.url, "");

  const style = () =>
    props.weight ? { "flex-grow": props.weight } : undefined;

  return (
    <>
      {videoUrl() && (
        <video
          src={videoUrl()}
          controls
          class={cn("w-full rounded-lg")}
          style={style()}
        >
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
}
