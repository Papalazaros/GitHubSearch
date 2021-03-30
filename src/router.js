import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from './views/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: (route) => ({ query: route.query.query }),
  },
  {
    path: '*',
    redirect: '/search',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
