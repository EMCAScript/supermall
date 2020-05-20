// module.exports = {
//     plugins:{
//         autoprefixer:{},
//         "postcss-px-to-viewport":{
//             viewportWidth:375,//视窗的高度，对应的是我们设计稿的宽度
//             viewportHeight:667, //视窗的高度，对应的是我们设计稿的高度(也可以不配置)
//             unitPrecision:5,//指定
//         }
//     }
// }
module.exports = {
    plugins: {
      autoprefixer: {},
      "postcss-px-to-viewport": {
        unitToConvert: 'px',
        viewportWidth: 320,
        viewportHeight: 568,
        unitPrecision: 5,
        viewportUnit: 'vw', //指定需要转换的视窗单位
        selectorBlackList: ['ignore','tab-bar','tab-bar-item'], //值定不需要转换的类
        minPixelValue: 1, //小于或等于`1px`不转换为视窗单位
        mediaQuery: false, //允许在媒体查询中转换`px`
        exclude: [/TabBar/],
      }
    }
  }
  