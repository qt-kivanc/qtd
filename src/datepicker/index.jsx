import React, { 
  forwardRef, useContext, useEffect, 
  useImperativeHandle, useRef, useState 
} from "react";
import { CSSTransition } from 'react-transition-group';
import moment from "moment";

import Calendar from "../calendar/index.jsx";
import Input from "../input/index.jsx";
import QTDContext from "../context/QTDContext.jsx";
import { 
  Wrapper, CalendarWrapper, Icon, 
  ModalEnter, ModalEnterActive, ModalExit, 
  ModalExitActive 
} from './styled.components';
import useCreateStyledStyle from "../hooks/useCreateStyledStyle.js";

/*
https://stackoverflow.com/questions/41181372/chrome-mousedown-and-mouseup-events-no-longer-working-other-browsers-are-fine/41238807#41238807
*/
const DatePicker = forwardRef((
  {
    name = "datepicker",
    placeholder = "",
    mask = "99/99/9999",
    size = "default",
    variant = "default",
    disabled = false,
    floating = true,
    className = "",
    defaultValue = {
      localizated: "",
      global: ""
    },
    onUpdate = null,
    onChange = null,
    disabledDate = null
  }, ref
) => {

  const { dateFormat, locale } = useContext(QTDContext);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const nodeRef = useRef(null);

  const [inputValue, SetInputValue] = useState("");
  const [enteredValue, SetEnteredValue] = useState(defaultValue);
  const [errorMessage, SetErrorMessage] = useState("");
  const [isOpen, SetIsOpen] = useState(false);

  /**
   * Styled Components
   */
  const [modalEnterClass, SetModalEnterClass] = useState("");
  const [modalEnterActiveClass, SetModalEnterActiveClass] = useState("");
  const [modalExitClass, SetModalExitClass] = useState("");
  const [modalExitActiveClass, SetModalExitActiveClass] = useState("");

  useCreateStyledStyle(ModalEnter, (id) => SetModalEnterClass(id));
  useCreateStyledStyle(ModalEnterActive, (id) => SetModalEnterActiveClass(id));
  useCreateStyledStyle(ModalExit, (id) => SetModalExitClass(id));
  useCreateStyledStyle(ModalExitActive, (id) => SetModalExitActiveClass(id));
  
  useEffect(() => {

    SetEnteredValue(defaultValue);

    return(() => {
      addRemoveListeners(false);
    })
    
  }, []);

  useEffect(() => {
    addRemoveListeners(isOpen);
  }, [isOpen]);

  useEffect(() => {

    if ( inputRef.current ) {
      inputRef.current.setError(errorMessage);
    }

  }, [errorMessage]);

  /**
   * 
   * Dil değiştirildiğinde seçili tarihin formatını değiştirir.
   * TR'de 03/06/2024 olan tarih, EN seçilirse 06/03/2024 olarak günceller.
   * 
   */
  useEffect(() => {

    if ( inputValue === "" ) {
      return;
    }

    SetEnteredValue({
      localizated : moment(enteredValue.global).format(dateFormat),
      global      : enteredValue.global
    });

    SetInputValue(moment(enteredValue.global).format(dateFormat));

  }, [locale]);

  const sendUpdates = (dateValue, update = true, validation = true, skipControl = false) => {

    if ( !skipControl ) {
      if ( dateValue.localizated === "" || dateValue.localizated === inputValue ) return;
    }

    const isValid = checkDateIsValid(dateValue.localizated);
    const value = isValid ? dateValue.global : "";

    SetInputValue(isValid ? dateValue.localizated : "");
    
    if ( onChange ) onChange(value);
    if ( onUpdate ) onUpdate(value, update, validation);

  }

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, () => ({

    reset(update = true, validation = true) {
      SetErrorMessage("");
      SetEnteredValue(defaultValue);
      sendUpdates(defaultValue, update, validation, true);
    },

    setValue(value, update = true, validation = true) {
      
      if ( enteredValue.global === value ) return;

      const date = {
        localizated : value,
        global      : moment(value, dateFormat, locale).format("YYYY-MM-DD")
      };
      
      SetEnteredValue(date);
      sendUpdates(date, update, validation);

    },

    getValue() {
      return enteredValue.localizated !== "" ? enteredValue.global : "";
    },

    setError(message) {
      SetErrorMessage(message);
    }

  }));
  
  /**
   * 
   * document objesine event listener ekler ve DatePicker dışarısında
   * herhangi bir alana tıklanıldığında Select'in kapatılmasını veya 
   * kullanıcı Input üzerine focus ise kapanmamasını sağlar.
   * 
   */
  const addRemoveListeners = (value) => {

    let listener = value ? "addEventListener" : "removeEventListener";
    
    document[listener]("pointerdown", handleClickOutside);

  }

  /**
   * 
   * document objesi üzerinde herhangi bir tıklama yapıldığında
   * bunun ref ile belirtiğimiz alan dışında bir yer olup
   * olmadığının kontrolünü yapar. Eğer dışarı tıklanıldıysa
   * Select'i kapatır.
   * 
   * @param {*} event Zorunlu event objesi. 
   * 
   */
  const handleClickOutside = (event) => {

    if ( !isOpen ) return;
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      SetIsOpen(false);
    }

  }

  /**
   * 
   * document objesi üzerinde herhangi bir tuş tıklaması yapılıp
   * yapılmadığını kontrol eder. Eğer Tab tuşuna tıklanıldıysa
   * Calendar'ı kapatır, aksi durumda açar.
   * 
   * @param {*} event Zorunlu event objesi. 
   * 
   */
  const handleKeyDown = (event) => {
    
    SetIsOpen(!(event.keyCode === 9 || event.keyCode === 27));

  }

  const handleFocus = (event) => {
   
    SetIsOpen(true);

  }

  const handleClick = (event) => {
   
    inputRef.current.setFocus();
    SetIsOpen(true);

  }

  const handleInputChange = (value) => {
  
    const isValid     = checkDateIsValid(value);
    const emptyRegex  = /[^/(.*?)]/g;
    const coreMask    = mask.replace(emptyRegex, "_");
    
    const date = {
      localizated : value,
      global      : moment(value, dateFormat, locale).format("YYYY-MM-DD")
    };

    SetErrorMessage("");

    if ( isValid ) {
      sendUpdates(date);
      SetEnteredValue(date);
    }
    else {
      if ( value === coreMask ) {
        if ( enteredValue.localizated !== "" ) {
          sendUpdates("");
          SetEnteredValue(defaultValue);
          
        }
      }
    }

  }

  const handleBlur = (event) => {

  }

  const handleCalendarChange = (date) => {
   
    SetIsOpen(false);
    SetEnteredValue(date);
    sendUpdates(date);

  }

  const checkDateIsValid = (value) => {

    let isValid = moment(value, dateFormat, locale, true).isValid();
    let isDisabledDate = false;

    if ( disabledDate )
      isDisabledDate = disabledDate(moment(value, dateFormat));

    return ( isValid && !isDisabledDate );

  }

  const getClassNames = () => {

    let names =   "qtd-date-picker";
        names +=  " ";
        names +=  "qtd-date-picker-" + size;
        names +=  " ";
        names +=  "qtd-date-picker-" + variant;

    if ( disabled )         names += " qtd-date-picker-disabled";
    if ( errorMessage )     names += " qtd-date-picker-error";
    if ( isOpen )           names += " qtd-date-picker-open";
    if ( className !== "" ) names += " " + className;

    return names;

  }

  const getDatePicker = () => (

    <Wrapper 
      className     = {getClassNames()} 
      $disabled     = {disabled} 
      ref           = {wrapperRef} 
      onPointerDown = {handleClick}
    >

      <Input 
        name        = {name}
        placeholder = {placeholder}
        value       = {inputValue}
        floating    = {floating}
        mask        = {mask}
        size        = {size}
        variant     = {variant}
        onChange    = {handleInputChange}
        onFocus     = {handleFocus}
        onKeyDown   = {handleKeyDown}
        onBlur      = {handleBlur}
        message     = {errorMessage}
        keepFocus   = {isOpen}
        focusRef    = {wrapperRef}
        ref         = {inputRef}
        disabled    = {disabled}
        suffix      = {<Icon className={"qtd-icon qt-web-date"} />}
      />

      <CSSTransition
        in          = {isOpen}
        timeout     = {500}
        nodeRef     = {nodeRef}
        classNames  = {{
          enter       : modalEnterClass,
          enterActive : modalEnterActiveClass,
          exit        : modalExitClass,
          exitActive  : modalExitActiveClass
        }}
        unmountOnExit
      >
  
        <CalendarWrapper 
          value         = {inputValue}
          defaultValue  = {inputValue}
          onChange      = {handleCalendarChange}
          disabledDate  = {disabledDate}
          ref           = {nodeRef}
        />
        
      </CSSTransition>

    </Wrapper>
    
  );

  return getDatePicker();

});

export default DatePicker;