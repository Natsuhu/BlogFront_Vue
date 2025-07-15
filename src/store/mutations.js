import {
	SET_COMMENT_QUERY_OBJECT_TYPE,
	SET_COMMENT_QUERY_OBJECT_ID,
	SET_COMMENT_QUERY_PAGE_NO,
	SET_PARENT_COMMENT_ID,
	SET_WEB_TITLE_SUFFIX,
	SET_FOCUS_MODE,
	SET_ADMIN_COMMENT_LABEL,
	SAVE_CLIENT_SIZE,
	CHANGE_FILTER_STATUS
} from "./mutations-types";

export default {
	[SET_WEB_TITLE_SUFFIX](state, webTitleSuffix) {
		state.webTitleSuffix = webTitleSuffix
	},
	[SET_COMMENT_QUERY_OBJECT_TYPE](state , objectType) {
		state.commentQueryParams.objectType = objectType
	},
	[SET_COMMENT_QUERY_OBJECT_ID](state , objectId) {
		state.commentQueryParams.objectId = objectId
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
	[SET_ADMIN_COMMENT_LABEL](state, adminCommentLabel) {
		state.adminCommentLabel = adminCommentLabel
	},
	[CHANGE_FILTER_STATUS](state, isCloseFilter) {
		state.isCloseFilter = isCloseFilter
		document.documentElement.setAttribute('is-close-filter', isCloseFilter)
	}
}