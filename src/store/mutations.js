import {SET_DATA,FILTE_ARTICLE,FILTE_ARTICLES,FILTE_CATEGORY_ARTICLE} from './mutation-types'
export default {
	[SET_DATA](state, data) {
		// state._cache = common.deepCopy(data);
		state.data = data;
	},
	[FILTE_ARTICLE](state, index) {
		// state._cache = common.deepCopy(data);
		state.currentArticle = Object.assign({},state.data.blog[index]);
		state.currentArticle.index = index;
	},
	[FILTE_ARTICLES](state, index) {
		// console.log(index)
		// console.log(state.data[1][0])
		state.currentArticles.name = state.data.category[index].name
		state.currentArticles.data = state.data.category[index].articles
	},
	[FILTE_CATEGORY_ARTICLE](state, article) {
		// state.currentArticle
		console.log(article)
		let name = article.slice(0,-3)
		let arr = state.data.blog.filter((obj)=>{return obj.title === name})
		state.currentArticle = arr[0]
	}
}