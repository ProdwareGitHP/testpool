let qs = window.location.href.match(/\?.*/) || "?"
const params = new URLSearchParams(qs[0]);

export const get = (key) => {    
    return params.get(key)
}