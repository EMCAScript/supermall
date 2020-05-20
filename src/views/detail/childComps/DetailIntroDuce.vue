<template>
  <div class="introduce">
    <div class="introduce_title">---------- 图文详情 ----------</div>
    <div class="introduce_content" v-html="shop.introduce"></div>
  </div>
</template>

<script>
import { preloadImages } from "network/detail";
export default {
  name: "DetailIntroDuce",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      shopImages: {}
    };
  },
  watch: {
    shop(newVal, oldVal) {
      console.log(1)
      this.shopImages = newVal;
       newVal && this.preloadImagesMethod();
    }
  },
  methods: {
    preloadImagesMethod() {
      preloadImages(this.shopImages.introduce).then(()=>{
        this.$emit('detailIntroDuceImages')
      })
    }
  }
};
</script>

<style scoped>
.introduce_title {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  font-size: 14px;
  color: var(--color-high-text);
}
</style>