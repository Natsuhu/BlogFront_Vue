import axios, { Axios } from 'axios'
//请求进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
	headers: {'Content-Type': 'application/json'}
})

// 后端程序地址
service.defaults.baseURL = window.env.API_BASE_URL

// 超时时长配置
service.defaults.timeout =  window.env.AXIOS_TIMEOUT

// 请求拦截
service.interceptors.request.use(
	config => {
		NProgress.start()
		const identification = window.localStorage.getItem('identification')
		//identification存在，且是基于API_BASE_URL的请求
		if (identification && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
			config.headers.Identification = identification
		}
		return config
	},
	error => {
		NProgress.done()
		console.info(error)
		Message.error(error.message)
		return Promise.reject(error)
	}
)

// 响应拦截
service.interceptors.response.use(
	config => {
		NProgress.done()
		const identification = config.headers.identification
		if (identification) {
			//保存身份标识到localStorage
			window.localStorage.setItem('identification', identification)
		}
		return config.data
	},
	error => {
		NProgress.done()
		console.info(error)
		Message.error(error.message)
		return Promise.reject(error)
	}
)

export default service