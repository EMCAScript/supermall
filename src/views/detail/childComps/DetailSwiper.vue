<template>
  <div>
    <swiper id="detail-swiper">
      <swiper-item v-for="(item,index) in banners" :key="index">
        <!-- <a :href="item.pics_mid_url"> -->
        <img :src="item.pics_mid" />
        <!-- </a> -->
      </swiper-item>
    </swiper>
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

</style>