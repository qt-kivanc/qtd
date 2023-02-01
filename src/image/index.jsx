import React, { Suspense, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import QTDContext from "../context/QTDContext.jsx";

const ImageWrapper = styled.img`
  user-select: none;
  `

const Image = (props) => {

  const { 
    theme, 
    brokenImage, 
    dummyTeamImage 
  } = useContext(QTDContext);

  const [show, SetShow] = useState(false);
  const [fallback, SetFallback] = useState("");
  const [properties, SetProperties] = useState({});
  const [hasError, SetHasError] = useState(false);

  useEffect( () => {
    
    load();
    
    return () => {
      
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src]);

  useEffect( () => {

    if ( !hasError )
      return;
    
    SetHasError(false);
    SetShow(false);
    load();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const load = () => {

    const p = Object.assign({}, props);
        p.src = props.src;
    
    if ( props.src.indexOf("undefined") > -1 ) {
      p.src = "";
    }

    if (props.fallback) {
      SetFallback(props.fallback);
      delete p.fallback;
    }

    SetProperties(p);

  }

  const onLoad = (e) => {
    
    if ( e.target.naturalWidth === 1 || e.target.naturalHeight === 1 ) {
      onError();
    }
    else {
      SetShow(true);
    }

  }

  const onError = (e) => {

    const p = Object.assign({}, props);
        p.src = ( fallback !== "" ) ? fallback : getFallbackImage();
      
    if ( props.brokenWidth ) {
      p.width = props.brokenWidth;
      delete p.brokenWidth;
    }

    if ( props.brokenHeight ) {
      p.height = props.brokenHeight;
      delete p.brokenHeight;
    }

    /*
    if ( Number(props.width) > 33 )
      p.width = "33";
      p.height = "33";
    */

    SetProperties(p);
    SetHasError(true);

  }

  const getProps = () => {
    
    const p = Object.assign({}, properties);
    
    if ( p.brokenWidth) delete p.brokenWidth;
    if ( p.brokenHeight) delete p.brokenHeight;

    return p;

  }

  const getFallbackImage = () => {
    
    let fallback = "";

    if ( props.type === "team") {
      fallback = dummyTeamImage
    }
    else {
      fallback = brokenImage
    }

    return fallback.replace("[[THEME]]", theme);

  }

  const Image = () => (

    <ImageWrapper 
      style = {{display: show ? 'null' : 'none'}}
      {...getProps()} 
      onLoad = {(e) => onLoad(e) } 
      onError = {(e) => onError(e) } 
      draggable = "false"
    />

  )

  return(
    
    <Suspense>
      <Image />
    </Suspense>

  );

}

export default React.memo(Image);