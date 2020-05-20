import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            itemListener: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 50);
        this.itemListener = () => {
            this.refresh();
        }
        this.$bus.$on("itemImageLoad", this.itemListener);
        // console.log('混入成功')
    },
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        }
    },
}