/**
 * CardComponent - Card container (SolidJS).
 */

import type { CardComponentProps } from "@a2ui-sdk/types/0.9/standard-catalog";
import { ComponentRenderer } from "../ComponentRenderer";
import { createMemo } from "solid-js";
import { A2UIComponentProps } from "../types";
import { Card, CardContent } from "../ui/Card";

export function CardComponent(props: A2UIComponentProps<CardComponentProps>) {
  const { surfaceId, child, weight } = props;

  const style = createMemo(() =>
    weight ? { "flex-grow": weight } : undefined,
  );

  if (!child) {
    return <Card style={style()} />;
  }

  return (
    <Card style={style()}>
      <CardContent class="p-4">
        <ComponentRenderer surfaceId={surfaceId} componentId={child} />
      </CardContent>
    </Card>
  );
}
