import {
	SET_COMMENT_QUERY_PAGE,
	SET_COMMENT_QUERY_ARTICLE_ID,
	SET_COMMENT_QUERY_PAGE_NO,
	SET_PARENT_COMMENT_ID,
	SET_WEB_TITLE_SUFFIX,
	SET_FOCUS_MODE,
	SAVE_CLIENT_SIZE
} from "./mutations-types";

export default {
	[SET_WEB_TITLE_SUFFIX](state, webTitleSuffix) {
		state.webTitleSuffix = webTitleSuffix
	},
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
	},
	[SAVE_CLIENT_SIZE](state, clientSize) {
		state.clientSize = clientSize
	},
	[SET_FOCUS_MODE](state, focusMode) {
		state.focusMode = focusMode
	},
}