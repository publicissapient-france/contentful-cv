import Vue from 'vue';
import VueRouter from 'vue-router';
import router from '@/router';
import App from '@/App';
import {Auth0Plugin} from '@/auth';

Vue.config.productionTip = false;

Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
