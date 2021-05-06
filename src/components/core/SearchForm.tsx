import { Button, FormModel } from 'ant-design-vue'
import Vue from 'vue'
import { ListService } from '../../core'

export const SearchForm = Vue.extend( {
  props: {
    service: {
      type: Object as () => ListService<any, any, any>
    },
    formProps: {
      type: Object as () => FormModel
    }
  },
  mounted () {
    this.service.searchForm = this.$refs.form as FormModel
  },
  render() {
    return (
      <FormModel
        {...{
          ref: 'form',
          props: { ...this.formProps, model: this.service.search }
        }}
      >
        {this.$slots.default}

        <FormModel.Item>
          <Button
            {...{
              props: {
                type: 'primary'
              },
              on: {
                click: () => this.service.handlerSearchSubmit()
              }
            }}
          >
            Submit
          </Button>
          <Button
            {...{
              props: {},
              on: {
                click: () => this.service.handlerSearchReset()
              }
            }}
          >
            Reset
          </Button>
        </FormModel.Item>
      </FormModel>
    )
  }
})