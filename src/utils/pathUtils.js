function getBasePath() {
    // Try to get from window location
    const path = window.location.pathname;
    // If we're on the project page
    if (path.includes('ARCarpet')) {
        return '/ARCarpet/';
    }
    // Local development
    return '/';
}

export function resolveAssetPath(path) {
    // Remove leading slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const basePath = getBasePath();

    // Handle absolute URLs
    if (path.startsWith('http')) {
        return path;
    }

    return `${basePath}${cleanPath}`;
}
