/*
 * @Author: your name
 * @Date: 2022-01-14 09:27:29
 * @LastEditTime: 2022-01-19 14:38:11
 * @LastEditors: Please set LastEditors
 * @Description: 本地存储设置
 * @FilePath: \my-vue-app\src\utils\storage.js
 */
function checkType(param) {
	return Object.prototype.toString.call(param).slice(8, -1)
}

export function setStorage(key, value) {
	if (!key) return Error('key值必填')
	if (!value) return Error('value缺失')
	if (['Array', 'Object'].includes(checkType(value))) value = JSON.stringify(value)
	localStorage.setItem(key, value)
}
export function getStorage(key) {
	if (!key) return Error('key值必填')
	return JSON.parse(localStorage.getItem(key))
}
