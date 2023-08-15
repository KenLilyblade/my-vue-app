/**
 * @description: 转驼峰字符串
 * @param {String} str 字符串
 * @param {String} split 分割标识
 * @return {String} 驼峰字符串
 */
export function humpStr(str, split = '_') {
	if (!str) return ''
	const hump = str
		.split(split)
		.map((it, index) => {
			if (index === 0) return it
			return it[0].toUpperCase() + it.slice(1)
		})
		.join('')
	return hump
}

/**
 * @description: 检测类型
 * @param {any} obj 需要检测类型的变量
 * @return {String}
 */
export const checkType = obj => Object.prototype.toString.call(obj).slice(8, -1)

/**
 * @description: 函数节流
 * @param {Function} func 回调函数
 * @param {Number} delay 延迟时间 毫秒
 */

export const throttle = (func, delay) => {
	let preTime = 0
	return (...args) => {
		const nowTime = +new Date()
		if (nowTime - preTime > delay) {
			func.apply(this, args)
			preTime = nowTime
		}
	}
}

/**
 * @description 函数防抖
 * @param {Function} func 回调函数
 * @param {Number} delay 延迟时间 毫秒
 */
export const debounce = (func, delay) => {
	let time = null
	return (...args) => {
		clearTimeout(time)
		time = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

/**
 * @description 对比你新旧列表数据，返回应该要添加和删除的列表
 * @param {Array<object>} oldList,旧数据列表
 * @param {Array<object>} newList,当前选择列表
 * @param {String} field ,两个列表要匹配的字段
 * @return {{addList:Array<object>, delList:Array<object>}}
 */
export const AddDeleteList = (oldList, newList, field) => {
	const addList = []
	const delList = []
	for (const el of newList) {
		const idx = oldList.find(it => +it[field] === +el[field])
		if (!idx) addList.push(el)
	}
	for (const el of oldList) {
		const idx = newList.find(it => +it[field] === +el[field])
		if (!idx) delList.push(el)
	}
	return { addList, delList }
}

/**
 * @description 随机颜色
 * @return { string }
 */
export const randomColor = () => Math.random().toString(16).slice(2, 8)

/**
 * @description 匹配列表中的数据
 * @param {Array<object>} list -需要进行匹配的列表
 * @param {String} listKey 列表匹配的字段
 * @param {String} key 匹配的值
 * @param {String} returnKey 需要返回的字段
 * @return {*}
 */
export const matchData = (list, listKey, key, returnKey) => {
	if (!list || !key || !returnKey || !key) return ''
	const idx = list.find(it => it['listKey'] === key)
	if (idx) return returnKey ? idx[returnKey] : idx
	else return ''
}

/**
 * @description 获取页面地址栏参数
 * @param {String} key 需要查询的键名
 * @return { String | object }
 */
export const getUrlParam = key => {
	const searchObj = Object.fromEntries(new URLSearchParams(location.search))
	return key ? searchObj['key'] : searchObj
}

/**
 * @description 数组去重转ids
 * @param {Array<any>} arr 数组
 * @param {object} key 数组要去重的字段
 * @return { String } ids
 */
export const uniqueArr = (arr, key) => [...new Set(arr.map(it => it[key]).filter(Boolean))].join(',')
