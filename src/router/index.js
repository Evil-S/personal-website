import Vue from 'vue'
import Router from 'vue-router'
import home from '/@/views/home'
import production from '/@/views/production/production'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/production',
      name: 'production',
      component: production
    }
  ]
})
