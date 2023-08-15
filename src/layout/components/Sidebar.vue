<template>
	<Logo />
	<el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" text-color="#fff" @open="handleOpen" @close="handleClose">
		<el-menu-item index="2">
			<template #title>Navigator Two</template>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
import Logo from './Logo.vue'
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   Setting,
// } from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
	console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
	console.log(key, keyPath)
}
</script>

<style>
.el-menu {
	height: calc(100% - 50px);
}
</style>
