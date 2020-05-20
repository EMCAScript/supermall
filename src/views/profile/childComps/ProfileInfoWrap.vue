<template>
  <div class="user_info_wrap">
    <div class="user_img_wrap">
      <img
        class="user_bg"
        src="~assets/img/common/u=1635544728,928539039&fm=26&gp=0.jpg"
        width="320" alt="背景图"/>
      <div class="user_info">
        <img class="user_icon" src="~assets/img/common/u=1635544728,928539039&fm=26&gp=0.jpg" alt />
        <div class="user_name">朝花夕拾</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfoWrap"
};
</script>

<style scoped>
.user_info_wrap {
  overflow: hidden;
  background-color: var(--color-tint);
  position: relative;
}
.user_info_wrap .user_img_wrap {
  position: relative;
  height: 260px;
  overflow: hidden;
}
.user_info_wrap .user_img_wrap .user_bg {
  width: 100%;
  filter: blur(10px);
}
.user_info_wrap .user_img_wrap .user_info {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  text-align: center;
}
.user_info_wrap .user_img_wrap .user_info .user_icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.user_info_wrap .user_img_wrap .user_info .user_name {
  color: #fff;
  margin-top: 12px;
}
</style>