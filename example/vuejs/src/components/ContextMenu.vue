<template>
    <div class="context-menu" v-show="isOpened" :style="positionStyle" @contextmenu.stop>
        <ul class="menu-list">
            <li class="menu-item" 
                v-for="menu in menus" :key="menu.id"
                @click="onMenuClick(menu)">
                {{ menu.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import ClickDetector from '@/utils/ClickDetector'

export default {
    name: 'ContextMenu',
    props: {
        menus: {
            type: Array,
            default () {
                return []
            },
            required: true
        }
    },
    data () {
        return {
            isOpened: false,
            left: 0,
            top: 0,
            documentClickDetector: null
        }
    },
    computed: {
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
        onMenuClick ({id, title}) {
            this.$emit('click', {id, title})
            this.close()
        },
        open (e) {
            this.isOpened = true
            this.updatePosition(e)
            this.documentClickDetector.bind()
        },
        close () {
            this.isOpened = false
            this.documentClickDetector.unbind()
        },
        updatePosition (e) {
            const { pageX = 0, pageY = 0 } = e

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