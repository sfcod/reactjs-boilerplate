export function isRunningStandalone() {
    return Boolean(window.matchMedia('(display-mode: standalone)').matches || window.location.hash === '#:standalone:');
}
