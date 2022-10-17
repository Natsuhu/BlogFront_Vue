import request from "@/request/BaseRequest"

export function getAboutPageSetting() {
	return request({
		method: 'get',
		url: '/about'
	})
}