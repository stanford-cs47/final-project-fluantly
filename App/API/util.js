function delayedPromise(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

function getField(data, field) {
    return data != null && field in data ? data[field] : null;
}

export {delayedPromise, getField};