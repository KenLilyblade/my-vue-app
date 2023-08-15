<template>
	<div class="drag" @dragover="ondragOver">
		<TransitionGroup name="list">
			<li
				v-for="(item, index) in list"
				:key="item.name"
				class="drag-item"
				:data-index="index"
				:draggable="true"
				tag="ul"
				@dragstart="ondragStart($event, index)"
				@dragenter="ondragenter($event, index)"
			>
				{{ item.name }}
			</li>
		</TransitionGroup>
	</div>
</template>

<script>
import gasp from 'gsap'
export default {
	name: 'Drag',
	data() {
		return {
			list: [
				{ name: 1, index: 0 },
				{ name: 2, index: 1 },
				{ name: 3, index: 2 },
				{ name: 4, index: 3 },
				{ name: 5, index: 4 },
				{ name: 6, index: 5 },
				{ name: 7, index: 6 },
				{ name: 8, index: 7 }
			],
			startIndex: 0
		}
	},
	mounted() {},
	methods: {
		ondragStart(e, index) {
			this.startIndex = index
		},
		ondragOver(e) {
			e.preventDefault()
			e.dataTransfer.dropEffect = 'move'
		},
		ondragenter(e, index) {
			console.log(1)
			if (this.startIndex === index) return
			const item = this.list[this.startIndex]
			this.list.splice(this.startIndex, 1)
			this.list.splice(index, 0, item)
			this.startIndex = index
		}
	}
}
</script>

<style lang="scss" scoped>
.drag {
	width: 300px;
	margin: 0 auto;
}
.drag-move {
	transition: transform 0.3s;
}
.drag-item {
	list-style-type: none;
	padding: 15px;
	background: linear-gradient(135deg, #fff6b7, #f6416c);
	color: #fff;
	text-align: center;
	cursor: pointer;
}
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease-out;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
}

///* 确保将离开的元素从布局流中删除
//  以便能够正确地计算移动的动画。 */
.list-leave-active {
	position: absolute;
}
</style>
