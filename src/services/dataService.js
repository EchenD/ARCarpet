// Get base path from different sources with fallback
const BASE_PATH = (() => {
    // Try window.location first for most reliable path in production
    const pathname = window.location.pathname;
    // Check if we're in the project root or a subpage
    if (pathname.includes('ARCarpet')) {
        const basePath = pathname.split('/').slice(0, -1).join('/');
        return basePath || '/ARCarpet';
    }
    // Development fallback
    return import.meta.env?.BASE_URL || '/';
})();

function addBasePath(path) {
    // Don't modify absolute URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Clean the paths
    const basePath = BASE_PATH.endsWith('/') ? BASE_PATH : `${BASE_PATH}/`;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // For GitHub Pages, ensure we're using the correct domain
    if (window.location.hostname.includes('github.io')) {
        return `${window.location.origin}${basePath}${cleanPath}`;
    }

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
