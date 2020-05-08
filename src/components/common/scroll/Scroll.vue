<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    }
  },
  mounted() {
    //1 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: this.click
    });

    //2 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position)
        this.$emit("scroll", position);
      });
    }

    //3 监听滚动到底部
    if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
    }

    //3 上拉加载更多
    // this.scroll.on('pullingUp',()=>{
    //     this.$emit('pullingUp')
    // })
    // console.log(this.scroll)
    //scrollerHeight
    // this.scroll.refresh()
  }
};
</script>

<style>
</style>