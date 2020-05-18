<template>
  <div id="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props:{
  //     message:{
  //         type:String,
  //         default:"呵呵哈哈"
  //     },
  //     show:{
  //         type:Boolean,
  //         default:false
  //     }
  // },
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, duration=1000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
#toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  margin: auto;
  font-size: 12px;
  padding: 8px 10px 8px 12px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  letter-spacing: 2px;
  z-index: 999;
}
</style>