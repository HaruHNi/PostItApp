import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { registerDirective } from '@/utils'
import directives from '@/components/directives'

Vue.config.productionTip = false

Object.keys(directives).forEach(key => registerDirective(Vue, directives[key]))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')