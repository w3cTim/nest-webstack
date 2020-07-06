<template>
  <div>
    <avue-crud
      v-if="option.column"
      :page="page"
      :data="data.data"
      :option="option"
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
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string
  data: any = {}
  option: any = {}
  page: any = {
    // pageSize: 2,
    // pageSizes: [2, 5, 10],
    total: 0,
  }
  query: any = {
    // sort: { _id: -1 }
  }

  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.option = res.data
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
        where[k] = { $regex: where[k] }
      }
    }
    this.query.where = where
    this.fetch()
    done()
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    })
    this.page.total = res.data.total
    this.data = res.data
  }

  async create(row, done) {
    await this.$http.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update(row, index, done) {
    const data = JSON.parse(JSON.stringify(row))
    // AVue 会在数据中添加 $index，而在 MongoDB 以 $ 开头的是有特殊意义的操作符
    // 所以提交的数据得删除
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
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
    await this.$http.delete(`${this.resource}/${row._id}`)
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
