import Vue from 'vue';
import VueRouter from 'vue-router';
import router from '@/router';
import App from '@/App';
import {Auth0Plugin} from '@/auth';
import {domain, clientId} from '../auth_config.json';

Vue.config.productionTip = false;

Vue.use(Auth0Plugin, {
  domain,
  clientId,
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
