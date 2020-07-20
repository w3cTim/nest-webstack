<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
}
/* Recommended css code for vue-svgicon */
.svg-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: inherit;
  fill: none;
  stroke: currentColor;
  vertical-align: -0.15em;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}

.svg-up {
  transform: rotate(0deg);
}

.svg-right {
  transform: rotate(90deg);
}

.svg-down {
  transform: rotate(180deg);
}

.svg-left {
  transform: rotate(-90deg);
}
</style>
