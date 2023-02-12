import request from "@/request/BaseRequest"

export function getFriendsPageSetting() {
	return request({
		method: 'get',
		url: '/friends/getSetting'
	})
}

export function getFriends() {
	return request({
		method: 'get',
		url: '/friends'
	})
}