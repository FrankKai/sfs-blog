import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import home from "@/page/home.vue";
import Blog from "@/page/blog.vue";
import Category from "@/page/category.vue";
import Record from "@/page/record.vue";
import Tag from "@/page/tag.vue";
import Admin from "@/page/admin.vue";
import articleLists from "@/components/category/articlelists.vue";
import NotFoundComponent from "@/components/common/404.vue";
import Editor from "@/components/editor.vue";
import cArticle from "@/components/common/article.vue";

export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      component: NotFoundComponent
    },
    {
      path: "/",
      name: "index",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/blog",
      name: "blog",
      component: Blog
    },
    {
      path: "/blog/:carticle",
      name: "carticle",
      component: cArticle
    },
    {
      path: "/category",
      name: "category",
      component: Category
    },
    {
      path: "/category/:articleLists",
      name: "articleLists",
      component: articleLists
    },
    {
      path: "/category/:articleLists/:carticle",
      name: "carticle",
      component: cArticle
    },
    {
      path: "/record",
      name: "record",
      component: Record
    },
    {
      path: "/record/:carticle",
      name: "crecord",
      component: cArticle
    },
    {
      path: "/tag",
      name: "tag",
      component: Tag
    },
    {
      path: "/editor",
      name: "editor",
      component: Editor
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    }
  ]
});
