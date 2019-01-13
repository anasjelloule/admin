
require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import AdminMenu from './components/menu/AdminMenu'
import User from './components/admin/User'
import VeeValidate from 'vee-validate';

import Modal from './components/Modal'
import err404 from './components/err404'

import { routes } from './routes'
import { stores } from './stores'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VeeValidate)

const router = new VueRouter({
    mode: 'history',
    routes
})

const store = new Vuex.Store(stores);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('admin-menu', AdminMenu);
Vue.component('user', User);
Vue.component('modal', Modal);
Vue.component('err404', err404);
window.eventBus = new Vue();
const app = new Vue({
    el: '#app',
    router,
    store
});
