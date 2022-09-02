<template>

	<div ref="menu" class="ui fixed inverted stackable pointing menu">
		<div class="ui container">
			
			<!--logo-->
			<router-link to="/home">
				<h3 class="ui header item base_blue">NatsuKaze's Blog</h3>
			</router-link>
			
			<!--首页-->
			<router-link to="/home" class="item" :class="{'base_mobile_hide': mobileHide,'active':$route.name==='home'}">
				<i class="home icon"></i>首页
			</router-link>
			
			<!--分类-->
			<el-dropdown trigger="click" @command="categoryRoute">
				<span class="el-dropdown-link item" :class="{'base_mobile_hide': mobileHide}">
					<i class="list icon"></i>分类<i class="caret down icon"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item :command="category.id" v-for="(category , index) in categories" :key="index">{{ category.name }}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			
			<!--归档-->
			<router-link to="/archives" class="item" :class="{'base_mobile_hide': mobileHide,'active':$route.name==='archives'}">
				<i class="folder icon"></i>归档
			</router-link>
			
			<!--动态-->
			<router-link to="/moment" class="item" :class="{'base_mobile_hide': mobileHide,'active':$route.name==='moment'}">
				<i class="comment alternate outline icon"></i>动态
			</router-link>
			
			<!--友情链接-->
			<router-link to="/friends" class="item" :class="{'base_mobile_hide': mobileHide,'active':$route.name==='friends'}">
				<i class="users icon"></i>友链
			</router-link>
			
			<!--关于本站-->
			<router-link to="/about" class="item" :class="{'base_mobile_hide': mobileHide,'active':$route.name==='about'}">
				<i class="info icon"></i>关于本站
			</router-link>
			
			<!--手机端菜单-->
			<div class="ui menu black big icon button base_right_top base_mobile_show" @click="toggle">
				<i class="sidebar icon"></i>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		
		props:{
			categories: Array
		},
		
		data(){
			return {
				mobileHide: true
			}
		},
		watch: {
			//路由改变时，收起导航栏
			'$route.path'() {
				this.mobileHide = true
			}
		},
		mounted() {
			//监听点击事件，收起导航菜单
			document.addEventListener('click', (e) => {
				//遍历冒泡
				let flag = e.path.some(item => {
					if (item === this.$refs.menu) return true
				})
				//如果导航栏是打开状态，且点击的元素不是Nav的子元素，则收起菜单
				if (!this.mobileHide && !flag) {
					this.mobileHide = true
				}
			})
		},
		methods:{
			categoryRoute(id) {
				this.$router.push(`/articles/category/${id}`)
			},
			toggle() {
				this.mobileHide = !this.mobileHide
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 1400px !important;
		margin-left: auto !important;
		margin-right: auto !important;
	}
	
	.el-dropdown-link {
		outline-style: none !important;
		outline-color: unset !important;
		height: 100%;
		cursor: pointer;
	}

	.el-dropdown-menu {
		margin: 7px 0 0 0 !important;
		padding: 0 !important;
		border: 0 !important;
		background: #1b1c1d !important;
	}

	.el-dropdown-menu__item {
		padding: 0 15px !important;
		color: rgba(255, 255, 255, .9) !important;
	}

	.el-dropdown-menu__item:hover {
		background: rgba(255, 255, 255, .08) !important;
	}
</style>
