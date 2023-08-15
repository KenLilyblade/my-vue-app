<template>
    <div class="content">
        <draggable
            :list="arr"
            ghost-class="ghost"
            handle=".move"
            filter=".forbid"
            :force-fallback="true"
            chosen-class="chosenClass"
            animation="300"
            group="itxst"
            :fallback-class="true"
            :fallback-on-body="true"
            :touch-start-threshold="50"
            :fallback-tolerance="50"
            :move="onMove"
            @start="onStart"
            @end="onEnd"
        >
            <template #item="{ element }">
                <div class="item move" @click="changConfigure(element)">
                    <component :is="element.name" v-bind="element.configure">1231</component>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'

const $bus = getCurrentInstance().appContext.config.globalProperties.$bus
onMounted(() => {
  $bus.on('dragEnd', e => {
    console.log(e)
    arr.splice(0, 0, e)
  })
  $bus.on('submit', e => {
    const index = arr.findIndex(item => item.id === e.id)
    console.log(index)
    arr[index] = {...arr[index], ...e}
  })
})
const arr = reactive([])

// 拖拽开始的事件
const onStart = () => {
  console.log('开始拖拽')
}

// 拖拽结束的事件
const onEnd = () => {
  console.log('结束拖拽')
}

const onMove = (e, originalEvent) => {
  // 不允许停靠
  console.log(e)
  return true
}
const changConfigure = e => {
  $bus.emit('change', e)
}
</script>

<style scoped lang="scss">
.content {
  background-color: #eee;
  flex: 0.6;
  min-height: 100vh;
}
</style>
