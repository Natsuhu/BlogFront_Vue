<template>
	<div class="ui segments base_box">
		<div class="ui secondary segment">
			<h4><i class="bookmark icon"></i>随机文章</h4>
		</div>
		<div class="ui teal segment">
			<div class="ui divided items">
				<div class="m-item base_margin_b" v-for="(article , index) in randomArticles" :key="index" @click.prevent="read(article.id)">
					<div class="img" :style="{'background-image':'url(' + article.thumbnail + ')'}"></div>
					<div class="info">
						<div>{{ article.createTime | dateFormat('YYYY-MM-DD')}}</div>
						<div class="title">{{ article.title }}</div>
					</div>
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

<style scoped>
	
	.m-item {
		height: 7rem;
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		cursor: pointer;
		user-select: none;
	}
	
	.img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		object-fit: cover;
		background-position-x: center;
		background-position-y: center;
		background-size: cover;
	}
	
	.info {
		z-index: 1;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: .5rem !important;
		font-size: 12px;
		color: white;
	}
	
	.title {
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		 /* autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: no */
		-webkit-line-clamp: 1;
		word-break: break-word;
	}
</style>