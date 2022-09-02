<template>
	<div>
		<!--文章数量-->
		<div class="ui top attached segment" style="text-align: center">
			<h2 class="base_text_500">文章归档</h2>
			<p>好! 目前共计 {{ count }} 篇日志。 继续努力。</p>
		</div>

		<!--归档-->
		<div class="ui attached segment">
			<div v-for="(value , key , index) in archives" :key="index">
				<div class="ui large blue label base_archive_date base_text_500">{{ key }}</div>
				<el-timeline>
					<el-timeline-item color="#2185D0" type= "info"
						v-for="(article , index) in value" 
						:key="index"
						:timestamp="article.createTime">
						<div class="ui large blue label base_text_500">{{ article.title }}</div>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
			
	</div>
</template>

<script>
	import {getArchives} from '@/request/api/Article'
	
	export default {
		
		name: "Archives",
		data() {
			return {
				count: 0,
				archives: {},
			}
		},
		
		created() {
			getArchives().then((res) => {
				if(res.success){
					this.archives = res.data.archives;
					this.count = res.data.count;
				}else {
					this.$message.error(res.msg);
				}
			})
		}
		
	}
</script>

<style scoped>
	.el-timeline {
		text-align: left;
	}
	
	.base_archive_date {
		position: relative;
		left: 5px;
		margin-bottom: 1rem;
	}

</style>