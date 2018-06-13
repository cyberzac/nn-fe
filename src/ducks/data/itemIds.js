import PropTypes from 'prop-types';
import {api} from "../../utils/index";

const ns = 'itemIds';
const shape = {
    ids: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};
const defaultState = {
    ids: [],
    isLoading: false,
    error: null,
};
const root = state => state[ns];
const selectors = {
    root,
    ids: state => root(state).ids,
    isLoading: state => root(state).isLoading,
    error: state => root(state).error,
};
const types = {
    fetchItemIds: 'REQUEST_ITEM_IDS',
};
const fetchItemIds =() =>  ({
        type:types.fetchItemIds,
        fetch: {url:'/v0/topstories.json'},
        params: {},
    }
);
const actions = {
    fetchItemIds,
};
// HELPERS
const rawReducer = (state = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case `${types.fetchItemIds} / start`:
            return {
                ...state,
                isLoading: true,
            };
        case `${types.fetchItemIds} / success`:
            return {
                ids: payload,
                isLoading: false,
                error: null
            };
        case `${types.fetchItemIds} / fail`:
            return {
                ids: [],
                isLoading: false,
                error: payload
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
}
