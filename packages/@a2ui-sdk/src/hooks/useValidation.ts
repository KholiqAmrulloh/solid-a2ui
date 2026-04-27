/**
 * useValidation - Hook for evaluating checks on components.
 *
 * Provides reactive validation based on data model changes.
 */
import type { CheckRule, ValidationResult } from "@a2ui-sdk/types/0.9";
import { createMemo, type Accessor } from "solid-js";
import { useSurfaceContext } from "../contexts/SurfaceContext";
import { useScope } from "../contexts/ScopeContext";
import { evaluateChecks, type ValidationFunction } from "@a2ui-sdk/utils/0.9";

/**
 * Hook for evaluating validation checks on a component.
 *
 * @param surfaceId - The surface ID for data model lookup
 * @param checks - Array of check rules to evaluate
 * @param customFunctions - Optional custom validation functions
 * @returns Accessor<ValidationResult> with valid flag and error messages
 *
 * @example
 * ```tsx
 * function TextFieldComponent({ surfaceId, component }) {
 *   const validation = useValidation(surfaceId, component.checks);
 *
 *   return (
 *     <div>
 *       <input class={!validation().valid ? 'error' : ''} />
 *       <For each={validation().errors}>
 *         {(err) => <span class="error">{err}</span>}
 *       </For>
 *     </div>
 *   );
 * }
 * ```
 */
export function useValidation(
  surfaceId: string,
  checks: CheckRule[] | undefined,
  customFunctions?: Record<string, ValidationFunction>,
): Accessor<ValidationResult> {
  const { getDataModel } = useSurfaceContext();
  const { basePath } = useScope();

  return createMemo(() => {
    const dataModel = getDataModel(surfaceId);
    return evaluateChecks(checks, dataModel, basePath, customFunctions);
  });
}
