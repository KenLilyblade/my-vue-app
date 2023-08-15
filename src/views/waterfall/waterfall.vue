<script setup name="Waterfall">
import request from '@/utils/request'

// import axios from 'axios'
const list = ref([])
const show = ref(true)
onMounted(async () => {
  // axios.get('/ym/api/rand.img2?sort=美女&format=json').then(e => {
  // 	console.log('e: ', e)
  // })
  const res = await request({
    url: '/movies/movie/api/generateimage',
    method: 'get',
    // headers: {
    // 	'Content-Type': 'application/json'
    // },
    params: {
      doubanId: '1306123',
      lang: 'En',
    },
    // data: {

    // }
  })
  // list.value = res.Data.list
  let a = 1
  a ??= 2
  console.log('res', a)
})
</script>

<template>
    <div v-for="item in list" :key="item.id">
        <img :src="item.ImgUrl" alt="">
    </div>
    <div v-copy v-drag="[123]">
        dfgdfgfgd
    </div>
    <el-button type="primary">
        123
    </el-button>

    <el-dialog v-model="show" title="Tips" width="30%">
        <template #header>
            12312
        </template>
        <span>This is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="show = false">Cancel</el-button>
                <el-button type="primary" @click="show = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped></style>
