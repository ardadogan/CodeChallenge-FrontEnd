import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.prototype.$http = Axios;
export const apiUrl = 'http://arda.reactivers.com:8000';
export const bus = new Vue();
export const formatTimezone = function (tempDateString) {
    let tempDate = new Date(tempDateString);
    tempDate.setUTCHours(tempDate.getUTCHours() + (tempDate.getTimezoneOffset() / -60));
    return tempDate;
};
const token = localStorage.getItem('user-token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
