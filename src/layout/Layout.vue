<template>
    <div class="layout">
        <el-container class="layout-container">
            <el-aside width="200px" class="layout-container-aside">
                <Sidebar/>
            </el-aside>
            <el-container>
                <el-header class="layout-container-header">
                    <Header/>
                </el-header>
                <el-main class="layout-container-main">
                    <router-view v-slot="{ Component, route }">
                        <transition name="animate__animated" mode="out-in" appear
                                    enter-active-class="animate__animated animate__shakeY animate__slower"
                                    leave-active-class="animate__animated animate__flash animate__delay-2s">
                            <keep-alive :max="10" :include="includeList">
                                <component :is="Component" :key="route.path"/>
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Header from './components/header/Header.vue'

const includeList = reactive([])
const route = useRoute()
watch(() => route, (newVal, oldVal) => {
  if (newVal.meta.keepAlive && includeList.indexOf(newVal.name) === -1) {
    includeList.push(newVal.name);
  }
}, {deep: true}) // 开启深度监听
</script>
<style>
.layout {
  height: 100vh;
}

.layout-container {
  height: 100%;
}

/* .layout-container-aside {} */

.layout-container-header {
  height: 50px;
  padding: 0;
}
</style>
