/**
 * ImageComponent - Displays an image with configurable sizing and fit.
 */
import type { ImageComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useStringBinding } from "../../hooks/useDataBinding";
import { A2UIComponentProps } from "../types";
import { cn } from "../../lib/utils";

/**
 * Maps fit property to CSS object-fit values.
 */
const fitStyles: Record<string, string> = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

/**
 * Maps variant to size and style classes.
 */
const variantStyles: Record<string, string> = {
  icon: "w-6 h-6",
  avatar: "w-10 h-10 rounded-full",
  smallFeature: "w-16 h-16",
  mediumFeature: "w-32 h-32",
  largeFeature: "w-48 h-48",
  header: "w-full h-48",
};

/**
 * Image component for displaying images.
 * Supports different sizes via variant and object-fit via fit property.
 */
export function ImageComponent(props: A2UIComponentProps<ImageComponentProps>) {
  const imageUrl = useStringBinding(props.surfaceId, props.url, "");

  const style = () =>
    props.weight ? { "flex-grow": props.weight } : undefined;

  const className = () =>
    cn(
      fitStyles[props.fit ?? "cover"] || fitStyles,
      props.variant && variantStyles[props.variant],
    );

  return (
    <>
      {imageUrl() && (
        <img
          src={imageUrl()}
          alt=""
          class={className()}
          style={style()}
          loading="lazy"
        />
      )}
    </>
  );
}
