<template>
    <div class="board" @contextmenu.prevent="onContextMenu" @click="onClick">
        <PostIt v-for="postIt in postIts" :key="postIt.id" v-bind="postIt" @openContextMenu="openContextMenu"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from '@/eventBus'
import CONSTANT from '@/store/constant'

import PostIt from '@/components/PostIt'

export default {
    name: 'Board',
    components: {
        PostIt
    },
    computed: {
        ...mapState([
            'postIts'
        ])
    },
    methods: {
        onContextMenu (e) {
            const { pageX = 0, pageY = 0 } = e
            this.openContextMenu({ pagePos: {pageX, pageY}, groups: ['main'] })
            this.onClick()
        },
        onContextMenuClick ({action = ''}) {
            if (action !== '') {
                this.$store.dispatch(action)
            }
        },
        onClick () {
            this.$store.commit(CONSTANT.SET_ACTIVE_POST_IT, '')
        },
        openContextMenu (params) {
            this.$contextMenu.open(params)
        }
    },
    created () {
        EventBus.$on('contextMenuClick', this.onContextMenuClick)
    }
}
</script>

<style lang="scss">
.board {
    width: 100%;
    height: 100%;
}
</style>
