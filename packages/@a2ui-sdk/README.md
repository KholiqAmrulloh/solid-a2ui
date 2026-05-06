# @a2ui-sdk/solid

SolidJS renderer for A2UI protocol (v0.9).

## Install

```bash
pnpm add @a2ui-sdk/solid @a2ui-sdk/types @a2ui-sdk/utils
```

## Basic usage

```tsx
import { A2UIProvider, A2UIRenderer, type A2UIMessage } from "@a2ui-sdk/solid/0.9";

export function App(props: { messages: A2UIMessage[] }) {
	return (
		<A2UIProvider messages={props.messages}>
			<A2UIRenderer />
		</A2UIProvider>
	);
}
```

## Standard catalog path (React-style import parity)

```tsx
import { standardCatalog } from "@a2ui-sdk/solid/0.9/standard-catalog";
```

`standardCatalog` is also available from `@a2ui-sdk/solid` and `@a2ui-sdk/solid/0.9`.
