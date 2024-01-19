<template>
	<div class="index-site">
		<Header :categories="categories"/>

		<div class="ui container">
			<div class="ui stackable grid">

				<!--左侧-->
				<div class="three wide column base_mobile_hide">
					<DataCard></DataCard>
					<Notice v-show="false"></Notice>
				</div>

				<!--中间-->
				<div class="ten wide column">
					<keep-alive include="Home">
            <transition name="fade-transform" mode="out-in">
						  <router-view/>
            </transition>
					</keep-alive>
				</div>

				<!--右侧-->
				<div class="three wide column base_mobile_hide">
					<RandomArticle :randomArticles="randomArticles"></RandomArticle>
					<TagList :tags="tags"></TagList>
				</div>

				<!-- 回到顶部 -->
				<el-backtop></el-backtop>

			</div>
		</div>

		<!-- APlayer -->
		<!-- <div>
			<MyAPlayer/>
		</div> -->

		<Footer/>
	</div>
</template>

<script>
	import Header from "@/components/common/Header"
	import DataCard from "@/components/common/DataCard"
	import Notice from "@/components/common/Notice"
	import RandomArticle from "@/components/common/RandomArticle"
	import TagList from "@/components/common/TagList"
	import Footer from "@/components/common/Footer"
	import MyAPlayer from "@/components/common/MyAPlayer";

	import {getRandomArticles} from "@/request/api/Article"
	import {getCategories} from "@/request/api/Category"
	import {getTags} from "@/request/api/Tag"

	export default {
		data(){
			return{
				count: 5,
				randomArticles: [],
				tags: [],
				categories: []
			}
		},
		created(){
			getCategories().then(res => {
				//res.data就是后台返回的Result
				//concat是数组的一个方法，使用此方法后，赋值的对象只能是数组
				if(res.success){
					this.categories = res.data;
				}else {
					this.$message.error(res.msg);
				}
			}),
			getTags().then(res => {
				if(res.success){
					this.tags = this.tags.concat(res.data);
				}else {
					this.$message.error(res.msg);
				}
			}),
			getRandomArticles(this.count).then(res =>{
				if(res.success) {
					this.randomArticles = res.data;
				}else {
					this.$message.error(res.msg);
				}
			})

		},
		components:{
			Header,
			DataCard,
			Notice,
			RandomArticle,
			TagList,
			MyAPlayer,
			Footer
		}
	}
</script>

<style scoped>
	.index-site {
		display: flex;
		min-height: 100vh; /* 没有元素时，把页面撑开至100% */
		flex-direction: column;
	}

	.ui.container {
		flex: 1;
		width: 1400px;
		margin-top: 79px;
	}

	.three.wide {
		padding: 0px !important;
	}

	.ten.wide {
		padding-top: 0px !important;
	}

	/*.indexAnimate {*/
	/*	animation-name: fadeIn;*/
	/*	animation-duration: 0.5s;*/
	/*}*/

	@media screen and (max-width: 750px) {
		.ui.grid {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}
</style>
