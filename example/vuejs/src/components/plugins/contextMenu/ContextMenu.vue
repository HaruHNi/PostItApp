<template>
    <div class="context-menu" v-show="isOpened" :style="positionStyle" @contextmenu.stop>
        <ul class="menu-list">
            <li class="menu-item" 
                v-for="menu in filterMenus" :key="menu.id"
                @click="onMenuClick(menu)">
                {{ menu.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import ClickDetector from '@/components/plugins/contextMenu/ClickDetector'

export default {
    name: 'ContextMenu',
    data () {
        return {
            menus: [],
            groups: [],
            eventBus: null,
            isOpened: false,
            left: 0,
            top: 0,
            documentClickDetector: null
        }
    },
    computed: {
        filterMenus () {
            return this.menus.filter(menu => this.groups.includes(menu.group))
        },
        positionStyle () {
            const { left = 0, top = 0 } = this
            return {
                left: `${left}px`,
                top: `${top}px`
            }
        }
    },
    methods: {
        onDocumentClick (e) {
            const { target } = e

            if (this.isOpened && !this.$el.contains(target)) {
                this.close()
            }
        },
        onMenuClick ({id, action}) {
            this.eventBus.$emit('contextMenuClick', {id, action})
            this.close()
        },
        open (pagePos) {
            this.isOpened = true
            this.updatePosition(pagePos)
            this.documentClickDetector.bind()
        },
        close () {
            this.isOpened = false
            this.documentClickDetector.unbind()
        },
        updatePosition ({ pageX = 0, pageY = 0 }) {
            this.$nextTick(() => {
                const menu = this.$el
                const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu
                const { innerWidth: windowWidth, innerHeight: windowHeight } = window
                
                if (windowWidth > pageX + menuWidth) {
                    this.left = pageX
                } else {
                    this.left = windowWidth - menuWidth
                }

                if (windowHeight > pageY + menuHeight) {
                    this.top = pageY
                } else {
                    this.top = windowHeight - menuHeight
                }
            })
        },
        changeGroups (groups = []) {
            this.groups = groups
        }
    },
    created () {
        this.documentClickDetector = new ClickDetector(this.onDocumentClick.bind(this))
    }
}
</script>

<style lang="scss">
.context-menu {
    display: inline-block;
    min-width: 100px;
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
    padding: 5px 0;

    .menu-item {
        font-size: 18px;
        padding: 10px 20px;

        &:active, &:hover {
            background-color: #d5d5d5;
        }
    }
}
</style>