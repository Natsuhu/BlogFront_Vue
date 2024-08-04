import request from "@/request/BaseRequest"

export function saveComment(token, comment) {
	return request({
		method: 'post',
		url: '/comments/save',
		headers: {
			Authorization: token,
		},
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