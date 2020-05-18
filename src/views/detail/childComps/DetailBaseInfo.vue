<template>
  <!-- 判断是否为空对象 Object.keys(obj).length === 0 -->
  <div class="base-info" v-if=" goods && Object.keys(goods).length !== 0">
    <div class="info-title">{{goods.name}}</div>
    <div class="info-price">
      <!-- 新价格 -->
      <span class="n-price">{{goods.price !== 0 ? goods.price : 10 | showPrice}}</span>
      <!-- 旧价格 -->
      <span class="o-price">{{noPrice | showPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      <div class="info-collect">
        <img src="~assets/img/collect/collect_no.png" alt />
        <span>收藏</span>
      </div>
    </div>
    <div class="info-other">
      <!-- v-if="form.details.attrs !== undefined && form.details.attrs.length >0" -->
      <span v-if="goods.columns !== undefined && goods.columns">{{goods.columns[0]}}</span>
      <span v-if="goods.columns !== undefined && goods.columns">{{goods.columns[1]}}</span>
      <span
        v-if="goods.services !== undefined && goods.services"
      >{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services" v-if="goods.services !== undefined && goods.services">
      <span class="info-services-item" v-for="index in goods.services.length -1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    noPrice(){
      return  this.goods.price+100
    }
  },
  filters: {
    showPrice(price) {
      return "￥" + price.toFixed(2);
    }
  }
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 10px;
  color: #999;
  border-bottom: 5px solid #f2f2f2;
}
.base-info .info-title {
  margin-top: 15px;
  color: #222;
  display: block;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}
.base-info .info-price {
  margin-top: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 4px;
}
.base-info .info-price .n-price {
  font-size: 18px;
  color: var(--color-high-text);
  letter-spacing: -1px;
}
.base-info .info-price .o-price {
  font-size: 12px;
  margin-left: 5px;
  text-decoration: line-through;
}
.base-info .info-price .discount {
  display: inline-block;
  font-size: 12px;
  background-color: var(--color-high-text);
  padding: 4px 6px;
  color: #f2f2f2;
  border-radius: 10px;
  margin-left: 10px;
}
/* .info-price .discount span:nth-child(1),
.info-price .discount span:nth-child(2) {
  text-align: center;
  margin-top: 8px;
  width: 60px;
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  margin-left: 5px;
  background-color: var(--color-high-text);
  border-radius: 8px;
} */
.base-info .info-other {
  margin-top: 10px;
  line-height: 30px;
  display: flex;
  font-size: 12px;
  justify-content: space-around;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}
.base-info .info-collect {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.base-info .info-collect::before {
  content: "";
  position: absolute;
  top: 3px;
  left: -12px;
  width: 1.5px;
  height: 26px;
  background-color: #e6e6e6;
}
.base-info .info-collect img {
  width: 20px;
}
.base-info .info-collect span {
  font-size: 11px;
  display: inline-block;
  margin-top: 2px;
}
.base-info .info-services {
  display: flex;
  line-height: 30px;
  justify-content: space-between;
  /* border-bottom: 2px solid #f4f4f4; */
}

.base-info .info-services .info-services-item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
.base-info .info-services .info-services-item span {
  font-size: 12px;
}
</style>

