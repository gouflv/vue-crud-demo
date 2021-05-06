import { FormModel } from 'ant-design-vue'
import { GET } from '../request/request'

/**
 * EditService<Store, T, P>
 *   T: form-data typing
 *   P: edit params typing
 */
export abstract class EditService<Store, T, P> {
  /**
   * Modal visible sate
   */
  visible = false

  /**
   * Sign of form `create` or `edit` mode
   */
  isEdit = false

  /**
   * Form data
   */
  data = {} as T

  /**
   * initial params when begin editing
   */
  params = {} as P

  /**
   * initial form-data loading state
   */
  loading = false

  /**
   * user form-data saving state
   */
  saving = false

  formRef: FormModel | null = null

  constructor (protected store: Store) {}

  /**
   * @public
   */
  public onAdd(): void {
    this.isEdit = false
    this.loading = false
    this.saving = false
    this.visible = true
    this.data = this.getDefaultFormData() as T
  }

  /**
   * Fetch form-data from api, or use params directly
   *
   * @public
   */
  public async onEdit(params: P): Promise<void> {
    this.isEdit = true
    this.loading = false
    this.saving = false
    this.visible = true
    this.params = params
    if (this.getFetchURL()) {
      await this.fetchFromData()
    } else {
      this.data = this.mapFetchedToFormData(params)
    }
  }

  public async onEditSubmit(): Promise<void> {
    console.log('onEditSubmit', this.data)
    // TODO
    this.visible = false
  }

  public onCancel(): void {
    // TODO abort request
    this.visible = false
  }

  /**
   * @public
   */
  public async onRemove(params: P): Promise<void> {
    console.log('Remove', params)
    this.saving = true
  }

  async fetchFromData(): Promise<void> {
    this.loading = true
    try {
      const { data } = await GET(this.getFetchURL(), {
        data: this.getFetchParams()
      })
      this.data = this.mapFetchedToFormData(data)
    } catch (e) {
      // TODO register global error handler
    } finally {
      this.loading = false
    }
  }

  getFetchParams(): Record<string, unknown> {
    return {}
  }

  mapFetchedToFormData(data: unknown): T {
    return data as T
  }

  /**
   * Return an initial form-data value when `create`
   */
  getDefaultFormData(): Partial<T> {
    return {}
  }

  getRemoveURL(): string {
    return ''
  }

  /**
   * Should return url in implement
   *
   * @abstract
   */
  abstract getFetchURL(): string

  /**
   * Should return url in implement
   *
   * @abstract
   */
  abstract getSubmitURL(): string
}

