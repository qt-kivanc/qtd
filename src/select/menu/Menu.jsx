import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { CSSTransition } from 'react-transition-group';

import TinyScrollbar from '../../tinyscrollbar/index.jsx';

import { Wrapper, BodyWrapper } from './styled.components';
import s from './style.module.scss';

export default function Menu(props) {
  
  const nodeRef = useRef(null);

  const {
    value = "",
    position = "bottom",
    direction = "right",
    mode = "single",
    children = null,
    onChange = null,
    onClose = null,
    isOpen = false
  } = props;

  const [positionType, SetPositionType] = useState("bottom");
  const [directionType, SetDirectionType] = useState("right");
  const [selected, SetSelected] = useState([]);
  //const [maxItemWidth, SetMaxItemWidth] = useState(0);

  useEffect(() => {

    SetSelected(Array.isArray(value) ? value : [value]);

  }, [value]);

  useEffect(() => {

    /**
     * 
     * Select yukarı doğru veya aşağı doğru açılabilir.
     * Eğer herhangi bir değer yollanmadıysa default olarak
     * aşağı doğru açılacaktır.
     * 
     */
     SetPositionType(position === "top" ? "top" : "bottom");

    /**
     * 
     * Select sağa dayalı veya sola dayalı görünebilir.
     * Eğer herhangi bir değer yollanmadıysa default olarak
     * sağa dayalı görünecektir.
     * 
     */
     SetDirectionType(direction === "right" ? "right" : "left");

  }, [position, direction]);

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

    if ( mode === "single" ) {
      
      if ( !checked ) {
        onClose();
        return;
      }

      SetSelected([value]);
      onChange(value);

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

  /**
   * 
   * Select açılır/kapanır menüsünü prop'larını belirleyerek
   * oluşturur.
   * 
   */
  const getContent = () => (

    <Wrapper 
      data-position={positionType} 
      data-direction={directionType} 
      ref={nodeRef}
      className="qtd-select-dropdown"
    >
      <BodyWrapper 
        className="qtd-select-dropdown-body"
        as={TinyScrollbar}
      >
        <ul>
          {

            React.Children.map(children, child =>

              React.cloneElement(child, {
                onChange: handleChange, 
                checked: selected.indexOf(child.props.value) > -1,
                mode: mode,
                key: v4()
              })

            )
                    
          }
        </ul>
      </BodyWrapper>
    </Wrapper>

  );

  return (

    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames={{
        enter: s.modalEnterClass,
        enterActive: s.modalEnterActiveClass,
        exit: s.modalExitClass,
        exitActive: s.modalExitActiveClass
      }}
      nodeRef={nodeRef}
      unmountOnExit
    >

      { getContent() }
      
    </CSSTransition>

  )

}