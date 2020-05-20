<template>
  <div>
    <scroll class="content" ref="scroll">
      <div
        class="left-bar-item"
        v-for="(item,index) in leftMenuList"
        :key="index"
        :class="{active : currentIndex === index}"
        @click="itemClick(index)"
      >{{item}}</div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryLeftBar",
  components: {
    Scroll
  },
  props: {
    leftMenuList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      leftSlideBarList: []
    };
  },
  watch: {
    leftMenuList(newVal, oldVal) {
    //   console.log(newVal);
    }
  },
  methods: {
    itemClick(index) {
      //1 改变字体颜色
      this.currentIndex = index;
      //2 
      this.$emit('leftMenuItemClick',index)
    }
  },
  mounted() {
      this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}
.left-bar-item {
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 12px;
  /* color: 		DarkGray; */
}
.active {
  color: var(--color-high-text);
}
</style>