<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center">列表</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "listNarBar",
  components: {
    NavBar
  },
  methods: {
       backClick(){
          //back() 向后  forward() 向前
          this.$router.back();
          // 或者
          // this.$router.go(-1)
      }
  },
};
</script>

<style scoped>
.back img{
    margin-top: 12px;
}
</style>