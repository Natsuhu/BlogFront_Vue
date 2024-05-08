import request from "@/request/BaseRequest"

export function getIndexSetting() {
    return request({
        method: 'get',
        url: '/index/getSetting'
    })
}
