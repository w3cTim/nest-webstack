<template>
  <div class="icons-container">
    <aside>
      <a href="https://armour.github.io/vue-typescript-admin-docs/guide/advanced/icon.html" target="_blank">Add and use </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div v-for="item of svgIcons" :key="item">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateSvgIconCode(item) }}
            </div>
            <div class="icon-item">
              <svg-icon :name="item" class="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div v-for="item of elementIcons" :key="item">
          <el-tooltip placement="top">
            <div slot="content">
              {{ generateElementIconCode(item) }}
            </div>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import elementIcons from './element-icons'
import svgIcons from './svg-icons'

@Component({
  name: 'Icons',
})
export default class extends Vue {
  private svgIcons = svgIcons
  private elementIcons = elementIcons

  private generateElementIconCode(symbol: string) {
    return `<i class="el-icon-${symbol}" />`
  }

  private generateSvgIconCode(symbol: string) {
    return `<svg-icon name="${symbol}" />`
  }
}
</script>

<style scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
}

.icons-container .icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}

.icons-container .icon-item span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}

.icons-container .icon-item .disabled {
  pointer-events: none;
}
</style>
