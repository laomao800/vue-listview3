/// <reference types="vite/client" />
import { mount as _mount, MountingOptions } from '@vue/test-utils'

declare module '@vue/test-utils' {
  import { DefineComponent } from 'vue'

  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>

  export declare function mount(
    c: component,
    options?: MountingOptions
  ): ReturnType<typeof _mount>
}
