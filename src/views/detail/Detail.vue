<template>
  <div id="detail">
    <detail-nar-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nar-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :banners="banners"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-intro-duce :shop="shop" @detailIntroDuceImages="detailIntroDuceImages"></detail-intro-duce>
      <!--  -->
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <!--  -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <!--  -->
      <goods-list ref="recommend" :goods="dgoods[`pop`].list" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNarBar from "./childComps/DetailNarBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailIntroDuce from "./childComps/DetailIntroDuce";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
// import Toast from "components/common/toast/Toast";

import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetailData,
  getDetailGoods,
  Goods,
  Shop,
  preloadImages,
  getArr,
  GoodsParam,
  Rate
} from "network/detail";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      message: "假数据",
      show: false,
      goods_id: 0,
      goodsObj: {},
      banners: [],
      columns: ["销量 1580", "收藏 33人", "默认快递"],
      services: [
        {
          icon:
            "https://ae01.alicdn.com/kf/Hb85824f6a5f5465eb30187205ef3c9fer.jpg",
          name: "72小时发货"
        },
        {
          icon:
            "https://ae01.alicdn.com/kf/Hb85824f6a5f5465eb30187205ef3c9fer.jpg",
          name: "7天无理由退货"
        },
        {
          icon:
            "https://ae01.alicdn.com/kf/Hb85824f6a5f5465eb30187205ef3c9fer.jpg",
          name: "全国包邮"
        },
        {
          icon:
            "https://ae01.alicdn.com/kf/Hb85824f6a5f5465eb30187205ef3c9fer.jpg",
          name: "退货补运费"
        }
      ],
      discountDesc: "今日优惠",
      goods: {},
      shop: {},
      paramInfo: {},
      // 评论信息
      commentInfo: {},
      dgoods: {
        pop: { page: 0, list: [] }
      },
      // itemListener:null
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // isShowBackTop: false
    };
  },
  components: {
    DetailNarBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailIntroDuce,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    // Toast,
    // BackTop,
    GoodsList
  },
  created() {
    this.goods_id = parseInt(this.$route.query.goods_id);
    //调用详情方法
    getDetailData(this.goods_id).then(res => {
      //1 获取全部商品信息
      this.goodsObj = res.message;
      const data = res.message;
      //2 获取顶部的图片轮播数据
      if (data.pics.length === 0) {
        this.banners = [];
      } else {
        this.banners = data.pics;
      }
      //3 获取商品信息
      this.goods = new Goods(
        data.goods_name,
        data.goods_price,
        this.discountDesc,
        this.columns,
        this.services
      );
      //获取富文本内容
      this.shop = new Shop(data.goods_introduce);
      //前端替换.webp
      // goods_introduce.replace(/\.webp/g,'.jpg'),
      //获取参数的信息
      const paramObj = {
        name: data.goods_name,
        price: data.goods_price,
        number: data.goods_number,
        weight: data.goods_weight
      };
      this.paramInfo = new GoodsParam(paramObj, data.attrs);

      //评论信息
      const rate = {
        cRate: 125,
        list: [
          {
            canExplain: false,
            content: "质量很好！虽然是均码，穿起来也是很合适，推荐购买！",
            created: 1535694719, //时间戳
            extraInfo: ["是否合身:合身"],
            images: data.pics,
            isAnonymous: 1,
            isEmpty: 0,
            level: "",
            rateId: "11624z5q",
            style: "颜色:上衣+裤子 尺码:M",
            user: {
              avatar:
                data.pics.length !== 0
                  ? data.pics[0].pics_mid
                  : [
                      {
                        pics_mid:
                          "https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg"
                      }
                    ],
              uname: data.attrs[0].attr_value
            }
          }
        ]
      };
      this.commentInfo = new Rate(rate.cRate, rate.list);

      //第一次获取，值不对，原因是this.$refs.params.$el压根没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //this.$nextTick(() => {
      //第二次获取：值不对
      //原因 图片没有计算在内
      // 根据最新的数据 对应的DOM是已经被渲染出来了
      // 但是图片依然是没有加载完(目前获取到offSetTop不包含其中的图片)
      // offsetTop值不对的时候，一般都是图片问题
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //});
    });

    this.getDetailGoods("pop");

    //4 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //contentScroll方法使用联动判断的第二种判断
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    ...mapActions(["addCart"]),
    getDetailGoods(type, cid, pagesize) {
      const page = this.dgoods[type].page + 1;
      getDetailGoods(cid, page, pagesize)
        .then(res => {
          // console.log('dgoods_res=>',res.message.goods)
          this.dgoods[type].list.push(...res.message.goods);
          this.dgoods[type].page += 1;
          //完成上拉加载更多后
          //scroll默认只能加载一次
          //需要添加finishPullUp
        })
        .catch(err => {
          console.log(err);
        });
    },
    titleClick(index) {
      //滚动到某个位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 10);
    },
    detailIntroDuceImages() {
      //1 重新计算页面高度
      this.refresh();

      //2 图片加载完后获取最新的值
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log("this.themeTopYs", this.themeTopYs);
      //或者使用防抖函数
      // this.getThemeTopY()
    },
    contentScroll(position) {
      // console.log('position',position)
      //1 获取y值
      const positionY = -position.y;
      //2 position和主题中的值对比
      /**
       * [0,7938,9130,9403]
       * positionY 在0 和 7938之间 index=0
       * positionY 在=7938 和 9130之间 index=0
       * positionY 在=9130 和 9403之间 index=0
       *
       * positionY 大于等于9403时 index=0i++
       */
      const length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        //第一种方式判断
        //[0,7938,9130,9403]
        //for循环使用length
        //不需要在this.themeTopYs再加一个值
        if (
          (this.currentIndex !== i &&
            i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
          (i === length - 1 && positionY >= this.themeTopYs[i])
        ) {
          // console.log(parseInt(i))
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        //第二种做法判断
        //在加上一个非常大的值 [0,7938,9130,9403,非常大的值]
        //获取最大值 Number.MAX_VALUE
        //首先在this.themeTopYs最后加一个最大值Number.MAX_VALUE
        //其次在for循环中使用length-1
        // if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positioY < this.themeTopYs[i+1]))
      }

      //3 回到顶部
      this.isShowBackTop = positionY > 1000;
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // }
    addToCart() {
      //1 获取购物车需要展示的信息
      const product = {};
      product.imgae = this.banners[0].pics_mid
        ? this.banners[0].pics_mid
        : "https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg";
      product.title = this.goodsObj.goods_name;
      product.desc = this.goodsObj.attrs;
      product.price = this.goodsObj.goods_price;
      product.iid = this.goodsObj.goods_id;
      //2 将商品添加到购物车
      this.$store.dispatch("addCart", product).then(res => {
        // console.log(res);
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // },2000);
        this.$toast.show(res, 1500);
        // console.log(this.$toast)
      });
      //或者使用映射方法调用
      // this.addCart(product).then(res=>{
      //   console.log(res)
      // })
    }
  },
  mounted() {
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //不能再mouted获取offsetTop
    //因为子组件判断有值的情况下才渲染组件，意味着还没获得数据不会渲染组件
    //mouted不一定能确保数据已经加载完成
    //created异步请求，数据不一定那么快获取，组件渲染也需要时间，mouted也不一定能拿到数据
    //组件渲染需要时间
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
  updated() {
    //updated更新数据频繁，可以先设置空数组
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log("this.themeTops", this.themeTopYs);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  height: 100vh;
  /* padding-bottom: 49px; */
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #ffffff;
}
.content {
  background-color: #ffffff;
  height: calc(100% - 44px - 49px);
}
.backtop {
  top: -100px;
}
</style>