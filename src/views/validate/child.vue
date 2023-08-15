<template>1232</template>
<script setup>
import EventBus from 'utils/eventBus'
import request from 'utils/request'
onMounted(() => {
	request({ url: '/mock/api/getList' }).then(res => {
		console.log('res: ', res)
	})
})
</script>
