import request from "@/request/BaseRequest"

export function getFriendsPageSetting() {
	return request({
		method: 'get',
		url: '/friends'
	})
}

export function getFriendsPageComments() {
	return request({
		method: 'get',
		url: '/friends/comments'
	})
}