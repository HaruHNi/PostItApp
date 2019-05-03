<template>
    <div class="board" @contextmenu.prevent="onOpenContextMenu">
        <PostIt v-for="postIt in postIts" :key="postIt.id" v-bind="postIt"/>
        <ContextMenu ref="contextMenu" :menus="contextMenus" @click="onMenuClick"/>
    </div>
</template>

<script>
import PostIt from '@/components/PostIt'
import ContextMenu from '@/components/ContextMenu'
import { uuid } from '@/utils'

export default {
    name: 'Board',
    components: {
        PostIt,
        ContextMenu
    },
    data () {
        return {
            postIts: [
                { id: uuid(), collapse: false, message: '1', position: {left: 0, top: 0} },
                { id: uuid(), collapse: false, message: '1', position: {left: 0, top: 210} },
                { id: uuid(), collapse: false, message: '1', position: {left: 0, top: 420} },
            ],
            contextMenus: [
                { id: 1, title: 'Post It 추가' },
                { id: 2, title: 'Post It 전체 삭제' }
            ]
        }
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
            const id = uuid()
            this.postIts.push({
                id, collapse: false, message: id, position: {left: 0, top: 0} 
            })
        },
        deleteAllPostIt () {
            this.postIts = []
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
