<template>
  <div>
    <h3>{{ isNew ? '创建' : '编辑' }} WebStack</h3>
    <!-- vue-ele-from 基于 element-ui 的数据驱动表单组件 -->
    <ele-form v-model="data" :form-desc="fields" :request-fn="submit"></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CourseEdit extends Vue {
  @Prop(String) id!: string
  data = {}

  fields = {
    name: { label: '站点名称', type: 'input' },
    logo: { label: '站点 logo', type: 'input' },
    descript: { label: '描述', type: 'textarea' },
  }

  // ES 语法
  get isNew() {
    return !this.id
  }

  async fetch() {
    const res = await this.$axios.get(`webstack/${this.id}`)
    this.data = res.data
  }

  async submit(data) {
    const url = this.isNew ? `webstack` : `webstack/${this.id}`
    const method = this.isNew ? 'post' : 'put'

    await this.$axios[method](url, data)
    this.$message.success('保存成功')
    this.data = {}
    this.$router.go(-1)
  }

  created() {
    !this.isNew && this.fetch()
  }
}
</script>

<style></style>
