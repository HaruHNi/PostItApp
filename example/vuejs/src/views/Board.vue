<template>
  <div id="board">
    <h1>Board!!</h1>

    <PostIt v-for="postIt in postIts" :key="postIt.id" v-bind="postIt"/>
  </div>
</template>

<script>
import PostIt from '@/components/PostIt'

export default {
    name: 'Board',
    components: {
        PostIt
    },
    data () {
        return {
            postIts: [
              { id: 1, collapse: false, message: '1', position: {left: 0, top: 0} },
              { id: 2, collapse: false, message: '2', position: {left: 0, top: 210} },
              { id: 3, collapse: false, message: '3', position: {left: 0, top: 420} }
            ]
        }
    }
}
</script>

<style lang="scss"></style>
