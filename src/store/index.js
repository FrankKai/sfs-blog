import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const state = {
  data: "",
  currentArticle: {
    index: 0
  },
  currentArticles: {
    name: "",
    data: []
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
