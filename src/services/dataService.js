import { config } from '../config/config.js';

function resolvePath(path) {
    // Remove leading slash if exists
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Combine with base URL
    const baseUrl = config.baseUrl.endsWith('/') ? config.baseUrl : `${config.baseUrl}/`;
    return `${baseUrl}${cleanPath}`;
}

export async function loadCarpets() {
    try {
        // Use config to build the correct path
        const dataPath = resolvePath(`${config.paths.data}/carpets.json`);
        const response = await fetch(dataPath);

        if (!response.ok) {
            throw new Error(`Failed to load data: ${response.status}`);
        }

        const carpets = await response.json();

        // Process paths in the carpet data
        return carpets.map(carpet => ({
            ...carpet,
            glb: resolvePath(carpet.glb),
            usdz: resolvePath(carpet.usdz),
            thumbnail: resolvePath(carpet.thumbnail),
            gallery: carpet.gallery.map(img => resolvePath(img))
        }));
    } catch (error) {
        console.error('Data loading error:', error);
        throw new Error('Could not load carpet data. Please try again later.');
    }
}
