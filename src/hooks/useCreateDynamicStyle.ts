import { useEffect } from "react";
import autoprefixer from 'autoprefixer';
import { nanoid } from 'nanoid';

import postcss from "postcss";
import calc from "postcss-calc";
import postcssNested from "postcss-nested";

/**
 * 
 * 
 * 
 * @param {*} id 
 * @param {*} style 
 * @param {*} handler 
 */
const useCreateDynamicStyle = (
  style   : {},
  handler : (id: string) => void,
  id      : string = nanoid(11)
) => {

  useEffect(() => {

    if ( !isEmpty() ) initialize();
    
    return (() => {

      let _class: Element | string = getClass();

      if ( typeof _class !== "string" ) {
        if ( _class.parentNode ) {
          _class.parentNode.removeChild(_class);
        }
      }

    });

  }, []);

  const initialize = () => {

    injectStyles();
    handler("cs-" + id);

  }

  const isEmpty = () => Object.keys(style).length === 0;

  const getClass = (): Element | string => {
    
    let _class: Element | string = "";

    document.querySelectorAll('head > style').forEach((css:Element) => { 
      if ( css.id === id ) {
        _class = css;
      }
    });

    return _class;

  }

  const injectStyles = () => {

    let rules = getRules(style);
    
    var injectedStyles = document.createElement('style');
        injectedStyles.setAttribute('type', 'text/css');
        injectedStyles.setAttribute('id', id);
        injectedStyles.innerHTML = rules.join('');
    
    document.head.appendChild(injectedStyles);

  }

  const getRules = (style: {}) => {

    let rules: string[] = [];

    for ( var i in style ) {

      var styles =  JSON.stringify( style[i] )
                        .split("\",\"").join(";")
                        .replace(/"/g,"");

      styles  =   postcss()
                    .use(autoprefixer)
                    .use(postcssNested)
                    .use(calc({}))
                    .process(styles)
                    .css;

      var rule  = `.cs-${id} ${i} `;
          rule += styles;
          rule += ` `;
          
      rules.push(rule);

    }

    return rules;

  }

};

export default useCreateDynamicStyle;