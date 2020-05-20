import { request_wx } from "./request";

export function getListDatas(params) {
    return request_wx(
        {
            url: "/goods/search",
            params
        }
    )
}