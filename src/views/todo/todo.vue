<script lang="ts" setup name="todo">
import { computed, ref, watchEffect } from 'vue'
import { getStorage, setStorage } from '../../utils/storage'
import gsap from 'gsap'
import active from '/images/selection.png'
import activeSelection from '/images/active-selection.png'

const aaa = ref('123')
// 异步加载组件
const todoItem = defineAsyncComponent(() => import('./components/todo-item.vue'))
// 列表
const list = ref(getStorage('todoList') || [])
// 数据过滤判断
const type = ref<number>(0)
// 全选
const selectStatus = ref<boolean>(false)
watchEffect(() => {
    // 全选监听
    selectStatus.value = list.value.every((it: { check: boolean }) => it.check) && !!list.value.length
    // 列表发生变化存进localstorage,判断有没有全选
    setStorage('todoList', list.value)
})
// 全选
function handleAllSelect() {
    selectStatus.value = !selectStatus.value
    list.value = list.value.map((it: object) => ({
        ...it,
        check: selectStatus.value,
    }))
}

// 过滤list
const filterList = computed(() => type.value === 0 ? list.value : list.value.filter((it: { check: never }) => type.value === 1 ? it.check : !it.check))

// 添加一项todo
function handleListPush(e: any) {
    // if (!e.target.value) return ElMessage.error('请输入')
    list.value.push({
        title: e.target.value,
        id: Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2),
        check: false,
    })
    e.target.value = ''
}

function enter(el, done) {
    gsap.to(el, {
        opacity: 1,
        transform: 'translateX(0px)',
        delay: el.dataset.index * 0.1,
        onComplete: done,
    })
}
function leave(el, done) {
    gsap.to(el, {
        opacity: 0,
        transform: 'translateX(-40px)',
        delay: 0.05,
        onComplete: done,
    })
}
</script>

<template>
    <div class="todo mx-auto">
        <div class="todo-header flex h-[60px]">
            <div class="todo-header-selection flex-center" @click="handleAllSelect">
                <img :src="selectStatus ? activeSelection : active" class="w-[40px] cursor-pointer">
            </div>
            <input placeholder="what needs to be done" type="text" @keyup.enter="handleListPush">
        </div>
        <div class="todo-content">
            <template v-if="filterList.length">
                <transition-group appear enter-active-class="init" tag="div" @enter="enter" @leave="leave">
                    <todoItem v-for="(item, index) in filterList" :key="item.id" v-model:list="list" :data-index="index"
                              :item="item" />
                </transition-group>
            </template>
            <div v-else class="flex-center border-b-[1px] py-[10px]">
                <img src="/images/none.png">
            </div>
        </div>
        <div class="todo-footer flex-x-between py-[15px] px-[20px] text-14px">
            <div>{{ filterList.length }} 项</div>
            <div class="todo-footer-filter cursor-pointer">
                <div :class="[type === 0 ? 'active' : '']" @click="type = 0">
                    所有
                </div>
                <div :class="[type === 1 ? 'active' : '']" @click="type = 1">
                    已完成
                </div>
                <div :class="[type === 2 ? 'active' : '']" @click="type = 2">
                    未完成
                </div>
            </div>
            <div class="cursor-pointer" @click="list.length = 0">
                清除所有
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.todo {
    width: 600px;
    box-shadow: 0 0 10px 1px #eee;
    user-select: none;

    .todo-header {
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        overflow: hidden;

        .todo-header-selection {
            flex-basis: 60px;
        }

        input {
            border: none;
            outline: none;
            flex: 1;
            font-size: 25px;
            height: 96%;
            padding: 0;
            background-color: transparent;
            //&:placeholder {
            //  //letter-spacing: 5px;
            //  font-weight: bolder;
            //  color: #e6e6e6;
            //}
        }
    }

    .todo-footer {
        color: #999;

        .todo-footer-filter {
            border-radius: 4px;
            background-color: #eee;
            overflow: hidden;

            div {
                display: inline-block;
                border: none;
                color: #000;
                outline: none;
                padding: 5px 15px;
                box-sizing: border-box;

                &.active {
                    border-radius: 4px;
                    box-sizing: border-box;
                    background-color: #f52443;
                    color: #fff;
                }
            }
        }
    }
}

.init {
    opacity: 0;
    transform: translateX(40px);
}
</style>
