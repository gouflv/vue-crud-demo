<template>
  <div>
    <h2>List</h2>

    <section>
      <h3>Search</h3>
      <SearchForm
        :service="list"
        :formProps="{
          rules: searchRules
        }"
      >
        <a-form-model-item label="Name" prop="a">
          <a-input v-model="list.search.a" />
        </a-form-model-item>
      </SearchForm>
    </section>

    <section>
      <div>list state: {{ list.loading ? 'loading' : 'done' }}</div>
      <ol>
        <li v-for="it in list.items" :key="it.name">
          {{ it.name }}
          <button @click="edit.onEdit(it)">Edit</button>
          <button @click="edit.onRemove(it)">Remove</button>
        </li>
      </ol>
      <button @click="list.handlePageIndexChange(1)">Page1</button>
      <button @click="list.handlePageIndexChange(2)">Page2</button>
    </section>

    <h2>Edit</h2>

    <section>
      <div>{{edit.visible ? 'visible' : 'hidden'}}</div>
      <div>params: {{edit.params}}</div>
      <div>form data: {{edit.data}}</div>

      <EditFormDialog
        :service="edit"
        :formProps="{
          rules: editRules
        }"
      >
        <a-form-model-item label="Name" prop="name">
          <a-input v-model="edit.data.name" />
        </a-form-model-item>
      </EditFormDialog>
    </section>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SearchForm, EditFormDialog } from '../../components/crud'
import store from './store'

export default Vue.extend({
  components: {
    SearchForm,
    EditFormDialog
  },
  data() {
    return {
      store,
      list: store.list,
      edit: store.edit,

      searchRules: {
        a: { required: true }
      },
      editRules: {
        a: { required: true }
      }
    }
  },
  mounted () {
    store.list.fetch()
  }
})
</script>
