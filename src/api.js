export function getStrapiURL(path) {
    return `https://api-blog.mypup.io${path}`;
}

export function getStrapiMedia(url) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith("http") || url.startsWith("//")) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `https://api-blog.mypup.io${url}`;
}


export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    return await response.json();
}

export async function postAPI(path, body) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}

export async function getArticles(lang) {
    const res = await fetchAPI(`/locations?language=${lang}`);
    return res[0].articles
}

export async function getArticleBySlug(slug) {
    return await fetchAPI(`/articles/${slug}`);
}

