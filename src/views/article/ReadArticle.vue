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
					<div class="ui large ribbon teal label base_article_category">
						<i class="small folder open icon"></i><span class="base_text_500">{{ category.name }}</span>
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
				<li>最后修改：{{ article.updateTime | dateFormat('YYYY-MM-DD')}}</li>
				<!--<div class="ui tag label teal tags m-margin-r" v-for="tag in article.tags" :key="tag.id">{{tag.tagName}}</div>-->
			</ul>
		</div>
		
		<!--评论区-->
		<div class="ui segment teal" v-if="isComment">
			<h3 class="base_text_500">评论区已关闭</h3>
		</div>
		<Comment v-else :count="count" :commentData="commentData"></Comment>
	</div>
</template>

<script>
	import Comment from "@/components/comment/Comment"
	import {getReadArticleById} from "@/request/api/Article"
	import {getArticleComments} from "@/request/api/Comment"
	import Prism from 'prismjs';
	
	export default {
		name: "ReadArticle",
		
		data() {
			return {
				article: {},
				category: {},
				//是否允许评论，true为关闭评论
				isComment: true,
				//评论数量
				count: 0,
				//评论数据
				commentData: []
			}
		},
		
		computed: {
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
				this.getArticle(to.params.id)
				next()
			}
		},
		
		created() {
			this.getReadArticleById()
		},
		
		methods:{
			getReadArticleById(id = this.articleId){
				getReadArticleById(id).then((res) => {
					if(res.success){
						this.article = res.data;
						this.category = this.article.category
						
						//如果允许评论则获取评论数据
						if(this.article.isCommentEnabled) {
							this.isComment = !this.isComment;
							this.getArticleComments();
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
			getArticleComments(id = this.articleId) {
				getArticleComments(id).then(res=>{
					if(res.success) {
						this.count = res.data.count;
						this.commentData = res.data.commentData
					}else {
						this.$message.error(res.msg)
					}
				})
			}
			
		},
		
		components:{
			Comment
		}
	}
</script>

<style scoped>
	.base_article_category {
		position: relative !important;
		left: -45px !important;
	}
	
	h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
		display: block;
		content: " ";
		height: 55px;
		margin-top: -55px;
		visibility: hidden;
	}
</style>
