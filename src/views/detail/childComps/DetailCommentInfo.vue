<template>
    <div class="comment-info" v-if="commentInfo !== undefined && Object.keys(commentInfo).length !== 0">
        <div class="info-header">
            <div class="header-title">用户评价</div>
            <div class="header-more">
                更多
                <i class="arrow-right"></i>
            </div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.list[0].user.avatar" alt=""
            width="100">
            <span>{{commentInfo.list[0].user.uname}}</span>
        </div>
        <div class="info-detail">
            <p>{{commentInfo.list[0].content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.list[0].created | showDate}}</span>
                <span>{{commentInfo.list[0].style}}</span>
            </div>
            <div class="info-imgs">
                <img :src="item.pics_mid" alt="" v-for="(item,index) in commentInfo.list[0].images"
                :key="index">
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from "common/utils"
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters:{
    showDate(value){
      //1 将时间戳转为Date对象(时间戳是秒,Date要求传入的是毫秒 需要城1000)
      const date = new Date(value * 1000)
      //2 将date进行格式化 转成对应的字符串
      return formatDate(date,"yyyy-MM-dd")
    }
  }
};
</script>

<style>
.comment-info{
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f25f8f;
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.info-header{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(0, 0, 0,.1);
}
.header-title{
  float: left;
  font-size: 15px;
}
.header-more{
  float: right;
  margin-right: 10px;
  font-size: 13px;
}
.info-user{
  padding: 10px 0 5px;
}
.info-user img{
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.info-user span{
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}
.info-detail{
  padding:  0 5px 15px;
}
.info-detail p{
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other{
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .date{
  margin-right: 8px;
}
.info-imgs{
  margin-top: 10px;
}
.info-imgs img{
  width: 70px;
  height: 70px;
  margin-right: 4px;
}
</style>