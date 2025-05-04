export async function isARSupported() {
    // Check if WebXR is supported
    if ('xr' in navigator) {
        try {
            return await navigator.xr.isSessionSupported('immersive-ar');
        } catch (e) {
            console.warn('WebXR AR check failed:', e);
            return false;
        }
    }

    // Check if device is iOS for Quick Look support
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) return true;

    // Check if Android device with ARCore support
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid && 'googleDownloadableContents' in window) return true;

    return false;
}
