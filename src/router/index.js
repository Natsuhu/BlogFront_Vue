import Vue from 'vue'
import VueRouter from 'vue-router'
import getPageTitle from '@/utils/get-page-title'

Vue.use(VueRouter)


const routes = [
	/*{ path: '/' , component: r => require.ensure([] , () => r(require('@/views/Index')), 'Index') },*/
	{
		path: '/' ,
		component: () => import('@/views/Index'),
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/Home'),
				meta: {title: '首页'}
			},
			{
				path: '/articles/read/:id',
				name: 'article',
				component: () => import('@/views/article/ReadArticle'),
				meta: {title: '文章'}
			},
			{
				path: '/articles/tag/:id',
				name: 'tag',
				component: () => import('@/views/tag/Tag'),
				meta: {title: '标签'}
			},
			{
				path: '/articles/category/:id',
				name: 'category',
				component: () => import('@/views/category/Category'),
				meta: {title: '分类'}
			},
			{
				path: '/archives',
				name: 'archives',
				component: () => import('@/views/archives/Archives'),
				meta: {title: '归档'}
			},
			{
				path: '/moment',
				name: 'moment',
				component: () => import('@/views/moment/Moment'),
				meta: {title: '动态'}
			},
			{
				path: '/friends',
				name: 'friends',
				component: () => import('@/views/friends/Friends'),
				meta: {title: '友情链接'}
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/About'),
				meta: {title: '关于本站'}
			}
		]
	}

]

//创建router实例
const router = new VueRouter({
	scrollBehavior: () => ({ y: 0 }),
	routes
})

//挂载路由守卫
router.beforeEach((to, from, next) => {
	document.title = getPageTitle(to.meta.title)
	next()
})

export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher
}

export default router
