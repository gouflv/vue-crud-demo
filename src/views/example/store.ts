import { EditService, ListService } from '../../core'

type Item = {
  name: string
}

type Search = {
  a: string
}

type FromData = Item

class List extends ListService<Store, Item, Search> {
  getFetchURL (): string {
    return 'findAll'
  }
}

class Edit extends EditService<Store, FromData, Item> {
  getFetchURL (): string {
    return 'findOne'
  }
  getSubmitURL (): string {
    return 'postOne'
  }
}

class Store {
  list: List
  edit: Edit
  constructor () {
    this.list = new List(this)
    this.edit = new Edit(this)
  }
}

export default new Store()