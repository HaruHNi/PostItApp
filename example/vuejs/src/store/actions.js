import CONSTANT from '@/store/constant'
import { uuid } from '@/utils'
import postIt from '@/models/postIt'

export default {
    [CONSTANT.ADD_POST_IT]: ({ commit }) => {
		commit(CONSTANT.ADD_POST_IT, postIt(uuid()))
    },
    [CONSTANT.DELETE_ALL_POST_IT]: ({ commit }) => {
		commit(CONSTANT.DELETE_ALL_POST_IT, [])
	}
}