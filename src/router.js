import { createRouter, createWebHistory } from 'vue-router';
const vueRouter = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
  routes: [{
    path: '/',
    component: () => import( /* webpackChunkName: "page" */ '@/page/index.vue'),
    children: [{
      path: '',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/index.vue'),
    }, {
      path: 'category',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/category.vue'),
    }, {
      path: 'db',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/db.vue'),
    }, {
      path: 'map',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/map.vue'),
    }, {
      path: 'document',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/document.vue'),
    }, {
      path: 'glob',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/glob.vue'),
    }, {
      path: 'components',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/components.vue'),

    }, {
      path: 'record',
      component: () => import( /* webpackChunkName: "page" */ '@/page/list/record.vue'),

    }]
  }, {
    path: '/create',
    name: 'create',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/create.vue')
  }, {
    path: '/build',
    name: 'build',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/build.vue')
  }, {
    path: '/build/:id',
    name: 'build',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/build.vue')
  }, {
    path: '/view/:id',
    name: 'view',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/view.vue')
  }]
})
export default vueRouter;