import request from "@/request/BaseRequest"

export function getHomeArticles(baseQueryParams) {
	return request({
		method: 'get',
		url: '/articles',
		params: {
			...baseQueryParams
		}
	})
}

export function getReadArticleById(id) {
	return request ({
		method: 'get',
		url: '/articles/read',
		params: {
			id
		}
	})
}
	
export function getArchives() {
	return request ({
		method: 'get',
		url: '/articles/archives',
	})
}

export function getRandomArticles(count) {
	return request ({
		method: 'get',
		url: '/articles/random',
		params: {
			count
		}
	})
}

export function getArticlesByCategoryId(articleQueryParams) {
	return request ({
		method: 'get',
		url: '/articles/category',
		params: {
			...articleQueryParams
		}
	})
}

export function getArticlesByTagId(articleQueryParams) {
	return request ({
		method: 'get',
		url: '/articles/tag',
		params: {
			...articleQueryParams
		}
	})
}