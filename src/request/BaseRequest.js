import axios from 'axios'
//请求进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
	baseURL: "http://175.178.247.100:8090",
	timeout: 10000,
	headers: {'Content-Type': 'application/json'}
})

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