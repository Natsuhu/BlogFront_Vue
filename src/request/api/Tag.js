import request from "@/request/BaseRequest"

export function getTags() {
	return request({
		method: 'get',
		url: '/tags'
	})
}