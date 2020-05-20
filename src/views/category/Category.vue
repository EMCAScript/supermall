<template>
  <div id="category">
    <!-- NarBar -->
    <category-nar-bar class="category-nar"></category-nar-bar>
    <!-- 左侧导航 -->
    <category-left-bar
      class="category-left-bar"
      :leftMenuList="leftMenuList"
      @leftMenuItemClick="leftMenuItemClick"
    ></category-left-bar>
    <!-- 右侧导航 -->
    <category-right-bar class="category-right-bar" 
    :rightContent="rightContent"
    ></category-right-bar>
  </div>
</template>

<script>
import CategoryNarBar from "./childComps/CategoryNarBar";
import CategoryLeftBar from "./childComps/CategoryLeftBar";
import CategoryRightBar from "./childComps/CategoryRightBar";

import { getCategoryDatas } from "network/category";

export default {
  name: "Category",
  data() {
    return {
      leftMenuList: [],
      rightContent: [],
      Cates: []
    };
  },
  components: {
    CategoryNarBar,
    CategoryLeftBar,
    CategoryRightBar
  },
  created() {
    //1 从本地存储中获取数据
    const Cates = this.getStorage("cates");
    console.log(Cates)
    //2 判断
    if(!Cates){
      //不存在 发送请求获取数据
      this.getCategoryDatas();
    }else{
      //有旧的数据 定义过期时间
      if(Date.now() - Cates.time > 1000 * 10){
        this.getCategoryDatas();
      }else{
        //可以使用旧的数据
        this.Cates = Cates.data;
        this.leftMenuList = this.Cates.map(v => v.cat_name);
        this.rightContent = this.Cates[0].children;
      }
    }

  },
  methods: {
    /**网络请求 */
    getCategoryDatas() {
      getCategoryDatas().then(res => {
        this.Cates = res.message;
        //把接口的数据存储到本地存储中
        this.setStorage("cates", { time: Date.now(), data: this.Cates })
        this.leftMenuList = this.Cates.map(v => v.cat_name);
        this.rightContent = this.Cates[0].children;
      });
    },
    /**逻辑处理 */
    leftMenuItemClick(index) {
      this.rightContent = this.Cates[index].children;
    },
    rightSlideClick(){
      this.$router.push({
        type:'/lis'
      })
    },
    //存储
    setStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    //取出数据
    getStorage(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    // 删除数据
    remove(key) {
      localStorage.removeItem(key);
    }
  }
};
</script>

<style scoped>
#category {
  position: relative;
  height: 100vh;
}
.category-nar {
  background-color: var(--color-tint);
  color: #fff;
}
.category-left-bar {
  float: left;
  width: 80px;
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  background-color: WhiteSmoke;
}
.category-right-bar {
  float: left;
  width: 240px;
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  background-color: #fff;
}
</style>
