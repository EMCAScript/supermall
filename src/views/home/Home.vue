<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
       :titles="title"
        @tabClick="tabClick" 
        ref="tabControl1"
        class="tab-control"
         v-show="isTabFixed"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- @pullingUp="loadMore" -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
       :titles="title"
        @tabClick="tabClick" 
        ref="tabControl2"
         />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件如果要监听点击必选加上.native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      title: ["流行", "新款", "精选"],
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
      // itemListener:null
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultitiondata();
    // 2 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new", "927");
    this.getHomeGoods("sell", "940");
  },
  mounted() {
    //这个地方img标签确实被挂载，但是其中的图片还没有占据高度

    //3 监听item图片加载完成
    //
    // const refresh = debounce(this.$refs.scroll.refresh, 50);

    // this.itemListener =  () => {
    //   // this.$refs.scroll.refresh()
    //   refresh();
    // }

    // this.$bus.$on("itemImageLoad",this.itemListener);
    // console.log('这是home',this.banners)
  },
  destroyed() {
    console.log('销毁')
  },
  /** 离开时候记录位置 回来再停到相应位置 */
  activated() {
    //设置位置
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    //刷新
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // this.saveY = -this.$refs.scroll.scroll.y;
    //1 记录位置
    // this.saveY = this.$refs.scroll.getScorllY();
     this.saveY = this.$refs.scroll.scrollY

     //2 取消全局事件的监听
     this.$bus.$off("itemImageLoad",this.itemListener)
  },
  methods: {
    /**网络请求相关的方法 */

    getHomeMultitiondata() {
      getHomeMultidata().then(res => {
        // this.result = res;
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type, cid, pagesize) {
      const page = this.goods[type].page + 1;
      getHomeGoods(cid, page, pagesize)
        .then(res => {
          // console.log('goods_res=>',res.message.goods);
          this.goods[type].list.push(...res.message.goods);
          this.goods[type].page += 1;

          //完成上拉加载更多后
          //scroll默认只能加载一次
          //需要添加finishPullUp
          this.$refs.scroll.finishPullUp();
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**事件监听相关的方法 */
    tabClick(index) {
      // console.log('index',index)
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //将tabControl1组件和tabControl2组件设置相同的index
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
        //1 判断BackTop是否显示
      // console.log(position.y)
      this.isShowBackTop = -position.y > 1000;

      //2 决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      //图片加载完再此加载刷新
      // this.$refs.scroll.scroll.refresh();
    },
    //防抖函数
    // debounce(func,delay){
    //   let timer = null;
    //   return function(...args){
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this,args);
    //     }, delay);
    //   }
    // }
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //组件没有offsetTop属性,需要获取组件里面的元素
      //所有组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop)
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用浏览器原生滚动时 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
