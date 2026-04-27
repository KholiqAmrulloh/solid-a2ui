/**
 * ButtonComponent - Clickable button that triggers actions.
 */
import type { ButtonComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { useDispatchAction } from "../../hooks/useDispatchAction";
import { useValidation } from "../../hooks/useValidation";
import { ComponentRenderer } from "../ComponentRenderer";
import { A2UIComponentProps } from "../types";
import { Button } from "../ui/Button";

/**
 * Button component - triggers actions on click.
 * When checks are defined and fail, the button is disabled.
 */
export function ButtonComponent(
  props: A2UIComponentProps<ButtonComponentProps>,
) {
  const dispatchAction = useDispatchAction();
  const validation = useValidation(props.surfaceId, props.checks);

  const handleClick = () => {
    if (props.action) {
      dispatchAction(props.surfaceId, props.componentId, props.action);
    }
  };

  // Apply weight as flex-grow if set
  const style = () =>
    props.weight ? { "flex-grow": props.weight } : undefined;

  // Disable button if checks fail
  const isDisabled = () => !validation().valid;

  return (
    <Button
      variant={props.primary ? "default" : "outline"}
      onClick={handleClick}
      disabled={isDisabled()}
      class="inline-flex items-center justify-center"
      style={style()}
    >
      {props.child ? (
        <ComponentRenderer
          surfaceId={props.surfaceId}
          componentId={props.child}
        />
      ) : (
        "Button"
      )}
    </Button>
  );
}
