<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button  class="check-butto"
      :is-checked="isSelectAll"
      @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="check-total">
        合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="clacClick">
        去计算:{{checkLength}}
    </div>
  </div>
</template>
check-button
<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
      checkClick(){
          if(this.isSelectAll){ //全部选中
            this.cartList.forEach(item=>item.checked = false);
          }else{ //部分或全部不选中
             this.cartList.forEach(item=>item.checked = true);
          }
      },
      clacClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品',1500)
        }
      }
  },
  computed: {
      ...mapGetters(["cartList"]),
      totalPrice(){
          return `￥`+ this.cartList.filter(item=>{
              return item.checked
          }).reduce((preValue,item)=>{
              return preValue + item.price * item.count
          },0).toFixed(2);
      },
      checkLength(){
          return this.cartList.filter(item=>item.checked).length;
      },
      isSelectAll(){
        //   return !(this.cartList.filter(item => !item.checked).length)
        if(this.cartList.length===0) return false;
        return !this.cartList.find(item => !item.checked)

        // for(let item of this.cartList){
        //     if(!item.checked){
        //         return false 
        //     }
        // }
        // return true
      }
      
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  border-top: 1px solid var(--color-tint);
  display: flex;
 
}
.check-content {
  width: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.check-butto {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.check-content>span{
    font-size: 12px;
}
.check-total{
     line-height: 40px;
     margin-left: 10px;
}
.calculate{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: var(--color-tint);
    font-size: 12px;
    color: #ffffff;
    position: absolute;
    right: 0;
    top: 0;
}
</style>