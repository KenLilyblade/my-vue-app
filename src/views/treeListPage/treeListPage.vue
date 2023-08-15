<template>
	<div class="treeList">
		<treeListC v-model:list="list" label="a" listKey="a" />
	</div>
</template>

<script setup>
import EventBus from 'utils/eventBus'
import treeListC from './treeList.vue'
EventBus.on('onTreeListClick', item => {
	console.log(item)
})
const list = ref([
	{
		a: 1,
		level: 1,
		show: true,
		children: [
			{ a: 2, level: 2 },
			{
				a: 3,
				level: 2,
				children: [
					{
						a: 4,
						level: 3,
						children: [{ a: 5, level: 4 }]
					}
				]
			}
		]
	}
])
</script>

<style lang="scss" scoped>
.treeList {
	width: 200px;
}
</style>
