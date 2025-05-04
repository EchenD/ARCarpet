function getBasePath() {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const path = window.location.pathname;

    // GitHub Pages deployment
    if (isGitHubPages) {
        // Return full GitHub Pages path including /ARCarpet/public/
        return path.includes('ARCarpet') ? '/ARCarpet/public/' : '/public/';
    }

    // Local development
    return '/';
}

export function resolveAssetPath(path) {
    // Handle absolute URLs
    if (path.startsWith('http')) {
        return path;
    }

    // Remove leading slash
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const basePath = getBasePath();

    // For HTML pages, don't include public
    if (path.endsWith('.html')) {
        return `${basePath.replace('public/', '')}${cleanPath}`;
    }

    return `${basePath}${cleanPath}`;
}
