<template>
	<div>
		<div class="ui top segment base_text_center">
			<h2 class="base_text_500">此分类下的文章</h2>
		</div>
		<ArticleItem v-for="(article , index) in articles" :key="index" :article="article"></ArticleItem>
		<div class="pagination base_margin_b" v-show="totalPage > 1">
			<el-pagination background layout="prev, pager, next" :page-count="totalPage" :current-page="articleQueryParams.page"
				@current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import ArticleItem from "@/components/articlelist/ArticleItem"
	import {getArticlesByCategoryId} from "@/request/api/Article"
	
	export default {
		name: "Category",
		
		data(){
			return{
				articles: [],
				totalPage: 0,
				articleQueryParams: {
					page: 1,
					pageSize: 3,
					categoryId: 0
				}
			}
		},
		
		computed: {
			categoryId() {
				return parseInt(this.$route.params.id)
			}
		},
		
		beforeRouteUpdate(to, from, next) {
			if (to.path !== from.path) {
				this.articleQueryParams.categoryId = to.params.id
				this.getArticlesByCategoryId(this.articleQueryParams)
				next()
			}
		},

		created(){
			this.articleQueryParams.categoryId = this.categoryId;
			this.getArticlesByCategoryId(this.articleQueryParams);
		},
		
		methods:{
			handleCurrentChange(newPage) {
					window.scrollTo({top: 0, behavior: 'smooth'})
					this.articleQueryParams.page = newPage
					getArticleByCategoryId(this.articleQueryParams,this.categoryId).then(res => {
					if(res.success){
						this.articles = res.data;
						this.totalPage = res.totalPage;
					}else {
						this.$message.error(res.msg);
					}
				})
			},
			getArticlesByCategoryId(articleQueryParams) {
				getArticlesByCategoryId(articleQueryParams).then(res => {
					if(res.success){
						this.articles = res.data;
						this.totalPage = res.totalPage;
					}else {
						this.$message.error(res.msg);
					}
				})
			}
		},
		
		components:{
			ArticleItem,
		}
	}
</script>

<style>
	.pagination {
		width: 100%;
		text-align: center;
	}
</style>
