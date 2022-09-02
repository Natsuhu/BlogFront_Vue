<template>
	<div class="ui segments base_box">
		<div class="ui secondary segment" >
			<h4><i class="tags icon"/>标签云</h4>
		</div>
		<div class="ui teal segment">
			<div class="ui label base_margin_b base_margin_r base_text_point" 
			     v-for="(tag , index) in tags" 
				 :key="index" 
				 @click="tagRoute(tag.id)">{{tag.name}}</div>
		</div>		
	</div>
</template>

<script>
	export default {
		name: 'TagList',
		
		props: {
			tags: Array
		},
		
		data() {
			return {
				
			}
		},
		
		methods: {
			tagRoute(id) {
				this.$router.push(`/articles/tag/${id}`)
			}
		}
	}
</script>

<style>
</style>
