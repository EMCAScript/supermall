import { request_wx } from "./request";

export function getDetailData(goods_id) {
    // console.log('这是网络', typeof goods_id, goods_id)
    return request_wx({
        url: "/goods/detail",
        params: {
            goods_id
        }
    })
}

export function getDetailGoods(cid,pagenum,pagesize) {
    return request_wx(
      {
        url: "/goods/search",
        params:{
          cid:cid || '926',
          pagenum: pagenum || 1,
          pagesize: pagesize || 20,
        }
      }
    )
  }

export class Goods {
    constructor(name, price, discount, columns, services) {
        this.name = name
        this.price = price
        this.discount = discount
        this.columns = columns
        this.services = services
    }
}

export class Shop {
    constructor(introduce) {
        this.introduce = introduce
    }
}

export class Rate {
    constructor(cRate,list) {
        this.cRate = cRate
        this.list = list
    }
}

export class GoodsParam {
    constructor(paramObj,attrs) {
        //属性可能没有值(某些商品有值，某些没有值)
        // this.name = name ? name : "";
        this.paramObj = paramObj
        this.attrs = attrs
    }
}


export function preloadImages(str) {
    // console.log(str)
    // //1 已加载完的图片数量
    let loadedImage = 0
    // //2 存放图片的数组
    let newImages = []
    // //3 处理存入字符串，取得src部分
    let arr = getImgSrc(str);
    return new Promise((resolve,reject)=>{
        for(let i =0;i<arr.length;i++){
            newImages[i] = new Image();
            //设置图片src属性
            newImages[i].src = arr[i]
            //图片绑定onload事件，确保加载完成
            newImages[i].onload = function(){
                loadedImage++;
                //当全部加载完成后，resolve
                if(loadedImage === arr.length){
                    // console.log(loadedImage)
                    resolve();
                }
            }
            newImages[i].onerror = function(){
                reject();
            }
        }
    })
}

//获取富文本所有图片src地址
function getImgSrc(rich) {
    var imgList = [];
    rich.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
        imgList.push(capture);
    });
    return imgList;
}
