// src/hooks/use-dispatch-action.ts
import { useActionContext } from '../context/action';

export function useDispatchAction() {
  const { dispatch } = useActionContext();
  
  return (surfaceId: string, componentId: string, action: {
    name: string;
    context?: Record<string, any>;
  }) => {
    dispatch(surfaceId, componentId, action);
  };
}