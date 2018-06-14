import PropTypes from 'prop-types';
import {BASE_URL} from "./index";
import {payloadReducer} from "../../utils";
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
const fetchItemIds = () => ({
        type: types.fetchItemIds,
        fetch: {
            url: `${BASE_URL}/v0/topstories.json`,
            start: () => ({isLoading: true}),
            success: (res) => ({ids: res, isLoading: false, error: null}),
            fail: (err) => ({ids: [], isLoading: false, error: err.toString()}),
        },
    }
);
const actions = {
    fetchItemIds,
};
const rawReducer = payloadReducer(types.fetchItemIds, defaultState);
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
