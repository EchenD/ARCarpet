function getBaseUrl() {
    if (import.meta.env.DEV) {
        return '/';
    }

    const scriptSrc = document.currentScript?.src;
    if (scriptSrc) {
        const scriptUrl = new URL(scriptSrc);
        return scriptUrl.pathname.split('/').slice(0, -2).join('/') || '/';
    }

    return window.location.pathname.split('/').slice(0, -1).join('/') || '/';
}

export const config = {
    baseUrl: getBaseUrl(),
    paths: {
        data: 'data',
        images: 'images',
        models: 'models'
    }
};
