import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1200px)',
    });
    const isScreenSmall = useMediaQuery({ query: '(max-width: 767px)' });
    const isTabletSmall = useMediaQuery({ query: '(max-width: 991px)' });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 567px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

    return { isDesktopOrLaptop, isTabletOrMobile, isRetina, isMobile, isPortrait, isTabletSmall, isScreenSmall };
};
