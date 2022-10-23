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
		return config
	}
)

// 响应拦截
service.interceptors.response.use(
	config => {
		NProgress.done()
		return config.data
	}
)

export default service