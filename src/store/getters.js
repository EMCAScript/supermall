export default {
    cartLength(state){
        return state.cartList.length;
    },
    cartList(state){
        return state.cartList
    }
}
/**
 * 如何把getters转成计算属性来用
 * 
 * mapGetters
 * 
 */