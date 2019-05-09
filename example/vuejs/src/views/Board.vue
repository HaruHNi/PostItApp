<template>
    <div class="board" @contextmenu.prevent="onOpenContextMenu">
        <PostIt v-for="postIt in postIts" :key="postIt.id" v-bind="postIt"/>
        <ContextMenu ref="contextMenu" :menus="contextMenus" @click="onMenuClick"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { uuid } from '@/utils'
import CONSTANT from '@/store/constant'

import PostIt from '@/components/PostIt'
import ContextMenu from '@/components/ContextMenu'

export default {
    name: 'Board',
    components: {
        PostIt,
        ContextMenu
    },
    data () {
        return {
            contextMenus: [
                { id: 1, title: 'Post It 추가' },
                { id: 2, title: 'Post It 전체 삭제' }
            ]
        }
    },
    computed: {
        ...mapState([
            'postIts'
        ])
    },
    methods: {
        onOpenContextMenu (e) {
            const { contextMenu = null } = this.$refs
            
            if (contextMenu) {
                contextMenu.open(e)
            }
        },
        onMenuClick ({id = 1}) {
            if (id === 1) {
                this.addPostIt()
            } else {
                this.deleteAllPostIt()
            }
        },
        addPostIt () {
            const postIt = {
                id: uuid(), collapse: false, message: '', position: {left: 0, top: 0} 
            }

            this.$store.commit(CONSTANT.ADD_POST_IT, postIt)
        },
        deleteAllPostIt () {
            this.$store.commit(CONSTANT.DELETE_ALL_POST_IT)
        }
    }
}
</script>

<style lang="scss">
.board {
    width: 100%;
    height: 100%;
}
</style>
