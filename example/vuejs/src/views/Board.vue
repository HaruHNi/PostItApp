<template>
  <div id="board">
    <h1>Board!!</h1>

    <PostIt v-bind="postIt"/>
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
            postIt: { id: 1, collapse: false, message: '' }
        }
    }
}
</script>

<style lang="scss"></style>
