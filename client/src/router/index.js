import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import Photos from '@/pages/Photos';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/photos',
      name: 'Photos',
      component: Photos,
    },
  ],
});
