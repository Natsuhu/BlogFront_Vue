import request from "@/request/BaseRequest"

export function getCategoryList() {
	return request({
		method: 'get',
		url: '/categories'
	})
}
