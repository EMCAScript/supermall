<template>
  <div class="cart">
    <nav-bar>
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部导航 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种用法 数组和对象
    ...mapGetters(["cartLength"])
    //或者
    // ...mapGetters({
    //   length:'cartLength'
    // })
  }
};
</script>

<style scoped>
/* 父级cart必须有固定高度 100vh */
.cart{
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
