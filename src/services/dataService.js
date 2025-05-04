import { resolveAssetPath } from '../utils/pathUtils.js';

export async function loadCarpets() {
    try {
        const response = await fetch(resolveAssetPath('data/carpets.json'));
        if (!response.ok) {
            throw new Error(`Failed to load data: ${response.status}`);
        }

        const carpets = await response.json();

        // Process paths in the carpet data
        return carpets.map(carpet => ({
            ...carpet,
            glb: resolveAssetPath(carpet.glb),
            usdz: resolveAssetPath(carpet.usdz),
            thumbnail: resolveAssetPath(carpet.thumbnail),
            gallery: carpet.gallery.map(img => resolveAssetPath(img))
        }));
    } catch (error) {
        console.error('Data loading error:', error);
        throw new Error('Could not load carpet data. Please try again later.');
    }
}
