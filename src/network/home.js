import { request, request_wx } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// export function getHomeGoods(type,page) {
//   return request({
//     url: '/home/multidata',
//     params:{
//       type,
//       page
//     }
//   })
// }

export function getHomeGoods(cid,pagenum,pagesize) {
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

