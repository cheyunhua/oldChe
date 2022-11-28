import Vue from 'vue'
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
//import iView from 'view-design'

// import locale from 'view-design/dist/locale/en-US';
import locale from 'element-ui/lib/locale/lang/zh-CN';
// let ui_zh = require('view-design/dist/locale/zh-CN')
// let ui_en = require('view-design/dist/locale/en-US')
let app_zh = require('./zh.json')
let app_en = require('./en.json')
Vue.use(VueI18n);
Vue.use(ElementUI,{
    locale
})
const messages = {
    en: Object.assign(app_en),
    zh: Object.assign(app_zh)
};

const i18n = new VueI18n({
    locale: 'zh', //if you need get the browser language use following "window.navigator.language"
    fallbackLocale: 'en',
    messages: messages,
    silentTranslationWarn: true
})

export default i18n;

