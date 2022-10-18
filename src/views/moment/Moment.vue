<template>
	<div >
		
		<div class="ui top attached segment base_text_center">
			<h2 class="base_text_500">我的动态</h2>
		</div>
		
		<!--动态列表-->
		<div class="ui attached segment">
			<div class="ui card moment-card" v-for="(moment , index) in moments" :key="index">
				<div class="content">
					<div class="header segment moment-header">
						<span class="moment-name">NatsuKaze</span>
						<span class="right floated moment-time">{{moment.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
					</div>
					<div class="moment-content" v-html="moment.content"></div>
				</div>
				<div class="extra content">
					<a class="left floated">
						<i class="heart icon"></i>{{ moment.like }}
					</a>
				</div>
			</div>

			<div class="base_text_center base_margin_b">
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
					this.moments = res.data.dataList
					this.totalPage = res.data.totalPage
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
						this.moments = res.data.dataList;
						this.totalPage = res.data.totalPage;
					}else {
						this.$message.error(res.msg);
					}
				})
			}
		},

	}
</script>

<style>
	
	.moment-card {
		width: 100% !important;
		margin-bottom: 30px !important;
	}
	
	.moment-name {
		font-size: 15px;
		font-weight: 700 !important;
	}
	
	.moment-time {
		font-size: 13px;
	}
	
	.moment-content {
		margin-top: 18px;
	}
</style>
