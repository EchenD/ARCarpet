// Get base path from different sources with fallback
const BASE_PATH = (() => {
    // Try import.meta.env first (Vite dev)
    if (import.meta.env?.BASE_URL) {
        return import.meta.env.BASE_URL;
    }

    // Try to get from document.baseURI (production)
    try {
        const baseUri = new URL(document.baseURI);
        return baseUri.pathname;
    } catch (e) {
        console.warn('Failed to get base path from document.baseURI');
    }

    // Fallback to deployed path
    return '/ARCarpet/';
})();

function addBasePath(path) {
    // Don't modify absolute URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    // Clean up double slashes and ensure proper formatting
    const basePath = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${basePath}${cleanPath}`;
}

export async function loadCarpets() {
    try {
        const response = await fetch(`${BASE_PATH}data/carpets.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Add base path to all assets
        return data.map(carpet => ({
            ...carpet,
            glb: addBasePath(carpet.glb),
            usdz: addBasePath(carpet.usdz),
            thumbnail: addBasePath(carpet.thumbnail),
            gallery: carpet.gallery.map(img => addBasePath(img))
        }));
    } catch (error) {
        console.error('Failed to load carpets:', error);
        throw new Error('Could not load carpet data. Please try again later.');
    }
}
