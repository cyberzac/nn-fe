export * from "./api";
export * from './logger';
export * from './redux-fetch';
export const mapObj = (obj, fn) => Object.keys(obj).reduce(
    (state, itemKey) => ({...state, [itemKey]: fn(obj[itemKey])}),
    {}
);
export const augmentSelectorWith = parentSelector => selector => {
    return (state, ...restArgs) => selector(parentSelector(state), ...restArgs);
};
export const payloadReducer = (type, initialState) => (state = initialState, action) => {
    switch (action.type) {
        case type:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
