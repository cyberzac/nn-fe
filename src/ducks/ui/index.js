import PropTypes from 'prop-types';

export const ns = 'ui-duck';
export const shape = {
    isDarkTheme: PropTypes.bool.isRequired,
    itemsToShow: PropTypes.number.isRequired,
};
export const defaultState = {
    isDarkTheme: false,
    itemsToShow: 5,
};
export const root = state => state[ns];
export const selectors = {
    root,
    itemsToShow: state => root(state).itemsToShow,
    isDarkTheme: state => root(state).isDarkTheme,
};
export const types = {
    updateItemsToShow: `UPDATE_ITEMS_TO_SHOW`,
    toggleTheme: `TOGGLE_THEME`,
};
const updateItemsToShow = value => ({
    type: types.updateItemsToShow,
    payload: value,
});
const toggleTheme = () => ({
    type: types.toggleTheme,
});
export const actions = {
    updateItemsToShow,
    toggleTheme,
};
export const rawReducer = (state = defaultState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.updateItemsToShow:
            return {
                ...state,
                itemsToShow: payload
            };
        case types.toggleTheme:
            return {
                ...state,
                isDarkTheme: !selectors.isDarkTheme(state)
            };
        default:
            return state;
    }
};
export const reducer = {
    [ns]: rawReducer,
};