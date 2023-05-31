<template>
	<div class="ui segments">
		<div class="ui attached segment base_padding_tb_large">
			<div class="ui middle aligned mobile reversed stackable">
				<div class="ui grid base_margin_lr">
					
					<!--标题-->
					<div class="row base_padding_tb_small">
						<h2 class="ui header base_center">{{ article.title }}</h2>
					</div>
					
					<!--文章简要信息-->
					<div class="row base_padding_tb_small">
						<div class="ui horizontal link list base_center">
							<div class="item base_datetime_color">
								<i class="small calendar icon"></i><span>{{ article.createTime | dateFormat('YYYY-MM-DD')}}</span>
							</div>
							<div class="item base_views_color">
								<i class="small eye icon"></i><span>{{ article.views }}</span>
							</div>
							<div class="item base_common_black">
								<i class="small pencil icon"></i><span>字数≈{{ article.words }}字</span>
							</div>
							<div class="item base_common_black">
								<i class="small clock icon"></i><span>阅读时长≈{{ article.readTime }}分</span>
							</div>
						</div>
					</div>
					
					<!--文章分类-->
					<div @click="categoryRoute(article.categoryId)" class="ui large label teal base_text_point base_category">
						<i class="small folder open icon"></i><span class="base_text_500">{{ article.categoryName }}</span>
					</div>
					
					<div class="row"/>
					
					<!--文章Markdown正文-->
					<div class="typo js-toc-content base_padding_tb_small match-braces rainbow-braces" v-html="article.content"></div>
					
					<!--点赞/打赏
					<div class="ui large buttons m-center">
					    <div class="ui button teal">点赞</div>
					    <div class="or"></div>
				   	    <div class="ui button blue">打赏</div>
					</div>-->
				</div>
			</div>
		</div>
		<!--文章信息-->
		<div class="ui attached message teal">
			<ul class="list">
				<li>本文作者：{{ article.authorName }}</li>
				<li>发表时间：{{ article.createTime | dateFormat('YYYY-MM-DD')}}</li>
				<li>最后修改：{{ article.editTime | dateFormat('YYYY-MM-DD')}}</li>
				<!--<div class="ui tag label teal tags m-margin-r" v-for="tag in article.tags" :key="tag.id">{{tag.tagName}}</div>-->
			</ul>
		</div>
		
		<!--评论区-->
		<div class="ui segment teal" v-if="isComment">
			<h3 class="base_text_500">评论区已关闭</h3>
		</div>
		<Comment v-else :count="count" :comments="comments"></Comment>
	</div>
</template>

<script>
	import Comment from "@/components/comment/Comment"
	import {getReadArticleById} from "@/request/api/Article"
	import {SET_COMMENT_QUERY_PAGE , SET_COMMENT_QUERY_ARTICLE_ID , SET_COMMENT_QUERY_PAGE_NO} from "@/store/mutations-types"
	import {mapState} from 'vuex'
	import Prism from 'prismjs'
	
	export default {
		name: "ReadArticle",
		
		data() {
			return {
				article: {},
				//是否允许评论，true为关闭评论
				isComment: true,
			}
		},
		
		computed: {
			...mapState(['count', 'comments']),
			articleId() {
				return parseInt(this.$route.params.id)
			}
		},
		
		//解决浏览器地址变化，但文章内容不会变的bug
		beforeRouteUpdate(to, from, next) {
			// 一般有两种情况会触发这个钩子
			// ①当前文章页面跳转到其它文章页面
			// ②点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
			// 在路由 beforeRouteUpdate 中判断路径是否改变
			// 如果跳转到其它页面，to.path!==from.path 就放行 next()
			// 如果是跳转锚点，path不会改变，hash会改变，to.path===from.path, to.hash!==from.path 不放行路由跳转，就能让锚点正常跳转
			if (to.path !== from.path) {
				//在当前组件内路由到其它博客文章时，要重新获取文章
				this.commitParam(to.params.id)
				this.getArticle(to.params.id)
				next()
			}
		},
		
		created() {
			this.init()
			this.getArticle()
		},
		
		methods:{
			getArticle(id = this.articleId){
				getReadArticleById(id).then((res) => {
					if(res.success){
						this.article = res.data;
						this.category = this.article.category
						this.isComment = !this.article.isCommentEnabled;
						//如果允许评论则获取评论数据
						if(this.article.isCommentEnabled) {
							this.$store.dispatch('getComments');
						}
						//渲染代码高亮，但目前没生效
						this.$nextTick(() => {
							Prism.highlightAll()
						})
					}else {
						this.$message.error(res.msg);
					}
				})
			},
			init() {
				this.$store.commit(SET_COMMENT_QUERY_PAGE_NO, 1)
				this.$store.commit(SET_COMMENT_QUERY_PAGE, 1)
				this.$store.commit(SET_COMMENT_QUERY_ARTICLE_ID, this.articleId)
			},
			//更新路由时，提交文章ID，以获取评论
			commitParam(id) {
				this.$store.commit(SET_COMMENT_QUERY_ARTICLE_ID, id)
			},
			categoryRoute(id) {
				this.$router.push(`/articles/category/${id}`)
			}
		},
		
		components:{
			Comment
		}
	}
</script>

<style scoped>
	.base_category {
		position: relative;
		right: 2.2em;
		border-top-left-radius: 0px !important;
		border-bottom-left-radius: 0px !important;
	}
	
	h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
		display: block;
		content: " ";
		height: 55px;
		margin-top: -55px;
		visibility: hidden;
	}
</style>
