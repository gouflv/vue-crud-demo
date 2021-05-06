import { FormModel } from 'ant-design-vue'
import Vue from 'vue'
import { EditService } from '../../core'

export const EditForm = Vue.extend( {
  props: {
    service: {
      type: Object as () => EditService<any, any, any>
    },
    formProps: {
      type: Object as () => FormModel
    }
  },
  mounted () {
    this.service.formRef = this.$refs.form as FormModel
  },
  render() {
    return (
      <FormModel
        {...{
          ref: 'form',
          props: { ...this.formProps, model: this.service.data }
        }}
      >
        {this.$slots.default}
      </FormModel>
    )
  }
})