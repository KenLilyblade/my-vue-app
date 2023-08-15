<template>
	<div class="material">
		<draggable
			:list="state.modules.arr1"
			ghost-class="ghost"
			handle=".move"
			filter=".forbid"
			:force-fallback="true"
			chosen-class="chosenClass"
			animation="300"
			:group="state.groupA"
			:fallback-class="true"
			:fallback-on-body="true"
			:touch-start-threshold="50"
			:fallback-tolerance="50"
			:move="onMove"
			:sort="false"
			class="material-drag-box"
			@start="onStart"
			@end="onEnd"
		>
			<template #item="{ element }">
				<div class="material-item move">
					<svg t="1654447554145" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1761" width="200" height="200">
						<path
							d="M927.35 543.73c-6.47-29.76-63.1-113.1-192.54-113.1s-245.94 264.9-310.66 245.56c-64.72-19.35-82.52-107.15-176.99-117.57S63.33 712.99 63.33 712.99V889h864.02V543.73z"
							fill="#ADF2EE"
							opacity=".4"
							p-id="1762"
						></path>
						<path
							d="M53.33 167.46V899h884.02V167.46H53.33z m864.02 20v317.76c-8.62-12.1-19.9-24.63-33.77-36.14-27.53-22.83-75.69-50.04-148.77-50.04-34.86 0-71.31 18.1-111.42 55.32-33.88 31.44-66.1 72.49-94.54 108.72-22.26 28.35-43.28 55.14-61.7 73.08-17.6 17.14-31.06 24.41-40 21.6-24.92-7.83-43.06-28.54-62.25-50.46-27.45-31.34-58.56-66.86-116.58-73.59-74.29-8.61-142.92 83.73-174.98 135.03V187.46h844.01zM73.33 879V728.5c4.88-9.08 25.47-46.17 54.44-81.71 29.53-36.23 74.01-78.33 118.24-73.21 50.36 5.84 77.54 36.88 103.84 66.9 21.1 24.09 41.03 46.84 71.3 56.36 3.33 1.04 6.68 1.55 10.08 1.55 32.53 0 68.7-46.07 113.35-102.96 54.69-69.67 122.76-156.39 190.23-156.39 67.12 0 111 24.71 136 45.44 30.86 25.59 43.75 52.89 46.54 64.63V879H73.33z"
							fill="#55B9B9"
							opacity=".4"
							p-id="1763"
						></path>
						<path d="M260.96 359.57m-93.52 0a93.52 93.52 0 1 0 187.04 0 93.52 93.52 0 1 0-187.04 0Z" fill="#ADF2EE" opacity=".4" p-id="1764"></path>
						<path
							d="M260.96 463.09c-57.08 0-103.52-46.44-103.52-103.52s46.44-103.52 103.52-103.52 103.52 46.44 103.52 103.52-46.44 103.52-103.52 103.52z m0-187.05c-46.05 0-83.52 37.47-83.52 83.52s37.47 83.52 83.52 83.52 83.52-37.47 83.52-83.52-37.47-83.52-83.52-83.52z"
							fill="#55B9B9"
							opacity=".4"
							p-id="1765"
						></path>
					</svg>
					{{ element.name }}
				</div>
			</template>
		</draggable>
	</div>
</template>

<script setup>
import Draggable from 'vuedraggable'

const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

const state = reactive({
	groupA: {
		name: 'itxst',
		put: true, // 允许拖入
		pull: () => {
			const res = state.modules.arr1.length > 3
			// 当A组元素小于等于3个时，不允许再拖出元素了
			state.message = res ? '只能拖出1个' : '不能再拖了'
			return res
		}
	},
	modules: {
		arr1: [
			{ name: 'el-table', id: 1 },
			{ name: 'el-button', id: 2, configure: { type: 'success' } },
			{ name: 'el-select', id: 3 },
			{ name: 'el-upload', id: 4 }
		]
	}
})
// 拖拽开始的事件
const onStart = () => {
	// console.log('开始拖拽')
}

// 拖拽结束的事件
const onEnd = e => {
	$bus.emit('dragEnd', state.modules.arr1[e.newIndex])
}

const onMove = (e, originalEvent) => {
	// 不允许停靠
	return true
}
</script>

<style scoped>
.material {
	flex: 0.2;
	background-color: #fff;
	min-height: 100vh;
	overflow: hidden;

	.material-drag-box {
		display: flex;
		flex-wrap: wrap;
	}

	.material-item {
		flex-basis: 50%;

		svg {
			width: 100%;
		}
	}
}
</style>
