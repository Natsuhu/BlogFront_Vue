<template>
	<div class="ui segment base_margin_b_large">
		
		<!-- 置顶标记 -->
		<div class="ui large red right corner label" v-if="article.isTop">
			<i class="arrow alternate circle up icon"></i>
		</div>
		
		<div class="ui grid base_margin_lr">
			<!--标题-->
			<div class="row">
				<h3 class="ui header base_center base_text_point">{{ article.title }}</h3>
			</div>
			
			<!--文章简要信息-->
			<div class="row base_padding_tb_small">
				<div class="ui horizontal list base_center base_text_noselect">
					<div class="item base_datetime_color">
						<i class="small calendar icon"></i><span>{{ article.createTime | dateFormat('YYYY-MM-DD')}}</span>
					</div>
					<div class="item base_datetime_color">
						<i class="small eye icon"></i><span>{{ article.views }}</span>
					</div>
				</div>
			</div>
			
			<!--文章分类-->
			<div @click="categoryRoute(article.category.id)" class="ui large label teal base_text_point base_category">
				<i class="small folder open icon"></i><span class="base_text_500">{{ article.category.name }}</span>
			</div>
			
			<!--文章描述-->
			<div class="row">
				<div class="base_summary_area">{{ article.description }}</div>
			</div>
			
			<!--首图-->
			<div class="row">
				<img class="ui centered rounded image" :src="article.thumbnail">
			</div>
			
			<!--按钮-->
			<div class="row">
				<div class="ui animated fade button base_center" @click="read(article.id)">
					<div class="visible content">阅读全文</div>
					<div class="hidden content"><i class="arrow down icon"></i></div>
				</div>
			</div>
			
			<!--分割线-->
			<div class="ui divider base_margin_lr_no"></div>
			
			<!--标签列表-->
			<div class="row base_padding_tb_no base_margin_b_mini">
				<div class="ui tag label base_margin_b base_margin_r" v-for="(tag , index) in article.tags" :key="index">{{ tag.name }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import router from "../../router";
	
	export default {
		name: 'ArticleItem',
		props:{
			article: Object
		},
		
		data(){
			return {
				
			}
		},
		
		methods:{
			read(id){
				return router.push(`/articles/read/${id}`);
			},
			categoryRoute(id) {
				this.$router.push(`/articles/category/${id}`)
			}
		},
		
		mounted() {
			
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
</style>
