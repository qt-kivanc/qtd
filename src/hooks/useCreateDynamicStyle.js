import { useEffect } from "react";
import autoprefixer from 'autoprefixer';
import { nanoid } from 'nanoid';

var postcss = require("postcss");
var calc = require("postcss-calc");
var postcssNested = require("postcss-nested");

/**
 * 
 * 
 * 
 * @param {*} id 
 * @param {*} style 
 * @param {*} handler 
 */
const useCreateDynamicStyle = (style, handler, id = nanoid(11)) => {

  useEffect(() => {

    if ( !isEmpty() ) initialize();
    
    return (() => {
      let _class = getClass();

      if ( _class !== "" ) {
        _class.parentNode.removeChild(_class);
      }
    });

  }, []);

  const initialize = () => {

    injectStyles();
    handler("cs-" + id);

  }

  const isEmpty = () => Object.keys(style).length === 0;

  const getClass = () => {
    
    let _class = "";

    document.querySelectorAll('head > style').forEach(css => { 
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

  const getRules = (style) => {

    let rules = [];

    for ( var i in style ) {

      var styles =  JSON.stringify( style[i] )
                        .split("\",\"").join(";")
                        .replace(/"/g,"");

      styles  =   postcss()
                    .use(autoprefixer)
                    .use(postcssNested)
                    .use(calc())
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