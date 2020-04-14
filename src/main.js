import Vue from 'vue';
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router';
import router from '@/router';
import App from '@/App';
import {Auth0Plugin} from '@/auth';
import messages from '@/lang/messages';

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

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

Vue.use(VueRouter);

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app');
