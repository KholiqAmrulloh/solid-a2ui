import type { ComponentsMap, Catalog } from '../types/a2ui';
import type { ComponentDefinition } from '../types/component';

export interface RegistryConfig {
  strict?: boolean;
  fallbackComponent?: string;
}

export class ComponentRegistry {
  private registry: Map<string, { component: any; definition?: ComponentDefinition }> = new Map();
  private config: Required<RegistryConfig>;

  constructor(config: RegistryConfig = {}) {
    this.config = { strict: false, fallbackComponent: 'Text', ...config };
  }

  register(type: string, component: any, definition?: ComponentDefinition) {
    this.registry.set(type.toLowerCase(), { component, definition });
  }

  registerBatch(components: Record<string, { component: any; definition?: ComponentDefinition }>) {
    for (const [type, entry] of Object.entries(components)) {
      this.register(type, entry.component, entry.definition);
    }
  }

  get(type: string): any | undefined {
    const entry = this.registry.get(type.toLowerCase());
    if (entry?.component) return entry.component;

    if (this.config.strict) {
      throw new Error(`Component "${type}" is not registered and strict mode is enabled.`);
    }

    if (this.config.fallbackComponent) {
      return this.registry.get(this.config.fallbackComponent)?.component;
    }

    return undefined;
  }

  has(type: string): boolean {
    return this.registry.has(type.toLowerCase());
  }

  toCatalog(): Catalog {
    const components: ComponentsMap = {};
    this.registry.forEach((entry, type) => {
      components[type] = entry.component;
    });
    return { components };
  }

  listDefinitions(): Record<string, ComponentDefinition | undefined> {
    const defs: Record<string, ComponentDefinition | undefined> = {};
    this.registry.forEach((entry, type) => {
      defs[type] = entry.definition;
    });
    return defs;
  }
}

// Singleton export untuk kemudahan
export const defaultRegistry = new ComponentRegistry();