import PropTypes from "prop-types";

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
    fetch: {url: `/v0/item/${id}.json`},
    params: {id}
});
const actions = {
    fetchItem,
};
// HELPERS
const rawReducer = (state = {}, action) => {
    switch (action.type) {
        case `${types.fetchItem} / start`:
            return {
                ...state,
                [action.params.id]: {item: {}, isLoading: true, error: null}
            };
        case `${types.fetchItem} / success`:
            return {
                ...state,
                [action.params.id]: {
                    item: action.payload,
                    isLoading: false,
                    error: null
                }
            };
        case `${types.fetchItem} / fail`:
            return {
                ...state,
                [action.params.id]: {
                    item: {},
                    isLoading: false,
                    error: action.payload
                }
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



