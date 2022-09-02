import request from "@/request/BaseRequest"

export function getTagList() {
	return request({
		method: 'get',
		url: '/tags'
	})
}