import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import TinyScrollbar from '../../tinyscrollbar/index.jsx';

import s from './style.module.scss';

export default function Menu(props) {
  
  const nodeRef = useRef(null);

  const {
    value = [],
    children = null,
    onChange = null,
    isOpen = false,
    single = false,
    minWidth = 0
  } = props;

  const [selected, SetSelected] = useState([]);

  useEffect(() => {

    SetSelected(value);

  }, [value]);

  /**
   * 
   * Herhangi bir elemana tıklanıldığında çalışır ve elemanın
   * değerini bir üst sınıfa iletir. Bir üst sınıf geçerli değeri
   * değiştirir ve select menü tekrar açıldığında son değeri kayıtlı
   * eleman seçili görünür.
   * 
   * @param {*} value 
   * @param {*} event 
   */
  const handleChange = (value, checked, label) => {

    if ( single ) {
      
      const singleValue = [checked ? value : ""];
      
      SetSelected(singleValue);
      onChange(singleValue, label);

    }
    else {

      let _new = [];

      if ( checked ) {

        _new = [
          ...selected,
          ...[value]
        ];

      }
      else {

        selected.splice(selected.indexOf(value), 1);
        _new = [...selected];

      }

      SetSelected(_new);
      onChange(_new, label);

    }

  }

  const getBodyWrapperStyle = () => {

    return  children.length > 5
            ? s.bodyWrapperLong 
            : s.bodyWrapper;

  }

  const getMenuEnterActiveStyle = () => {

    return  children.length > 5
            ? s.menuEnterActiveLong 
            : s.menuEnterActive;

  }

  const getMenuExitActiveStyle = () => {

    return  children.length > 5
            ? s.menuExitActiveLong 
            : s.menuExitActive;

  }

  /**
   * 
   * Select açılır/kapanır menüsünü prop'larını belirleyerek
   * oluşturur.
   * 
   */
  const getContent = () => (

    <div 
      className={s.menu + " " + s.bottom + " " + s.left} 
      style={{width: minWidth === 0 ? 'max-content' : minWidth + 'px'}} 
      ref={nodeRef}
      >
      <div className={s.spacer} />
        <TinyScrollbar className={getBodyWrapperStyle()}>
          <ul>
            { 

              React.Children.map(children, child =>

                React.cloneElement(child, {
                  onChange: handleChange, 
                  checked: selected.indexOf(child.props.value) > -1,
                  key: child.props.value
                })

              )
                      
            }
          </ul>
        </TinyScrollbar>
    </div>

  );

  return (

    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames={{
        enter: s.menuEnter,
        enterActive: getMenuEnterActiveStyle(),
        exit: s.menuExit,
        exitActive: getMenuExitActiveStyle()
      }}
      nodeRef={nodeRef}
      unmountOnExit
    >

      { getContent() }
      
    </CSSTransition>

  )

}