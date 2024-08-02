export default {
	webTitleSuffix: '',
	introduction: {
		avatar: '',
		name: '',
		rollText: [],
	},
	commentQueryParams: {
		//页面类型(0文章、1友链、2关于我)
		page: 0,
		articleId: null,
		pageNo: 1,
		pageSize: 5
	},
	//评论数量
	count: 0,
	//评论列表
	comments: [],
	//总页数
	totalPage: 0,
	//父评论ID
	parentCommentId: -1,
	//博主评论标识
	adminCommentLabel: '',
	//评论表单
	commentForm: {
		content: '',
		qq: '',
		email: '',
		website: ''
	},
	//博客文章渲染完成的标记
	isBlogRenderComplete: false,
	//专注模式
	focusMode: false,
	//文章页面路由到首页的标记
	isBlogToHome: false,
	//可视窗口大小
	clientSize: {
		clientHeight: 0,
		clientWidth: 1080
	}
}