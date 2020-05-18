<template>
  <div class="cart-list">
    <!-- scroll必须有层级关系和固定高度 -->
    <scroll class="content" ref="scroll">
      <cart-list-item 
      v-for="(item,index) in cartList"
      :key="index"
      :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
      this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 41px);
}
.content {
  /* 继承父级cart高度 */
  height: 100%;
  overflow: hidden;
}
</style>