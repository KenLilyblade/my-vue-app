class EventEmitter {
	constructor() {
		this.cache = {}
	}

	on(name, fn) {
		if (this.cache[name]) {
			this.cache[name].push(fn)
		} else {
			this.cache[name] = [fn]
		}
	}

	emit(name, ...args) {
		const tasks = this.cache[name] && this.cache[name].slice()

		if (tasks) {
			for (const fn of tasks) {
				fn(...args)
			}
		}
	}

	once(name, fn) {
		const onceFn = (...args) => {
			fn(...args)
			this.off(name, onceFn)
		}

		onceFn.callback = fn
		this.on(name, onceFn)
	}

	off(name, offFn) {
		if (!offFn) {
			delete this.cache[name] // 没有指明要关闭哪个监听回调，就清空所有
		} else {
			const stask = this.cache[name]
			if (stask) {
				const index = stask.findIndex(fn => fn === offFn || fn.callback === offFn)
				if (index >= 0) {
					stask.splice(index, 1)
				}
			}
		}
	}
}

const EventBus = new EventEmitter()
export default EventBus
