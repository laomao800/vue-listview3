import { config } from '@vue/test-utils'
import ResizeObserver from 'resize-observer-polyfill'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

import { server } from './tests/mocks/server'

vi.stubGlobal('ResizeObserver', ResizeObserver)

config.global.stubs = {}

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
