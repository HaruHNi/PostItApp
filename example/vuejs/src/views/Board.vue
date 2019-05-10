<template>
    <div class="board" @contextmenu.prevent="onOpenContextMenu">
        <PostIt v-for="postIt in postIts" :key="postIt.id" :ref="postIt.id" v-bind="postIt"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from '@/eventBus'

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
        onOpenContextMenu (e) {
            this.$contextMenu.open(this.parseContextMenuParams(e))
        },
        onContextMenuClick ({action = ''}) {
            if (action !== '') {
                this.$store.dispatch(action)
            }
        },
        parseContextMenuParams (e) {
            const { target, pageX = 0, pageY = 0 } = e
            const postItEl = target.closest('.post-it')
            let groups = ['main']

            if (!!postItEl) {
                const postIt = this.$refs[postItEl.id][0]
                groups = ['postIt', postIt.isCollapse() ? 'postIt-expand' : 'postIt-collapse' ]
            }

            return { pagePos: {pageX, pageY}, groups }
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
