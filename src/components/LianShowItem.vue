<template>
	<!--  <div class="skew-10deg">{{ title }}asdfsd</div>-->
	<el-button type="primary" @click="hhh">66666</el-button>
</template>
<script lang="ts" setup>
const title = ref('哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈')
const route = useRoute()
const emit = defineEmits(['update'])
defineExpose({
	changTitle(titl: string) {
		title.value = titl
	}
})

function hhh() {
	emit('update', 'cccc')
	console.log(route.path)
}
</script>
<style></style>
