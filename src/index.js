import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import * as ducks from './ducks'

const rootReducer = combineReducers({
    ...ducks.ui.reducer,
    ...ducks.data.reducer,
});
// Stolen from https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
