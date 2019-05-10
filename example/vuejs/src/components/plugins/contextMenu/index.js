import Vue from 'vue'
import ContextMenuComponent from '@/components/plugins/contextMenu/ContextMenu'

class ContextMenu {
	constructor (options) {
		this.instance = this.createComponent(options)
	}

	createComponent (options) {
		const ContextMenuConstructor = Vue.extend(ContextMenuComponent)
		const instance = new ContextMenuConstructor(options)
		instance.$mount()

		document.body.appendChild(instance.$el)

		return instance
    }
    
    open ({ pagePos = { pageX: 0, pageY: 0 }, groups = [] }) {
		this.instance.changeGroups(groups)
        this.instance.open(pagePos)
    }
}

const ContextMenuPlugin = {
	install: (Vue, options = {}) => {
		Vue.component('ContextMenu', ContextMenu)

		const contextMenu = new ContextMenu(options)
		Vue.contextMenu = Vue.prototype.$contextMenu = contextMenu
	}
}

export default ContextMenuPlugin