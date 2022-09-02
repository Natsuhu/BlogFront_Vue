<template>
	<div class="ui segments base_box">
		<div class="ui secondary segment">
			<h4><i class="bookmark icon"></i>随机文章</h4>
		</div>
		<div class="ui teal segment">
			<div class="ui items">
				<div class="item" v-for="(article , index) in randomArticles" :key="index">
					<span class="base_text_500 base_text_point" @click="read(article.id)">{{article.title}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import router from "@/router";
	
	export default {
		name: 'RandomArticle',
		props: {
			randomArticles: Array
		},
		data() {
			return {
				
			}
		},
		
		methods:{
			read(id){
				return router.push(`/articles/read/${id}`);
			}
		}
	}
</script>

<style>

</style>