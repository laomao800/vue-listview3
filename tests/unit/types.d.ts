/// <reference types="vite/client" />

declare module '@vue/test-utils' {
  import { DefineComponent } from 'vue'
  import { MountingOptions } from '@vue/test-utils'

  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>

  export declare function mount(
    c: component,
    options?: MountingOptions
  ): VueWrapper<any>
}
