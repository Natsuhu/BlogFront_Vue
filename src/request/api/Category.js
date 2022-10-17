import request from "@/request/BaseRequest"

export function getCategories() {
	return request({
		method: 'get',
		url: '/categories'
	})
}
