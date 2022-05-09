import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'

vi.stubGlobal('ResizeObserver', ResizeObserver)
vi.mock('element-plus/es/components/button-group/style/css', () => void 0)
vi.mock('element-plus/es/components/dropdown/style/css', () => void 0)

config.global.stubs = {}
