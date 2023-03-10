import React, { 
  forwardRef, useContext, useEffect, 
  useImperativeHandle, useRef, useState 
} from "react";
import { CSSTransition } from 'react-transition-group';
import moment from "moment";

import Calendar from "../calendar/index.jsx";
import Input from "../input/index.jsx";
import QTDContext from "../context/QTDContext.jsx";
import { Wrapper, CalendarWrapper, Icon, ModalEnter, ModalEnterActive, ModalExit, ModalExitActive } from './styled.components';
import useCreateStyledStyle from "../hooks/useCreateStyledStyle.js";

/*
https://stackoverflow.com/questions/41181372/chrome-mousedown-and-mouseup-events-no-longer-working-other-browsers-are-fine/41238807#41238807
*/
const DatePicker = forwardRef((props, ref) => {

  const { dateFormat, locale } = useContext(QTDContext);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const nodeRef = useRef(null);

  const {
    name = "datepicker",
    label = "",
    mask = null,
    disabled = false,
    defaultValue = {
      localizated: "",
      global: ""
    },
    onUpdate = null,
    onChange = null,
    disabledDate = null
  } = props;
  
  const [inputValue, SetInputValue] = useState("");
  const [enteredValue, SetEnteredValue] = useState(defaultValue);
  const [errorMessage, SetErrorMessage] = useState(null);
  const [isOpen, SetIsOpen] = useState(false);

  /**
   * Styled Components
   */
  const [clanderWrapperClass, SetClanderWrapperClass] = useState("");
  const [modalEnterClass, SetModalEnterClass] = useState("");
  const [modalEnterActiveClass, SetModalEnterActiveClass] = useState("");
  const [modalExitClass, SetModalExitClass] = useState("");
  const [modalExitActiveClass, SetModalExitActiveClass] = useState("");

  useCreateStyledStyle(CalendarWrapper, (id) => SetClanderWrapperClass(id));
  useCreateStyledStyle(ModalEnter, (id) => SetModalEnterClass(id));
  useCreateStyledStyle(ModalEnterActive, (id) => SetModalEnterActiveClass(id));
  useCreateStyledStyle(ModalExit, (id) => SetModalExitClass(id));
  useCreateStyledStyle(ModalExitActive, (id) => SetModalExitActiveClass(id));
  
  useEffect(() => {

    SetEnteredValue(defaultValue);

    return(() => {
      addRemoveListeners(false);
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    if ( inputRef.current ) {
      inputRef.current.setError(errorMessage === "" ? null : errorMessage);
    }

  }, [errorMessage]);

  useEffect(() => {

    addRemoveListeners(isOpen);

    return;
    if ( !isOpen ) {
      if ( !checkDateIsValid(enteredValue.localizated) ) {
        const date = {localizated: "", global: ""};
        inputRef.current.clear();
        SetEnteredValue(date);
        sendUpdates(date);
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
      SetErrorMessage(null);
      SetEnteredValue(defaultValue);
      sendUpdates(defaultValue, update, validation, true);
    },

    setValue(value, update = true, validation = true) {
      
      if ( enteredValue.global === value ) return;

      const date = {
        localizated: moment(new Date(value)).format(dateFormat),
        global: value
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
   * document objesine event listener ekler ve DatePicker d????ar??s??nda
   * herhangi bir alana t??klan??ld??????nda Select'in kapat??lmas??n?? veya 
   * kullan??c?? Input ??zerine focus ise kapanmamas??n?? sa??lar.
   * 
   */
  const addRemoveListeners = (value) => {

    let listener = value ? "addEventListener" : "removeEventListener";
    
    document[listener]("pointerdown", handleClickOutside);

  }

  /**
   * 
   * document objesi ??zerinde herhangi bir t??klama yap??ld??????nda
   * bunun ref ile belirti??imiz alan d??????nda bir yer olup
   * olmad??????n??n kontrol??n?? yapar. E??er d????ar?? t??klan??ld??ysa
   * Select'i kapat??r.
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
   * document objesi ??zerinde herhangi bir tu?? t??klamas?? yap??l??p
   * yap??lmad??????n?? kontrol eder. E??er Tab tu??una t??klan??ld??ysa
   * Calendar'?? kapat??r, aksi durumda a??ar.
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
  
    const isValid = checkDateIsValid(value);
    const emptyRegex = /[^/(.*?)]/g;
    const coreMask = mask.replace(emptyRegex, "_");
    
    const date = {
      localizated: value,
      global: moment(value, dateFormat, locale).format("YYYY-MM-DD")
    };

    SetErrorMessage(null);

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

  const getDatePicker = () => (

    <Wrapper disabled={disabled} ref={wrapperRef} onPointerDown={handleClick}>

      <Input 
        name={name}
        label={label}
        value={inputValue}
        mask={mask}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        message={errorMessage}
        keepFocus={isOpen}
        focusRef={wrapperRef}
        ref={inputRef}
        disabled={disabled}
        suffix={<Icon className={"qt-web-date"} />}
      />

      <CSSTransition
        in={isOpen}
        timeout={500}
        classNames={{
          enter: modalEnterClass,
          enterActive: modalEnterActiveClass,
          exit: modalExitClass,
          exitActive: modalExitActiveClass
        }}
        nodeRef={nodeRef}
        unmountOnExit
      >
  
        <Calendar 
          value={inputValue}
          defaultValue={inputValue}
          onChange={handleCalendarChange}
          disabledDate={disabledDate}
          className={clanderWrapperClass}
          ref={nodeRef}
        />
        
      </CSSTransition>

    </Wrapper>


    
  )

  return getDatePicker();

});

export default DatePicker;