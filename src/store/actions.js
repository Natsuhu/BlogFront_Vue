import {saveComment} from "@/request/api/Comment";
import {getAboutPageComments} from "@/request/api/About";
import {getFriendsPageComments} from "@/request/api/Friends";
import {getArticleComments} from "@/request/api/Article";
import {Message, Notification} from "element-ui";

export default {
	getCommentList({rootState}) {
		switch(rootState.commentQuery.page) {
			case 0: 
			getArticleComments(rootState.commentQuery.articleId).then(res => {
				if(res.success) {
					rootState.count = res.data.count;
					rootState.commentData = res.data.commentData
				} else {
					Notification({
						title: '错误',
						message: '获取评论失败',
						type: 'error'
					})
				}
			});
			break;
			 
			case 1: 
			getFriendsPageComments().then(res => {
				if(res.success) {
			     	rootState.count = res.data.count;
					rootState.commentData = res.data.commentData
				} else {
					Notification({
						title: '错误',
						message: '获取评论失败',
						type: 'error'
					})
				}
			});
			break;
			
			case 2: 
			getAboutPageComments().then(res => {
				if(res.success) {
			     	rootState.count = res.data.count;
					rootState.commentData = res.data.commentData
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