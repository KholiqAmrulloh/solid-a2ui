// src/hooks/use-a2ui-message-handler.ts
import { useSurfaceContext } from '../context/surface';
import type { A2UIMessage } from '../types/a2ui';

export function useA2UIMessageHandler() {
  const { addMessage, clearSurfaces } = useSurfaceContext();

  return {
    processMessage: (message: A2UIMessage) => {
      addMessage(message);
    },
    processMessages: (messages: A2UIMessage[]) => {
      for (const msg of messages) {
        addMessage(msg);
      }
    },
    clear: () => clearSurfaces()
  };
}