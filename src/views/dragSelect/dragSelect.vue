<template>
	<div>
		<div>{{ matchData([{ a: 1, n: 'hhh' }, { a: 2 }], '1', 'n', 'a') }}</div>
	</div>
</template>

<script setup>
import { matchData } from '@/utils/templateUtils'
</script>

<style></style>
