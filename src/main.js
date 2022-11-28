import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import service from "./libs/request";
import 'element-ui/lib/theme-chalk/index.css'
//import locale from 'element-ui/lib/locale'
//import './assets/styles/index.scss' // global css
//import VueI18n from 'vue-i18n'
import i18n from "@/language";



//Vue.use(VueI18n);

Vue.use(ElementUI);
Vue.prototype.$http = service;


Vue.config.productionTip = false;
/*const i18n = new VueI18n({
    local: 'cn', // 设置语言
    fallbackLocale: 'us',

    i18nList // 语言包
});*/


//locale.i18n((key, value) => i18n.t(key, value))
new Vue({
    router,
    i18n,
    render: h => h(App),

}).$mount('#app');
