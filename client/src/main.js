// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'buefy/dist/buefy.css';
import Buefy from 'buefy';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './stores';

Vue.config.productionTip = false;

Vue.use(Buefy);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
