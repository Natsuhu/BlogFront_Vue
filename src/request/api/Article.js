import request from "@/request/BaseRequest"

export function getArticleList(params) {
	return request({
		method: 'get',
		url: '/articles',
		params: {
			page: params.page,
			pageSize: params.pageSize
		}
	})
}

export function getArticleById(id) {
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

export function getArticleByCategoryId(params,categoryId) {
	return request ({
		method: 'get',
		url: '/articles/category',
		params: {
			page: params.page,
			pageSize: params.pageSize,
			categoryId
		}
	})
}

export function getArticleByTagId(params,tagId) {
	return request ({
		method: 'get',
		url: '/articles/tag',
		params: {
			page: params.page,
			pageSize: params.pageSize,
			tagId
		}
	})
}

export function getArticleComments(articleId) {
	return request ({
		method: 'get',
		url: '/articles/read/comments',
		params: {
			articleId
		}
	})
}