<template>
	<div class="low-code flex-h-center">
		<Material />
		<Content />
		<Configure />
	</div>
</template>

<script setup>
import Content from './components/content/content.vue'
import Configure from './components/configure/configure.vue'
import Material from './components/material/material.vue'
</script>

<style scoped lang="scss">
.low-code {
}
</style>
