import App from './components/App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {routerConfig} from './router-config';

Vue.config.debug = true;

Vue.use(VueRouter);
let router = new VueRouter({
  saveScrollPosition: true
});

routerConfig(router);

router.start(App, '#container');
