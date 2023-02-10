import {useIsSSR} from 'venom/aria/ssr';

const MOBILE_SCREEN_WIDTH = 700;

export function useIsMobileDevice(): boolean {
  let isSSR = useIsSSR();
  if (isSSR || typeof window === 'undefined') {
    return false;
  }

  return window.screen.width <= MOBILE_SCREEN_WIDTH;
}
