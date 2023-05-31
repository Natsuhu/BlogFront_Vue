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

export function getComments(commentQueryParams) {
	return request({
		method: 'get' ,
		url: '/comments/getComments',
		params: {
			...commentQueryParams
		}
	})
}