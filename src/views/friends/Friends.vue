<template>
	<div class="ui segments">
		
		<!--友情链接标题-->
		<div class="ui top segment base_text_center">
			<h2 class="base_text_500">友情链接</h2>
		</div>
		
		<!--链接卡片-->
		<div class="ui segment">
			<div class="ui stackable three column grid base_margin_b">
				<div class="column" v-for="(friend , index) in friends" :key="index">
					<a class="ui link card" :href="friend.website">
						<div class="image">
							<img :src="friend.avatar">
						</div>
						<div class="content">
							<div class="header">{{ friend.nickname }}</div>
							<div class="description">{{ friend.description }}</div>
						</div>
					</a>
				</div>
				<div class="column">
					<div class="ui link card base_show_modal" style="height: 100%;">
						<div class="content">
							<div class="header"><i class="icon plus"/>申请友链</div>
							<div class="description">Do you like van 游戏 ？</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!--文字内容-->
		<div class="ui blue segment">
			<div class="typo content" v-html="content"></div>
		</div>
		
		<!--申请友链弹出框-->
		<div class="ui tiny modal">
			<div class="header">申请友链</div>
			<div class="ui list">
				<div class="ui item">
					<div class="ui left icon input">
						<input type="text" placeholder="名称">
						<i class="users icon"></i>
					</div>
					<div class="ui left icon input">
						<input type="text" placeholder="签名">
						<i class="users icon"></i>
					</div>
				</div>
				<div class="ui item">
					<div class="ui left icon input">
						<input type="text" placeholder="博客地址">
						<i class="users icon"></i>
					</div>
					<div class="ui left icon input">
						<input type="text" placeholder="头像地址">
						<i class="users icon"></i>
					</div>
				</div>
				<div class="ui item">
					<button class="ui primary right labeled right floated icon button">
						提交<i class="icon check"></i>
					</button>
					<button class="ui right floated button">
						取消
					</button>
				</div>
			</div>
			
		</div>
		
		<!--评论区-->
		<div class="ui blue segment" v-if="isComment">
			<h3 class="base_text_500">评论区已关闭</h3>
		</div>
		<Comment v-else :count="count" :comments="comments"></Comment>
		
	</div>

</template>

<script>
	import Comment from "@/components/comment/Comment"
	import {getFriendsPageSetting , getFriends} from "@/request/api/Friends"
	import {SET_COMMENT_QUERY_PAGE , SET_COMMENT_QUERY_ARTICLE_ID , SET_COMMENT_QUERY_PAGE_NO} from "@/store/mutations-types"
	import {mapState} from 'vuex'
	
	export default {
		name: 'Friends',
		
		computed: {
			...mapState(['count', 'comments'])
		},
		
		data() {
			return {
				friends: [],
				isComment: true,
				content: "",
				page: 2,
				articleId: null
			}
		},
		
		created() {
			this.init();
			this.getFriends();
			this.getSetting();
		},
		
		methods: {
			getFriends() {
				getFriends().then(res => {
					if(res.success) {
						this.friends = res.data
					}
				})
			},
			getSetting() {
				getFriendsPageSetting().then(res => {
					if(res.success) {
						//允许评论才获取评论数据
						if(res.data.isComment === "true") {
							this.isComment = !this.isComment;
							this.content = res.data.content;
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
				this.$store.commit(SET_COMMENT_QUERY_PAGE , this.page)
				this.$store.commit(SET_COMMENT_QUERY_ARTICLE_ID , this.articleId)
			}
		},
		
		mounted() {
			$('.modal').modal('setting', 'transition', "fade up")
			$('.base_show_modal').click(function() {
				$('.modal').modal('show')
			})
		},
		
		components:{
			Comment
		}
		
	}
	
</script>

<style scoped>	
	
	/*排版卡片中的样式*/
	.card .image {
		width: 70px !important;
		margin: 10px auto 0px;
		background: unset !important;
	}
	
	.card .image img {
		border-radius: 100% !important;
		width: 70px !important;
		height: 70px !important;
	}
	
	.card .content {
		text-align: center;
		padding: 10px 14px !important;
		border-top: 0 !important;
	}
	
	.card .content * {
		color: #363636 !important;
	}
	
	.card .content .header {
		font-size: 16px !important;
	}
	
	.card .content .description {
		font-size: 12px !important;
	}
	
	.card .content .description {
		margin-top: 5px !important;
		margin-bottom: 7px;
	}
</style>