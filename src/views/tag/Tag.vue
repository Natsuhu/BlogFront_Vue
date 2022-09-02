<template>
	<div>
		<div class="ui top segment base_text_center">
			<h2 class="base_text_500">此标签下的文章</h2>
		</div>
		<ArticleItem v-for="(article , index) in articles" :key="index" :article="article"></ArticleItem>
		<div class="pagination base_margin_b">
			<el-pagination background layout="prev, pager, next" :page-count="totalPage" :current-page="params.page"
				@current-change="handleCurrentChange">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import ArticleItem from "@/components/articlelist/ArticleItem"
	import {getArticleByTagId} from "@/request/api/Article"
	
	export default {
		name: "Tag",
		
		data(){
			return{
				articles: [],
				totalPage: 0,
				params: {
					page: 1,
					pageSize: 3
				}
			}
		},
		
		computed: {
			TagId() {
				return parseInt(this.$route.params.id)
			}
		},
		
		beforeRouteUpdate(to, from, next) {
			if (to.path !== from.path) {
				this.getArticleByTagId(this.params,to.params.id)
				next()
			}
		},
		
		created(){
			this.getArticleByTagId(this.params)
		},
		
		methods:{
			handleCurrentChange(newPage) {
					window.scrollTo({top: 0, behavior: 'smooth'})
					this.params.page = newPage
					getArticleByTagId(this.params,this.TagId).then(res => {
					if(res.success){
						this.articles = res.data.dataList;
						this.totalPage = res.data.totalPage;
					}else {
						this.$message.error(res.data.msg);
					}
				})
			},
			getArticleByTagId(params , id = this.TagId) {
				getArticleByTagId(params , id).then(res => {
					if(res.success){
						this.articles = res.data.dataList;
						this.totalPage = res.data.totalPage;
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
