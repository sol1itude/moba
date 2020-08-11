<template>
  <div class="home">
    <Card title="新闻" :cats="list">
      <template #items="{ccc}">
        <div v-for="(item, index) in ccc.l" :key="index">
          {{item.title}}
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from '../components/Card.vue'
export default {
  components: {
    Card
  },
  data(){
    return {
      list: [
        {
          name: '新闻',
          l: [
            {
              title: '111',
              cont: '222'
            },
            {
              title: '123',
              cont: '212322'
            },
            {
              title: '123',
              cont: '123'
            }
          ]
        },
        {
          name: '视频',
          l: [{
            title: '222',
            cont: '222'
          }]
        },
        {
          name: '资讯',
          l: [{
            title: '333',
            cont: '222'
          }]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  html{
    height: 100%;
    background-color: #f8f8f8;
  }

</style>
