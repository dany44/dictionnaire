// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import SearchResultsView from './views/SearchResultView.vue';
import store from './store/index.js'; // Importez votre store Vuex
import "/node_modules/flag-icons/css/flag-icons.min.css";

const routes = [
  { path: '/', component: HomeView },
  { path: '/search-results', name: 'search-results', component: SearchResultsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store); // Associez le store Vuex ici
app.mount('#app');
