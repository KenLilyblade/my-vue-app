const { NodeSSH } = require('node-ssh') //ssh连接
const ora = require('ora') //进度条
const chalk = require('chalk') //log颜色打印
const inquirer = require('inquirer') //命令行选择
const shell = require('shelljs') //命令行操作
const compressing = require('compressing') //文件压缩
const path = require('path')
const successLog = val => console.log(chalk.blue(`*********** ${val} ***********`))
const errorLog = val => console.log(chalk.red(val))
const SSH = new NodeSSH()
let config //配置文件

const distDir = path.resolve(__dirname, `../dist`)
const distZipPath = path.resolve(__dirname, `./dist.zip`)

// 如果没有配置文件退出命令行
try {
	config = require('./config.js')
} catch (error) {
	errorLog('请配置config.js')
	process.exit()
}

//命令行选择发布环境
inquirer
	.prompt([
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
	.then(async ({ env }) => {
		// 设置发布环境信息
		config = config[env]
		await checkConfig()
		await initUpload(env)
	})

const initUpload = async env => {
	successLog('🐳 开始部署')
	await baling(env)
	await compressZip()
	await connectSSH()
	await cleanServerOldFile()
	await uploadDistFile()
	successLog('🐳 部署成功')
	process.exit()
}

const checkConfig = async () => {
	Object.values(config).forEach(it => {
		if (!it) {
			errorLog('❗ 请配置config.js'), process.exit()
		}
	})
}

//打包
const baling = async mode => {
	successLog('🐳 开始构建……')
	const { code } = await shell.exec(`npm run build:${mode === 'production' ? 'prod' : 'dev'}`)
	if (code !== 0) {
		errorLog('❗ 构建失败')
		process.exit()
	}
	successLog('🦄 构建成功')
}

//压缩
const compressZip = async () => {
	successLog('🐳 开始压缩……')
	try {
		await compressing.zip.compressDir(distDir, distZipPath)
		successLog('🦄 压缩成功')
	} catch (error) {
		errorLog('❗ 压缩失败')
		errorLog(error)
		process.exit()
	}
}

// 连接服务器
const connectSSH = async () => {
	successLog('🐳 开始连接服务器……')
	try {
		await SSH.connect({
			host: config['SERVER_HOST'],
			username: config['SSH_USER'],
			password: config['PASSWORD']
			// port: 22,
			// privateKey:'',密钥对
		})
		successLog('🦄 连接服务器成功')
	} catch (error) {
		errorLog('❗ 连接服务器失败,请检查配置')
		errorLog(error)
	}
}

// 执行ssh命令
const execSSH = async cmd => {
	let res = await SSH.execCommand(cmd, { cwd: config['PATH'] })
	if (res.code !== 0) {
		errorLog(`❗ 执行命令失败\n ${cmd} `)
	}
}

// 清理服务器旧文件
const cleanServerOldFile = async () => {
	const cmds = ['rm -rf *']
	await Promise.all(cmds.map(execSSH))
	successLog('🦄 清除旧文件成功')
}

// 上传文件至服务器并解压
const uploadDistFile = async () => {
	try {
		successLog('🦄 开始上传文件至服务器……')
		await SSH.putFile(distZipPath, `${config['PATH']}/dist.zip`)
		const cmds = ['unzip dist.zip', `mv -f ${config['PATH']}/dist/* ${config['PATH']}/`, 'rm -rf dist dist.zip']
		for (const cmd of cmds) {
			await execSSH(cmd)
		}
		successLog('🦄 上传文件成功')
		// await Promise.all(cmds.map(it => execSSH(it)))
	} catch (error) {
		errorLog('❗ 上传文件失败')
		console.log(error)
	}
}
