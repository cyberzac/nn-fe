const fetchJson = (url, options) => fetch(url, options).then(res => res.json());
export const reduxFetch = store => next => action => {
    if (!action.fetch) {
        next(action);
        return;
    }
    const {type, fetch} = action;
    const {url, options, start, success, fail} = fetch;
    if (start) {
        next({
            type,
            payload: start,
        });
    }
    return fetchJson(url, options)
        .then(res => {
            next({
                type,
                payload: success(res),
            });
            return {res};
        })
        .catch(err => {
            next({
                type,
                payload: fail(err),
            });
            return {err};
        });
};
