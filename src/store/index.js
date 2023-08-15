import { defineStore } from 'pinia'

// defineStore调用后返回一个函数,调用该函数获得store实体
export const useStore = defineStore({
	// id:必须，在所有store中唯一
	id: 'globalState',
	// 返回对象的函数
	state: () => ({
		count: 1
	}),
	actions: {
		countAdd() {
			++this.count
		}
	}
})
