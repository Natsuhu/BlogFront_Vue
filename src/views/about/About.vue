<template>
	
	<div class="ui segments">
		
		<!--标题-->
		<div class="ui top segment base_text_center">
			<h2 class="base_text_500">关于本站</h2>
			<MyAPlayer></MyAPlayer>
			<!-- <meting-js server="netease" type="song" :id="musicId" theme="#25CCF7" v-if="musicId!==''"></meting-js> -->
			<div class="typo content base_margin_tb_large" v-html="content"></div>
		</div>
		
		<!--评论区-->
		<div class="ui segment teal" v-if="isComment">
			<h3 class="base_text_500">评论区已关闭</h3>
		</div>
		<Comment v-else :count="count" :comments="comments"></Comment>
	</div>
	
</template>

<script>
	import MyAPlayer from "@/components/common/MyAPlayer"
	import Comment from "@/components/comment/Comment"
	import {getAboutPageSetting} from "@/request/api/About"
	import {SET_COMMENT_QUERY_PAGE , SET_COMMENT_QUERY_ARTICLE_ID , SET_COMMENT_QUERY_PAGE_NO} from "@/store/mutations-types"
	import {mapState} from 'vuex'
	
	export default {
		name: 'About',
		
		computed: {
			...mapState(['count', 'comments'])
		},
		
		data() {
			return {
				isComment: true,
				content: "",
				musicId: "",
				page: 2,
				articleId: null
			}
		},
		
		created() {
			this.init();
			this.getSetting();
		},
		
		methods: {
			getSetting() {
				getAboutPageSetting().then(res => {
					if(res.success) {
						//允许评论才获取评论数据
						if(res.data.isComment === "true") {
							this.isComment = !this.isComment;
							this.content = res.data.content;
							this.musicId = res.data.musicId;
							this.$store.dispatch('getComments')
						}else {
							this.content = res.data.content;
						}
					}else {
						this.$message.error(res.msg)
					}
				})
			},
			init() {
				this.$store.commit(SET_COMMENT_QUERY_PAGE_NO , 1)
				this.$store.commit(SET_COMMENT_QUERY_PAGE, this.page)
				this.$store.commit(SET_COMMENT_QUERY_ARTICLE_ID, this.articleId)
			}
		},
		
		components:{
			Comment,
			MyAPlayer
		}
		
	}
	
</script>

<style>
</style>
