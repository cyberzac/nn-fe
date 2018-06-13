const BASE_URL = 'https://hacker-news.firebaseio.com';
const fetchJson = (url, options) => fetch(url, options).then(res => res.json());
const stringifyErr = err => err.toString();
export const reduxFetch = store => next => action => {
    if (!action.fetch) {
        next(action);
        return;
    }
    next({
        type: `${action.type} / start`,
        params: action.params
    });
    return fetchJson(BASE_URL + action.fetch.url, action.fetch.options)
        .then(res => {
            next({
                type: `${action.type} / success`,
                payload: res,
                params: action.params
            })
            return {res};
        })
        .catch(err => {
            next({
                type: `${action.type} / fail`,
                payload: stringifyErr(err),
                params: action.params
            })
            return {err};
        })
}