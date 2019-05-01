import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import Focus from '@/components/directives/Focus'
import Draggable from '@/components/directives/Draggable'
Vue.directive('focus', Focus)
Vue.directive('draggable', Draggable)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')