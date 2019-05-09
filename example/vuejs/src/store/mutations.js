import CONSTANT from '@/store/constant'

export default {
    [CONSTANT.ADD_POST_IT]: (state, postIt) => {
        state.postIts.push(postIt)
    },
    [CONSTANT.DELETE_POST_IT]: (state, postItId) => {
        const newPostIts = state.postIts.filter(postIt => (postIt.id !== postItId))
        state.postIts = newPostIts
    },
    [CONSTANT.DELETE_ALL_POST_IT]: state => {
        state.postIts = []
    }
}