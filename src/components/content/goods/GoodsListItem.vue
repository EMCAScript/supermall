<template>
  <div class="goodslistitem">
    <img :src="goodsItem.goods_small_logo?goodsItem.goods_small_logo:'http://image1.suning.cn/uimg/b2c/newcatentries/0070096237-000000000785781585_1_400x400.jpg'" alt @load="imageLoad"/>
    <div class="goodslistitemtitle">
      <p>{{goodsItem.goods_name}}</p>
      <div class="sell">
        <span class="price">{{goodsItem.goods_price | priceFilter}}</span>
        <span class="collect">100</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    priceFilter(value) {
      return `￥${value}`;
    }
  },
  methods: {
    imageLoad(){
      //事件总线
      this.$bus.$emit('itemImageLoad')
    }
  },
};
</script>

<style>
.goodslistitem {
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid #cccccc; */
  /* box-shadow: 0 0 8px #cccccc; */
  /* padding: 8px; */
  margin: 6px 0;
  border-radius: 5px;
}
.goodslistitem img {
  width: 100%;
  border-radius: 5px;
}
.goodslistitem .goodslistitemtitle {
  font-size: 12px;
}
.goodslistitem .goodslistitemtitle p {
  margin: 3px 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.goodslistitem .goodslistitemtitle .sell {
  display: flex;
  justify-content: center;
  font-size: 14px;
}
.goodslistitem .goodslistitemtitle .sell span{
    padding: 0 2px;
}
.goodslistitem .goodslistitemtitle .sell  .price{
    color: var(--color-tint);
}
</style>

