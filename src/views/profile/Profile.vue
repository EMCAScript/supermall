<template>
    <scroll class="content">
      <profile-info-wrap></profile-info-wrap>
      <profile-content></profile-content>
    </scroll>
</template>

<script>
import ProfileInfoWrap from "./childComps/ProfileInfoWrap";
import ProfileContent from "./childComps/ProfileContent";
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "Profile",
  components: {
    Scroll,
    ProfileInfoWrap,
    ProfileContent
  }
};
</script>

<style scoped>
.content{
  height: calc(100vh - 49px);
  background-color: #edece8;
}
</style>
