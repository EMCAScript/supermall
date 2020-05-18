<template>
  <div class="detailgoodsinfo">
      <img src="" alt="" @load="imgLoad">
  </div>
</template>

<script>
export default {
    name:"DetailGoodsInfo",
    props:{
        detailInfo:{
            type:Object,
            default(){
                return { }
            }
        }
    },
    data(){
        return{
            counter:0,
            imagesLength:0
        }
    },
    methods: {
        imgLoad(){
            //判断，所有图片都加载完了 那么进行一次回调就可以
            if(++this.counter === this.imagesLength){
                this.$emit('imageLoad')
            }
        }
    },
    watch: {
        detailInfo(){
            //获取图片的个数
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
    },

}
</script>

<style>

</style>