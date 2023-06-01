import {
	SET_COMMENT_QUERY_PAGE,
	SET_COMMENT_QUERY_ARTICLE_ID,
	SET_COMMENT_QUERY_PAGE_NO,
	SET_PARENT_COMMENT_ID,
	SET_REPLY_NICKNAME,
	SET_ORIGIN_ID
} from "./mutations-types";

export default {
	[SET_COMMENT_QUERY_PAGE](state , page) {
		state.commentQueryParams.page = page
	},
	[SET_COMMENT_QUERY_ARTICLE_ID](state , articleId) {
		state.commentQueryParams.articleId = articleId
	},
	[SET_COMMENT_QUERY_PAGE_NO](state , pageNo) {
		state.commentQueryParams.pageNo = pageNo
	},
	[SET_PARENT_COMMENT_ID](state , parentCommentId) {
		state.parentCommentId = parentCommentId
	}
}