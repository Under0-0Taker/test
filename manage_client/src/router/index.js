import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login')
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home')
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome')

const Users = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/User/Users.vue')
const Rights = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/Power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "Users_Rights_Roles" */ '../components/Power/Roles.vue')

const Add = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/Goods/Add.vue')
const List = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/Goods/List.vue')

const Categories = () => import(/* webpackChunkName: "Cate_Params" */ '../components/Goods/Categories.vue')
const Params = () => import(/* webpackChunkName: "Cate_Params" */ '../components/Goods/Params.vue')

const Order = () => import(/* webpackChunkName: "Order_Report" */ '../components/Orders/Order.vue')
const Report = () => import(/* webpackChunkName: "Order_Report" */ '../components/report/Report.vue')

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/users',
      component: Users
    },
    {
      path: '/rights',
      component: Rights
    },
    {
      path: '/roles',
      component: Roles
    },
    {
      path: '/goods',
      component: List
    },
    {
      path: '/goods/add',
      component: Add
    },
    {
      path: '/categories',
      component: Categories
    },
    {
      path: '/params',
      component: Params
    },
    {
      path: '/orders',
      component: Order
    },
    {
      path: '/reports',
      component: Report
    }
    ]
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

export default router
