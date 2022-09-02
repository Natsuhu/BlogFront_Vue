import request from "@/request/BaseRequest"

export function getMomentList() {
	return request({
		method: 'get',
		url: '/moments',
	})
}