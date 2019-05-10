import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { registerDirective, registerPlugin } from '@/utils'
import directives from '@/components/directives'
import ContextMenuPlugin from '@/components/plugins/contextMenu'
import menus from '@/models/menus'
import { EventBus } from '@/eventBus'

Vue.config.productionTip = false

Object.keys(directives).forEach(key => registerDirective(Vue, directives[key]))

registerPlugin(Vue, ContextMenuPlugin, {
    data () {
        return {
            menus,
            groups: ['main'],
            eventBus: EventBus
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')