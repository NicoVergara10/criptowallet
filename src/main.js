import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toaster from "@meforma/vue-toaster";

createApp(App).use(store).use(router).use(Toaster).mount('#app');
