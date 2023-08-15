const config = {
	email: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
}

export const validateEmail = (rules, value, callback) => {
	if (!value) return callback(new Error('请输入邮箱'))
	if (!config.email.test(value)) return callback(new Error('邮箱格式不正确'))
	return callback()
}
