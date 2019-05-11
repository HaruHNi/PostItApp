import CONSTANT from '@/store/constant'
import { uuid } from '@/utils'
import postIt from '@/models/postIt'

export default {
    [CONSTANT.ADD_POST_IT]: ({ commit }) => {
        commit(CONSTANT.ADD_POST_IT, postIt(uuid()))
    },
    [CONSTANT.DELETE_ALL_POST_IT]: ({ commit }) => {
        commit(CONSTANT.DELETE_ALL_POST_IT, [])
    },
    [CONSTANT.SET_ACTIVE_POST_IT]: ({ commit }) => {
        commit(CONSTANT.SET_ACTIVE_POST_IT)
    },
    [CONSTANT.EXPAND_POST_IT]: ({ commit }) => {
        commit(CONSTANT.EXPAND_POST_IT)
    },
    [CONSTANT.COLLAPSE_POST_IT]: ({ commit }) => {
        commit(CONSTANT.COLLAPSE_POST_IT)
    },
    [CONSTANT.DELETE_POST_IT]: ({ commit }) => {
        commit(CONSTANT.DELETE_POST_IT)
    }
}