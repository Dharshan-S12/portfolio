export const isMobileDevice = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Check for mobile devices
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    
    // Check screen width
    const isSmallScreen = window.innerWidth <= 768;
    
    // Check for touch support
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    return mobileRegex.test(userAgent) || (isSmallScreen && hasTouchScreen);
};

export const isTabletDevice = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktopDevice = (): boolean => {
    return !isMobileDevice() && !isTabletDevice();
};

