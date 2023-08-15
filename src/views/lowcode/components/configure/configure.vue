<template>
	<div class="configure">
		<el-form ref="ruleFormRef" :model="form" status-icon label-width="120px" class="demo-ruleForm">
			<el-form-item label="类型" prop="type">
				<el-select v-model="form.type" placeholder="Select" @change="submit">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
const $bus = getCurrentInstance().appContext.config.globalProperties.$bus

onMounted(() => {
	$bus.on('change', e => {
		console.log(e)
		form.value = e.configure
		form.value.id = e.id
	})
})
const form = ref({
	type: ''
})
const options = [
	{ label: 'success', value: 'success' },
	{ label: 'primary', value: 'primary' },
	{ label: 'warning', value: 'warning' },
	{ label: 'danger', value: 'danger' },
	{ label: 'info', value: 'info' }
]
const submit = e => {
	$bus.emit('submit', { type: e, id: form.value.id })
	console.log(e)
}
</script>

<style scoped>
.configure {
	flex: 0.2;
	background-color: #fff;
	min-height: 100vh;
}
</style>
