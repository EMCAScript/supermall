<template>
  <div>
    <swiper id="detail-swiper" v-if="banners !== undefined && banners.length > 0">
      <swiper-item v-for="(item,index) in banners" :key="index">
        <!-- <a :href="item.pics_mid_url"> -->
        <img :src="item.pics_mid?item.pics_mid:'http://image4.suning.cn/uimg/b2c/newcatentries/0070091320-000000010052981729_1_400x400.jpg'" />
        <!-- </a> -->
      </swiper-item>
    </swiper>
    <div class="detail-else-img" v-else>
      <img src="https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg" alt="">
    </div>
  </div>
  <!-- <div>{{banners[0].pics_mid}}</div> -->
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  watch: {
  },
};
</script>

<style scoped>
.detail-else-img{
  width: 320px;
}
.detail-else-img img{
  display: block;
  width: 100%;
}
</style>