<template>
	<div>
		<el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
			<el-form-item label="邮箱1232" prop="a">
				<el-input v-model="form.a"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
		<Child></Child>
	</div>
</template>
<script setup>
import { validateEmail } from '@/utils/validate'
import Child from './child.vue'
import EventBus from 'utils/eventBus'
const form = ref({})
const formRef = ref(null)

const rules = ref({
	a: [{ validator: validateEmail, required: true, trigger: 'blur' }]
})
const onSubmit = () => {
	formRef.value.validate(res => {
		console.log(res)
	})
}

onMounted(() => {
	EventBus.emit('aaa', { a: 123 })
})
</script>
