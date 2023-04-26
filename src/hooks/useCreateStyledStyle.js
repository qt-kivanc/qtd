import { useEffect } from "react";
import autoprefixer from 'autoprefixer';
import { nanoid } from 'nanoid';

import FindSelector from "../helpers/css/FindSelector";

var postcss = require("postcss")
var calc = require("postcss-calc");
var postcssNested = require("postcss-nested");

/**
 * 
 * styled-component <> gibi kullanılmadığı zaman class içeriğini
 * yazmıyor. Bu kod bunu çözüyor. styled class'ının değerini id'si
 * ile birlikte alıp head'e kayıt ediyor ve component ekrandan
 * kaldırıldığında kendini siliyor.
 * 
 * @param {*} style 
 * @param {*} id 
 * @param {*} handler 
 */
const useCreateStyledStyle = (styled, handler = null) => {

  const style = styled.componentStyle.rules[0];
  let id = String(styled).replace(".", "");

  if ( handler ) id += "-" + nanoid(11);

  useEffect(() => {

    if ( FindSelector(id) ) return;
    injectStyles();
    if ( handler ) handler(id);

    return () => {

      document.querySelectorAll('head > style').forEach(css => { 
        if ( css.id === id ) {
          css.parentNode.removeChild(css);
        }
      });

    };

  }, [style]);

  const injectStyles = () => {

    let rules = getRules(style);
    
    var injectedStyles = document.createElement('style');
        injectedStyles.setAttribute('type', 'text/css');
        injectedStyles.setAttribute('id', id);
        injectedStyles.innerHTML = rules.length > 1 ? rules.join('') : rules[0];
    
    document.head.appendChild(injectedStyles);

  }

  const getRules = (style) => {

    let styles = style.replace(/\r?\n|\r/g, '');
        styles  = postcss()
                    .use(autoprefixer)
                    .use(postcssNested)
                    .use(calc())
                    .process(styles)
                    .css;

    let rules = [];

    /**
     * Çoklu style destekleme. hover, before vs gibi sınıfları
     * css olarak böler.
     */
    if ( styles.split("&").length > 1 ) {

      let _styles = styles.split("&");

      for ( var i = 0; i < _styles.length; i++ ) {
        if ( i === 0 ) {
          rules.push("." + id + "{" + _styles[0] + "}");
        }
        else {
          rules.push("." + id + _styles[i]);    
        }
      }

    }
    else {
      rules.push("." + id + " {" + styles + "} ");
    }
    
    return rules;
      
  }

};

export default useCreateStyledStyle;