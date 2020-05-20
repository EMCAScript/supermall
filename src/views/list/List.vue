<template>
  <div id="list">
    <list-nar-bar class="list-nar-bar"></list-nar-bar>
    <tab-control :titles="titles" @tabClick="tabClick"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @pullingUp="loadMore">
      <goods-list :goods="goodsList" />
    </scroll>
  </div>
</template>

<script>
import listNarBar from "./childComps/listNarBar";

import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { getListDatas } from "network/list";
import { debounce } from "common/utils";

export default {
  name: "List",
  components: {
    listNarBar,
    TabControl,
    Scroll,
    GoodsList
  },
  data() {
    return {
      titles: ["综合", "销量", "价格"],
      QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      totalPages: 1,
      itemListener: null
    };
  },
  created() {
    console.log(this.$route.query);
    this.QueryParams.cid = this.$route.query.cid || "";
    this.QueryParams.query = this.$route.query.query || "";
    this.getListDatas();
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemListener);
  },
  deactivated(){
    this.$bus.$off("itemImageLoad")
  },
  activated() {
    //刷新
    this.$refs.scroll.refresh();
  },
  methods: {
    /**网络请求 */
    getListDatas() {
      getListDatas(this.QueryParams).then(res => {
        //1 获取总条数
        const { total } = res.message;
        //2 Math.ceil() 函数返回大于或等于一个给定数字的最小整数.
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
        //3 追加数据
        this.goodsList.push(...res.message.goods);
        //4 完成上拉加载更多后
        //scroll默认只能加载一次
        //需要添加finishPullUp
        this.$refs.scroll.scroll.finishPullUp();
      });
    },
    /**逻辑处理 */
    tabClick(index) {
      console.log("index", index);
    },
    loadMore() {
      if (this.QueryParams.pagenum >= this.totalPages) {
        this.$toast.show("没有下一页数据了", 1500);
      } else {
        this.QueryParams.pagenum++;
        this.getListDatas();
        this.$refs.scroll.refresh();
      }
    }
  }
};
</script>

<style scoped>
#list {
  position: relative;
  height: 100vh;
  z-index: 1;
  background-color: #fff;
}
.list-nar-bar {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
}
.content {
  height: calc(100% - 44px - 40px);
  overflow: hidden;
  background-color: WhiteSmoke;
}
</style>