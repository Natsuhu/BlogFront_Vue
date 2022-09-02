<template>
	<div>
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
	import {getArticleList} from "@/request/api/Article"
	
	export default {
		name: "Home",
		
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
		
		created(){
			getArticleList(this.params).then(res => {
				if(res.success){
					this.articles = res.data.dataList;
					this.totalPage = res.data.totalPage;
				}else {
					this.$message.error(res.msg);
				}
			})
		},
		
		methods:{
			handleCurrentChange(newPage) {
					window.scrollTo({top: 0, behavior: 'smooth'})
					this.params.page = newPage
					getArticleList(this.params).then(res => {
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
