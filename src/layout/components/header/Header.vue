<template>
	<div class="header-read-crumbs h-50px flex-h-center">
		<ToggleMenu />
		<BeadCrumb />
	</div>
</template>

<script setup>
import ToggleMenu from './components/ToggleMenu.vue'
import BeadCrumb from './components/BeadCrumb.vue'
</script>

<style lang="scss" scoped>
.header-read-crumbs {
	border-bottom: #eee 1px solid;
	line-height: 50px;
}
</style>
