/// <reference types="vite/client" />
import { MountingOptions, mount as _mount } from '@vue/test-utils'

declare module '@vue/test-utils' {
  import { DefineComponent } from 'vue'

  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>

  export declare function mount(
    c: component,
    options?: MountingOptions
  ): ReturnType<typeof _mount>
}
