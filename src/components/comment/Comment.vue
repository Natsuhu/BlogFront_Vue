<template>
	<div class="ui blue segment">
		<CommentForm v-if="parentCommentId===-1"/>
		
		<!--评论区-->
		<div class="ui threaded comments">
			<h3 class="ui header" v-if="count>0">Comments | 共{{ count }}条评论</h3>
			<h3 class="ui header" v-else>快来抢沙发！</h3>
			
			<!--root评论-->
			<div class="comment" v-for="(rootComment , index) in commentData" :key="index">
				<a class="avatar">
					<img :src="rootComment.content.avatar">
				</a>
				<div class="content">
					<span class="author">{{ rootComment.content.nickname }}</span>
					<div class="metadata">
						<span class="date">{{ rootComment.content.createTime | dateFormat('YYYY-MM-DD HH:mm')}}</span>
						<div class="ui blue mini button base_padding_lr_small" @click="setReply(rootComment.id , rootComment.content.nickname)">回复</div>
					</div>
					<div class="text">
						{{ rootComment.content.content }}
					</div>
					<CommentForm v-if="parentCommentId===rootComment.id"/>
				</div>
				
				<!--children评论-->
				<div class="comments" v-for="(childrenComment , index) in rootComment.children" :key="index">
					<div class="comment">
						<a class="avatar">
							<img :src="childrenComment.content.avatar">
						</a>
						<div class="content">
							<span class="author">{{ childrenComment.content.nickname }}</span>
							<div class="metadata">
								<span class="date">{{ childrenComment.content.createTime | dateFormat('YYYY-MM-DD HH:mm')}}</span>
								<div class="ui blue mini button base_padding_lr_small" @click="setReply(childrenComment.id , childrenComment.content.nickname)">回复</div>
							</div>
							<div class="text">
								<span>@{{ childrenComment.content.replay_nickname }}&nbsp;&nbsp;</span>{{ childrenComment.content.content }}
							</div>
							<CommentForm v-if="parentCommentId===childrenComment.id"/>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {SET_PARENT_COMMENT_ID , SET_REPLY_NICKNAME} from "@/store/mutations-types"
	import CommentForm from "@/components/comment/CommentForm"
	
	export default {
		name: 'Comment',
		
		props: {
			count: 0,
			commentData: Array
		},
		
		computed: {
			...mapState(['parentCommentId' , 'replyNickname'])
		},
		
		methods: {
			setReply(id , nickname) {
				this.$store.commit(SET_PARENT_COMMENT_ID, id)
				this.$store.commit(SET_REPLY_NICKNAME, nickname)
			}
		},
		
		components:{
			CommentForm
		}
	}
</script>

<style>
</style>
