<template>
  <div class="shop-item">
      <div class="item-selector">
          <CheckButton :is-checked="product.checked"
          @click.native="checkClick"
         ></CheckButton>
      </div>
      <div class="item-img">
          <img :src="product.imgae" alt="商品图片">
      </div>
      <div class="item-info">
          <div class="item-title">{{product.title}}</div>
          <div class="item-desc">{{product.desc[0].attr_name}}</div>
          <div class="item-bottom">
              <div class="item-price">￥{{product.price}}</div>
              <div class="item-count">X{{product.count}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
    name:'CartListItem',
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    components:{
        CheckButton
    },
    methods: {
        checkClick(){
            this.product.checked = !this.product.checked
        }
    },
}
</script>

<style scoped>
 .shop-item{
     width: 100%;
     display: flex;
     font-size: 0;
     padding: 5px;
     border-bottom: 1px solid #cccccc;
 }
 .item-selector{
     width: 20px;
     display: flex;
     justify-content: center;
     align-items: center;
 }
 .item-title,
 .item-desc{
     overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
     font-size: 14px;
 }
 .item-img{
     padding: 5px;
 }
 .item-img img{
     width: 80px;
     height: 80px;
     display: block;
     border-radius: 5px;
 }
 .item-info{
     font-size: 17px;
     color: #333;
     padding: 5px 10px;
     position: relative;
     overflow: hidden;
 }
 .item-info .item-desc{
     font-size: 12px;
     color: #666;
     margin-top: 12px;
 }
 .item-bottom{
     margin-top: 10px;
     position: absolute;
     bottom: 10px;
     left: 10px;
     right: 10px;
     display: flex;
     justify-content: space-between;
 }
 .item-bottom .item-price{
     color: orangered;
 }
</style>