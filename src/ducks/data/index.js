import { combineReducers } from 'redux';
import itemIds from './itemIds';
import items from './items';
import { mergeObjects, augmentSelectors } from '../../utils';
const ns = 'data-duck';
const shape = mergeObjects([ itemIds.shape, items.shape ]);
const defaultState = mergeObjects([ itemIds.defaultState, items.defaultState ]);
const root = state => state[ns];
const selectors = {
    root,
    ...augmentSelectors(root, itemIds.ns, itemIds.actions),
    ...augmentSelectors(root, itemIds.ns, items.actions),
};
const actions = mergeObjects([itemIds.actions, items.actions]);
const rawReducer = combineReducers({
    ...itemIds.reducer,
    ...items.reducer,
});
const reducer = {
  [ns]: rawReducer,
};
export default {
    ns,
    shape,
    defaultState,
    selectors,
    actions,
    reducer,
}