<template>
		<footer class="ui inverted vertical segment base_padding_tb_large base_margin_t_large base_opacity">
			<div class="ui center aligned container">

				<p class="m-text-thin base_text_spaced base_opacity_tiny">
					<span style="margin-right: 10px"> Copyright © 2022 </span>
					<router-link to="/" style="color:#ffe500"> NatsuKaze </router-link>
				</p>	
					
				<div class="github-badge">
					<a rel="external nofollow noopener" title="由springboot强力驱动">
						<span class="badge-subject">Power</span>
						<span class="badge-value bg-blue">SpringBoot</span>
					</a>
				</div>
		
				<div class="github-badge">
					<a rel="external nofollow noopener" title="vue.js前端渲染">
						<span class="badge-subject">Render</span>
						<span class="badge-value bg-brightgreen">Vue.js</span>
					</a>
				</div>
				
				<div class="github-badge">
					<a rel="external nofollow noopener" title="Semantic UI">
						<span class="badge-subject">UI</span>
						<span class="badge-value bg-semantic-ui">Semantic UI</span>
					</a>
				</div>
				
				<div class="github-badge">
					<a rel="external nofollow noopener" title="Element UI">
						<span class="badge-subject">UI</span>
						<span class="badge-value bg-blue">Element UI</span>
					</a>
				</div>
		
			</div>
		</footer>
</template>

<script>
	export default {
		name: 'Footer',
		
		data() {
			return {
				
			}
		}
		
	}
</script>

<style>
	@import "../../assets/css/badge.css";
	
	.github-badge a {
		color: #fff;
	}
</style>
