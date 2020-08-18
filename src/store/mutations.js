import {
  SET_DATA,
  FILTE_ARTICLE,
  FILTE_ARTICLES,
  FILTE_CATEGORY_ARTICLE
} from "./mutation-types";
export default {
  [SET_DATA](state, data) {
    state.data = data;
  },
  [FILTE_ARTICLE](state, index) {
    state.currentArticle = Object.assign({}, state.data.blog[index]);
    state.currentArticle.index = index;
  },
  [FILTE_ARTICLES](state, index) {
    state.currentArticles.name = state.data.category[index].name;
    state.currentArticles.data = state.data.category[index].articles;
  },
  [FILTE_CATEGORY_ARTICLE](state, article) {
    let name = article.slice(0, -3);
    let arr = state.data.blog.filter(obj => {
      return obj.title === name;
    });
    state.currentArticle = arr[0];
  }
};
