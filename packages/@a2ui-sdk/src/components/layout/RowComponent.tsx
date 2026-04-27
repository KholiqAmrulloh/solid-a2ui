/**
 * RowComponent - Horizontal flex container.
 */
import type {
  RowComponentProps,
  Justify,
  Align,
} from '@a2ui-sdk/types/0.9/standard-catalog'
import { useDataModel } from '../../hooks/useDataBinding'
import { useScope } from '../../contexts/ScopeContext'
import { ComponentRenderer } from '../ComponentRenderer'
import { TemplateRenderer } from './TemplateRenderer'
import { For, Show } from 'solid-js'
import { A2UIComponentProps } from '../types'
import { cn } from '../../lib/utils'

/**
 * Maps justify values to Tailwind justify-content classes.
 */
const justifyStyles: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  spaceBetween: 'justify-between',
  spaceAround: 'justify-around',
  spaceEvenly: 'justify-evenly',
  stretch: 'justify-stretch',
}

/**
 * Maps align values to Tailwind align-items classes.
 */
const alignStyles: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

/**
 * Row component - horizontal flex container.
 * Supports both static children and template binding for dynamic children.
 */
export function RowComponent(props: A2UIComponentProps<RowComponentProps>) {
  const dataModel = useDataModel(props.surfaceId)
  const { basePath } = useScope()

  const className = () => cn(
    'flex flex-row gap-3',
    justifyStyles[props.justify ?? 'start'],
    alignStyles[props.align ?? 'stretch'],
  )

  // Apply weight as flex-grow if set
  const style = () => props.weight ? { 'flex-grow': props.weight } : undefined

  const isStaticChildren = () => Array.isArray(props.children)
  const isTemplateChildren = () =>
  props.children &&
  typeof props.children === 'object' &&
  'componentId' in props.children &&
  'path' in props.children

  return (
    <div class={className()} style={style()}>
      <Show when={isStaticChildren()}>
        <For each={props.children as string[]}>
          {(childId) => (
            <ComponentRenderer surfaceId={props.surfaceId} componentId={childId} />
          )}
        </For>
      </Show>
      <Show when={isTemplateChildren()}>
        <TemplateRenderer
          surfaceId={props.surfaceId}
          template={props.children as { componentId: string; path: string }}
          dataModel={dataModel()}
          basePath={basePath}
        />
      </Show>
    </div>
  )
}