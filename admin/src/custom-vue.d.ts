import Vue from 'vue'
import { AxiosInstance } from 'axios'
declare module 'vue/types/vue' {
  //  声明为 Vue 补充的东西
  interface Vue {
    $axios: AxiosInstance
  }
}

declare module 'vue-ele-form' {}
