import {saveComment , getArticleComments , getPageComments} from "@/request/api/Comment";
import {Message, Notification} from "element-ui";

export default {
	getComments({rootState}) {
		switch(rootState.commentQueryParams.page) {
			case 0: 
			getArticleComments(rootState.commentQueryParams).then(res => {
				if(res.success) {
					rootState.count = res.data.count
					rootState.comments = res.data.comments
					rootState.totalPage = res.data.totalPage
				} else {
					Notification({
						title: '错误',
						message: '获取评论失败',
						type: 'error'
					})
				}
			});
			break;
			 
			default: 
			getPageComments(rootState.commentQueryParams).then(res => {
				if(res.success) {
					rootState.count = res.data.count
					rootState.comments = res.data.comments
					rootState.totalPage = res.data.totalPage
				} else {
					Notification({
						title: '错误',
						message: '获取评论失败',
						type: 'error'
					})
				}
			});
			break;
		}
	},
	submitCommentForm({rootState, dispatch}) {
		let form = {...rootState.commentForm}
		form.page = rootState.commentQuery.page
		form.blogId = rootState.commentQuery.blogId
		form.parentCommentId = rootState.parentCommentId
		form.replayNickname = rootState.replyNickname
		saveComment(form).then(res => {
			if (res.success) {
				Notification({
					title: '评论成功',
					type: 'success'
				})
				dispatch('getCommentList')
			} else {
				Notification({
					title: '评论失败',
					message: res.msg,
					type: 'error'
				})
			}
		}).catch(() => {
			Notification({
				title: '评论失败',
				message: '异常错误',
				type: 'error'
			})
		})
	}
}