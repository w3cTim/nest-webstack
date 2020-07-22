<template>
  <div>
    <avue-crud
      v-if="option.column"
      :page="page"
      :data="data.data"
      :option="option"
      v-model="form"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
// vue-property-decorator 是在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
import { Vue, Component, Prop } from 'vue-property-decorator'
import iconList from '../utils/iconfont'

@Component({})
export default class ResourceCrud extends Vue {
  @Prop(String) resource!: string

  data: any = {}
  form: any = {}
  option: any = { border: true, stripe: true, showHeder: true, index: true, sizeValue: 'mini' }
  page: any = {
    pageSize: 20,
    pageSizes: [10, 20, 30, 50],
    total: 0,
  }
  query: any = {
    // sort: { _id: -1 }
  }

  async fetchOption() {
    const res = await this.$axios.get(`${this.resource}/option`)

    if (res.data.column) {
      res.data.column.forEach((e) => {
        if (e.type === 'icon') {
          e.iconList.forEach((element) => {
            if (element.label === '阿里图标') {
              element.list = iconList
            }
          })
        }
      })
    }

    this.option = { ...this.option, ...res.data }
    // console.log(this.option)
  }

  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  async changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1,
      }
    }
    this.fetch()
  }

  async search(where, done) {
    for (let k in where) {
      const field = this.option.column.find((v) => v.prop === k)
      if (field.regex) {
        where[k] = { $regex: where[k][0] }
      }
    }
    this.query.where = where
    this.fetch()
    done()
  }

  async fetch() {
    const res: any = await this.$axios.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    })

    this.page.total = res.data.total
    this.data = res.data
  }

  async create(row, done) {
    // console.log(row, this.form)
    // avue bug
    if (row.url && Array.isArray(row.url)) {
      row.url = row.url[0]
    }

    await this.$axios.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update(row, index, done) {
    // console.log(row, this.form)
    const data = JSON.parse(JSON.stringify(row))
    // console.log(data, this.form)
    // AVue 会在数据中添加 $index，而在 MongoDB 以 $ 开头的是有特殊意义的操作符
    // 所以提交的数据得删除
    delete data.$index
    await this.$axios.put(`${this.resource}/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  async remove(row) {
    try {
      await this.$confirm('是否确认删除？')
    } catch (e) {
      return
    }
    await this.$axios.delete(`${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  created() {
    this.fetchOption()
    this.fetch()
  }

  //@param: file, done, loading, column
  //   uploadBefore(file, done) {
  //     // console.log(file, column)
  //     // 如果你想修改file文件,由于上传的file是只读文件，必须复制新的file才可以修改名字，完后赋值到done函数里,如果不修改的话直接写done()即可
  //     // var newFile = new File([file], '1234', { type: file.type })
  //     done()
  //     this.$message.success('上传前的方法')
  //   }
  //   uploadAfter(res, done) {
  //     console.log(res)
  //     done()
  //     this.$message.success('上传后的方法')
  //   }
}
</script>

<style></style>
