import { mock } from 'mockjs'
import { rest } from 'msw'

function successWrap(data: any) {
  return {
    success: true,
    result: data,
  }
}

function errorWrap(msg: string, code = 500) {
  return {
    success: false,
    error_info: { code, msg },
  }
}

export const handlers = [
  rest.get('/mock/list', async (req, res, ctx) => {
    return res(ctx.json({}))
  }),
  rest.post('/mock/list', async (req, res, ctx) => {
    const errorFlag = (req.body as any)?.error
    if (errorFlag === 'apiError') {
      return res(ctx.json(errorWrap('apiError')))
    } else if (errorFlag === 'httpError') {
      return res(ctx.status(500), ctx.json(errorWrap('httpError')))
    } else if (errorFlag === 'empty') {
      return res(ctx.json(successWrap({ items: [], total: 0 })))
    }

    const pageSize = (req.body as any)?.page_size || 20
    // const data = { pageSize }
    const data = mock({
      [`items|${pageSize}`]: [
        {
          id: /\d{6}/,
          name: '@ctitle(10, 30)',
          sale_price: '@integer(100, 2000)',
          discount: '@float(0, 0, 1, 99)',
          seller: '@cname',
          date: '@date',
          quantity: '@integer(10, 200)',
          'enable|1': true,
        },
      ],
      total: 800,
    })
    const responseData = successWrap(data)
    return res(ctx.delay('real'), ctx.json(responseData))
  }),
]
