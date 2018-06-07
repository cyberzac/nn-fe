import PropTypes from 'prop-types';

const ns = 'ui-duck';
const shape = {
    isDarkTheme: PropTypes.bool.isRequired,
    itemsToShow: PropTypes.number.isRequired,
};
const defaultState = {
    isDarkTheme: false,
    itemsToShow: 5,
};
const root = state => state[ns] ;
const selectors = {
    root,
    itemsToShow: state => root(state).itemsToShow,
    isDarkTheme: state => root(state).isDarkTheme,
};
const types = {
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
const actions = {
    updateItemsToShow,
    toggleTheme,
};
const rawReducer = (state = defaultState, action) => {
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
                isDarkTheme: !state.isDarkTheme
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
    root,
    selectors,
    types,
    actions,
    rawReducer,
    reducer,
}