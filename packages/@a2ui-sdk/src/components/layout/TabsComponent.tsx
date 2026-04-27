/**
 * TabsComponent - Tabbed content container.
 * Note: In 0.9, tabItems is renamed to tabs.
 */
import type { DynamicString } from '@a2ui-sdk/types/0.9'
import type { TabsComponentProps } from '@a2ui-sdk/types/0.9/standard-catalog'
import { useStringBinding } from '../../hooks/useDataBinding'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs'
import { ComponentRenderer } from '../ComponentRenderer'
import { For, Show } from 'solid-js'
import { A2UIComponentProps } from '../types'

/**
 * Helper component to resolve tab titles.
 */
function TabTitle(props: {
  surfaceId: string
  title: DynamicString | undefined
  index: number
}) {
  const titleText = useStringBinding(props.surfaceId, props.title, `Tab ${props.index + 1}`)
  return <>{titleText()}</>
}

/**
 * Tabs component - tabbed content container.
 */
export function TabsComponent(props: A2UIComponentProps<TabsComponentProps>) {
  // Apply weight as flex-grow if set
  const style = () => props.weight ? { 'flex-grow': props.weight } : undefined

  // Get the first tab as default
  const defaultTab = () => props.tabs?.[0]?.child

  return (
    <Show when={props.tabs && props.tabs.length > 0}>
      <Tabs defaultValue={defaultTab()} class="w-full" style={style()}>
        <TabsList>
          <For each={props.tabs}>
            {(item, index) => (
              <TabsTrigger value={item.child}>
                <TabTitle surfaceId={props.surfaceId} title={item.title} index={index()} />
              </TabsTrigger>
            )}
          </For>
        </TabsList>
        <For each={props.tabs}>
          {(item) => (
            <TabsContent value={item.child}>
              <ComponentRenderer surfaceId={props.surfaceId} componentId={item.child} />
            </TabsContent>
          )}
        </For>
      </Tabs>
    </Show>
  )
}