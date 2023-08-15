<template>
	<div class="logo-box flex-h-center">
		<img src="@/assets/logo.png" alt="logo" />
		<span class="ml-8px font-bold logo-title">Hgu Admin</span>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
.logo-box {
	height: 50px;
	padding: 10px;
	box-sizing: border-box;
	background-color: var(--el-menu-bg-color);
	.logo-title {
		color: #fff;
	}
}

img {
	height: 100%;
}
</style>
