<script lang="ts" setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => { },
    },
    list: {
        type: Array,
        default: () => [],
    },
})
// 控制输入框显示
const inputShow = ref<boolean>(false)
// 解构props
const { list, item } = toRefs(props)
// inputdom
const inputDom = ref(null)

// 寻找list某一项的下标
function findItemIndex(id: string) {
    return list.value.findIndex((it: any) => it.id === id)
}

// 删除
function handleDelete() {
    list.value.splice(findItemIndex(item.value.id), 1)
}

// 选中修改
function handleCheckChange() {
    list.value[findItemIndex(item.value.id)].check = !props.item.check
}

// 修改文字
function handleInputChange(e: any) {
    if (!e.target.value)
        return ElMessage.error('请输入内容')
    list.value[findItemIndex(item.value.id)].title = e.target.value
    inputShow.value = false
}

// 双击显示文本框
async function handleInputShow() {
    inputShow.value = true
    await nextTick()
    inputDom.value.select()
}
</script>

<template>
    <div class="todo-item flex-y-center">
        <div class="todo-item-checkbox">
            <input v-if="!inputShow" :checked="item.check" class="checkbox" type="checkbox" @click="handleCheckChange">
        </div>
        <div class="todo-item-content flex-y-center flex-1 pr-3 text-[25px] group" @dblclick="handleInputShow">
            <span :class="{ active: item.check }">{{ item.title }}</span>
            <input v-if="inputShow" ref="inputDom" :value="item.title" class="content-edit" type="text"
                   @blur="handleInputChange" @keyup.enter="handleInputChange">
            <img class="pointer hidden w-[25px] group-hover:block cursor-pointer" src="/images/delete.png"
                 @click="handleDelete">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.active {
    text-decoration: line-through;
    color: #e6e6e6;
}

.todo-item-delete {
    width: 22px;
    margin-right: 20px;
    display: none;
}

.todo-item {
    height: 55px;
    border-bottom: 1px solid #ededed;
}

.todo-item-content {
    height: 100%;
    justify-content: space-between;
    position: relative;
    margin-left: 15px;

    .content-edit {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 10px 1px #999 inset;
        outline: none;
        border: none;
    }
}

.todo-item-checkbox {
    flex-basis: 55px;
    padding-left: 20px;

    .checkbox:checked {
        background: #f52443;
    }

    .checkbox {
        width: 25px;
        height: 25px;
        background-color: #ffffff;
        border: solid 1px #dddddd;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        font-size: 0.8rem;
        margin: 0;
        padding: 0;
        position: relative;
        display: inline-block;
        vertical-align: top;
        cursor: default;
        -webkit-appearance: none;
        -webkit-user-select: none;
        user-select: none;
        -webkit-transition: background-color ease 0.3s;
        transition: background-color ease 0.3s;
        outline: none;
    }

    .checkbox:checked:after {
        content: ' ';
        top: 6px;
        left: 6px;
        position: absolute;
        background: transparent;
        border: #fff solid 2px;
        border-top: none;
        border-right: none;
        height: 6px;
        width: 10px;
        -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
}
</style>
