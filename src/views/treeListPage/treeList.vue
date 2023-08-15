<template>
	<div class="treeList-item px-10px py-2px bg-ccc cursor-pointer select-none" v-for="item in props.list" :key="item[listKey]">
		<div class="flex-y-center" @click="onClick(item)">
			<el-icon :size="16" color="#333" :class="['treeList-icon', item.show ? 'rotate' : '']">
				<i-ep-CaretRight />
			</el-icon>
			<div class="truncate ml-4px">{{ item[label] }}</div>
		</div>
		<treeList v-if="item.children?.length && item.show" :list="item.children" :label="label" :listKey="listKey" />
	</div>
</template>

<script setup>
import EventBus from 'utils/eventBus'
import treeList from './treeList.vue'

const props = defineProps({
	list: {
		type: Array,
		default: () => []
	},
	label: {
		type: String,
		default: ''
	},
	listKey: {
		type: String,
		default: ''
	}
})
onMounted(() => {})

const onClick = item => {
	EventBus.emit('onTreeListClick', item)
	item.children?.length ? (item.show = !item.show) : ''
}
</script>

<style scoped>
.treeList-icon {
	transition: all 0.3s;
}
.rotate {
	transform: rotate(90deg);
}
</style>
