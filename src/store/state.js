export default {
	siteInfo: '',
	introduction: {
		avatar: '',
		name: '',
		rollText: [],
	},
	commentQuery: {
		//用于后端判断该评论所在页面类型(文章、友链、关于我)
		page: 0,
		articleId: null,
	},
	//评论数量
	count: 0,
	//评论列表
	commentData: [],
	//父评论ID
	parentCommentId: -1,
	//回复的人的昵称
	replyNickname: '',
	commentForm: {
		content: '',
		qq: '',
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