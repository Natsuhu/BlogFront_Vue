<template>
	<div >
		<!-- 页面标题 -->
		<div class="ui top attached segment base_text_center">
			<h2 class="base_text_500">我的动态</h2>
		</div>
		
		<!--动态列表-->
		<div class="ui attached segment">
			<div class="ui feed"  v-for="(moment , index) in moments" :key="index">

				<!-- 头像 -->
				<div class="event">
					<div class="label">
						<img :src="moment.avatar">
					</div>
					<div class="content">

						<!-- 作者名，发表时间 -->
						<div class="moment_author base_text_500">{{ moment.author }}</div>
						<div class="date"> {{ moment.createTime }} </div>

						<!-- 内容 -->
						<div class="ui card moment_card">
							<div class="content">
								<div class="description" v-html="moment.content"></div>
							</div>
							<div class="content">
								<div><i class="like icon"></i> {{ moment.likes }} </div>
							</div>
						</div>
						
					</div>
				</div>
			</div>

			<!-- 分页 -->
			<div class="base_text_center base_margin_b" v-show="totalPage > 1">
				<el-pagination background layout="prev, pager, next" :page-count="totalPage" :current-page="baseQueryParams.pageNo"
					@current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {getPublicMoments} from '@/request/api/Moment'
	
	export default {
		name: 'Moment',
		
		data() {
			return {
				moments: [],
				totalPage: 0,
				baseQueryParams: {
					pageNo: 1,
					pageSize: 8
				}
			}
		},
		
		created() {
			getPublicMoments(this.baseQueryParams).then(res => {
				if(res.success){
					this.moments = res.data
					this.totalPage = res.totalPage
				}else {
					this.$message.error(res.msg);
				}
			})
		},

		methods:{
			handleCurrentChange(newPage) {
					window.scrollTo({top: 0, behavior: 'smooth'})
					this.baseQueryParams.pageNo = newPage
					getPublicMoments(this.baseQueryParams).then(res => {
					if(res.success){
						this.moments = res.data;
						this.totalPage = res.totalPage;
					}else {
						this.$message.error(res.msg);
					}
				})
			}
		},

	}
</script>

<style>
	.moment_card {
		width: 100% !important;
		margin-bottom: 30px !important;
	}
	.moment_author {
		position: relative;
		bottom: 10px;
	}
</style>
