import { combineReducers } from "redux";
import itemIds from "./itemIds";
import items from "./items";
import { mapObj, augmentSelectorWith } from "../../utils";

export const ns = "data";
export const BASE_URL = 'https://hacker-news.firebaseio.com';
const root = state => state[ns];
export const selectors = {
    root,
};

export const rawReducer = combineReducers({
    ...itemIds.reducer,
    ...items.reducer
});

const reducer = {
    [ns]: rawReducer
};

export default {
    ns,
    selectors,
    rawReducer,
    reducer,
    itemIds: {
        ...itemIds,
        selectors: mapObj(itemIds.selectors, augmentSelectorWith(root)),
    },
    items: {
        ...items,
        selectors: mapObj(items.selectors, augmentSelectorWith(root)),
    },
};