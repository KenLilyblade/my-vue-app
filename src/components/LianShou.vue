<template>
	<div class="lianshou">
		<el-button @click="handleclick">点尼米11</el-button>
		<Item ref="aaa" />
		<img src="images/sky.jpeg" alt="" />
	</div>
</template>
<script lang="ts" setup name="lainshjo">
import Item from './LianShowItem.vue'
const aaa = ref()
function handleclick() {
	console.log('aaa: ', aaa)
}
// import { useStore } from '@/store/index.js'
// const item = ref(null)
// const store = useStore();
// provide('cc', a)
onMounted(() => {
	console.log('创建元素')
})
onActivated(() => {
	console.log('缓存')
})
</script>
<style>
.aa {
	background: var(--fd);
}
.lianshou {
	height: 100%;
}
</style>
