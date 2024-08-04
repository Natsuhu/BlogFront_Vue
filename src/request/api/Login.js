import request from "@/request/BaseRequest"

export function login(param) {
    return request({
        method: 'post',
        url: '/login',
        data: {
            ...param
        }
    })
}

export function getFrontLoginSetting() {
    return request({
        method: 'get',
        url: '/login/getFrontLoginSetting'
    })
}