import {saveComment, getComments} from "@/request/api/Comment";
import {Notification} from "element-ui";

export default {
	getComments({rootState}) {
		getComments(rootState.commentQueryParams).then(res => {
			if(res.success) {
				rootState.count = res.data.count
				rootState.comments = res.data.comments
				rootState.totalPage = res.data.totalPage
			} else {
				Notification({
					title: '错误',
					message: res.msg,
					type: 'error'
				})
			}
		});
	},
	async submitCommentForm({rootState, dispatch}) {
		let isSuccess = false
		let form = {...rootState.commentForm}
		form.objectType = rootState.commentQueryParams.objectType
		form.objectId = rootState.commentQueryParams.objectId
		form.parentCommentId = rootState.parentCommentId
		form.replyNickname = rootState.replyNickname
		const token = window.localStorage.getItem('token')
		await saveComment(token, form).then(res => {
			if (res.success) {
				Notification({
					title: '评论成功',
					type: 'success'
				})
				isSuccess = true
				rootState.parentCommentId = -1
				dispatch('getComments')
			} else {
				Notification({
					title: '评论失败',
					message: res.msg,
					type: 'error'
				})
			}
		}).catch((e) => {
			Notification({
				title: '评论失败',
				message: e,
				type: 'error'
			})
		})
		return isSuccess;
	}
}