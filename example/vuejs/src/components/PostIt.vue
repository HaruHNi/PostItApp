<template>
    <div :id="id" class="post-it" 
        :class=classes v-draggable="onMove" :style="positionStyle" 
        @click="onClick" @contextmenu.prevent="onContextMenu">
        <div class="post-it-bar">
            <span class="post-it-title">{{ title }}</span>
            <div class="post-it-control-group">
                <button class="collapse-btn" @click="onToggle">
                    <span class="ico">열기/닫기</span>
                </button>
                <button class="delete-btn" @click="onDelete">
                    <span class="ico">삭제</span>
                </button>
            </div>
        </div>

        <div class="post-it-content">
            <textarea v-model="bindMessage" v-focus="actived" @blur="onTextareaBlur"></textarea>
        </div>
    </div>
</template>

<script>
import CONSTANT from '@/store/constant'

export default {
    name: 'PostIt',
    props: {
        id: {
            type: [Number, String],
            required: true
        },
        collapse: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        },
        position: {
            type: Object,
            default () {
                return {
                    left: 0,
                    top: 0
                }
            }
        }
    },
    data () {
        return {
            actived: false,
            bindMessage: this.message,
            bindCollapse: this.collapse,
            bindPosition: this.position
        }
    },
    computed: {
        classes () {
            return {
                'is-active': this.actived,
                'is-collapse': this.bindCollapse
            }
        },
        title () {
            const [ title = '', ] = this.bindMessage.split('\n')
            return title
        },
        positionStyle () {
            const { left = 0, top = 0 } = this.bindPosition
            return {
                left: `${left}px`,
                top: `${top}px`
            }
        }
    },
    watch: {
        collapse (value) {
            this.bindCollapse = value
        }
    },
    methods: {
        onClick (e) {
            e.stopPropagation()
            this.active()
        },
        onContextMenu (e) {
            e.stopPropagation()
            
            const { pageX = 0, pageY = 0 } = e
            const groups = ['postIt', this.bindCollapse ? 'postIt-expand' : 'postIt-collapse']
            this.$emit('openContextMenu', { pagePos: {pageX, pageY}, groups })
            this.active()
        },
        onToggle () {
            this.bindCollapse = !this.bindCollapse
        },
        onDelete () {
            this.$destroy()
            this.$el.parentNode.removeChild(this.$el)
        },
        onMove ({target, position}) {
            const { className = '' } = target

            if (className === 'post-it-bar') {
                this.updatePosition(position)
            }
        },
        onTextareaBlur () {
            this.actived = false
        },
        active () {
            this.actived = true
            this.$store.commit(CONSTANT.SET_ACTIVE_POST_IT, this.id)
        },
        updatePosition (position) {
            this.bindPosition = position
        },
        isCollapse () {
            return this.bindCollapse
        }
    }
}
</script>

<style lang="scss">
.post-it {
    position: absolute;
    width: 300px;
    height: 200px;
    padding-top: 25px;
    background: #ffff00;
    border: 1px solid #000;
    overflow: auto;
    font-size: 15px;
    z-index: 1;
    transition: height 100ms ease;
    box-sizing: border-box;
    resize: both;

    .post-it-bar {
        position: absolute;
        width: 100%;
        height: 25px;
        top: 0;
        border-bottom: 1px solid #000;
        user-select: none;

        .post-it-title {
            @include ellipsis();
            padding-left: 10px;
            padding-right: 50px;
            line-height: 25px;
            pointer-events: none;
        }

        .post-it-control-group {
            display: inline-block;
            position: absolute;
            right: 0;

            button {
                padding: 7px;
            }

            .collapse-btn {
                .ico {
                    width: 10px;
                    height: 10px;
                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4T93SMQoCMRBA0be1hbewE9ED2HgAT6TgXsnWxgOINoLnsLBVIgmEkF2LZRvT/z9/wjQGvmYgb3TBCm9cu0r7CgJ8ieASt5qkSxDgEx5815xhU5PUBAkO07dRcMSiJikFJfyK2RNUJbmgC06rVyVJMMc5flrITpPLf8sla9yTYIo9dj1wXtLigOfoh/Tz0v+g4APBNR4RIgOgqQAAAABJRU5ErkJggg==');
                    background-size: 10px 10px;
                }
            }

            .delete-btn {
                .ico {
                    width: 10px;
                    height: 10px;
                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAx0lEQVQ4T63TTWpCMRTF8Z+jOpeuqbiGaukGWlCLXYJa7cfAsaCIGxDcla6hBPIgLxp5oJnl4/zvueeSlhtX60a9uwMe0cWm4OwVexyr+9zBC9YY4C+DjDHDM3YlQDgP4p8M8okp3rBMwaUMhviOkDYml8QBdC3EERax2lnlay1Udx+Yx02AhbbOVslBEH/hHQ/RSWjrNydcAqTiKrA0k9p0ckCY8ypWrqWdTKePbSmDDp7SOWeWezjg1CTERt/k7n+hUdX00T+JQCARtuY86QAAAABJRU5ErkJggg==');
                    background-size: 10px 10px;
                }
            }
        }
    }

    .post-it-content {
        width: 100%;
        height: 100%;
        padding: 10px;

        textarea {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            outline: none;
            resize: none;
        }
    }

    &.is-active {
        outline: 5px solid red;
        z-index: 999998;
    }

    &.is-collapse {
        height: 25px !important;
        min-height: 0;
        resize: none;

        .post-it-bar {
            border: none;

            .collapse-btn {
                transform: rotate(180deg);
            }
        }

        .post-it-content {
            display: none;
        }
    }
}
</style>
