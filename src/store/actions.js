export const GET_CATEGORIES = "GET_CATEGORIES"
export const SET_CATEGORY = "SET_CATEGORY"
export function set_cat(categories) {
    return {
        type: GET_CATEGORIES,
        payload: categories,
    };
}
export function set_target_cat(category) {
    return {
        type: SET_CATEGORY,
        payload: category,
    };
}