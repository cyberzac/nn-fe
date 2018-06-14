import PropTypes from "prop-types";
import {BASE_URL} from "./index";

const ns = 'items';
const shape = {
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};
const defaultState = {
    items: [],
    isLoading: false,
    error: null,
};
const root = state => {
    console.log("state:", state, ", ns:", ns);
    return state[ns]; // Must have return
};
const selectors = {
    root,
    items: state => root(state).items,
    item: (state, id) => (root(state)[id] || {}).item,
    isLoading: (state, id) => (root(state)[id] || {}).isLoading,
    error: (state, id) => (root(state)[id] || {}).error,
};
const types = {
    fetchItem: 'REQUEST_ITEM',
};
const fetchItem = id => ({
    type: types.fetchItem,
    fetch: {
        url: `${BASE_URL}/v0/item/${id}.json`,
        start: () => ({[id]: {item: {}, isLoading: true, error: null}}),
        success: (res) => ({[id]: {item: res, isLoading: false, error: null}}),
        fail: (err) => ({[id]: {item: {}, isLoading: false, error: err.toString()}})
    },
});
const actions = {
    fetchItem,
};
// HELPERS
const rawReducer = (state = {}, action) => {
    switch (action.type) {
        case `${types.fetchItem}`:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
const reducer = {
    [ns]: rawReducer,
};
export default {
    ns,
    shape,
    defaultState,
    selectors,
    types,
    actions,
    rawReducer,
    reducer,
};



