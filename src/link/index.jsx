import React from "react";
import { Route } from "react-router-dom";
import { Link as Linked } from 'react-router-dom';

const Link = (props) => {

  const getStyle = (props, history) => {
    return  (props.className ? props.className : "")
            + " " 
            + (PathMatcher(props.href, history.location.pathname) 
                ? ( props.activeClass  ? props.activeClass : "active" ) 
                : "");
  }
    
  /*
  * Path'ın aynı olup olmadığını kontrol eder.
  * Örneğin bir tuşun path'i (/sports/1/country/1/tournament/17/) ise
  * fakat adres çubuğunda (/sports/1/country/1/tournament/17/match/11830252/)
  * yazıyorsa yine de kendi path'i içerisinde olduğunu anlar ve tuşa "active"
  * class'ı eklenmesi için true döner.
  *
  */
  const PathMatcher = (match, href) => {

    if ( match === "/" ) {
      return ( match === href ) ? true : false;
    }
    else {

      let matches = match.split("/");
      let exactLastPath = matches[matches.length-1].split("?")[0];

      let hrefs = href.split("/");
      let exactLastHrefPath = hrefs[hrefs.length-1].split("?")[0];

      return  exactLastPath === exactLastHrefPath 
              || 
              href.split(match + "/").length > 1;

      //return (href.split(match).length > 1);

    }

  }

  /*

    const PathMatcher = (match, href) => {

    if ( match === "/" ) {
      return ( match === href ) ? true : false;
    }
    else {

      let matches = match.split("/");
      let exactLastPath = matches[matches.length-1].split("?")[0];

      let hrefs = href.split("/");
      let exactLastHrefPath = hrefs[hrefs.length-1].split("?")[0];

      return  exactLastPath === exactLastHrefPath 
              || 
              href.split(match + "/").length > 1;

      //return (href.split(match).length > 1);

    }

  */

  /**
   * 
   * React Router ile çalışır. Eğer kullanıcı bulunduğu sayfaya
   * gitmek istiyorsa event durdurulur aksi durumda yeni sayfaya
   * yönlendirilir.
   * 
   * @param {*} event 
   * @param {*} history 
   */
  const handleClick = (event, history) => {

    if ( props.preventClick ) {
      event.preventDefault();
      return;
    }
    
    const currentHref = history.location.pathname + history.location.search;
    const targetHref = event.currentTarget.getAttribute("href");

    if ( currentHref === targetHref ) {
      event.preventDefault(); 
    }
    else {
      if ( !props.target || props.target === "_self" ) {
        //history.push(targetHref);
      }
      else {

      }
      //Pather( history, event.currentTarget.getAttribute("href") );
    }

  }

  const getLinked = (history) => (
    
    <Linked
      to = { props.href }
      onClick = { e => handleClick(e, history) }
      className = {getStyle(props, history)}
    >
      {props.children} 
    </Linked>

  );

  const getNaked = (history) => (
    <a 
      href={props.preventClick ? "#" : props.href} 
      className = {getStyle(props, history)} 
      target={props.target}
    >
      {props.children}
    </a>
  )

  const getRoute = () => (
  
    <Route path = {props.href} exact children = {
    
      ({ history }) => {

        let isRouteLink = ( !props.target || props.target === "_self" );

        return isRouteLink ? getLinked(history) : getNaked(history);
      
      }

    }/>

  )

  return getRoute();

}

export default Link;