const BASE_URL = "http://localhost:8080/api";
export function addRequestParams(url, token, requestParams) {
    let finalUrl = BASE_URL + url;
    if (requestParams && requestParams.length > 0) {
        finalUrl += "?";
        requestParams.forEach((requestParam, index) => {
            if (index !== 0) {
                finalUrl += "&";
            }
            finalUrl += `${requestParam.key}=${requestParam.value}`;
        });
    }
    const headers = new Headers();
    if (token !== undefined) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return { finalUrl, headers };
}
// encodeURIComponent: to avoid errors with specials characters
export function resolveUrl(urlTemplate, params, queryParams) {
    let url = urlTemplate;
    const placeholders = urlTemplate.match(/:[a-z]+/gi) ?? [];
    placeholders.forEach((placeholder, index) => {
        const pathVariable = params[index];
        if (index < params.length && pathVariable !== undefined) {
            url = url.replace(placeholder, pathVariable.toString());
        }
    });
    if (queryParams) {
        const queryStrs = [];
        for (const key in queryParams) {
            if (Object.hasOwn(queryParams, key)) {
                const queryParam = queryParams[key];
                if (queryParam !== undefined && queryParam !== null) {
                    queryStrs.push(`${encodeURIComponent(key)}=${encodeURIComponent(queryParam.toString())}`);
                }
            }
        }
        if (queryStrs.length) {
            url += `?${queryStrs.join("&")}`;
        }
    }
    return url;
}
