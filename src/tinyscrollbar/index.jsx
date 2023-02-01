import React, {useEffect, useRef} from 'react';
import { useOverlayScrollbars } from "overlayscrollbars-react";
//import 'overlayscrollbars/overlayscrollbars.css';
import { Wrapper } from './styled.components.js';
import { ScrollWrapper } from './scroll.styled.js';

export default function TinyScrollbar({
  className = "",
  children = null
}) {

  const contentRef = useRef(null);
  const [initialize, instance] = useOverlayScrollbars({
    options: {
      paddingAbsolute: true,
      showNativeOverlaidScrollbars: false,
      overflow: {
        x: 'hidden',
        y: 'scroll',
      },
      scrollbars: { 
        theme: 'os-theme-dark',
        visibility: 'auto',
        autoHide: 'leave',
        autoHideDelay: 1300,
        dragScroll: true,
        clickScroll: true,
        pointers: ['mouse', 'touch', 'pen'] 
      }
    }, 
    events: {}, 
    defer: true
  });

  useEffect(() => {
    
    initialize(contentRef.current);

  }, [initialize]);

  return (

    <ScrollWrapper>
      <div
        ref={contentRef}
        className={className}
      >
      {
        children
      }
      </div>
    </ScrollWrapper>

  );

}