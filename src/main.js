import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUsers, faExclamationCircle, faBook, faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';
import App from './App.vue';

library.add(faUsers, faExclamationCircle, faBook, faTag);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const now = new Date();
const currentMonth = now.getDate() - 31;

Vue.filter('formatDate', (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (date >= currentMonth) {
    const elapsedDays = Math.abs(now.getDay() - date.getDay());
    if (elapsedDays === 0) {
      return 'Today';
    } if (elapsedDays === 1) {
      return 'Yesterday';
    }
    return `${elapsedDays} days ago`;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
});

Vue.filter('truncate', (text, length, clamp) => {
  if (!text) return null;
  return text.length > length ? text.slice(0, length) + clamp || '...' : text;
});

Vue.filter('prettify', (number) => {
  if (number > 1000000) {
    return `${Math.floor(number / 1000000)}M`;
  } if (number > 1000) {
    return `${Math.floor(number / 1000)}K`;
  }

  return number;
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
