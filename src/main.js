// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './http';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
import global_ from './GlobalVariable/globalVar';
import audioCtr from './components/audioCtrl/audioCtr';
import formatDate from './filter/dateFilter';
import '../static/css/global.css';

Vue.config.productionTip = false;
// 配置http
Vue.prototype.$http = http;
Vue.prototype.formatDate = formatDate;
Vue.prototype.globarVar_ = global_;
Vue.filter('formatDate', formatDate);
// 配置museUI
theme.add(
  'teal',
  {
    primary: '#E5463B',
    secondary: '#ff4081',
    success: '#4caf50',
    warning: '#ffeb3b'
  },
  'light'
);
theme.use('teal');
Vue.use(MuseUI);
// 配置全局变量
Vue.component(audioCtr);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
