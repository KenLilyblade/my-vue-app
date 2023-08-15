import axios from 'axios'
const BaseUrl = import.meta.env.VITE_APP_WEB_URL

const request = axios.create({
	// @ts-ignore
	baseURL: '',
	method: 'POST',
	timeout: 10000
})

//request拦截器
request.interceptors.request.use(
	config => {
		// config.headers['Content-Type'] = 'multipart/form-data'
		console.log('config: ', config)
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

//response拦截器
request.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		console.error(error)
		ElMessage.error(error)
		return Promise.reject(error)
	}
)

export default request
