import request from "@/request/BaseRequest"

export function getPublicMoments(baseQueryParams) {
	return request({
		method: 'get',
		url: '/moments',
		params: {
			...baseQueryParams
		}
	})
}