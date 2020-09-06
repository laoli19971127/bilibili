import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/register";
import Login from "../views/Login";
import Userinfo from "../views/userinfo";
import Edit from "../views/Edit";
import Home from "../views/Home";
import Details from "../views/Details";
Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    component: Register
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/userinfo",
    component: Userinfo
  },
  {
    path: "/edit",
    component: Edit
  },
  {
    path: "/",
    component: Home,
    meta:{
      keepalive:true
    }
  },
  {
    path: "/details/:id",
    component: Details
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next) => {
  if((!localStorage.getItem('token') || !localStorage.getItem('id'))&&to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})
export default router;
