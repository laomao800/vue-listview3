import { vi, afterAll, afterEach, beforeAll } from 'vitest'
import { config } from '@vue/test-utils'
import ResizeObserver from 'resize-observer-polyfill'

vi.stubGlobal('ResizeObserver', ResizeObserver)
vi.mock('element-plus/es/components/button-group/style/css', () => void 0)
vi.mock('element-plus/es/components/dropdown/style/css', () => void 0)

config.global.stubs = {}

import { server } from './tests/mocks/server'

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
