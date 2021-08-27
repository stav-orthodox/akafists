import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import messagePlugin from './utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';
import Loader from '@/components/app/Loader';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
   apiKey: 'AIzaSyBNb7HOnW7F-qq1ddZU7OtCZTD6AICFR7E',
   authDomain: 'akafist-reestr.firebaseapp.com',
   projectId: 'akafist-reestr',
   storageBucket: 'akafist-reestr.appspot.com',
   messagingSenderId: '290537077430',
   appId: '1:290537077430:web:74fa88ac3b35105b4b8417',
   measurementId: 'G-L53NTQ919L',
});

let app;

firebase.auth().onAuthStateChanged(() => {
   if (!app) {
      app = createApp(App);
      app.use(store).use(router).use(messagePlugin).mount('#app');
      app.component('Loader', Loader);
      app.component('Paginate', VPagination);
   }
});
