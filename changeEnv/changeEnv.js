const inquirer = require('inquirer') //命令行选择
inquirer
	.prompt([
		{
			type: 'list',
			message: '请选择地方',
			name: 'name',
			choices: [
				{ name: 'iot', value: 'iot' },
				{ name: '医疗云', value: 'yly' }
			]
		},
		{
			type: 'list',
			message: '请选择发布环境',
			name: 'env',
			choices: [
				{ name: '测试环境', value: 'development' },
				{ name: '正式环境', value: 'production' }
			]
		}
	])
	.then(async ({ name, env }) => {
		console.log('name,env : ', name, env)
	})
