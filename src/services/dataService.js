const BASE_PATH = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

function addBasePath(path) {
    // Don't modify absolute URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    // Remove leading slash if exists
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BASE_PATH}${cleanPath}`;
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
