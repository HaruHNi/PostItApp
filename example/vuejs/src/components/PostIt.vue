<template>
    <div class="post-it" :class=classes>
        <div class="post-it-bar"></div>
        <textarea class="post-it-content" v-model="bindMessage"></textarea>
    </div>
</template>

<script>
export default {
    name: 'PostIt',
    props: {
        id: {
            type: Number,
            required: true
        },
        collapse: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            bindMessage: this.message
        }
    },
    computed: {
        classes () {
            return {
                'is-collapse': this.collapse
            }
        }
    }
}
</script>

<style lang="scss">
.post-it {
    position: absolute;
    width: 250px;
    height: 200px;
    padding-top: 15px;
    background: #ffff00;
    border: 1px solid #000;
    box-sizing: border-box;
    overflow: auto;
    font-size: 12px;
    z-index: 1;
    transition: height 100ms ease;

    .post-it-bar {
        position: absolute;
        top: 0;
        width: 100%;
        height: 15px;
        padding: 2px 5px;
        border-bottom: 1px solid #000;
    }

    .post-it-content {
        width: 100%;
        height: 100%;
        padding: 5px 10px;
        background-color: transparent;
        border: none;
        outline: none;
        resize: none;
    }

    &.is-collapse {
        height: 15px !important;
        min-height: 0;
        resize: none;

        .post-it-bar {
            border: none;
        }

        .post-it-content {
            display: none;
        }
    }
}
</style>
