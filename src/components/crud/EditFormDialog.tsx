import { FormModel, Modal } from 'ant-design-vue'
import Vue from 'vue'
import { EditService } from '../../core'
import { EditForm } from './EditForm'

export const EditFormDialog = Vue.extend({
  props: {
    service: {
      type: Object as () => EditService<any, any, any>
    },
    formProps: {
      type: Object as () => FormModel
    }
  },
  mounted () {
    console.log(this.$slots)
  },
  render() {
    return (
      <Modal {...{
        props: {
          title: this.service.isEdit ? '编辑' : '新增',
          visible: this.service.visible,
          confirmLoading: this.service.saving
        },
        on: {
          ok: () => this.service.onEditSubmit(),
          cancel: () => this.service.onCancel()
        }
      }}>
        <EditForm
          {...{
            props: this.$props
          }}
        >
          {this.$slots.default}
        </EditForm>
      </Modal>
    )
  }
})