import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '../page/home.vue'
import User from '../components/hdu.vue'
import Article from '../page/article.vue'
import Blog from '../page/blog.vue'
import Category from '../page/category.vue'
import Record from '../page/record.vue'
import Tag from '../page/tag.vue'
import articleLists from '../components/category/articlelists.vue'


export default new Router({
    routes:[
        {
            path: '/',
            name: 'index',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        // { 
        //     path: '/home/:id', 
        //     component: User
        // },
        // {
        //     path: '/article',
        //     name: 'article',
        //     component: Article 
        // },
        {
            path: '/blog',
            name: 'blog',
            component: Blog
        },
        {
            path: '/blog/:article',
            name: 'article',
            component: Article
        },
        {
            path: '/category',
            name: 'category',
            component: Category
        },
        {
            path: '/category/:articleLists',
            name: 'category',
            component: articleLists
        },
        {
            path: '/category/:articleLists/:article',
            name: 'article',
            component: Article
        },
        {
            path: '/record',
            name: 'record',
            component: Record
        },
        {
            path: '/record/:article',
            name: 'record',
            component: Article
        },
        {
            path: '/tag',
            name: 'tag',
            component: Tag
        }
    ]
})