<template>
	<div>
		<el-card class="notice" shadow="hover">
			<div slot="header">
			    <h4>公告栏</h4>
			</div>
			<div style="width: 100%;">
				<span>未经授权，禁止转载本站文章！</span>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'Notice',
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	.notice {
		text-align: left;
		margin-bottom: 0.9375rem;
	}
</style>
