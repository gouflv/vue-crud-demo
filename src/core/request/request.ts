export type Response<T> = {
  code: number
  data: T
  message: string
}

export type PaginationData<T> = {
  items: T[]
  page: number
  size: number
  total: number
}

export const GET = (url: string, options?: unknown): Promise<Response<unknown>> => {
  console.debug(`GET ${url}`, JSON.stringify(options))

  if (url === 'findAll')
  return Promise.resolve({
    code: 0,
    data: {
      items: [
        {name:'a'},
        {name:'b'}
      ],
      total: 11
    },
    message: ''
  })

  return Promise.resolve({
    code: 0,
    data: {
      name:'a',
      detail: true
    },
    message: ''
  })
}

export const POST = (url: string, options?: unknown): Promise<void> => {
  console.debug(`POST ${url}`, JSON.stringify(options))
  return Promise.resolve()
}