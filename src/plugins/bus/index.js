import bus from "./bus";

export default {
  install(Vue) {
    Vue.prototype.$bus = (() => bus)();
  }
};
