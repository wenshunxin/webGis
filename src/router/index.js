import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from "@/components/login/login";

const Table = resolve =>require(['@/components/home/table'],resolve);
const Form = resolve =>require(["@/components/home/form"],resolve);
const openlayer = resolve =>require(["@/components/home/openlayer"],resolve);
const vuex = resolve =>require(["@/components/home/vuex"],resolve);
Vue.use(Router)

export default new Router({
  routes: [
    {
        path:"/",
        redirect: '/login'
    },
    {
        path:"/login",
        name:"Login",
        meta: {
            requireAuth: true
        },
        component:Login
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
          requireAuth: true
      },
      component: Home,
      children:[
            {
                path:"/",
                redirect: {
                    name: 'table'
                }
            },
            {
                path:"table",
                name:"table",
                component:Table
            },
            {
                path:"form",
                name:"form",
                component:Form
            },
            {
                path:"ol",
                name:"openlayer",
                component:openlayer
            },
            {
                path:"vuex",
                name:"vuex",
                component:vuex
            },
            {
                path:"settable",
                name:"settable",
                component:resolve =>require(["@/components/home/setTable"],resolve)
            },
            {
                path:"draw",
                name:"draw",
                component:resolve =>require(["@/components/home/draw"],resolve)
            }
        ]
    },

  ]
})
