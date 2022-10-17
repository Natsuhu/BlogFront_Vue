import request from "@/request/BaseRequest"

export function saveComment(comment) {
	return request({
		method: 'post',
		url: '/comments/save',
		data: {
			...comment
		}
	})
}

export function getArticleComments(commentQueryParams) {
	return request({
		method: 'get' ,
		url: '/comments/articleComments',
		params: {
			...commentQueryParams
		}
	})
}

export function getPageComments(commentQueryParams) {
	return request({
		method: 'get' ,
		url: '/comments/pageComments',
		params: {
			...commentQueryParams
		}
	})
}