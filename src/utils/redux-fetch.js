const fetchJson = (url, options) => fetch(url, options).then(res => res.json());
export const reduxFetch = store => next => action => {
    if (!action.fetch) {
        next(action);
        return;
    }
    const {type, fetch} = action;
    next({
        type,
        payload: fetch.start(),
    });
    return fetchJson(fetch.url, fetch.options)
        .then(res => {
            next({
                type,
                payload: fetch.success(res),
            });
            return {res};
        })
        .catch(err => {
            next({
                type,
                payload: fetch.fail(err),
            });
            return {err};
        });
};