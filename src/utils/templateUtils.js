import { checkType } from './utils'

/**
 * @auth: Hgu
 * @Date: 2022-04-29 14:27:46
 * @description 字符串分割匹配返回
 * @param val 要匹配的字符串
 * @param str:'1:success,2:warning,3:danger'
 * @returns str || undefined
 */
export function formatStr(val = 0, str) {
	if (checkType(str) !== 'string' || !str) return val
	const newStr = str
		.split(',')
		.map(it => it.split(':'))
		.find(it => it[0] === String(val))
	return (newStr && newStr[1]) || val
}

/**
 * @auth: Hgu
 * @Date: 2022-04-29 14:27:46
 * @description 根据数据项id匹配列表对应项的字段
 * @param list 要匹配的列表
 * @param listItemId 要匹配的列表项字段名
 * @param returnField 要返回的字段名
 * @param id 要匹配的当前项id
 * @returns 匹配项的字段值
 */
export function matchData(list, listItemId, returnField, id) {
	if (!list || !id || !returnField || !listItemId) return ''
	return list.find(it => +it[listItemId] === +id)[returnField] || ''
}
