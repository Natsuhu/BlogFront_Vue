<template>
	<div class="form">
		<h3>发表评论
			<div class="mini ui grey button base_padding_lr_small" @click="setReply()" v-show="parentCommentId!==-1">取消回复</div>
		</h3>
		<el-form :inline="true" :model="commentForm" :rules="formRules" ref="formRef" size="small">
			<el-input :class="'textarea'" type="textarea" :rows="5" v-model="commentForm.content" placeholder="来条评论!"
			          maxlength="250" show-word-limit :validate-event="false"></el-input>
			<el-form-item prop="qq">
				<el-popover ref="qqPopover" placement="bottom" trigger="focus" content="自动拉取QQ号的昵称头像"></el-popover>
				<el-input v-model="commentForm.qq" placeholder="QQ号（必填）" :validate-event="false" v-popover:qqPopover>
					<i slot="prefix" class="el-input__icon el-icon-user"></i>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="medium" v-throttle="[postForm,`click`,3000]">发表评论</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {SET_PARENT_COMMENT_ID , SET_REPLY_NICKNAME , SET_ORIGIN_ID} from "@/store/mutations-types"
	
	export default {
		name: "CommentForm",
		
		computed: {
			...mapState(['commentForm','parentCommentId'])
		},
		
		data() {
			return {
				SET_PARENT_COMMENT_ID,
				formRules: {
					qq: [
						{required: true, message: 'QQ号必填'},
						{max: 12, message: '请输入正确格式的QQ号'},
						{min: 5, message: '请输入正确格式的QQ号'}
					]
				}
			}
		},
		
		methods: {
			postForm() {
				this.$refs.formRef.validate(valid => {
					if (!valid || this.commentForm.content === '' || this.commentForm.content.length > 250) {
						this.$notify({
							title: '评论失败',
							type: 'warning'
						})
					} else {
						this.$store.dispatch('submitCommentForm')
						this.commentForm.content = ''
					}
				})
			},
			setReply() {
				this.$store.commit(SET_PARENT_COMMENT_ID, -1)
				this.$store.commit(SET_REPLY_NICKNAME, null)
				this.$store.commit(SET_ORIGIN_ID , 0)
			}
		}
		
	}
</script>

<style>
	.form {
		background: #fff;
		position: relative;
	}
	
	.form h3 {
		margin: 5px;
		font-weight: 500 !important;
	}
	
	.form .m-small {
		margin-left: 5px;
		padding: 4px 5px;
	}
	
	.el-form .textarea {
		margin-top: 5px;
		margin-bottom: 15px;
	}
	
	.el-form textarea {
		padding: 6px 8px;
	}
	
	.el-form textarea, .el-form input {
		color: black;
	}
	
	.el-form .el-form-item__label {
		padding-right: 3px;
	}
	
	.mask {
		pointer-events: auto;
		position: fixed;
		z-index: 99;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
