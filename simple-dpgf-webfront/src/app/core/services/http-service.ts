// URL for dev
//const BASE_URL = "http://localhost:8080/api";

// URL for prod
const BASE_URL = "https://site--simple-dpgf-api--mrqlhtl4f2zp.code.run/api";

export type RequestParam = {
  key: string;
  value: string;
};

export type QueryParam = {
  [key: string]: string | number | boolean | undefined | null;
};

export function addRequestParams(
  url: string,
  token: string | undefined,
  requestParams?: RequestParam[]
): { finalUrl: RequestInfo; headers: Headers } {
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
export function resolveUrl(
  urlTemplate: string,
  params: (string | undefined)[],
  queryParams?: QueryParam
): string {
  let url = urlTemplate;
  const placeholders = urlTemplate.match(/:[a-z]+/gi) ?? [];

  placeholders.forEach((placeholder, index) => {
    const pathVariable = params[index];
    if (index < params.length && pathVariable !== undefined) {
      url = url.replace(placeholder, pathVariable.toString());
    }
  });

  if (queryParams) {
    const queryStrs: string[] = [];
    for (const key in queryParams) {
      if (Object.hasOwn(queryParams, key)) {
        const queryParam = queryParams[key];
        if (queryParam !== undefined && queryParam !== null) {
          queryStrs.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(
              queryParam.toString()
            )}`
          );
        }
      }
    }
    if (queryStrs.length) {
      url += `?${queryStrs.join("&")}`;
    }
  }

  return url;
}
