<template>
    <div class="card">
        <div class="title">{{title}}</div>
        <div class="tab">
            <p @click="activeIndex = index" :class="{active: activeIndex === index}" v-for="(cat, index) in cats" :key="index">{{cat.name}}</p>
        </div>
        <div class="cont">
            <div v-for="(cat, index) in cats" :key="index" class="citem">

                <slot name="items" :ccc="cat"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {type: String, required: true},
        cats: {type: Array, required: true}
    },
    data(){
        return {
            activeIndex: 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .card{
      background-color: #fff;
      padding: 40px;
      .title{
        font-weight: 900;
        font-size: 32px;
      }
      .cont{
        margin-top: 20px;
      }
      .tab{
          display: flex;
          justify-content: space-between;
          font-size: 28px;
          margin-top: 20px;
          .active{
              color: red;
          }
      }
    }
</style>