import {SET_DATA,FILTE_ARTICLE,FILTE_ARTICLES,FILTE_CATEGORY_ARTICLE} from './mutation-types'
export default {
	[SET_DATA](state, data) {
		// state._cache = common.deepCopy(data);
		state.data = data;
	},
	[FILTE_ARTICLE](state, index) {
		// state._cache = common.deepCopy(data);
		state.currentArticle = state.data[0][index];
	},
	[FILTE_ARTICLES](state, index) {
		// console.log(index)
		// console.log(state.data[1][0])
		state.currentArticles.name = state.data[1][index].name
		state.currentArticles.data = state.data[1][index].articles
	},
	[FILTE_CATEGORY_ARTICLE](state, article) {
		// state.currentArticle
		console.log(article)
		let name = article.slice(0,-3)
		let arr = state.data[0].filter((obj)=>{return obj.title === name})
		state.currentArticle = arr[0]
	}
}