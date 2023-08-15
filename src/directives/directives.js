import copy from './modules/copy'
import drag from './modules/drag'

const modules = import.meta.glob('./modules/**.js')
const directives = {}
for (const key in modules) {
	const moduleName = /\/([\w\d]+).js/.exec(key)?.[1]
	if (moduleName) {
		const module = await modules[key]()
		directives[moduleName] = module.default
	}
}
// 批量注册指令
export default (app) => {
	for (const key in directives) {
		app.directive(key, directives[key])
	}
}
