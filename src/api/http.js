import axios from 'axios';
import QS from 'qs';
import store from "../store";

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

axios.interceptors.request.use(
	function(config) {
		const token = store.state.token;
		config.headers['Content-Type'] = 'text/plain';
		token && (config.headers.Authorization = token);
		return config;

	},
	function(error) {
		return Promise.error(error);
	}

)

axios.interceptors.response.use(
	function(response) {
		if (response.status == 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	function(error) {
		console.log("数据传输错误！");
	}
)


function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

function post(url, params) {
	return new Promise(function(resolve, reject) {
		axios({
			method: "POST",
			url: url,
			data: JSON.stringify(params),
		}).then(function(response) {
			resolve(response.data);
		}).catch(function(error) {
			reject(error.data);
		})
	})
}

export {
	get,
	post
}
