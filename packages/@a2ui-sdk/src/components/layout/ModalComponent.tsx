/**
 * ModalComponent - Modal/Dialog container.
 * Note: In 0.9, entryPointChild/contentChild are renamed to trigger/content.
 */
import type { ModalComponentProps } from '@a2ui-sdk/types/0.9/standard-catalog'
import { createSignal, Show } from 'solid-js'
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog'
import { ComponentRenderer } from '../ComponentRenderer'
import { A2UIComponentProps } from '../types'

/**
 * Modal component - dialog container with trigger.
 */
export function ModalComponent(props: A2UIComponentProps<ModalComponentProps>) {
  const [open, setOpen] = createSignal(false)

  return (
    <Show when={props.trigger && props.content}>
      <Dialog open={open()} onOpenChange={setOpen}>
        <DialogTrigger as="div" class="cursor-pointer">
          <ComponentRenderer surfaceId={props.surfaceId} componentId={props.trigger!} />
        </DialogTrigger>
        <DialogContent>
          <ComponentRenderer surfaceId={props.surfaceId} componentId={props.content!} />
        </DialogContent>
      </Dialog>
    </Show>
  )
}