import CONSTANT from '@/store/constant'

export default {
    [CONSTANT.ADD_POST_IT]: (state, postIt) => {
        state.postIts.push(postIt)
    },
    [CONSTANT.DELETE_ALL_POST_IT]: state => {
        state.postIts = []
    },
    [CONSTANT.SET_ACTIVE_POST_IT]: (state, postItId) => {
        state.activePostItId = postItId
    },
    [CONSTANT.EXPAND_POST_IT]: state => {
        const { postIts, activePostItId } = state
        let postIt = postIts.find(postIt => (postIt.id === activePostItId))

        if (!!postIt) {
            postIt.collapse = false
        }
    },
    [CONSTANT.COLLAPSE_POST_IT]: state => {
        const { postIts, activePostItId } = state
        let postIt = postIts.find(postIt => (postIt.id === activePostItId))

        if (!!postIt) {
            postIt.collapse = true
        }
    },
    [CONSTANT.DELETE_POST_IT]: state => {
        const { postIts, activePostItId } = state
        const newPostIts = postIts.filter(postIt => (postIt.id !== activePostItId))
        state.postIts = newPostIts
    }
}