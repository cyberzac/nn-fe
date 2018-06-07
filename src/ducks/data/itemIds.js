import PropTypes from 'prop-types';
import {api} from "../../utils";

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
    start: 'REQUEST_ITEM_IDS_START',
    success: 'REQUEST_ITEM_IDS_SUCCESS',
    fail: 'REQUEST_ITEM_IDS_FAIL',
};
const requestItemIdsStart = () => ({
    type: types.start,
});
const requestItemIdsSuccess = itemIds => ({
    type: types.success,
    payload: itemIds,
});
const requestItemIdsFail = err => ({
    type: types.fail,
    payload: err,
});
const fetchItemIds = () => {
    return (dispatch) => {
        dispatch(requestItemIdsStart());
        return api
            .getItemIds()
            .then(itemsIds => {
                dispatch(requestItemIdsSuccess(itemsIds));
            })
            .catch(err => {
                dispatch(requestItemIdsFail(err));
            });
    }
};
const actions = {
    requestItemIdsStart,
    requestItemIdsSuccess,
    requestItemIdsFail,
    fetchItemIds,
};
// HELPERS
const stringifyErr = err => err.toString();

const rawReducer = (state = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.start:
            return {
                ...state,
                isLoading: true,
            };
        case types.success:
            return {
                ids: payload,
                isLoading: false,
                error: null
            };
        case types.fail:
            return {
                ids: [],
                isLoading: false,
                error: stringifyErr(payload)
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
