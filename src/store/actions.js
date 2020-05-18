import { ADD_COUNTER, ADD_TO_CART } from './mutations_type'
export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //payload新添加的商品
            //第一种 使用for循环
            // let oldProduct = null;
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item;
            //     }
            // }
            //第二种 使用find方法 查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

            //2 判断oldProduct
            if (oldProduct) { //数量+1
                // oldProduct.count += 1;
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前的商品数量+1')
            } else { //添加新的商品
                payload.count = 1;
                // state.cartList.push(payload);
                context.commit(ADD_TO_CART, payload)
                resolve('添加新的商品');
            }
        })
    }
}