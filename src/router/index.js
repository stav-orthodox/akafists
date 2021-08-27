import { createRouter, createWebHistory } from 'vue-router';

const routes = [
   {
      path: '/',
      name: 'Home',
      meta: { layout: 'main' },
      component: () =>
         import(/* webpackChunkName: "home" */ '../views/Home.vue'),
   },
   {
      path: '/login',
      name: 'Login',
      meta: { layout: 'empty' },
      component: () =>
         import(/* webpackChunkName: "login" */ '../views/Login.vue'),
   },
   {
      path: '/categories',
      name: 'Categories',
      meta: { layout: 'main' },
      component: () =>
         import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
   },
   {
      path: '/detail-record',
      name: 'DetailRecord',
      meta: { layout: 'main' },
      component: () =>
         import(
            /* webpackChunkName: "detail-record" */ '../views/DetailRecord.vue'
         ),
   },
   {
      path: '/history',
      name: 'History',
      meta: { layout: 'main' },
      component: () =>
         import(/* webpackChunkName: "history" */ '../views/History.vue'),
   },

   {
      path: '/profile',
      name: 'Profile',
      meta: { layout: 'main' },
      component: () =>
         import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
   },
   {
      path: '/record',
      name: 'Record',
      meta: { layout: 'main' },
      component: () =>
         import(/* webpackChunkName: "record" */ '../views/Record.vue'),
   },
   {
      path: '/register',
      name: 'Register',
      meta: { layout: 'empty' },
      component: () =>
         import(/* webpackChunkName: "register" */ '../views/Register.vue'),
   },
   {
      path: '/edit-record/:id',
      name: 'EditAkafist',
      meta: { layout: 'main' },
      component: () =>
         import(
            /* webpackChunkName: "edit-record" */ '../views/EditAkafist.vue'
         ),
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;
