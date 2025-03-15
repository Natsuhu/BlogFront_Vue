import request from "@/request/BaseRequest"

export function getIndexSetting() {
    return request({
        method: 'get',
        url: '/index/getSetting'
    })
}

export function getCardSetting() {
    return request({
        method: 'get',
        url: '/index/getCardSetting'
    })
}
