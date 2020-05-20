<template>
  <div>
    <scroll class="content" ref="scroll2">
        <div class="category-group" v-for="(item,index) in rightContent"
        :key="index">
            <div class="category-title">
                <span class="delimiter">/</span>
                <span class="title">{{item.cat_name}}</span>
                <span class="delimiter">/</span>
            </div>
            <div class="category-list">
                <div v-for="(item1,index) in item.children"
                :key="index" class="category-item" @click="rightSlideClick(item1.cat_id)">
                    <img :src="item1.cat_icon" alt="">
                    <div class="category_name">{{item1.cat_name}}</div>
                </div>
            </div>
        </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CategoryRightBar",
  data() {
    return {};
  },
  props: {
    rightContent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
      rightSlideClick(cid){
        console.log(cid)
          this.$router.push({
            path:'/list',
            query:{
              cid
            }
          })
      }
  },
  components: {
    Scroll
  },
  watch: {
    rightContent(newVal, oldVal) {
    //   console.log(newVal);
    }
  },
  mounted() {
    this.$refs.scroll2.scroll.refresh();
  }
};
</script>

<style scoped>
.content {
  height: 100%;
}

.category-group{
    position: relative;
}
.category-title{
    text-align: center;
    font-size: 12px;
    height: 35px;
    line-height: 35px;
}
.category-title .delimiter{
    display: inline-block;
    padding: 0 5px;
}
.category-title .title{
    color: #000;
}
.category-list{
    display: flex;
    flex-wrap: wrap;
}
.category-item{
    width: 33.3%;
    text-align: center;
    font-size: 12px;
    padding: 5px 0;
}
.category-item img{
    width: 30px;
    height: 30px;
}
</style>