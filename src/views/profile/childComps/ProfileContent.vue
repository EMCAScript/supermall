<template>
  <div class="user_content">
      <div class="user_main">
        <!-- 历史足迹 -->
        <div class="history_wrap">
          <div>
            <div class="his_num">0</div>
            <div class="his_name">收藏的店铺</div>
          </div>
          <div>
            <div class="his_num">0</div>
            <div class="his_name">收藏的商品</div>
          </div>
          <div>
            <div class="his_num">0</div>
            <div class="his_name">关注的商品</div>
          </div>
          <div>
            <div class="his_num">0</div>
            <div class="his_name">我的足迹</div>
          </div>
        </div>
        <!-- 我的订单 -->
        <div class="orders_wrap">
          <div class="orders_title">我的订单</div>
          <div class="orders_content">
            <div>
              <div class="iconfont icon-ding_dan"></div>
              <div class="order_name">全部订单</div>
            </div>
            <div>
              <div class="iconfont icon-fukuantongzhi"></div>
              <div class="order_name">待付款</div>
            </div>
            <div>
              <div class="iconfont icon-receipt-address"></div>
              <div class="order_name">待收货</div>
            </div>
            <div>
              <div class="iconfont icon-tuihuotuikuan_dianpu"></div>
              <div class="order_name">退款/退货</div>
            </div>
          </div>
        </div>
        <!-- 收获地址管理 -->
        <div class="address_wrap">
          收获地址管理
        </div>
        <!-- 应用信息相关 -->
        <div class="app_info_wrap">
          <div class="app_info_item app_info_contact">
            <span>联系客服</span>
            <span>400-618-4000</span>
          </div>
          <div class="app_info_item">意见反馈</div>
          <div class="app_info_item">关于我们</div>
        </div>
        <!-- 推荐 -->
        <div class="recommend_wrap">
          把应用推荐给其他人
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'ProfileContent'
}
</script>

<style scoped>
.user_content {
  position: relative;
  height: 450px;
}
.user_content .user_main {
  padding-bottom: 100px;
  color: #666;
  position: absolute;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  top: -40px;
  font-size: 12px;
}
.user_content .user_main .history_wrap {
  background-color: #fff;
  display: flex;
  font-size: 12px;
}
.user_content .user_main .history_wrap > div {
  flex: 1;
  text-align: center;
  padding: 10px 0;
}
.user_content .user_main .history_wrap > div .his_num {
  color: var(--color-tint);
}
.user_content .user_main .orders_wrap {
  background-color: #fff;
  margin-top: 10px;
  font-size: 12px;
}
.user_content .user_main .orders_wrap .orders_title {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}
.user_content .user_main .orders_wrap .orders_content {
  display: flex;
}
.user_content .user_main .orders_wrap .orders_content>div {
  flex: 1;
  text-align: center;
  padding-bottom: 4px;
}
.user_content .user_main .orders_wrap .orders_content>div .order_name{
  font-size: 12px;
}
.user_content .user_main .orders_wrap .orders_content>div .iconfont{
  color:  var(--color-tint);
  height: 30px;
  line-height: 30px;
}
.user_content .user_main .orders_wrap .orders_content>div:nth-child(1) .iconfont {
  font-size: 16px;
}
.user_content .user_main .orders_wrap .orders_content>div:nth-child(2) .iconfont {
  font-size: 21px;
}
.user_content .user_main .orders_wrap .orders_content>div:nth-child(3) .iconfont {
  font-size: 20.5px;
}
.user_content .user_main .orders_wrap .orders_content>div:nth-child(4) .iconfont {
  font-size: 21.5px;
}
/*  */
.user_content .user_main .address_wrap {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px ;
  font-size: 12px;
}
.user_content .user_main .app_info_wrap {
  margin-top: 10px;
  background-color: #fff;
}
.user_content .user_main .app_info_wrap .app_info_item {
  padding: 10px ;
  border-bottom: 1px solid #ccc;
}
.user_content .user_main .app_info_wrap .app_info_contact {
  display: flex;
  justify-content: space-between;
}
.user_content .user_main .recommend_wrap {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px ;
  border-bottom: 1px solid #ccc;
}

</style>