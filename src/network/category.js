import { request_wx } from "./request";

export function getCategoryDatas() {
    return request_wx(
        {
            url: "/categories"
        }
    )
}