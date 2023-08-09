import api from "@/api/api";

export default{
  install(Vue) {
    Vue.prototype.$api = api
  }
}