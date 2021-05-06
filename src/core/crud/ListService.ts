import { FormModel } from 'ant-design-vue'
import { GET, PaginationData } from '../request'

type ListFetchOption = {
  reset: boolean
}

const PageIndexBase = 1

/**
 * ListService<Store, T, S>
 *   T: list item typing
 *   S: search data typing
 */
export abstract class ListService<Store, T = unknown, S = unknown> {
  /**
   * List data
   */
  items = [] as T[]

  /**
   * Page index, start from 1
   */
  page = PageIndexBase

  /**
   * Page size
   */
  size = 20

  /**
   * Total
   */
  total = 0

  /**
   * loading state
   */
  loading = false

  /**
   * empty state
   */
  empty = false

  /**
   * Search from data
   */
  search = {} as Partial<S>

  searchForm: FormModel | null = null

  /**
   * Keep Store ref, then user could track typing in Component
   */
  constructor (protected store: Store) {
    this.search = this.getDefaultFormData()
  }

  /**
   * Handle page index change event
   *
   * @public
   */
  public async handlePageIndexChange(index: number): Promise<void> {
    this.page = index
    await this.fetch()
  }

  /**
   * Handle search form submit event
   *
   * @public
   */
  public async handlerSearchSubmit (): Promise<void> {
    if (!this.searchForm) {
      throw new Error('search form unset')
    }
    try {
      await this.searchForm.validate()
      this.fetch({ reset: true })
    } catch (e) {
      // TODO register global message handler
    }
  }

  public handlerSearchReset(): void {
    this.search = this.getDefaultFormData()
    this.fetch({ reset: true })
  }

  async fetch(option?: ListFetchOption): Promise<void> {
    if (option && option.reset) {
      this.page = PageIndexBase
    }

    this.loading = true
    this.empty = false
    this.items = []

    try {
      const url = this.getFetchURL()
      const res = await GET(url, {
        data: {
          page: this.page,
          size: this.size,
          ...this.mapSearchParams()
        }
      })

      const data = res.data as PaginationData<T>
      this.items = this.reduceListItem(data.items)
      this.total = data.total
    } catch (e) {
      // TODO register global error handler
    } finally {
      this.loading = false
      this.empty = !this.items.length
    }
  }

  reduceListItem(data: unknown[]): T[] {
    return data as T[]
  }

  /**
   * Provide a default value for search form
   */
  getDefaultFormData(): Partial<S> {
    return {}
  }

  /**
   * Map search data to api params, default return origin search
   */
  mapSearchParams(): Record<string, unknown> {
    return this.search
  }

  /**
   * Should return a url in implement
   *
   * @abstract
   */
  abstract getFetchURL(): string
}