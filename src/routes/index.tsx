// src/routes/index.tsx
import { A2UIMessage, ActionPayload } from "@a2ui-sdk/types/0.9"
import { createSignal } from "solid-js"
import { A2UIProvider, A2UIRenderer } from "@a2ui-sdk/solid"

// ============================================================
// Contoh 1: Form login sederhana
// ============================================================
const loginMessages: A2UIMessage[] = [
  {
    createSurface: {
      surfaceId: "login",
      catalogId: "standard",
    },
  },
  {
    updateComponents: {
      surfaceId: "login",
      components: [
        // Root layout
        {
          id: "root",
          component: "Column",
          children: ["title", "email-field", "password-field", "submit-btn"],
          align: "stretch",
        },
        // Title
        {
          id: "title",
          component: "Text",
          text: "Login",
          variant: "h1",
        },
        // Email input
        {
          id: "email-field",
          component: "TextField",
          label: "Email",
          value: { path: "/email" },
          inputType: "email",
        },
        // Password input
        {
          id: "password-field",
          component: "TextField",
          label: "Password",
          value: { path: "/password" },
          inputType: "password",
        },
        // Submit button
        {
          id: "submit-btn",
          component: "Button",
          child: "submit-label",
          primary: true,
          action: {
            name: "onLogin",
            context: {
              email: { path: "/email" },
              password: { path: "/password" },
            },
          },
        },
        {
          id: "submit-label",
          component: "Text",
          text: "Login",
        },
      ],
    },
  },
  // Set initial data model
  {
    updateDataModel: {
      surfaceId: "login",
      path: "/",
      value: {
        email: "",
        password: "",
      },
    },
  },
]

// ============================================================
// Contoh 2: Profil user dengan gambar
// ============================================================
const profileMessages: A2UIMessage[] = [
  {
    createSurface: {
      surfaceId: "profile",
      catalogId: "standard",
    },
  },
  {
    updateComponents: {
      surfaceId: "profile",
      components: [
        {
          id: "root",
          component: "Card",
          child: "card-content",
        },
        {
          id: "card-content",
          component: "Row",
          children: ["avatar", "info"],
          align: "center",
        },
        {
          id: "avatar",
          component: "Image",
          url: { path: "/avatar" },
          variant: "avatar",
          fit: "cover",
        },
        {
          id: "info",
          component: "Column",
          children: ["name", "email-text"],
        },
        {
          id: "name",
          component: "Text",
          text: { path: "/name" },
          variant: "h2",
        },
        {
          id: "email-text",
          component: "Text",
          text: { path: "/email" },
          variant: "body",
        },
      ],
    },
  },
  {
    updateDataModel: {
      surfaceId: "profile",
      path: "/",
      value: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://i.pravatar.cc/150",
      },
    },
  },
]

// ============================================================
// Contoh 3: List dinamis dengan template
// ============================================================
const listMessages: A2UIMessage[] = [
  {
    createSurface: {
      surfaceId: "todo-list",
      catalogId: "standard",
    },
  },
  {
    updateComponents: {
      surfaceId: "todo-list",
      components: [
        {
          id: "root",
          component: "Column",
          children: ["list-title", "todo-list"],
        },
        {
          id: "list-title",
          component: "Text",
          text: "Todo List",
          variant: "h1",
        },
        // List dengan template binding
        {
          id: "todo-list",
          component: "List",
          children: {
            componentId: "todo-item",
            path: "/todos",
          },
        },
        // Template item (dirender untuk setiap item di /todos)
        {
          id: "todo-item",
          component: "Row",
          children: ["todo-checkbox", "todo-text"],
          align: "center",
        },
        {
          id: "todo-checkbox",
          component: "CheckBox",
          value: { path: "done" }, // relative path dalam scope item
        },
        {
          id: "todo-text",
          component: "Text",
          text: { path: "title" }, // relative path dalam scope item
        },
      ],
    },
  },
  {
    updateDataModel: {
      surfaceId: "todo-list",
      path: "/",
      value: {
        todos: [
          { title: "Belajar SolidJS", done: false },
          { title: "Migrasi dari React", done: true },
          { title: "Deploy ke production", done: false },
        ],
      },
    },
  },
]

// ============================================================
// Page component
// ============================================================
export default function Home() {
  const [activeExample, setActiveExample] = createSignal<"login" | "profile" | "todos">("login")

  const exampleMessages = () => {
    switch (activeExample()) {
      case "login": return loginMessages
      case "profile": return profileMessages
      case "todos": return listMessages
    }
  }

  const handleAction = (payload: ActionPayload) => {
    console.log("Action:", payload.name, payload.context)
  }

  return (
    <main class="p-8 max-w-2xl mx-auto">
      <div class="flex gap-2 mb-8">
        <button onClick={() => setActiveExample("login")}>Login Form</button>
        <button onClick={() => setActiveExample("profile")}>User Profile</button>
        <button onClick={() => setActiveExample("todos")}>Todo List</button>
      </div>

      {/* Provider di sini karena messages berubah sesuai activeExample */}
      <A2UIProvider messages={exampleMessages()}>
        <A2UIRenderer
          surfaceId={activeExample()}
          onAction={handleAction}
        />
      </A2UIProvider>
    </main>
  )
}