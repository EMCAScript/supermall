<template>
  <div class="param-info" v-if="param!==undefined && Object.keys(param).length !== 0 ">
    <table class="info-table">
      <tr v-for="(value,name,index) in param.paramObj" :key="index">
        <td>{{paramInfoArr[index].title}}</td>
        <td :title="value">{{value}}</td>
      </tr>
    </table>
    <!-- <p>{{paramInfo !== undefined && paramInfo}}</p> -->
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  data() {
    return {
      paramInfoArr: [
        { title: "商品名称" },
        { title: "商品价格" },
        { title: "商品数量" },
        { title: "商品重量" },
        { title: "商品属性" }
      ],
      param: {}
    };
  },
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    paramInfo(newVal, oldVal) {
      this.param = newVal; //newVal即是paramInfo
      newVal && this.paramInfoMethod(); //newVal存在的话执行paramInfoMethod函数
    }
  },
  methods: {
    paramInfoMethod() {}
  },
  mounted() {
    //在created、mounted这样的生命周期, 给 this.param赋值会失败,错误赋值方法
    // this.param = this.paramInfo;
  }
};
</script>

<style scoped>
table {
  width: calc(100% - 8px);
  border-collapse: collapse;  /*设置表格单线 */
  table-layout:fixed;
  padding:0 4px;
  margin: 0 auto;
}
table tr {
  height: 42px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  text-align: center;
  font-size: 12px;
}
table tr td:nth-child(even) {
  width: 74%;
  color: var(--color-tint);
}
table tr td:nth-child(odd) {
  width: 26%;
}
table tr:nth-child(1) td:nth-child(even) {
  white-space: nowrap; /*控制单行显示*/
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*隐藏的字符用省略号表示*/
}
</style>