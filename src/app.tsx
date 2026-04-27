import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import { A2UIMessage } from "@a2ui-sdk/types/0.9";
import { A2UIProvider } from "@a2ui-sdk/solid";

const messages: A2UIMessage[] = [
  {
    createSurface: {
      surfaceId: "main",
      catalogId: "standard",
    },
  },
  {
    updateComponents: {
      surfaceId: "main",
      components: [
        {
          id: "root",
          component: "Column",
          children: ["title"],
        },
        {
          id: "title",
          component: "Text",
          text: "Hello A2UI!",
          variant: "h1",
        },
      ],
    },
  },
]

// const ClientA2UIProvider = clientOnly(() =>
//   import("../packages/@a2ui-sdk/src").then(m => ({
//     default: m.A2UIProvider
//   }))
// )

export default function App() {
  
  return (
    <Router
      root={props => (
        <A2UIProvider messages={[]}>
          <Nav />
          <Suspense>{props.children}</Suspense>
        </A2UIProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
