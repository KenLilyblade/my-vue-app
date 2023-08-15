<script setup>
console.log('撒大声地')
</script>

<template>
    <el-config-provider size="small">
        <router-view/>
    </el-config-provider>
</template>

<style>
#app {
  min-height: 100vh;
}

* {
  margin: 0;
  padding: 0;
}

.loading {
  color: red;
  font-size: 30px;
}
</style>
