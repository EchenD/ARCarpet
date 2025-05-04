export function resolveAssetPath(path) {
    // Handle absolute URLs
    if (path.startsWith('http')) {
        return path;
    }

    // Remove leading slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Use Vite's base URL (import.meta.env.BASE_URL always ends with '/')
    const base = import.meta.env.BASE_URL || '/';

    return `${base}${cleanPath}`;
}
