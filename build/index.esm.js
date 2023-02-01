import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import React, { createContext, useEffect, useRef, useState, useContext, useCallback, forwardRef, useImperativeHandle, useLayoutEffect, Suspense, memo } from 'react';
import { v4 } from 'uuid';
import { createPortal } from 'react-dom';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { CSSTransition } from 'react-transition-group';
import autoprefixer from 'autoprefixer';
import { nanoid } from 'nanoid';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import styled, { css as css$8, keyframes } from 'styled-components';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { animated, useTransition } from 'react-spring';
import _extends from '@babel/runtime/helpers/extends';
import SimpleBar from 'simplebar-react';
import _typeof from '@babel/runtime/helpers/typeof';
import { useResolvedPath, useMatch, NavLink, useLocation, Route, Link as Link$2, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import moment from 'moment';
import axios from 'axios';
import InputMask from 'react-input-mask';
import NumberFormat from 'react-number-format';
import queryString from 'query-string';

var ModalContext = /*#__PURE__*/createContext();
ModalContext.displayName = "QTDContext";

function FindSelector(searchClassName) {
  var found = false;
  document.querySelectorAll('head > style').forEach(function (css) {
    Array(css.sheet.rules).forEach(function (rule) {
      for (var i = 0; i < rule.length; i++) {
        if (rule[i].cssText.search(searchClassName) > -1) {
          found = true;
        }
      }
    });
  });
  return found;
}

var postcss$1 = require("postcss");
var calc$1 = require("postcss-calc");
var postcssNested$1 = require("postcss-nested");

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
var useCreateStyledStyle = function useCreateStyledStyle(styled) {
  var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var style = styled.componentStyle.rules[0];
  var id = String(styled).replace(".", "");
  if (handler) id += "-" + nanoid(11);
  useEffect(function () {
    if (FindSelector(id)) return;
    injectStyles();
    if (handler) handler(id);
    return function () {
      document.querySelectorAll('head > style').forEach(function (css) {
        if (css.id === id) {
          css.parentNode.removeChild(css);
        }
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style]);
  var injectStyles = function injectStyles() {
    var rules = getRules(style);
    var injectedStyles = document.createElement('style');
    injectedStyles.setAttribute('type', 'text/css');
    injectedStyles.setAttribute('id', id);
    injectedStyles.innerHTML = rules.length > 1 ? rules.join('') : rules[0];
    document.head.appendChild(injectedStyles);
  };
  var getRules = function getRules(style) {
    var styles = style.replace(/\r?\n|\r/g, '');
    styles = postcss$1().use(autoprefixer).use(postcssNested$1).use(calc$1()).process(styles).css;
    var rules = [];

    // TODO: Burası sadece bir tane &: destekliyor. geliştirilmeli.
    if (styles.split("&").length > 1) {
      rules.push("." + id + styles.split("&")[1]);
      rules.push("." + id + "{" + styles.split("&")[0] + "}");
    } else {
      rules.push("." + id + " {" + styles + "} ");
    }
    return rules;
  };
};

/**
 * 
 * document objesine event listener ekler ve ref dışarısında
 * herhangi bir alana tıklanıldığında ref'in kapatılmasını sağlar.
 * 
 * @param {*} ref 
 * @param {*} handler 
 * 
 */
var useOnClickOutside = function useOnClickOutside(ref, handler) {
  useEffect(function () {
    var listener = function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("pointerdown", listener);
    return function () {
      document.removeEventListener("pointerdown", listener);
    };
  }, [ref, handler]);
};

/**
 * 
 * document objesine event listener ekler ve ESC tuşuna basıldığında
 * çağrılır.
 * 
 * @param {*} handler 
 * 
 */
var useOnESCKeyDown = function useOnESCKeyDown(handler) {
  useEffect(function () {
    var listener = function listener(event) {
      if (event.keyCode !== 27) {
        return;
      }
      handler(event);
    };
    document.addEventListener("keydown", listener);
    return function () {
      document.removeEventListener("keydown", listener);
    };
  }, [handler]);
};

var _templateObject$v, _templateObject2$o, _templateObject3$n, _templateObject4$l, _templateObject5$g;
var Wrapper$q = styled.div(_templateObject$v || (_templateObject$v = _taggedTemplateLiteral(["\n  \n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  \n  transform-origin: 50% 50%;\n  transform-box: fill-box;\n  transition-timing-function: cubic-bezier(0,1.25);\n\n  opacity: 1;\n\n  "])));
var ModalEnter$2 = styled.div(_templateObject2$o || (_templateObject2$o = _taggedTemplateLiteral(["\n  top: 55%;\n  opacity: 0;\n"])));
var ModalEnterActive$2 = styled.div(_templateObject3$n || (_templateObject3$n = _taggedTemplateLiteral(["\n  top: 50%;\n  opacity: 1;\n  transition: opacity 300ms, top 300ms;\n  transition-delay: .3s;\n"])));
var ModalExit$2 = styled.div(_templateObject4$l || (_templateObject4$l = _taggedTemplateLiteral(["\n  top: 50%;\n  opacity: 1;\n"])));
var ModalExitActive$2 = styled.div(_templateObject5$g || (_templateObject5$g = _taggedTemplateLiteral(["\n  top: 55%;\n  opacity: 0;\n  transition: opacity 300ms, top 300ms;\n"])));

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$a(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Modal(_ref) {
  var _this = this;
  var _ref$modalProps = _ref.modalProps,
    modalProps = _ref$modalProps === void 0 ? {
      closeWhenClickOutside: true,
      preventESC: false
    } : _ref$modalProps,
    _ref$Content = _ref.Content,
    Content = _ref$Content === void 0 ? null : _ref$Content,
    _ref$onShowModal = _ref.onShowModal,
    onShowModal = _ref$onShowModal === void 0 ? null : _ref$onShowModal,
    _ref$onRemoveModal = _ref.onRemoveModal,
    onRemoveModal = _ref$onRemoveModal === void 0 ? null : _ref$onRemoveModal;
  var contentRef = useRef(null);
  var nodeRef = useRef(null);
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    SetIsOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isShow = _useState4[0],
    SetIsShow = _useState4[1];

  /**
   * Styled Components
   */
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    modalEnterClass = _useState6[0],
    SetModalEnterClass = _useState6[1];
  var _useState7 = useState(""),
    _useState8 = _slicedToArray(_useState7, 2),
    modalEnterActiveClass = _useState8[0],
    SetModalEnterActiveClass = _useState8[1];
  var _useState9 = useState(""),
    _useState10 = _slicedToArray(_useState9, 2),
    modalExitClass = _useState10[0],
    SetModalExitClass = _useState10[1];
  var _useState11 = useState(""),
    _useState12 = _slicedToArray(_useState11, 2),
    modalExitActiveClass = _useState12[0],
    SetModalExitActiveClass = _useState12[1];
  useCreateStyledStyle(ModalEnter$2, function (id) {
    return SetModalEnterClass(id);
  });
  useCreateStyledStyle(ModalEnterActive$2, function (id) {
    return SetModalEnterActiveClass(id);
  });
  useCreateStyledStyle(ModalExit$2, function (id) {
    return SetModalExitClass(id);
  });
  useCreateStyledStyle(ModalExitActive$2, function (id) {
    return SetModalExitActiveClass(id);
  });

  /**
   * 
   * document objesine event listener ekler ve Modal dışarısında
   * herhangi bir alana tıklanıldığında Modal'ın kapatılmasını sağlar.
   * 
   */
  useEffect(function () {
    SetIsShow(isOpen);
    if (!isOpen) {
      onRemoveModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  useOnClickOutside(contentRef, function () {
    if (!modalProps.closeOutside) return;
    SetIsShow(false);
  });
  useOnESCKeyDown(function () {
    if (modalProps.preventESC) return;
    SetIsShow(false);
  });

  /**
   * 
   * @param {*} add 
   */
  /*
  const addRemoveListeners = (add = true) => {
     const listener = add ? "addEventListener" : "removeEventListener";
     document[listener]("keydown", handleESCKeyDown, true);
    
  }
  */

  /**
   * 
   * Promosyon modal'ı gibi bazı modal'lar ekranın
   * width'ini %100 kapladığından overlay tıklamasını
   * engelliyor bu yüzden modal dışına tıklanıldığında
   * modal kapanmıyor. Bu sorunu modal kendi çözüyor ve
   * dışarı tıklanıldığında bu fonksiyonu tetikliyor.
   * 
   * @param {*} event Zorunlu event objesi. 
   * 
   */
  var handleHideModal = function handleHideModal(event) {
    SetIsShow(false);
  };
  var handleEntered = function handleEntered() {};

  /*
  const handleESCKeyDown = () => {
    
  }
  */

  var handleExited = function handleExited() {
    SetIsOpen(false);
  };
  var getContent = function getContent() {
    if (!Content) return;
    return /*#__PURE__*/React.cloneElement(Content, {
      childProps: _objectSpread$a(_objectSpread$a({}, modalProps), {}, {
        onHideModal: handleHideModal.bind(_this),
        onShowModal: onShowModal.bind(_this)
      })
    });
  };
  var getModal = function getModal() {
    return /*#__PURE__*/React.createElement("div", {
      ref: contentRef
    }, /*#__PURE__*/React.createElement(CSSTransition, {
      in: isShow,
      timeout: 600,
      classNames: {
        enter: modalEnterClass,
        enterActive: modalEnterActiveClass,
        exit: modalExitClass,
        exitActive: modalExitActiveClass
      },
      nodeRef: nodeRef,
      unmountOnExit: true,
      onEntered: handleEntered,
      onExited: handleExited
    }, /*#__PURE__*/React.createElement(Wrapper$q, {
      ref: nodeRef
    }, getContent())));
  };
  return !isOpen ? null : getModal();
}

var _templateObject$u, _templateObject2$n, _templateObject3$m, _templateObject4$k;
var Wrapper$p = styled.div(_templateObject$u || (_templateObject$u = _taggedTemplateLiteral(["\n  \n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 4;\n\n  "])));
var Overlay = styled.div(_templateObject2$n || (_templateObject2$n = _taggedTemplateLiteral(["\n  \n  background: #000000BF;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  transition: opacity .25s ease-out;\n  opacity: 0;\n\n  ", "\n\n  "])), function (_ref) {
  var show = _ref.show;
  return show ? css$8(_templateObject3$m || (_templateObject3$m = _taggedTemplateLiteral(["\n        opacity: 1;\n      "]))) : css$8(_templateObject4$k || (_templateObject4$k = _taggedTemplateLiteral(["\n        opacity: 0;\n      "])));
});

var Container$3 = function Container(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? v4() : _ref$id,
    _ref$props = _ref.props,
    props = _ref$props === void 0 ? {} : _ref$props,
    _ref$Content = _ref.Content,
    Content = _ref$Content === void 0 ? null : _ref$Content;
  var root = document.getElementById('qtd-modal-root');
  var element = document.createElement('div');
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showOverlay = _useState2[0],
    SetShowOverlay = _useState2[1];
  var _useContext = useContext(ModalContext),
    showModal = _useContext.showModal,
    removeModal = _useContext.removeModal;
  useEffect(function () {
    root.appendChild(element);
    return function () {
      root.removeChild(element);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (Content !== null) {
      SetShowOverlay(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Content]);
  var handleShowModal = function handleShowModal(data) {
    showModal(data);
  };
  var handleRemoveModal = function handleRemoveModal() {
    SetShowOverlay(false);
    setTimeout(removeModal, 250);
  };
  var getModal = function getModal() {
    return /*#__PURE__*/React.createElement(Modal, {
      key: id,
      Content: Content,
      modalProps: props,
      onShowModal: handleShowModal,
      onRemoveModal: handleRemoveModal
    });
  };
  var getWrapper = function getWrapper() {
    return /*#__PURE__*/React.createElement(Wrapper$p, null, /*#__PURE__*/React.createElement(Overlay, {
      show: showOverlay
    }), getModal());
  };
  return /*#__PURE__*/createPortal(Content !== null ? getWrapper() : null, root);
};

var ModalProvider = function ModalProvider(_ref) {
  var children = _ref.children;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    modal = _useState2[0],
    SetModal = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isShow = _useState4[0],
    SetIsShow = _useState4[1];

  /**
   * 
   * 
   * 
   */
  var showModal = useCallback(function (_ref2) {
    var _ref2$Content = _ref2.Content,
      Content = _ref2$Content === void 0 ? null : _ref2$Content,
      _ref2$props = _ref2.props,
      props = _ref2$props === void 0 ? {} : _ref2$props;
    SetModal({
      id: v4(),
      Content: Content,
      props: props
    });
    SetIsShow(true);
  }, [SetModal]);

  /**
   * 
   * 
   * 
   */
  var removeModal = useCallback(function () {
    SetModal(null);
    SetIsShow(false);
  }, [SetModal]);
  return /*#__PURE__*/React.createElement(ModalContext.Provider, {
    value: {
      showModal: showModal,
      removeModal: removeModal,
      isShow: isShow
    }
  }, /*#__PURE__*/React.createElement(Container$3, modal), children);
};

/**
 * 
 * 
 * 
 * @returns 
 * 
 */
var useModal = function useModal() {
  return useContext(ModalContext);
};
var ModalManager = {};
ModalManager.useModal = useModal;

var _templateObject$t, _templateObject2$m, _templateObject3$l, _templateObject4$j, _templateObject5$f, _templateObject6$d, _templateObject7$9;
var getByType = function getByType(type) {
  if (type === "error") {
    return css$8(_templateObject$t || (_templateObject$t = _taggedTemplateLiteral(["\n      background: #870f0f;\n      ", " { color: #ffffff; }\n      ", " { color: #ffffffBF; }\n    "])), Title$2, Description);
  }
  if (type === "default" || type === "success") {
    return css$8(_templateObject2$m || (_templateObject2$m = _taggedTemplateLiteral(["\n      background: #0bab65;\n      ", " { color: #2b2b2b; }\n      ", " { color: #2b2b2bBF; }\n    "])), Title$2, Description);
  }
  if (type === "warning") {
    return css$8(_templateObject3$l || (_templateObject3$l = _taggedTemplateLiteral(["\n      background: #cfe10c;\n      ", " { color: #2b2b2b; }\n      ", " { color: #2b2b2bBF; }\n    "])), Title$2, Description);
  }
  return css$8(_templateObject4$j || (_templateObject4$j = _taggedTemplateLiteral(["\n    background: #870f0f;\n    ", " { color: #ffffff; }\n    ", " { color: #ffffffBF; }\n  "])), Title$2, Description);
};
var Wrapper$o = styled(animated.div)(_templateObject5$f || (_templateObject5$f = _taggedTemplateLiteral(["\n  \n  margin-bottom: 10px;\n  max-width: 300px;\n\n  font-size: 12px;\n  position: relative;\n  padding: 16px;\n  border-radius: 3px;\n  word-break: break-word;\n  cursor: pointer;\n  pointer-events: auto;\n\n  ", "\n\n  "])), function (_ref) {
  var type = _ref.type;
  return getByType(type);
});
var Title$2 = styled.div(_templateObject6$d || (_templateObject6$d = _taggedTemplateLiteral(["\n  \n  font-size: 13px;\n  font-weight: 600;\n\n  "])));
var Description = styled.div(_templateObject7$9 || (_templateObject7$9 = _taggedTemplateLiteral(["\n  \n  font-size: 12px;\n  font-weight: normal;\n\n  "])));

var Item$2 = function Item(_ref) {
  var id = _ref.id;
    _ref.children;
    var style = _ref.style,
    _ref$autoHide = _ref.autoHide,
    autoHide = _ref$autoHide === void 0 ? true : _ref$autoHide,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 3000 : _ref$delay,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "default" : _ref$type,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$description = _ref.description,
    description = _ref$description === void 0 ? "" : _ref$description,
    _ref$onRemove = _ref.onRemove,
    onRemove = _ref$onRemove === void 0 ? null : _ref$onRemove;
  useEffect(function () {
    var timer;
    if (autoHide) {
      timer = setTimeout(function () {
        onRemove(id);
      }, delay);
    }
    return function () {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  var removeMe = function removeMe() {
    onRemove(id);
  };
  return /*#__PURE__*/React.createElement(Wrapper$o, {
    type: type,
    style: style,
    onClick: removeMe
  }, /*#__PURE__*/React.createElement(Title$2, null, title), /*#__PURE__*/React.createElement(Description, null, description));
};

var _templateObject$s, _templateObject2$l, _templateObject3$k, _templateObject4$i, _templateObject5$e, _templateObject6$c;
var getByPosition = function getByPosition(position) {
  if (position === "topLeft") {
    return css$8(_templateObject$s || (_templateObject$s = _taggedTemplateLiteral(["\n      left: 0;\n      top: 0;\n    "])));
  }
  if (position === "topRight") {
    return css$8(_templateObject2$l || (_templateObject2$l = _taggedTemplateLiteral(["\n      right: 0;\n      top: 0;\n    "])));
  }
  if (position === "bottomRight") {
    return css$8(_templateObject3$k || (_templateObject3$k = _taggedTemplateLiteral(["\n      right: 0;\n      bottom: 0;\n    "])));
  }
  if (position === "bottomLeft") {
    return css$8(_templateObject4$i || (_templateObject4$i = _taggedTemplateLiteral(["\n      left: 0;\n      bottom: 0;\n    "])));
  }
  return css$8(_templateObject5$e || (_templateObject5$e = _taggedTemplateLiteral(["\n    left: 0;\n    top: 0;\n  "])));
};
var Wrapper$n = styled.div(_templateObject6$c || (_templateObject6$c = _taggedTemplateLiteral(["\n  \n  position: fixed;\n  overflow: hidden;\n  z-index: 6;\n  padding: 30px;\n  pointer-events: none;\n\n  ", "\n\n  "])), function (_ref) {
  var position = _ref.position;
  return getByPosition(position);
});

var Container$2 = function Container(_ref) {
  var notifications = _ref.notifications,
    onRemove = _ref.onRemove;
  var root = document.getElementById('qtd-notification-root');
  var element = document.createElement('div');
  useEffect(function () {
    root.appendChild(element);
    return function () {
      root.removeChild(element);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var topRight = {
    from: {
      right: "-150%"
    },
    enter: {
      right: "0%"
    },
    leave: {
      right: "-150%"
    }
  };
  var topLeft = {
    from: {
      left: "-150%"
    },
    enter: {
      left: "0%"
    },
    leave: {
      left: "-150%"
    }
  };
  var bottomRight = {
    from: {
      right: "-150%"
    },
    enter: {
      right: "0%"
    },
    leave: {
      right: "-150%"
    }
  };
  var bottomLeft = {
    from: {
      left: "-150%"
    },
    enter: {
      left: "0%"
    },
    leave: {
      left: "-150%"
    }
  };
  var topRightTransitions = useTransition(notifications.filter(function (n) {
    return n.placement === "topRight";
  }), topRight);
  var topLeftTransitions = useTransition(notifications.filter(function (n) {
    return n.placement === "topLeft";
  }), topLeft);
  var bottomRightTransitions = useTransition(notifications.filter(function (n) {
    return n.placement === "bottomRight";
  }), bottomRight);
  var bottomLeftTransitions = useTransition(notifications.filter(function (n) {
    return n.placement === "bottomLeft";
  }), bottomLeft);
  var getItem = function getItem(style, item) {
    return /*#__PURE__*/React.createElement(Item$2, {
      id: item.id,
      style: style,
      autoHide: item.autoHide,
      delay: item.delay,
      type: item.type,
      title: item.title,
      description: item.description,
      onRemove: onRemove
    });
  };
  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wrapper$n, {
    position: "topRight"
  }, topRightTransitions(getItem)), /*#__PURE__*/React.createElement(Wrapper$n, {
    position: "topLeft"
  }, topLeftTransitions(getItem)), /*#__PURE__*/React.createElement(Wrapper$n, {
    position: "bottomRight"
  }, bottomRightTransitions(getItem)), /*#__PURE__*/React.createElement(Wrapper$n, {
    position: "bottomLeft"
  }, bottomLeftTransitions(getItem))), root);
};

var NotificationContext = /*#__PURE__*/createContext(null);
NotificationContext.displayName = "NotificationContext";

var id = 1;
var NotificationProvider = function NotificationProvider(_ref) {
  var children = _ref.children;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    notifications = _useState2[0],
    setNotifications = _useState2[1];
  var addNotification = useCallback(function (_ref2) {
    var _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? "" : _ref2$title,
      _ref2$description = _ref2.description,
      description = _ref2$description === void 0 ? "" : _ref2$description,
      _ref2$placement = _ref2.placement,
      placement = _ref2$placement === void 0 ? "topRight" : _ref2$placement,
      _ref2$autoHide = _ref2.autoHide,
      autoHide = _ref2$autoHide === void 0 ? true : _ref2$autoHide,
      _ref2$delay = _ref2.delay,
      delay = _ref2$delay === void 0 ? 3000 : _ref2$delay,
      _ref2$type = _ref2.type,
      type = _ref2$type === void 0 ? "default" : _ref2$type;
    setNotifications(function (notifications) {
      return [].concat(_toConsumableArray(notifications), [{
        id: id++,
        title: title,
        description: description,
        placement: placement,
        autoHide: autoHide,
        delay: delay,
        type: type
      }]);
    });
  }, [setNotifications]);
  var removeNotification = useCallback(function (id) {
    setNotifications(function (notifications) {
      return notifications.filter(function (n) {
        return n.id !== id;
      });
    });
  }, [setNotifications]);
  return /*#__PURE__*/React.createElement(NotificationContext.Provider, {
    value: {
      addNotification: addNotification,
      removeNotification: removeNotification
    }
  }, /*#__PURE__*/React.createElement(Container$2, {
    notifications: notifications,
    onRemove: removeNotification
  }), children);
};
var useNotifications = function useNotifications() {
  var notificationHelpers = useContext(NotificationContext);
  return notificationHelpers;
};
var Notification = {};
Notification.useNotifications = useNotifications;

var _templateObject$r;
var Wrapper$m = styled.div(_templateObject$r || (_templateObject$r = _taggedTemplateLiteral(["\n  \n  position: fixed;\n  overflow: hidden;\n  z-index: 5;\n  pointer-events: none;\n\n  left: 0;\n  top: 0;\n\n  "])));

var Container$1 = function Container(_ref) {
  var tooltips = _ref.tooltips;
  var root = document.getElementById('qtd-tooltip-root');
  var element = document.createElement('div');
  useEffect(function () {
    root.appendChild(element);
    return function () {
      root.removeChild(element);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wrapper$m, null, tooltips.map(function (tooltip) {
    return /*#__PURE__*/React.cloneElement(tooltip.item, {
      key: tooltip.id
    });
  }))), root);
};

var _templateObject$q, _templateObject2$k, _templateObject3$j, _templateObject4$h, _templateObject5$d, _templateObject6$b;
var Wrapper$l = styled.div(_templateObject$q || (_templateObject$q = _taggedTemplateLiteral(["\n  \n  margin-bottom: 10px;\n  max-width: 300px;\n\n  font-size: 12px;\n  position: relative;\n  padding: 16px;\n  border-radius: 3px;\n  word-break: break-word;\n  cursor: pointer;\n  pointer-events: auto;\n\n  font-size: 13px;\n  font-weight: 600;\n\n  ", "\n\n  "])), function (_ref) {
  var status = _ref.status;
  return getByStatus$1(status);
});
var Title$1 = styled.div(_templateObject2$k || (_templateObject2$k = _taggedTemplateLiteral(["\n\n  "])));
var getByStatus$1 = function getByStatus(status) {
  if (status === "error") {
    return css$8(_templateObject3$j || (_templateObject3$j = _taggedTemplateLiteral(["\n      background: #870f0f;\n      ", " { color: #ffffff; }\n    "])), Title$1);
  }
  if (status === "default") {
    return css$8(_templateObject4$h || (_templateObject4$h = _taggedTemplateLiteral(["\n      background: #0bab65;\n      ", " { color: #2b2b2b; }\n    "])), Title$1);
  }
  if (status === "warning") {
    return css$8(_templateObject5$d || (_templateObject5$d = _taggedTemplateLiteral(["\n      background: #cfe10c;\n      ", " { color: #2b2b2b; }\n    "])), Title$1);
  }
  return css$8(_templateObject6$b || (_templateObject6$b = _taggedTemplateLiteral(["\n    background: #0bab65;\n    ", " { color: #2b2b2b; }\n  "])), Title$1);
};

var Item$1 = function Item(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "default" : _ref$type,
    _ref$ref = _ref.ref,
    ref = _ref$ref === void 0 ? null : _ref$ref;
  useEffect(function () {
    console.log(ref);
  });
  return /*#__PURE__*/React.createElement(Wrapper$l, {
    status: type
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Title$1, null, children)));
};

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$9(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TooltipContext = /*#__PURE__*/React.createContext(null);
var TooltipProvider = function TooltipProvider(_ref) {
  var children = _ref.children;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    tooltips = _useState2[0],
    setTooltips = _useState2[1];
  var addTooltip = useCallback(function (id, item) {
    setTooltips(function (tooltips) {
      return [].concat(_toConsumableArray(tooltips), [{
        id: id,
        item: item
      }]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTooltips]);
  var removeTooltip = useCallback(function (id) {
    setTooltips(function (tooltips) {
      return tooltips.filter(function (n) {
        return n.id !== id;
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTooltips]);
  return /*#__PURE__*/React.createElement(TooltipContext.Provider, {
    value: {
      addTooltip: addTooltip,
      removeTooltip: removeTooltip
    }
  }, /*#__PURE__*/React.createElement(Container$1, {
    tooltips: tooltips
  }), children);
};
var Tooltip = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
  var _ref2$children = _ref2.children,
    children = _ref2$children === void 0 ? null : _ref2$children,
    _ref2$title = _ref2.title,
    title = _ref2$title === void 0 ? "" : _ref2$title,
    _ref2$animation = _ref2.animation,
    animation = _ref2$animation === void 0 ? "pop" : _ref2$animation,
    _ref2$placement = _ref2.placement,
    placement = _ref2$placement === void 0 ? "topRight" : _ref2$placement,
    _ref2$type = _ref2.type,
    type = _ref2$type === void 0 ? "default" : _ref2$type;
  var _useContext = useContext(TooltipContext),
    addTooltip = _useContext.addTooltip;
  var id = v4();
  useEffect(function () {
    console.log(ref);
    console.log(children);
    var tooltip = /*#__PURE__*/React.createElement(Item$1, {
      type: type,
      placement: placement,
      animation: animation
    }, title);
    addTooltip(id, tooltip);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return React.Children.map(children, function (child) {
    return /*#__PURE__*/React.cloneElement(child, _objectSpread$9({}, child.props));
  });
});

var QTDContext = /*#__PURE__*/createContext();
QTDContext.displayName = "QTDContext";
var QTDProvider = function QTDProvider(_ref) {
  var children = _ref.children;
  var _useState = useState("dark"),
    _useState2 = _slicedToArray(_useState, 2),
    theme = _useState2[0],
    SetTheme = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    brokenImage = _useState4[0],
    SetBrokenImage = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    dummyTeamImage = _useState6[0],
    SetDummyTeamImage = _useState6[1];
  var _useState7 = useState(""),
    _useState8 = _slicedToArray(_useState7, 2),
    dateFormat = _useState8[0],
    SetDateFormat = _useState8[1];
  var _useState9 = useState("en"),
    _useState10 = _slicedToArray(_useState9, 2),
    locale = _useState10[0],
    SetLocale = _useState10[1];
  var changeTheme = function changeTheme(value) {
    SetTheme(value);
  };
  var changeBrokenImage = function changeBrokenImage(value) {
    SetBrokenImage(value);
  };
  var changeDummyTeamImage = function changeDummyTeamImage(value) {
    SetDummyTeamImage(value);
  };
  var changeDateFormat = function changeDateFormat(value) {
    SetDateFormat(value);
  };
  var changeLocale = function changeLocale(value) {
    SetLocale(value);
  };
  var value = {
    theme: theme,
    brokenImage: brokenImage,
    dummyTeamImage: dummyTeamImage,
    dateFormat: dateFormat,
    locale: locale,
    changeTheme: changeTheme,
    changeBrokenImage: changeBrokenImage,
    changeDummyTeamImage: changeDummyTeamImage,
    changeDateFormat: changeDateFormat,
    changeLocale: changeLocale
  };
  return /*#__PURE__*/React.createElement(QTDContext.Provider, {
    value: value
  }, /*#__PURE__*/React.createElement(NotificationProvider, null, /*#__PURE__*/React.createElement(TooltipProvider, null, /*#__PURE__*/React.createElement(ModalProvider, null, children))));
};

var _templateObject$p, _templateObject2$j, _templateObject3$i, _templateObject4$g, _templateObject5$c, _templateObject6$a, _templateObject7$8, _templateObject8$7, _templateObject9$5;
var Wrapper$k = styled.label(_templateObject$p || (_templateObject$p = _taggedTemplateLiteral(["\n\n  display: flex;\n  align-items: center;\n  position: relative;\n  \n  cursor: pointer;\n  user-select: none;\n  min-height: 20px;\n\n  input {\n    position: absolute;\n    opacity: 0;\n    cursor: pointer;\n    height: 0;\n    width: 0;\n  }\n\n"])));
var Label$4 = styled.div(_templateObject2$j || (_templateObject2$j = _taggedTemplateLiteral(["\n\n  padding-left: 27px;\n  min-height: 20px;\n\n  display: flex;\n  align-items: center;\n  position: relative;\n\n  span {\n\n    font-size: 12px;\n    font-weight: 400;\n    color: #ffffff99;\n    line-height: 1.2;\n\n    a {\n      color: #3396FB;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n\n  }\n\n"])));
var Checkmark$1 = styled.span(_templateObject3$i || (_templateObject3$i = _taggedTemplateLiteral(["\n\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 20px;\n  width: 20px;\n  border-radius: 6px;\n\n  ", "\n\n  ", "\n\n  //FIXME: Her ko\u015Fulda hover \xE7al\u0131\u015F\u0131yor. d\xFCzeltilmeli.\n  ", "\n\n"])), function (_ref) {
  var errorBorder = _ref.errorBorder;
  return errorBorder ? css$8(_templateObject4$g || (_templateObject4$g = _taggedTemplateLiteral(["\n        border: 1px solid #870f0f;\n      "]))) : css$8(_templateObject5$c || (_templateObject5$c = _taggedTemplateLiteral(["\n        border: 1px solid #505A7D80;\n      "])));
}, function (_ref2) {
  var isChecked = _ref2.isChecked;
  return isChecked && css$8(_templateObject6$a || (_templateObject6$a = _taggedTemplateLiteral(["\n      &::after { \n        animation: ", " 0.5s;\n        content: \"\";\n        position: absolute;\n        left: 7px;\n        top: 3px;\n        width: 5px;\n        height: 11px;\n        border: solid #2196F3;\n        border-width: 0 3px 3px 0;\n        transform: rotate(45deg);\n      }\n    "])), bounceAnimation);
}, function (_ref3) {
  var isChecked = _ref3.isChecked,
    errorBorder = _ref3.errorBorder;
  return !isChecked && !errorBorder && css$8(_templateObject7$8 || (_templateObject7$8 = _taggedTemplateLiteral(["\n      ", ":hover & {    \n        border: 1px solid #505A7D;\n      }\n    "])), Wrapper$k);
});
var ErrorTooltip = styled.span(_templateObject8$7 || (_templateObject8$7 = _taggedTemplateLiteral(["\n\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n\n  font-size: 12px;\n  line-height: 14px;\n\n  border-radius: 5px;\n  padding: 10px;\n  left: 0px;\n  bottom: 50px;\n  color: #ffffff;\n  background: #870f0f;\n  width: max-content;\n  max-width: 300px;\n  margin-bottom: 5px;\n\n  &::after {\n\n    content: \"\";\n    width: 0;\n    height: 0;\n    position: absolute;\n    bottom: -6px;\n    left: 3px;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n    border-top: 10px solid #870f0f;\n\n  }\n\n"])));
var bounceAnimation = keyframes(_templateObject9$5 || (_templateObject9$5 = _taggedTemplateLiteral(["\n  0% { transform: scale(.2) rotate(42deg);}\n  50% { transform: scale(1.3) rotate(48deg);}\n  75% { transform: scale(0.9) rotate(44deg);}\n  100% { transform: scale(1) rotate(45deg);}\n"])));

var Checkbox$1 = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? v4() : _ref$id,
    _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked;
    _ref.message;
    var _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$onUpdate = _ref.onUpdate,
    onUpdate = _ref$onUpdate === void 0 ? null : _ref$onUpdate,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var _useState = useState(checked),
    _useState2 = _slicedToArray(_useState, 2),
    isChecked = _useState2[0],
    SetIsChecked = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    errorMessage = _useState4[0],
    SetErrorMessage = _useState4[1];
  useEffect(function () {
    SetIsChecked(checked);
    sendUpdates(checked);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, function () {
    return {
      reset: function reset() {
        SetIsChecked(checked);
        sendUpdates(checked, true);
      },
      getValue: function getValue() {
        return isChecked;
      },
      setError: function setError(message) {
        SetErrorMessage(message);
      }
    };
  });
  var handleCheckboxChange = function handleCheckboxChange() {
    if (!isChecked) {
      SetErrorMessage(null);
    }
    SetIsChecked(!isChecked);
    sendUpdates(!isChecked);
  };
  var sendUpdates = function sendUpdates(value) {
    var skipValidation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (onChange) onChange(value, skipValidation);
    if (onUpdate) onUpdate(value, skipValidation);
  };
  var getErrorTooltip = function getErrorTooltip() {
    if (errorMessage === "" || !errorMessage) return;
    return /*#__PURE__*/React.createElement(ErrorTooltip, null, errorMessage);
  };
  var getCheckbox = function getCheckbox() {
    return /*#__PURE__*/React.createElement(Wrapper$k, null, /*#__PURE__*/React.createElement(Label$4, null, /*#__PURE__*/React.createElement(Checkmark$1, {
      errorBorder: errorMessage !== null,
      isChecked: isChecked,
      isNormal: !isChecked && errorMessage === null
    }), /*#__PURE__*/React.createElement("span", null, children)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
      id: id,
      type: "checkbox",
      checked: isChecked,
      value: isChecked,
      onChange: handleCheckboxChange,
      ref: ref
    })), getErrorTooltip());
  };
  return getCheckbox();
});

var _templateObject$o, _templateObject2$i, _templateObject3$h, _templateObject4$f, _templateObject5$b;
var Wrapper$j = styled.li(_templateObject$o || (_templateObject$o = _taggedTemplateLiteral(["\n\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  transition: border-color 0.2s ease-out;\n  min-width: max-content;\n  padding: 10px 15px;\n\n  img {\n    width: 20px;\n    height: 20px;\n    pointer-events: none;\n  }\n\n  span {\n    color: #ffffff;\n    font-weight: 400;\n    font-size: 12px;\n    line-height: 12px;\n    white-space: nowrap;\n  }\n\n  &:not(:last-child) {\n    margin-bottom: 1px;\n  }\n\n  &:hover {\n    background-color: #3598FE20;\n  }\n\n  ", "\n\n  "])), function (_ref) {
  var selected = _ref.selected;
  return selected && css$8(_templateObject2$i || (_templateObject2$i = _taggedTemplateLiteral(["\n      background-color: #3598FE20;\n    "])));
});

/* Eğer bu kısım olmazsa elemanların boyunu alamayız */
var ImageWrapper$1 = styled.div(_templateObject3$h || (_templateObject3$h = _taggedTemplateLiteral(["\n\n  width: 20px;\n  height: 20px;\n  margin-right: 7px;\n\n  "])));
var PreIcon$1 = styled.div(_templateObject4$f || (_templateObject4$f = _taggedTemplateLiteral(["\n\n  color: #ffffff;\n  margin-right: 7px;\n  font-size: 20px;\n\n  "])));
var Single = styled.div(_templateObject5$b || (_templateObject5$b = _taggedTemplateLiteral(["\n\n  width: 100%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n\n  "])));

var Option$2 = function Option(props) {
  var optionRef = useRef();
  var _props$icon = props.icon,
    icon = _props$icon === void 0 ? null : _props$icon,
    _props$image = props.image,
    image = _props$image === void 0 ? null : _props$image,
    _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    _props$mode = props.mode,
    mode = _props$mode === void 0 ? "single" : _props$mode,
    _props$checked = props.checked,
    checked = _props$checked === void 0 ? false : _props$checked,
    _props$onChangeWidth = props.onChangeWidth,
    onChangeWidth = _props$onChangeWidth === void 0 ? null : _props$onChangeWidth,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children;
  useLayoutEffect(function () {
    if (optionRef.current) onChangeWidth(optionRef.current.clientWidth);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var onButtonClick = function onButtonClick(event) {
    onChange(value, !checked, children);
    event.stopPropagation();
  };
  var getImage = function getImage() {
    if (image) {
      return /*#__PURE__*/React.createElement(ImageWrapper$1, null, /*#__PURE__*/React.createElement("img", {
        src: image,
        height: "20",
        alt: value
      }));
    }
    if (icon) {
      return /*#__PURE__*/React.createElement(ImageWrapper$1, null, /*#__PURE__*/React.createElement(PreIcon$1, {
        className: icon
      }));
    }
    return null;
  };
  var getChildren = function getChildren() {
    if (mode === "single") {
      return /*#__PURE__*/React.createElement(Single, null, getImage(), /*#__PURE__*/React.createElement("span", null, children));
    } else {
      return /*#__PURE__*/React.createElement(Checkbox$1, {
        checked: checked
      }, children);
    }
  };
  return /*#__PURE__*/React.createElement(Wrapper$j, {
    selected: checked,
    onClick: function onClick(e) {
      return onButtonClick(e);
    },
    ref: optionRef
  }, getChildren());
};
var Option$3 = /*#__PURE__*/React.memo(Option$2);

var _templateObject$n, _templateObject2$h, _templateObject3$g, _templateObject4$e, _templateObject5$a, _templateObject6$9, _templateObject7$7;
var Wrapper$i = styled.div(_templateObject$n || (_templateObject$n = _taggedTemplateLiteral(["\n  \n  transition: background-color 0.2s ease;\n  border-radius: 6px;\n  position: relative;\n  width: 100%;\n\n  "])));
var InputWrapper$1 = styled.input(_templateObject2$h || (_templateObject2$h = _taggedTemplateLiteral(["\n  \n  font-size: 13px;\n  color: #ffffffD9;\n  caret-color: #ffffffD9;\n\n  pointer-events: none;\n  visibility: hidden;\n  \n  width: 50%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n\n  "])));
var Label$3 = styled.div(_templateObject3$g || (_templateObject3$g = _taggedTemplateLiteral(["\n  \n  color: #ffffff;\n  font-weight: 400;\n  margin-right: 7px;\n  width: 100%;\n\n  ", "\n\n  "])), function (_ref) {
  var size = _ref.size;
  return getBySize$2(size);
});
var getBySize$2 = function getBySize(size) {
  if (size === "small") {
    return css$8(_templateObject4$e || (_templateObject4$e = _taggedTemplateLiteral(["\n        font-size: 12px;\n        line-height: 12px;\n      "])));
  }
  if (size === "medium") {
    return css$8(_templateObject5$a || (_templateObject5$a = _taggedTemplateLiteral(["\n        font-size: 13px;\n        line-height: 13px;\n      "])));
  }
  if (size === "large") {
    return css$8(_templateObject6$9 || (_templateObject6$9 = _taggedTemplateLiteral(["\n        font-size: 14px;\n        line-height: 14px;\n      "])));
  }
  return css$8(_templateObject7$7 || (_templateObject7$7 = _taggedTemplateLiteral(["\n      font-size: 12px;\n      line-height: 12px;\n    "])));
};

function SingleLabel(props) {
  var _props$label = props.label,
    label = _props$label === void 0 ? "" : _props$label,
    _props$size = props.size,
    size = _props$size === void 0 ? "small" : _props$size,
    _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    sizeStyle = _useState2[0],
    SetSizeStyle = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    labelValue = _useState4[0],
    SetLabelValue = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    labelTitle = _useState6[0],
    SetLabelTitle = _useState6[1];
  /*
  useEffect(() => {
     SetSizeStyle(size);
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */
  useEffect(function () {
    SetSizeStyle(size ? size : "");
  }, [size]);
  useEffect(function () {
    SetLabelTitle(label ? label : "");
  }, [label]);
  useEffect(function () {
    SetLabelValue(value ? value : "");
  }, [value]);
  var getInput = function getInput() {
    return /*#__PURE__*/React.createElement(Wrapper$i, null, /*#__PURE__*/React.createElement(Label$3, {
      size: sizeStyle
    }, labelTitle), /*#__PURE__*/React.createElement(InputWrapper$1, {
      value: labelValue,
      type: "text",
      disabled: true
    }));
  };
  return getInput();
}

var _templateObject$m, _templateObject2$g, _templateObject3$f, _templateObject4$d, _templateObject5$9, _templateObject6$8, _templateObject7$6, _templateObject8$6, _templateObject9$4, _templateObject10$4;
var getBySize$1 = function getBySize(size) {
  if (size === "small") {
    return css$8(_templateObject$m || (_templateObject$m = _taggedTemplateLiteral(["\n      font-size: 12px;\n    "])));
  }
  if (size === "medium") {
    return css$8(_templateObject2$g || (_templateObject2$g = _taggedTemplateLiteral(["\n      font-size: 13px;\n    "])));
  }
  if (size === "large") {
    return css$8(_templateObject3$f || (_templateObject3$f = _taggedTemplateLiteral(["\n      font-size: 14px;\n    "])));
  }
  return css$8(_templateObject4$d || (_templateObject4$d = _taggedTemplateLiteral(["\n    font-size: 12px;\n  "])));
};
var Wrapper$h = styled.div(_templateObject5$9 || (_templateObject5$9 = _taggedTemplateLiteral(["\n  \n  transition: background-color 0.2s ease;\n  border-radius: 6px;\n  position: relative;\n  width: 100%;\n\n  "])));
var InputWrapper = styled.input(_templateObject6$8 || (_templateObject6$8 = _taggedTemplateLiteral(["\n  \n  font-size: 13px;\n  color: #ffffffD9;\n  caret-color: #ffffffD9;\n\n  height: 46px;\n  padding-top: 13px;\n  \n  pointer-events: none;\n  visibility: hidden;\n\n  &::placeholder {\n    color: rgba(0, 0, 0, 0);\n  }\n\n  "])));
var InputLabel = styled.label(_templateObject7$6 || (_templateObject7$6 = _taggedTemplateLiteral(["\n  \n  display: block;\n  position: relative;\n  max-height: 0;\n  font-weight: 500;\n  pointer-events: none;\n\n  &::before {\n\n    color: #ffffff99;\n    content: attr(data-content);\n    display: inline-block;\n    filter: blur(0);\n    backface-visibility: hidden;\n    transform-origin: left top;\n    transition: transform 0.2s ease;\n    position: relative;\n\n  }\n\n  &::before {\n    transform: translate3d(0, -32px, 0) scale3d(.8, .8, 1);\n  }\n\n  ", "\n  /*\n  &::before + ", ":placeholder-shown {\n    transform: translate3d(0, -32px, 0) scale3d(.8, .8, 1);\n  }\n\n  &::before,\n  ", ":focus + &::before {\n    transform: translate3d(0, -40px, 0) scale3d(0.76, 0.76, 1);\n  }\n\n  ", ":focus + &::before {\n    color: #ffffff99;\n  }\n  */\n\n  "])), function (_ref) {
  var filled = _ref.filled;
  return filled && css$8(_templateObject8$6 || (_templateObject8$6 = _taggedTemplateLiteral(["\n      &::before {\n        transform: translate3d(0, -40px, 0) scale3d(0.76, 0.76, 1);\n      }\n    "])));
}, InputWrapper, InputWrapper, InputWrapper);
var HiddenVisually = styled.span(_templateObject9$4 || (_templateObject9$4 = _taggedTemplateLiteral(["\n  \n  border: 0;\n  clip: rect(1px 1px 1px 1px);\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n\n  "])));
var Label$2 = styled.div(_templateObject10$4 || (_templateObject10$4 = _taggedTemplateLiteral(["\n  \n  color: #ffffffD9;\n  position: absolute;\n  top: 20px;\n\n  ", "\n\n  "])), function (_ref2) {
  var size = _ref2.size;
  return getBySize$1(size);
});

function FloatingLabel(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? v4() : _ref$id,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "small" : _ref$size;
  var _useState = useState("small"),
    _useState2 = _slicedToArray(_useState, 2),
    sizeStyle = _useState2[0],
    SetSizeStyle = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    labelValue = _useState4[0],
    SetLabelValue = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    labelTitle = _useState6[0],
    SetLabelTitle = _useState6[1];
  var _useState7 = useState(""),
    _useState8 = _slicedToArray(_useState7, 2),
    placeholderValue = _useState8[0],
    SetPlaceholderValue = _useState8[1];
  useEffect(function () {}, []);
  useEffect(function () {
    SetSizeStyle(size);
  }, [size]);
  useEffect(function () {
    SetPlaceholderValue(placeholder ? placeholder : "");
  }, [placeholder]);
  useEffect(function () {
    SetLabelTitle(label ? label : "");
  }, [label]);
  useEffect(function () {
    SetLabelValue(value ? value : "");
  }, [value]);
  var getInput = function getInput() {
    return /*#__PURE__*/React.createElement(Wrapper$h, null, /*#__PURE__*/React.createElement(Label$2, {
      size: sizeStyle
    }, labelTitle), /*#__PURE__*/React.createElement(InputWrapper, {
      id: id,
      placeholder: placeholderValue,
      value: labelValue,
      type: "text",
      disabled: true
    }), /*#__PURE__*/React.createElement(InputLabel, {
      filled: value !== "",
      htmlFor: id,
      "data-content": placeholder
    }, /*#__PURE__*/React.createElement(HiddenVisually, null, placeholder)));
  };
  return getInput();
}

var _templateObject$l;
var ImageWrapper = styled.img(_templateObject$l || (_templateObject$l = _taggedTemplateLiteral(["\n  user-select: none;\n  "])));
var Image$1 = function Image(props) {
  var _useContext = useContext(QTDContext),
    theme = _useContext.theme,
    brokenImage = _useContext.brokenImage,
    dummyTeamImage = _useContext.dummyTeamImage;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    SetShow = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    fallback = _useState4[0],
    SetFallback = _useState4[1];
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    properties = _useState6[0],
    SetProperties = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    hasError = _useState8[0],
    SetHasError = _useState8[1];
  useEffect(function () {
    load();
    return function () {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src]);
  useEffect(function () {
    if (!hasError) return;
    SetHasError(false);
    SetShow(false);
    load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
  var load = function load() {
    var p = Object.assign({}, props);
    p.src = props.src;
    if (props.src.indexOf("undefined") > -1) {
      p.src = "";
    }
    if (props.fallback) {
      SetFallback(props.fallback);
      delete p.fallback;
    }
    SetProperties(p);
  };
  var _onLoad = function onLoad(e) {
    if (e.target.naturalWidth === 1 || e.target.naturalHeight === 1) {
      _onError();
    } else {
      SetShow(true);
    }
  };
  var _onError = function onError(e) {
    var p = Object.assign({}, props);
    p.src = fallback !== "" ? fallback : getFallbackImage();
    if (props.brokenWidth) {
      p.width = props.brokenWidth;
      delete p.brokenWidth;
    }
    if (props.brokenHeight) {
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
  };
  var getProps = function getProps() {
    var p = Object.assign({}, properties);
    if (p.brokenWidth) delete p.brokenWidth;
    if (p.brokenHeight) delete p.brokenHeight;
    return p;
  };
  var getFallbackImage = function getFallbackImage() {
    var fallback = "";
    if (props.type === "team") {
      fallback = dummyTeamImage;
    } else {
      fallback = brokenImage;
    }
    return fallback.replace("[[THEME]]", theme);
  };
  var Image = function Image() {
    return /*#__PURE__*/React.createElement(ImageWrapper, _extends({
      style: {
        display: show ? 'null' : 'none'
      }
    }, getProps(), {
      onLoad: function onLoad(e) {
        return _onLoad(e);
      },
      onError: function onError(e) {
        return _onError();
      },
      draggable: "false"
    }));
  };
  return /*#__PURE__*/React.createElement(Suspense, null, /*#__PURE__*/React.createElement(Image, null));
};
var CoreImage = /*#__PURE__*/React.memo(Image$1);

var Arrow$2 = function Arrow(_ref) {
  var className = _ref.className,
    height = _ref.height,
    width = _ref.width;
    _ref.fill;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    height: height,
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.5075141,7.26482597 L10.0020626,10.876 L6.49775146,7.26485211 C6.15510054,6.91172468 5.59959474,6.91172468 5.25696917,7.26482597 C4.91434361,7.61792727 4.91434361,8.19041759 5.25696917,8.54351889 L9.32424443,12.7351506 L9.41418874,12.8160742 C9.57141377,12.9391999 9.76312516,13.0030709 9.95778035,12.999885 L10.0020626,12.995 L9.930176,12.9899538 C10.2030835,13.032136 10.4818816,12.9403526 10.6809958,12.7351506 L14.748271,8.54351889 L14.8312049,8.44287094 C15.0885509,8.04584894 15.0443468,7.5699542 14.748271,7.26482597 C14.4056455,6.91172468 13.8501397,6.91172468 13.5075141,7.26482597 Z"
  }));
};

var _templateObject$k, _templateObject2$f, _templateObject3$e, _templateObject4$c, _templateObject5$8, _templateObject6$7, _templateObject7$5, _templateObject8$5, _templateObject9$3, _templateObject10$3, _templateObject11$2, _templateObject12$1, _templateObject13$1;
var Wrapper$g = styled.div(_templateObject$k || (_templateObject$k = _taggedTemplateLiteral(["\n  \n  display: flex;\n  align-items: center;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: border-color 0.2s ease-out;\n\n  img {\n    width: 20px;\n    height: 20px;\n    pointer-events: none;\n    margin-right: 7px;\n  }\n\n  ", "\n  ", "\n\n  "])), function (_ref) {
  var size = _ref.size;
  return getBySize(size);
}, function (_ref2) {
  var variant = _ref2.variant;
  return getByVariant(variant);
});
var Label$1 = styled.div(_templateObject2$f || (_templateObject2$f = _taggedTemplateLiteral(["\n  \n  display: flex;\n  flex-grow: 1;\n\n  "])));
var Icon$3 = styled.div(_templateObject3$e || (_templateObject3$e = _taggedTemplateLiteral(["\n  \n  transition: transform .25s ease-out;\n\n  ", "\n  \n  svg {\n      \n    width: 20px;\n    height: 20px;\n    fill: #ffffff;\n\n  }\n\n  "])), function (_ref3) {
  var open = _ref3.open;
  return open && css$8(_templateObject4$c || (_templateObject4$c = _taggedTemplateLiteral(["\n      transform: rotate(-180deg);\n    "])));
});
var PreIcon = styled.div(_templateObject5$8 || (_templateObject5$8 = _taggedTemplateLiteral(["\n  \n  color: #ffffff;\n  margin-right: 7px;\n  font-size: 20px;\n\n  "])));
var ErrorBorder = styled.div(_templateObject6$7 || (_templateObject6$7 = _taggedTemplateLiteral(["\n  \n  position: absolute;\n  border: 1px solid #870f0f;\n  width: 100%;\n  height: 100%;\n  border-radius: 6px;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n\n  "])));
var getBySize = function getBySize(size) {
  if (size === "small") {
    return css$8(_templateObject7$5 || (_templateObject7$5 = _taggedTemplateLiteral(["\n      height: 40px; \n      padding: 0 7px 0 12px;\n    "])));
  }
  if (size === "medium") {
    return css$8(_templateObject8$5 || (_templateObject8$5 = _taggedTemplateLiteral(["\n      height: 46px; \n      padding: 0 10px 0 15px;\n    "])));
  }
  if (size === "large") {
    return css$8(_templateObject9$3 || (_templateObject9$3 = _taggedTemplateLiteral(["\n      height: 50px; \n      padding: 0 10px 0 15px;\n    "])));
  }
  return css$8(_templateObject10$3 || (_templateObject10$3 = _taggedTemplateLiteral(["\n    height: 40px; \n    padding: 0 7px 0 12px;\n  "])));
};
var getByVariant = function getByVariant(variant) {
  if (variant === "filled") {
    return css$8(_templateObject11$2 || (_templateObject11$2 = _taggedTemplateLiteral(["\n      transition: background-color 0.2s ease;\n      background-color: #0E153180;\n\n      &:hover {\n        background-color: #0E1531BF;\n      }\n    "])));
  }
  if (variant === "inverted") {
    return css$8(_templateObject12$1 || (_templateObject12$1 = _taggedTemplateLiteral(["\n      border: 1px solid #505A7D99;\n\n    &:hover {\n      border-color: #3598FE;\n    }\n    "])));
  }
  return css$8(_templateObject13$1 || (_templateObject13$1 = _taggedTemplateLiteral(["\n    transition: background-color 0.2s ease;\n    background-color: #0E153180;\n\n    &:hover {\n      background-color: #0E1531BF;\n    }\n  "])));
};

function Toggle$2(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$errorMessage = _ref.errorMessage,
    errorMessage = _ref$errorMessage === void 0 ? "" : _ref$errorMessage,
    _ref$isOpen = _ref.isOpen,
    isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? null : _ref$placeholder,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? null : _ref$icon,
    _ref$image = _ref.image,
    image = _ref$image === void 0 ? null : _ref$image,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "medium" : _ref$size,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "filled" : _ref$variant;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    SetOpen = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    sizeStyle = _useState4[0],
    SetSizeStyle = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    variantStyle = _useState6[0],
    SetVariantStyle = _useState6[1];
  useEffect(function () {
    SetOpen(isOpen);
    SetVariantStyle(variant ? variant : "filled");
    SetSizeStyle(size ? size : "medium");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    SetOpen(isOpen);
  }, [isOpen]);

  /**
   * 
   * Select'e tıklanıldığın açar veya kapatır.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  var onButtonClick = function onButtonClick(event) {
    SetOpen(!open);
    onChange(!open);
  };
  var getIcon = function getIcon() {
    if (icon) return /*#__PURE__*/React.createElement(PreIcon, {
      className: icon
    });
    if (image) return /*#__PURE__*/React.createElement(CoreImage, {
      src: image,
      height: "20",
      brokenHeight: "20"
    });
    return null;
  };
  var getInput = function getInput() {
    return /*#__PURE__*/React.createElement(Label$1, null, placeholder ? /*#__PURE__*/React.createElement(FloatingLabel, {
      placeholder: placeholder,
      label: label,
      size: size,
      value: value
    }) : /*#__PURE__*/React.createElement(SingleLabel, {
      label: label,
      value: value,
      size: size
    }));
  };
  var getErrorBorder = function getErrorBorder() {
    if (errorMessage !== null) {
      return /*#__PURE__*/React.createElement(ErrorBorder, null);
    }
  };
  return /*#__PURE__*/React.createElement(Wrapper$g, {
    variant: variantStyle,
    size: sizeStyle,
    onClick: function onClick(e) {
      return onButtonClick();
    }
  }, getIcon(), getInput(), getErrorBorder(), /*#__PURE__*/React.createElement(Icon$3, {
    open: open
  }, /*#__PURE__*/React.createElement(Arrow$2, null)));
}

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$7 = "[data-simplebar]{align-content:flex-start;align-items:flex-start;flex-direction:column;flex-wrap:wrap;justify-content:flex-start;position:relative}.qtd__simplebarWrapper__be61d371{height:inherit;max-height:inherit;max-width:inherit;overflow:hidden;width:inherit}.qtd__simplebarMask__be61d371{direction:inherit;height:auto!important;overflow:hidden;width:auto!important;z-index:0}.qtd__simplebarMask__be61d371,.qtd__simplebarOffset__be61d371{bottom:0;left:0;margin:0;padding:0;position:absolute;right:0;top:0}.qtd__simplebarOffset__be61d371{-webkit-overflow-scrolling:touch;box-sizing:inherit!important;direction:inherit!important;resize:none!important;width:100%}.qtd__simplebarContentWrapper__be61d371{-ms-overflow-style:none;box-sizing:border-box!important;direction:inherit;display:block;height:100%;max-height:100%;max-width:100%;position:relative;scrollbar-width:none;width:auto}.qtd__simplebarContentWrapper__be61d371::-webkit-scrollbar,.qtd__simplebarHideScrollbar__be61d371::-webkit-scrollbar{height:0;width:0}.qtd__simplebarContent__be61d371:after,.qtd__simplebarContent__be61d371:before{content:\" \";display:table}.qtd__simplebarPlaceholder__be61d371{max-height:100%;max-width:100%;pointer-events:none;width:100%}.qtd__simplebarHeightAutoObserverWrapper__be61d371{box-sizing:inherit!important;flex-basis:0;flex-grow:inherit;flex-shrink:0;float:left;height:100%;margin:0;max-height:1px;max-width:1px;overflow:hidden;padding:0;pointer-events:none;position:relative;width:100%;z-index:-1}.qtd__simplebarHeightAutoObserver__be61d371{box-sizing:inherit;display:block;height:1000%;left:0;min-height:1px;min-width:1px;opacity:0;overflow:hidden;pointer-events:none;position:absolute;top:0;width:1000%;z-index:-1}.qtd__simplebarTrack__be61d371{bottom:0;overflow:hidden;pointer-events:none;position:absolute;right:0;z-index:1}[data-simplebar]\n.qtd__simplebarDragging__be61d371 .qtd__simplebarContent__be61d371{pointer-events:none;user-select:none;-webkit-user-select:none}[data-simplebar]\n.qtd__simplebarDragging__be61d371 .qtd__simplebarTrack__be61d371{pointer-events:all}.qtd__simplebarScrollbar__be61d371{left:0;min-height:10px;position:absolute;right:0}.qtd__simplebarScrollbar__be61d371:before{background:#3598fe;border-radius:7px;content:\"\";left:2px;opacity:0;position:absolute;right:2px;transition:opacity .2s linear}.qtd__simplebarScrollbar__be61d371.qtd__simplebarVisible__be61d371:before{opacity:.5;transition:opacity 0s linear}.qtd__simplebarTrack__be61d371.qtd__simplebarVertical__be61d371{right:3px;top:0;width:8px}.qtd__simplebarTrack__be61d371.qtd__simplebarVertical__be61d371 .qtd__simplebarScrollbar__be61d371:before{bottom:8px;top:8px}.qtd__simplebarTrack__be61d371.qtd__simplebarHorizontal__be61d371{height:11px;left:0}.qtd__simplebarTrack__be61d371.qtd__simplebarHorizontal__be61d371 .qtd__simplebarScrollbar__be61d371:before{height:100%;left:2px;right:2px}.qtd__simplebarTrack__be61d371.qtd__simplebarHorizontal__be61d371 .qtd__simplebarScrollbar__be61d371{height:7px;left:0;min-height:0;min-width:10px;right:auto;top:2px;width:auto}[data-simplebar-direction=rtl] .qtd__simplebarTrack__be61d371.qtd__simplebarVertical__be61d371{left:0;right:auto}.qtd__hsDummyScrollbarSize__be61d371{direction:rtl;height:500px;opacity:0;overflow-x:scroll;overflow-y:hidden;position:fixed;visibility:hidden;width:500px}.qtd__simplebarHideScrollbar__be61d371{-ms-overflow-style:none;left:0;overflow-y:scroll;position:fixed;scrollbar-width:none;visibility:hidden}";
var modules_02792f97$7 = {"simplebarWrapper":"qtd__simplebarWrapper__be61d371","simplebarMask":"qtd__simplebarMask__be61d371","simplebarOffset":"qtd__simplebarOffset__be61d371","simplebarContentWrapper":"qtd__simplebarContentWrapper__be61d371","simplebar-hide-scrollbar":"qtd__simplebarHideScrollbar__be61d371","simplebarContent":"qtd__simplebarContent__be61d371","simplebarPlaceholder":"qtd__simplebarPlaceholder__be61d371","simplebarHeightAutoObserverWrapper":"qtd__simplebarHeightAutoObserverWrapper__be61d371","simplebarHeightAutoObserver":"qtd__simplebarHeightAutoObserver__be61d371","simplebarTrack":"qtd__simplebarTrack__be61d371","simplebarDragging":"qtd__simplebarDragging__be61d371","simplebarScrollbar":"qtd__simplebarScrollbar__be61d371","simplebarVisible":"qtd__simplebarVisible__be61d371","simplebarVertical":"qtd__simplebarVertical__be61d371","simplebarHorizontal":"qtd__simplebarHorizontal__be61d371","hs-dummy-scrollbar-size":"qtd__hsDummyScrollbarSize__be61d371"};
n(css$7,{});

var _templateObject$j, _templateObject2$e, _templateObject3$d;
var SimplebarWrapper = styled.div(_templateObject$j || (_templateObject$j = _taggedTemplateLiteral(["\n\n  ", "\n\n  ", "\n\n  "])), function (_ref) {
  var $scrollbar = _ref.$scrollbar;
  return css$8(_templateObject2$e || (_templateObject2$e = _taggedTemplateLiteral(["\n      ", ":before {\n        background: #3598FE;\n        border-radius: 7px;\n      }\n    "])), "." + $scrollbar);
}, function (_ref2) {
  var $track = _ref2.$track,
    $vertical = _ref2.$vertical;
  return css$8(_templateObject3$d || (_templateObject3$d = _taggedTemplateLiteral(["\n      ", " {\n        width: 8px;\n      }\n    "])), "." + $track + "." + $vertical);
});

/**
 * 
 * DİKKAT!
 * 
 * Bu aslında hayli değiştirilmiş bir sınıftır.
 * 
 * SimpleBar sadece yarı yarıya CSS Modules destekliyor, bu yüzden bu sınıf
 * SimpleBar'ı sarması amacıyla yaratıldı. Tüm "/simplebar/dist/simplebar.css"
 * içeriği "style.module.scss" dosyasına CSS Modules şeklinde eklendi ve 
 * SimpleBar sınıfına "classNames" parametresi ile iletildi.
 * 
 * Aynı zamanda "style.module.scss" sınıfında bazı fixler yapıldı. İleride bu
 * sınıf güncellenirse bunlara dikkat edilmesi gerekiyor. "simplebarOffset" 
 * css sınıfına eklenen "width: 100%;" değeri hem Firefox hem de Chrome'daki
 * bir hatayı gidermek için eklendi. 
 * 
 * Ayrıca "simplebarScrollbar" css sınıfına renk değeri eklendi. CSS Modules
 * olduğu için bu değer önemli.
 * 
 * Sınıf hakkında ayrıntılı bilgi için şuraya bakılabilir:
 * @link https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react
 * 
 * Bu sınıf ayrıca mutlaka boyut bilgisini tanımlayan bir property değerini "className"
 * ismi ile kabul etmektedir. Bu değer yollanmazsa sınıf tamamiyle scroll etmeyen orjinal
 * yapısını koruyacak hale geri dönecektir.
 * 
 */
function SimpleScrollbar(props) {
  var ref = useRef();
  useEffect(function () {
    setTimeout(function () {
      ref.current.recalculate();
    }, 500);
  }, []);
  useEffect(function () {
    //console.log(ref.current);
    ref.current.recalculate();
    //console.log(ref.current.el);
  });

  return /*#__PURE__*/React.createElement(SimplebarWrapper, {
    scrollbar: modules_02792f97$7.simplebarScrollbar,
    track: modules_02792f97$7.simplebarTrack,
    vertical: modules_02792f97$7.simplebarVertical
  }, /*#__PURE__*/React.createElement(SimpleBar, {
    ref: ref,
    forceVisible: "y",
    timeout: 1000,
    scrollbarMinSize: 50,
    className: props.className,
    classNames: {
      contentEl: modules_02792f97$7.simplebarContent,
      contentWrapper: modules_02792f97$7.simplebarContentWrapper,
      offset: modules_02792f97$7.simplebarOffset,
      mask: modules_02792f97$7.simplebarMask,
      wrapper: modules_02792f97$7.simplebarWrapper,
      placeholder: modules_02792f97$7.simplebarPlaceholder,
      scrollbar: modules_02792f97$7.simplebarScrollbar,
      track: modules_02792f97$7.simplebarTrack,
      heightAutoObserverWrapperEl: modules_02792f97$7.simplebarHeightAutoObserverWrapper,
      heightAutoObserverEl: modules_02792f97$7.simplebarHeightAutoObserver,
      visible: modules_02792f97$7.simplebarVisible,
      horizontal: modules_02792f97$7.simplebarHorizontal,
      vertical: modules_02792f97$7.simplebarVertical,
      hover: modules_02792f97$7.simplebarHover,
      dragging: modules_02792f97$7.simplebarDragging
    }
  }, props.children));
}

var _templateObject$i, _templateObject2$d, _templateObject3$c, _templateObject4$b, _templateObject5$7, _templateObject6$6, _templateObject7$4, _templateObject8$4, _templateObject9$2, _templateObject10$2;
var Wrapper$f = styled.div(_templateObject$i || (_templateObject$i = _taggedTemplateLiteral(["\n  \n  min-width: 100%;\n  background-color: #1D2649;\n  border-radius: 5px;\n  overflow: hidden;\n  position: absolute;\n  z-index: 2;\n  box-shadow: 0 0 10px rgba(0,0,0,.25);\n\n  transform-origin: 50% 1%;\n  transform-box: fill-box;\n  transition-timing-function: cubic-bezier(.75,-0.5,0,1.25);\n  \n  ul {\n\n    min-width: max-content;\n\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  "])), function (_ref) {
  var position = _ref.position;
  return position === "bottom" && css$8(_templateObject2$d || (_templateObject2$d = _taggedTemplateLiteral(["\n      top: calc(100% + 10px);\n    "])));
}, function (_ref2) {
  var position = _ref2.position;
  return position === "top" && css$8(_templateObject3$c || (_templateObject3$c = _taggedTemplateLiteral(["\n      bottom: calc(100% + 10px);\n    "])));
}, function (_ref3) {
  var direction = _ref3.direction;
  return direction === "left" && css$8(_templateObject4$b || (_templateObject4$b = _taggedTemplateLiteral(["\n      left: 0;\n    "])));
}, function (_ref4) {
  var direction = _ref4.direction;
  return direction === "right" && css$8(_templateObject5$7 || (_templateObject5$7 = _taggedTemplateLiteral(["\n      right: 0;\n    "])));
});
var BodyWrapper = styled.div(_templateObject6$6 || (_templateObject6$6 = _taggedTemplateLiteral(["\n  max-height: 400px;\n"])));
var ModalEnter$1 = styled.div(_templateObject7$4 || (_templateObject7$4 = _taggedTemplateLiteral(["\n  opacity: 0;\n  transform: translateY(-10px);\n"])));
var ModalEnterActive$1 = styled.div(_templateObject8$4 || (_templateObject8$4 = _taggedTemplateLiteral(["\n  opacity: 1;\n  transform: translateY(0);\n  transition: opacity 250ms, transform 250ms;\n"])));
var ModalExit$1 = styled.div(_templateObject9$2 || (_templateObject9$2 = _taggedTemplateLiteral(["\n  opacity: 1;\n"])));
var ModalExitActive$1 = styled.div(_templateObject10$2 || (_templateObject10$2 = _taggedTemplateLiteral(["\n  opacity: 0;\n  transform: translateY(-10px) ;\n  transition: opacity 250ms, transform 250ms;\n"])));

function Menu$2(props) {
  var nodeRef = useRef(null);
  var _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    _props$position = props.position,
    position = _props$position === void 0 ? "bottom" : _props$position,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? "right" : _props$direction,
    _props$mode = props.mode,
    mode = _props$mode === void 0 ? "single" : _props$mode,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$onClose = props.onClose,
    onClose = _props$onClose === void 0 ? null : _props$onClose,
    _props$isOpen = props.isOpen,
    isOpen = _props$isOpen === void 0 ? false : _props$isOpen;
  var _useState = useState("bottom"),
    _useState2 = _slicedToArray(_useState, 2),
    positionType = _useState2[0],
    SetPositionType = _useState2[1];
  var _useState3 = useState("right"),
    _useState4 = _slicedToArray(_useState3, 2),
    directionType = _useState4[0],
    SetDirectionType = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    selected = _useState6[0],
    SetSelected = _useState6[1];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    maxItemWidth = _useState8[0],
    SetMaxItemWidth = _useState8[1];

  /**
   * Styled Components
   */
  var _useState9 = useState(""),
    _useState10 = _slicedToArray(_useState9, 2),
    modalEnterClass = _useState10[0],
    SetModalEnterClass = _useState10[1];
  var _useState11 = useState(""),
    _useState12 = _slicedToArray(_useState11, 2),
    modalEnterActiveClass = _useState12[0],
    SetModalEnterActiveClass = _useState12[1];
  var _useState13 = useState(""),
    _useState14 = _slicedToArray(_useState13, 2),
    modalExitClass = _useState14[0],
    SetModalExitClass = _useState14[1];
  var _useState15 = useState(""),
    _useState16 = _slicedToArray(_useState15, 2),
    modalExitActiveClass = _useState16[0],
    SetModalExitActiveClass = _useState16[1];
  useCreateStyledStyle(ModalEnter$1, function (id) {
    return SetModalEnterClass(id);
  });
  useCreateStyledStyle(ModalEnterActive$1, function (id) {
    return SetModalEnterActiveClass(id);
  });
  useCreateStyledStyle(ModalExit$1, function (id) {
    return SetModalExitClass(id);
  });
  useCreateStyledStyle(ModalExitActive$1, function (id) {
    return SetModalExitActiveClass(id);
  });
  useEffect(function () {
    SetSelected(Array.isArray(value) ? value : [value]);
  }, [value]);
  useEffect(function () {
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
   * FloatingScrollbar sınıfının kullandığı SimpleBar sınıfında bir bug var ve
   * genişliği tamamen hatalı alıyor. Bu fonksiyon alt elemanlardan gelen tüm
   * genişlikliklere bakıyor ve en geniş elemanın genişliğini baz alarak kayıt 
   * ediyor. Wrapper sınıfında da bunu işleyen bir yapı ile Select'in genişliğini
   * olması gerektiği yere çekiyor. 
   * 
   * Menu ve Option 
   * sınıflarının içerisindeki bazı "min-width: max-content;" gibi kodlar da elemanların
   * kendi genişliklerini alabilmesi için önemli css değerleri. Bunlar değiştirilecekse 
   * çok dikkatli olunmalı yoksa Select'in işleyişini bozabilir.
   * 
   * @param {*} width 
   */
  var handleChangeWidth = function handleChangeWidth(width) {
    if (width > maxItemWidth) SetMaxItemWidth(width);
  };

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
  var handleChange = function handleChange(value, checked, label) {
    if (mode === "single") {
      if (!checked) {
        onClose();
        return;
      }
      SetSelected([value]);
      onChange(value);
    } else {
      var _new = [];
      if (checked) {
        _new = [].concat(_toConsumableArray(selected), [value]);
      } else {
        selected.splice(selected.indexOf(value), 1);
        _new = _toConsumableArray(selected);
      }
      SetSelected(_new);
      onChange(_new, label);
    }
  };

  /**
   * 
   * Select açılır/kapanır menüsünü prop'larını belirleyerek
   * oluşturur.
   * 
   */
  var getContent = function getContent() {
    return /*#__PURE__*/React.createElement(Wrapper$f, {
      position: positionType,
      direction: directionType,
      style: {
        width: maxItemWidth
      },
      ref: nodeRef
    }, /*#__PURE__*/React.createElement(BodyWrapper, {
      as: SimpleScrollbar
    }, /*#__PURE__*/React.createElement("ul", null, React.Children.map(children, function (child) {
      return /*#__PURE__*/React.cloneElement(child, {
        onChange: handleChange,
        onChangeWidth: handleChangeWidth,
        checked: selected.indexOf(child.props.value) > -1,
        mode: mode,
        key: v4()
      });
    }))));
  };
  return /*#__PURE__*/React.createElement(CSSTransition, {
    in: isOpen,
    timeout: 500,
    classNames: {
      enter: modalEnterClass,
      enterActive: modalEnterActiveClass,
      exit: modalExitClass,
      exitActive: modalExitActiveClass
    },
    nodeRef: nodeRef,
    unmountOnExit: true
  }, getContent());
}

var _templateObject$h, _templateObject2$c;
var Wrapper$e = styled.div(_templateObject$h || (_templateObject$h = _taggedTemplateLiteral(["\n\n  position: relative;\n\n  ", "\n\n  "])), function (_ref) {
  var disabled = _ref.disabled;
  return disabled && css$8(_templateObject2$c || (_templateObject2$c = _taggedTemplateLiteral(["\n      opacity: .75;\n      cursor: not-allowed;\n      pointer-events: none;\n    "])));
});

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$8(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Select$1 = /*#__PURE__*/forwardRef(function (props, ref) {
  var wrapperRef = useRef(null);
  var _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? "" : _props$defaultValue,
    _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    _props$position = props.position,
    position = _props$position === void 0 ? "" : _props$position,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? "" : _props$direction,
    _props$mode = props.mode,
    mode = _props$mode === void 0 ? "single" : _props$mode,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$onUpdate = props.onUpdate,
    onUpdate = _props$onUpdate === void 0 ? null : _props$onUpdate;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    SetIsOpen = _useState2[1];
  var _useState3 = useState(mode === "single" ? "" : []),
    _useState4 = _slicedToArray(_useState3, 2),
    currentValue = _useState4[0],
    SetCurrentValue = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    errorMessage = _useState6[0],
    SetErrorMessage = _useState6[1];
  useEffect(function () {
    checkAndSetNewValue(defaultValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    checkAndSetNewValue(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, children]);
  var checkAndSetNewValue = function checkAndSetNewValue(value) {
    if (mode === "single") {
      SetCurrentValue(value);
    } else {
      SetCurrentValue(value);
    }
  };
  useOnClickOutside(wrapperRef, function () {
    SetIsOpen(false);
  });

  /**
   * 
   * Toogle sınıfında Select'in açık veya kapalı
   * durumu değiştiyse tetiklenir.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  var onHandleToggleChange = function onHandleToggleChange(open) {
    SetIsOpen(open);
  };
  var sendOnChange = function sendOnChange(value) {
    if (onChange) {
      onChange(value);
    } else if (!onChange && !onUpdate) {
      console.warn("Select: 'onChange' method couldn't be called because it is not defined!");
    }
  };
  var sendOnUpdate = function sendOnUpdate(value) {
    var skipValidation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (onUpdate) {
      onUpdate(value, skipValidation);
    }
  };

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, function () {
    return {
      reset: function reset() {
        SetCurrentValue(defaultValue);
        sendOnChange(defaultValue);
        sendOnUpdate(defaultValue, true);
      },
      setValue: function setValue(value) {
        SetCurrentValue(value);
        sendOnChange(value);
        sendOnUpdate(value);
      },
      getValue: function getValue() {
        return currentValue;
      },
      setError: function setError(message) {
        SetErrorMessage(message);
      }
    };
  });
  var onHandleClose = function onHandleClose() {
    SetIsOpen(false);
  };

  /**
   * 
   * (Eğer `mode === single` ise; Select içerisindeki herhangi 
   * bir elemana tıklanıldığında tetiklenir ve elemanın değerini
   * dinleyici sınıfa iletip Select'i kapatır.
   * 
   * `mode === multi` ise; En son eklenen elemanın değerini current
   * değer olarak tanımlar.
   * 
   */
  var onHandleChange = function onHandleChange(value) {
    SetErrorMessage(null);
    sendOnChange(value);
    sendOnUpdate(value);
    if (mode === "single") {
      SetCurrentValue(value);
      SetIsOpen(false);
    } else {
      var v = value[value.length - 1];
      SetCurrentValue(v ? v : []);
    }
  };
  var getOptions = function getOptions() {
    return React.Children.map(children, function (child) {
      if (child.type === Option$3) {
        return /*#__PURE__*/React.cloneElement(child, _objectSpread$8(_objectSpread$8({}, child.props), {}, {
          onChange: onHandleChange
        }));
      }
    });
  };
  return /*#__PURE__*/React.createElement(Wrapper$e, {
    disabled: disabled,
    ref: wrapperRef
  }, /*#__PURE__*/React.createElement(Toggle$2, _objectSpread$8(_objectSpread$8({}, props), {}, {
    value: currentValue,
    onChange: onHandleToggleChange,
    isOpen: isOpen,
    errorMessage: errorMessage
  })), /*#__PURE__*/React.createElement(Menu$2, {
    onClose: onHandleClose,
    onChange: onHandleChange,
    value: currentValue,
    position: position,
    direction: direction,
    isOpen: isOpen,
    mode: mode
  }, getOptions()));
});
Select$1.Option = Option$3;

var Checkmark = function Checkmark(_ref) {
  var className = _ref.className,
    height = _ref.height,
    width = _ref.width;
    _ref.fill;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    height: height,
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.23414885,20 C6.61457659,20 6.02393992,19.722943 5.61844589,19.2381945 L0.512159937,13.1296111 C-0.252485941,12.2146448 -0.149120286,10.8375884 0.743192631,10.0535303 C1.63510994,9.26860293 2.97801573,9.37459276 3.74356585,10.2900226 L7.08178482,14.2832718 L17.632259,1.23794707 C19.2654251,-1.10773692 20.9747731,0.191203411 19.3343732,2.54691269 L8.96519861,19.0863086 C8.58479718,19.6321359 7.98093604,19.9681277 7.32779395,19.9977979 C7.29625867,19.9991308 7.26523202,20 7.23414885,20 Z"
  }));
};

var css$6 = ".qtd__container__51235fe8{align-items:center;cursor:pointer;display:flex;-webkit-user-select:none;user-select:none}.qtd__label__51235fe8{align-items:center;display:flex;position:relative}.qtd__label__51235fe8 span{color:#ffffff99;font-size:12px;font-weight:400;line-height:1.2;margin-left:10px}.qtd__checkmark__51235fe8{align-items:center;background-color:#1d2649;border-radius:6px;display:flex;height:20px;justify-content:center;transition:background-color .25sn ease-out;width:20px}.qtd__checkmark__51235fe8 svg{fill:#fff;visibility:hidden}.qtd__check__51235fe8{background-color:#3396fb}.qtd__check__51235fe8 svg{-webkit-animation:qtd__bounce__51235fe8 .5s;animation:qtd__bounce__51235fe8 .5s;visibility:visible}@-webkit-keyframes qtd__bounce__51235fe8{0%{-webkit-transform:scale(.2) rotate(4deg);transform:scale(.2) rotate(4deg)}50%{-webkit-transform:scale(1.2) rotate(-2deg);transform:scale(1.2) rotate(-2deg)}75%{-webkit-transform:scale(.9) rotate(1deg);transform:scale(.9) rotate(1deg)}to{-webkit-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg)}}@keyframes qtd__bounce__51235fe8{0%{-webkit-transform:scale(.2) rotate(4deg);transform:scale(.2) rotate(4deg)}50%{-webkit-transform:scale(1.2) rotate(-2deg);transform:scale(1.2) rotate(-2deg)}75%{-webkit-transform:scale(.9) rotate(1deg);transform:scale(.9) rotate(1deg)}to{-webkit-transform:scale(1) rotate(0deg);transform:scale(1) rotate(0deg)}}";
var modules_02792f97$6 = {"container":"qtd__container__51235fe8","label":"qtd__label__51235fe8","checkmark":"qtd__checkmark__51235fe8","check":"qtd__check__51235fe8","bounce":"qtd__bounce__51235fe8"};
n(css$6,{});

var Checkbox = function Checkbox(_ref) {
  var _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var getCheckmark = function getCheckmark() {
    var style = modules_02792f97$6.checkmark;
    if (checked) style += " " + modules_02792f97$6.check;
    return /*#__PURE__*/React.createElement("div", {
      className: style
    }, /*#__PURE__*/React.createElement(Checkmark, {
      width: 12,
      height: 12
    }));
  };
  var getCheckbox = function getCheckbox() {
    return /*#__PURE__*/React.createElement("label", {
      className: modules_02792f97$6.container
    }, /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$6.label
    }, getCheckmark(), /*#__PURE__*/React.createElement("span", null, children)));
  };
  return getCheckbox();
};

var css$5 = ".qtd__option__a86b674a{align-items:center;cursor:pointer;display:flex;min-width:-webkit-max-content;min-width:max-content;padding:10px 18px}.qtd__option__a86b674a:not(:last-child){margin-bottom:1px}.qtd__option__a86b674a:hover{background-color:#1d264980}.qtd__selected__a86b674a .qtd__option__a86b674a span,.qtd__selected__a86b674a .qtd__single__a86b674a{color:#fff}.qtd__option__a86b674a span,.qtd__single__a86b674a{color:#ffffffaa;font-size:12px;font-weight:400;line-height:12px;white-space:nowrap}";
var modules_02792f97$5 = {"option":"qtd__option__a86b674a","selected":"qtd__selected__a86b674a","single":"qtd__single__a86b674a"};
n(css$5,{});

var Option = function Option(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? "" : _ref$value,
    _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked,
    _ref$single = _ref.single,
    single = _ref$single === void 0 ? false : _ref$single,
    _ref$onChangeWidth = _ref.onChangeWidth,
    onChangeWidth = _ref$onChangeWidth === void 0 ? null : _ref$onChangeWidth,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var optionRef = useRef();
  useLayoutEffect(function () {
    if (optionRef.current) onChangeWidth(optionRef.current.clientWidth);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var onButtonClick = function onButtonClick(event) {
    onChange(value, !checked, children);
    event.stopPropagation();
  };
  var optionStyle = function optionStyle() {
    var style = modules_02792f97$5.option;
    if (checked) style += " " + modules_02792f97$5.selected;
    return style;
  };
  var getChildren = function getChildren() {
    if (single) {
      return /*#__PURE__*/React.createElement("div", {
        className: modules_02792f97$5.single
      }, children);
    } else {
      return /*#__PURE__*/React.createElement(Checkbox, {
        checked: checked
      }, children);
    }
  };
  return /*#__PURE__*/React.createElement("li", {
    className: optionStyle(),
    onClick: function onClick(e) {
      return onButtonClick(e);
    },
    ref: optionRef
  }, getChildren());
};
var Option$1 = /*#__PURE__*/React.memo(Option);

var css$4 = ".qtd__menu__e76c7a70{background-color:#050a20;border-radius:0 5px 5px 5px;box-shadow:0 0 10px rgba(0,0,0,.25);overflow:hidden;position:absolute;transform-box:fill-box;-webkit-transform-origin:50% 1%;transform-origin:50% 1%;transition-timing-function:cubic-bezier(.75,-.5,0,1.25);z-index:2}.qtd__menu__e76c7a70 ul{min-width:-webkit-max-content;min-width:max-content}.qtd__bodyWrapper__e76c7a70{height:204px}.qtd__bodyWrapperLong__e76c7a70{height:300px}.qtd__bottom__e76c7a70{top:100%}.qtd__left__e76c7a70{left:0}.qtd__menuEnter__e76c7a70{height:50px;opacity:0}.qtd__menuEnterActive__e76c7a70{height:204px;opacity:1;transition:height .15s ease-out}.qtd__menuExit__e76c7a70{opacity:1}.qtd__menuExitActive__e76c7a70{height:204px;opacity:0;transition:height .15s ease-out}.qtd__menuEnterActiveLong__e76c7a70{height:300px;opacity:1;transition:height .15s ease-out}.qtd__menuExitActiveLong__e76c7a70{height:300px;opacity:0;transition:height .15s ease-out}";
var modules_02792f97$4 = {"menu":"qtd__menu__e76c7a70","bodyWrapper":"qtd__bodyWrapper__e76c7a70","bodyWrapperLong":"qtd__bodyWrapperLong__e76c7a70","menuEnter":"qtd__menuEnter__e76c7a70","menuEnterActive":"qtd__menuEnterActive__e76c7a70","menuExit":"qtd__menuExit__e76c7a70","menuExitActive":"qtd__menuExitActive__e76c7a70","menuEnterActiveLong":"qtd__menuEnterActiveLong__e76c7a70","menuExitActiveLong":"qtd__menuExitActiveLong__e76c7a70","bottom":"qtd__bottom__e76c7a70","left":"qtd__left__e76c7a70"};
n(css$4,{});

function Menu$1(props) {
  var nodeRef = useRef(null);
  var _props$value = props.value,
    value = _props$value === void 0 ? [] : _props$value,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$isOpen = props.isOpen,
    isOpen = _props$isOpen === void 0 ? false : _props$isOpen,
    _props$single = props.single,
    single = _props$single === void 0 ? false : _props$single;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    SetSelected = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    maxItemWidth = _useState4[0],
    SetMaxItemWidth = _useState4[1];
  useEffect(function () {
    SetSelected(value);
  }, [value]);

  /**
   * 
   * FloatingScrollbar sınıfının kullandığı SimpleBar sınıfında bir bug var ve
   * genişliği tamamen hatalı alıyor. Bu fonksiyon alt elemanlardan gelen tüm
   * genişlikliklere bakıyor ve en geniş elemanın genişliğini baz alarak kayıt 
   * ediyor. Wrapper sınıfında da bunu işleyen bir yapı ile Select'in genişliğini
   * olması gerektiği yere çekiyor. 
   * 
   * Menu ve Option 
   * sınıflarının içerisindeki bazı "min-width: max-content;" gibi kodlar da elemanların
   * kendi genişliklerini alabilmesi için önemli css değerleri. Bunlar değiştirilecekse 
   * çok dikkatli olunmalı yoksa Select'in işleyişini bozabilir.
   * 
   * @param {*} width 
   */
  var handleChangeWidth = function handleChangeWidth(width) {
    if (width > maxItemWidth) SetMaxItemWidth(width + 20);
  };

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
  var handleChange = function handleChange(value, checked, label) {
    if (single) {
      var singleValue = [checked ? value : ""];
      SetSelected(singleValue);
      onChange(singleValue, label);
    } else {
      var _new = [];
      if (checked) {
        _new = [].concat(_toConsumableArray(selected), [value]);
      } else {
        selected.splice(selected.indexOf(value), 1);
        _new = _toConsumableArray(selected);
      }
      SetSelected(_new);
      onChange(_new, label);
    }
  };
  var getBodyWrapperStyle = function getBodyWrapperStyle() {
    return children.length > 5 ? modules_02792f97$4.bodyWrapperLong : modules_02792f97$4.bodyWrapper;
  };
  var getMenuEnterActiveStyle = function getMenuEnterActiveStyle() {
    return children.length > 5 ? modules_02792f97$4.menuEnterActiveLong : modules_02792f97$4.menuEnterActive;
  };
  var getMenuExitActiveStyle = function getMenuExitActiveStyle() {
    return children.length > 5 ? modules_02792f97$4.menuExitActiveLong : modules_02792f97$4.menuExitActive;
  };

  /**
   * 
   * Select açılır/kapanır menüsünü prop'larını belirleyerek
   * oluşturur.
   * 
   */
  var getContent = function getContent() {
    return /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$4.menu + " " + modules_02792f97$4.bottom + " " + modules_02792f97$4.left,
      style: {
        width: maxItemWidth
      },
      ref: nodeRef
    }, /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$4.spacer
    }), /*#__PURE__*/React.createElement(SimpleScrollbar, {
      className: getBodyWrapperStyle()
    }, /*#__PURE__*/React.createElement("ul", null, React.Children.map(children, function (child) {
      return /*#__PURE__*/React.cloneElement(child, {
        onChange: handleChange,
        onChangeWidth: handleChangeWidth,
        checked: selected.indexOf(child.props.value) > -1,
        key: child.props.value
      });
    }))));
  };
  return /*#__PURE__*/React.createElement(CSSTransition, {
    in: isOpen,
    timeout: 500,
    classNames: {
      enter: modules_02792f97$4.menuEnter,
      enterActive: getMenuEnterActiveStyle(),
      exit: modules_02792f97$4.menuExit,
      exitActive: getMenuExitActiveStyle()
    },
    nodeRef: nodeRef,
    unmountOnExit: true
  }, getContent());
}

var MultiSelectArrow = function MultiSelectArrow(_ref) {
  var className = _ref.className,
    height = _ref.height,
    width = _ref.width;
    _ref.fill;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    height: height,
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 10"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "20 0.5 10 10.5 0 0.5"
  }));
};

var _templateObject$g, _templateObject2$b, _templateObject3$b, _templateObject4$a;
var Label = styled.div(_templateObject$g || (_templateObject$g = _taggedTemplateLiteral(["\n\n  font-size: 13px;\n  font-weight: 400;\n  color: #ffffff80;\n  width: max-content;\n  transition: color .15s ease-out;\n\n  "])));
var Container = styled.div(_templateObject2$b || (_templateObject2$b = _taggedTemplateLiteral(["\n\n  display: flex;\n  align-items: center;\n\n  svg {\n    fill: #3396FB;\n    margin-left: 10px;\n    transition: transform .3s ease-out;\n  }\n\n  "])));
var Select = styled.div(_templateObject3$b || (_templateObject3$b = _taggedTemplateLiteral(["\n\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  user-select: none;\n  padding: 10px 18px 10px 18px;\n  \n  border-radius: 5px 5px 0 0;\n\n  ", "\n\n  "])), function (_ref) {
  var open = _ref.open;
  return open && css$8(_templateObject4$a || (_templateObject4$a = _taggedTemplateLiteral(["\n      background-color: #050A20;\n\n      ", " {\n        color: #ffffff;\n      }\n\n      ", " {\n        svg {\n          transform: rotate(180deg);\n        }\n      }\n    "])), Label, Container);
});

function Toggle$1(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label;
    _ref.value;
    var _ref$count = _ref.count,
    count = _ref$count === void 0 ? 0 : _ref$count,
    _ref$isOpen = _ref.isOpen,
    isOpen = _ref$isOpen === void 0 ? false : _ref$isOpen,
    _ref$single = _ref.single,
    single = _ref$single === void 0 ? false : _ref$single,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange;
  var _useState = useState(isOpen),
    _useState2 = _slicedToArray(_useState, 2),
    isOpened = _useState2[0],
    SetIsOpened = _useState2[1];
  useEffect(function () {}, []);
  useEffect(function () {
    SetIsOpened(isOpen);
  }, [isOpen]);

  /**
   * 
   * Select'e tıklanıldığın açar veya kapatır.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  var onButtonClick = function onButtonClick(event) {
    SetIsOpened(!isOpened);
    onChange(!isOpened);
  };
  var getLabel = function getLabel() {
    if (single || count === 1) {
      return label;
    } else {
      return label + " (" + count + ")";
    }
  };
  var getInput = function getInput() {
    return /*#__PURE__*/React.createElement(Label, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Label, null, getLabel()), /*#__PURE__*/React.createElement(MultiSelectArrow, {
      width: 9,
      height: 4.5
    })));
  };
  return /*#__PURE__*/React.createElement(Select, {
    open: isOpen,
    onClick: function onClick(e) {
      return onButtonClick();
    }
  }, getInput());
}

var css$3 = ".qtd__wrapper__eb59f085{position:relative;width:-webkit-max-content;width:max-content}";
var modules_02792f97$3 = {"wrapper":"qtd__wrapper__eb59f085"};
n(css$3,{});

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$7(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MultiSelect = function MultiSelect(_ref) {
  var _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    _ref$single = _ref.single,
    single = _ref$single === void 0 ? false : _ref$single,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange;
  var wrapperRef = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    SetIsOpen = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    currentValue = _useState4[0],
    SetCurrentValue = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    currentLabel = _useState6[0],
    SetCurrentLabel = _useState6[1];
  useEffect(function () {
    if (value && value.length > 0 && children.length > 0) {
      SetCurrentValue(value);
      React.Children.map(children, function (child) {
        if (child.props.value === value[0]) {
          SetCurrentLabel(child.props.children);
        }
      });
    }
  }, [value, children]);
  useOnClickOutside(wrapperRef, function () {
    SetIsOpen(false);
  });

  /**
   * 
   * Toogle sınıfında MultiSelect'in açık veya kapalı
   * durumu değiştiyse tetiklenir.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  var onHandleToggleChange = function onHandleToggleChange(open) {
    SetIsOpen(open);
  };

  /**
   * 
   * MultiSelect içerisindeki herhangi bir elemana tıklanıldığında
   * tetiklenir ve elemanın değerini dinleyici sınıfa iletip
   * Select'i kapatır.
   * 
   */
  var onHandleChange = function onHandleChange(value, label) {
    if (onChange) {
      onChange(value, label);
    } else {
      console.warn("MultiSelect: 'onChange' method couldn't be called because it is not defined!");
    }
    if (single) {
      SetCurrentValue(value);
      SetCurrentLabel(label);
    } else {
      var v = value[value.length - 1];
      SetCurrentValue(v ? v : []);
    }
  };
  var getOptions = function getOptions() {
    return React.Children.map(children, function (child) {
      if (child.type === Option$1) {
        return /*#__PURE__*/React.cloneElement(child, _objectSpread$7(_objectSpread$7({}, child.props), {}, {
          onChange: onHandleChange,
          single: single
        }));
      }
    });
  };
  var getLabel = function getLabel() {
    var _label = single || !single && currentValue.length === 1 ? currentLabel : label;
    return _label === "" ? "··········" : _label;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: modules_02792f97$3.wrapper,
    ref: wrapperRef
  }, /*#__PURE__*/React.createElement(Toggle$1, {
    onChange: onHandleToggleChange,
    isOpen: isOpen,
    count: currentValue.length,
    single: single,
    label: getLabel()
  }), /*#__PURE__*/React.createElement(Menu$1, {
    onChange: onHandleChange,
    value: currentValue,
    isOpen: isOpen,
    single: single
  }, getOptions()));
};
MultiSelect.Option = Option$1;

var _templateObject$f;
var Wrapper$d = styled.div(_templateObject$f || (_templateObject$f = _taggedTemplateLiteral(["\n  \n  display: grid;\n  grid-row-gap: 10px;\n\n  "])));

/**
 * 
 * FORM FIELD GROUP
 * 
 * 
 * @param {*} props 
 * @returns 
 */
function FieldGroup(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? null : _ref$className,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var getFieldGroup = function getFieldGroup() {
    return /*#__PURE__*/React.createElement(Wrapper$d, {
      className: className
    }, children);
  };
  return getFieldGroup();
}

function ControlGroup(props) {
  useEffect(function () {
    return function () {};
  }, []);
  var getStyle = function getStyle() {
    var style = "";
    if (props.className) {
      style += " " + props.className;
    }
    return style;
  };
  var getControlGroup = function getControlGroup() {
    return /*#__PURE__*/React.createElement("div", {
      className: getStyle()
    }, props.children);
  };
  return getControlGroup();
}

var FormWrapper = function FormWrapper(props) {
  var _props$name = props.name,
    name = _props$name === void 0 ? "" : _props$name,
    _props$className = props.className,
    className = _props$className === void 0 ? "" : _props$className,
    _props$initialValues = props.initialValues,
    initialValues = _props$initialValues === void 0 ? {} : _props$initialValues,
    _props$onFinish = props.onFinish,
    onFinish = _props$onFinish === void 0 ? null : _props$onFinish,
    _props$onFinishFailed = props.onFinishFailed,
    onFinishFailed = _props$onFinishFailed === void 0 ? null : _props$onFinishFailed,
    _props$onValidated = props.onValidated,
    onValidated = _props$onValidated === void 0 ? null : _props$onValidated,
    _props$form = props.form,
    form = _props$form === void 0 ? null : _props$form,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isValid = _useState2[0],
    SetIsValid = _useState2[1];
  useEffect(function () {
    form.setInitialValues(initialValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useCallback(function () {
    if (onValidated && form.isFormValid() !== isValid) {
      onValidated(form.isFormValid());
    }
    SetIsValid(form.isFormValid());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.isFormValid]);
  var handleSubmit = function handleSubmit() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (form.isFormValid()) {
      if (onFinish) {
        onFinish(form.getValues());
      }
    } else {
      if (onFinishFailed) {
        onFinishFailed(form.getFields());
      }
    }
  };
  var getForm = function getForm() {
    return /*#__PURE__*/React.createElement("form", {
      id: name,
      onSubmit: handleSubmit,
      autoComplete: "off",
      className: className,
      noValidate: true
    }, children);
  };
  return getForm();
};
var FormWrapper$1 = /*#__PURE__*/memo(FormWrapper);

function TCIdentity(identity) {
  identity = identity.toString();
  var length = /^[0-9]{11}$/.test(identity);
  var x1 = 0;
  for (var i = 0; i < 10; i++) {
    x1 += Number(identity.substr(i, 1));
  }
  var r1 = x1 % 10 === identity.substr(10, 1);
  var t1 = 0;
  var y2 = 0;
  for (var y = 0; y < 10; y += 2) {
    t1 += Number(identity.substr(y, 1));
  }
  for (var x = 1; x < 10; x += 2) {
    y2 += Number(identity.substr(x, 1));
  }
  var k2 = (t1 * 7 - y2) % 10 === identity.substr(9, 0);
  return length && r1 && k2;
}

var validEmailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+([.])[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/);
var validUsernameRegex = new RegExp(/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/);
var validPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\[\]\\`~!@#$%^&*()_+={};:<>|.\/?,"'-]{8,35}$/);
function CheckValidations(rules, value, form) {
  var errors = [];
  rules.forEach(function (rule) {
    if (rule.hasOwnProperty('required')) {
      if (!checkRequired(value) && rule.required) {
        errors.push(rule.message ? rule.message : "");
      }
    }
    if (rule.hasOwnProperty('type')) {
      if (rule.type === 'minLength') {
        if (!checkMinLength(value, rule.value)) {
          errors.push(rule.message);
        }
      }
      if (rule.type === 'maxLength') {
        if (!checkMaxLength(value, rule.value)) {
          errors.push(rule.message);
        }
      }
      if (rule.type === 'exactLength') {
        if (!checkExactLength(value, rule.value)) {
          errors.push(rule.message);
        }
      }
      if (rule.type === 'same') {
        if (!checkSame(value, form.getFieldValue(rule.field))) {
          errors.push(rule.message);
        }
      }
      if (rule.type === 'TCIdentity') {
        if (!checkTCIdentity(value)) {
          errors.push(rule.message);
        }
      }
      if (rule.type === 'password') {
        if (!checkPassword(value)) {
          errors.push(rule.message);
        }
      }
      if (rule.type === 'email') {
        if (!checkEmail(value)) {
          errors.push(rule.message);
        }
      }
      if (rule.type === 'username') {
        if (!checkUsername(value)) {
          errors.push(rule.message);
        }
      }
    }
  });
  return errors;
}
var checkPassword = function checkPassword(value) {
  return validPasswordRegex.test(value);
};
var checkEmail = function checkEmail(value) {
  return validEmailRegex.test(value);
};
var checkUsername = function checkUsername(value) {
  return validUsernameRegex.test(value);
};
var checkMinLength = function checkMinLength(value, length) {
  return value.length >= length;
};
var checkMaxLength = function checkMaxLength(value, length) {
  return value.length <= length;
};
var checkSame = function checkSame(value, targetValue) {
  return value === targetValue;
};
var checkExactLength = function checkExactLength(value, length) {
  return value.length === length;
};
var checkTCIdentity = function checkTCIdentity(value) {
  return TCIdentity(value);
};
var checkRequired = function checkRequired(value) {
  if (_typeof(value) === "object") {
    var isValid = true;
    Object.keys(value).forEach(function (property, i) {
      if (value[property] === "") isValid = false;
    });
    return isValid;
  } else if (typeof value === "string") {
    if (value === "") return false;
  } else if (typeof value === "boolean") {
    if (!value) return false;
  }
  return true;
};

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$6(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function FormItem(_ref) {
  var _ref$name = _ref.name,
    name = _ref$name === void 0 ? "" : _ref$name,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? "" : _ref$label,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "" : _ref$placeholder,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? [] : _ref$rules,
    _ref$mask = _ref.mask,
    mask = _ref$mask === void 0 ? null : _ref$mask,
    _ref$locked = _ref.locked,
    locked = _ref$locked === void 0 ? false : _ref$locked,
    _ref$dependency = _ref.dependency,
    dependency = _ref$dependency === void 0 ? '' : _ref$dependency,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var ref = useRef();
  var form = Form.useFormAPI();
  useEffect(function () {
    form.register(name, ref, checkIsValid(ref.current.getValue()));
    return function () {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleItemUpdate = function handleItemUpdate(value) {
    var skipValidation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var data = {
      name: name,
      value: value,
      valid: checkIsValid(value, skipValidation)
    };
    form.updateField(data);
    checkDependency();
  };
  var checkIsValid = function checkIsValid(value) {
    var skipValidation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var errors = CheckValidations(rules, value, form);
    if (errors.length > 0) {
      form.setFieldError(name, errors[0], skipValidation);
      return false;
    }
    form.setFieldError(name, null);
    return true;
  };
  var checkDependency = function checkDependency() {
    if (dependency === "") return;
    if (form.getFieldValue(dependency) === "") return;
    form.getFieldInstance(dependency).forceUpdate();
  };
  var getFormItem = function getFormItem() {
    var props = {
      label: label,
      placeholder: placeholder,
      id: form.formId + "_" + name,
      onUpdate: handleItemUpdate,
      ref: ref
    };
    if (mask) props.mask = mask;
    if (locked) props.locked = locked;
    return /*#__PURE__*/React.cloneElement(children, _objectSpread$6(_objectSpread$6({}, children.props), props));
  };
  return getFormItem();
}

var FormContext = /*#__PURE__*/createContext(undefined);

function FormStore() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var _updater = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    fields = _useState2[0],
    SetFields = _useState2[1];
  var _useState3 = useState(name),
    _useState4 = _slicedToArray(_useState3, 2),
    formId = _useState4[0],
    SetFormId = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isValid = _useState6[0],
    SetIsValid = _useState6[1];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    tick = _useState8[0],
    SetTick = _useState8[1];
  var updater = _updater;

  /**
   * 
   * @param {*} name 
   * @param {*} ref  
   */
  function register(name, ref, valid) {
    fields[name] = {
      field: ref,
      value: ref.current.getValue(),
      valid: valid,
      errors: []
    };
  }
  function hasField(name) {
    return fields.hasOwnProperty(name) && fields[name] !== undefined;
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  function updateField(_ref) {
    var name = _ref.name,
      value = _ref.value,
      valid = _ref.valid;
    if (!hasField(name)) return;
    fields[name].value = value;
    fields[name].valid = valid;

    //const _valid = checkFormIsValid(valid);

    if (updater) {
      updater(getValues());
    }
    SetTick(tick + 1);

    /*
    if ( updater && _valid ) {
      updater(getValues());
    }
    */
  }

  /**
   * 
   * @returns 
   */
  var isFormValid = useCallback(function () {
    return isValid;
  }, [isValid]);

  /**
   * 
   * @param {*} names 
   * @returns 
   */
  function isFieldsValid() {
    var names = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var valid = true;
    names.forEach(function (name) {
      if (!fields[name].valid) {
        valid = false;
      }
    });
    return valid;
  }

  /**
   * 
   * @param {*} name 
   * @returns 
   */
  function isFieldValid(name) {
    return fields[name].valid;
  }

  /**
   * 
   * @param {*} name 
   * @returns 
   */
  function getFieldValue(name) {
    return !hasField(name) ? "" : typeCheck(fields[name].value);
  }

  /**
   * 
   * @param {*} name 
   * @returns 
   */
  function getFieldInstance(name) {
    return !hasField(name) ? {} : fields[name].field.current;
  }

  /**
   * 
   * @returns 
   */
  function getFields() {
    var result = {};
    Object.keys(fields).forEach(function (property, i) {
      result[property] = fields[property];
    });
    return result;
  }

  /**
   * 
   * @returns 
   */
  function getFieldsInstance() {
    var result = {};
    Object.keys(fields).forEach(function (property, i) {
      result[property] = fields[property].field.current;
    });
    return result;
  }

  /**
   * 
   * @returns 
   */
  function getValues() {
    var result = {};
    Object.keys(fields).forEach(function (property, i) {
      result[property] = fields[property].value;
    });
    return result;
  }
  function setName(name) {
    SetFormId(name);
  }
  function setInitialValues(_fields) {
    Object.keys(_fields).forEach(function (name, index) {
      if (hasField(name)) {
        if (fields[name].field.current.hasOwnProperty("setValue")) {
          fields[name].field.current.setValue(_fields[name]);
        }
      }
    });
  }
  function setInvalidFields() {
    var names = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    names.forEach(function (name) {
      setFieldError(name, message);
    });
    checkFormIsValid();
  }
  function setFieldValue(name, value) {
    if (!hasField(name)) return;
    fields[name].valid = false;
    fields[name].field.current.setValue(value);
    SetTick(tick + 1);
  }
  function setFieldError(name, message) {
    var skipValidation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (!hasField(name)) return;
    if (!fields[name].field.current) return;
    fields[name].valid = false;
    if (!fields[name].field.current.hasOwnProperty("setError")) return;
    if (!skipValidation) {
      fields[name].field.current.setError(message);
    } else {
      fields[name].field.current.setError(null);
    }
    SetTick(tick + 1);
  }
  function removeFieldError(name) {
    if (!fields[name]) return;
    fields[name].valid = true;
    if (fields[name].field.current.hasOwnProperty("setError")) {
      fields[name].field.current.setError(null);
    }
    SetTick(tick + 1);
  }

  /* ----------------------------------- */

  /**
   * 
   * @param {*} value 
   * @returns 
   */
  function typeCheck(value) {
    return value instanceof Object ? JSON.stringify(value) : value;
  }

  /**
   * 
   */
  function checkFormIsValid() {
    var valid = true;
    Object.keys(fields).forEach(function (name, i) {
      if (!fields[name].valid) {
        valid = false;
      }
    });
    SetIsValid(valid);
    if (isValid !== valid) {
      SetTick(tick + 1);
    }
    return valid;
  }

  /**
   * 
   * @returns 
   */
  function removeFields() {
    SetFields({});
  }

  /**
   * 
   * @returns 
   */
  function resetFields() {
    Object.keys(fields).forEach(function (name, index) {
      if (fields[name].field.current.hasOwnProperty("reset")) {
        fields[name].field.current.reset();
      }
    });
  }

  /* ----------------------------------- */

  return {
    formId: formId,
    register: register,
    hasField: hasField,
    getFieldValue: getFieldValue,
    getFieldInstance: getFieldInstance,
    getFields: getFields,
    getFieldsInstance: getFieldsInstance,
    setName: setName,
    setInitialValues: setInitialValues,
    setInvalidFields: setInvalidFields,
    setFieldValue: setFieldValue,
    setFieldError: setFieldError,
    getValues: getValues,
    removeFieldError: removeFieldError,
    updateField: updateField,
    isFormValid: isFormValid,
    isFieldsValid: isFieldsValid,
    isFieldValid: isFieldValid,
    resetFields: resetFields,
    removeFields: removeFields,
    tick: tick
  };
}

var form;
var Form = /*#__PURE__*/forwardRef(function (props, ref) {
  var initialValues = props.initialValues,
    children = props.children,
    onUpdate = props.onUpdate,
    onFinish = props.onFinish,
    onFinishFailed = props.onFinishFailed,
    onValidated = props.onValidated,
    className = props.className,
    name = props.name;
  useEffect(function () {
    return function () {
      form = null;
    };
  }, []);
  useImperativeHandle(ref, function () {
    return form;
  });
  form = new FormStore(name, onUpdate);
  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: form
  }, /*#__PURE__*/React.createElement(FormWrapper$1, {
    initialValues: initialValues,
    onFinish: onFinish,
    onFinishFailed: onFinishFailed,
    onValidated: onValidated,
    name: name,
    form: form,
    className: className
  }, children));
});
var useForm = function useForm() {
  return useContext(FormContext);
};
var useFormAPI = function useFormAPI() {
  return form;
};
Form.Item = FormItem;
Form.Group = FieldGroup;
Form.Control = ControlGroup;
Form.useForm = useForm;
Form.useFormAPI = useFormAPI;

var css$2 = ".qtd__radio__1ab97dfd{position:relative}.qtd__radio__1ab97dfd input[type=radio]{height:100%;left:0;pointer-events:none;position:absolute;top:0;visibility:hidden}.qtd__radio__1ab97dfd input[type=radio]:checked+label .qtd__innerButton__1ab97dfd{border:1px solid #3598fe}.qtd__radio__1ab97dfd input[type=radio]:checked+label .qtd__innerButton__1ab97dfd .qtd__preIcon__1ab97dfd,.qtd__radio__1ab97dfd input[type=radio]:checked+label .qtd__innerButton__1ab97dfd span,.qtd__radio__1ab97dfd input[type=radio]:checked+label .qtd__simpleButton__1ab97dfd span{color:#fff}.qtd__radio__1ab97dfd .qtd__innerButton__1ab97dfd{align-items:center;background:#0e153180;border:1px solid transparent;border-radius:6px;cursor:pointer;display:flex;height:46px;justify-content:space-between;padding:0 15px;transition:background-color .2s ease;width:100%}.qtd__radio__1ab97dfd .qtd__innerButton__1ab97dfd span{color:#ffffff80;font-size:13px;pointer-events:none}.qtd__radio__1ab97dfd .qtd__innerButton__1ab97dfd:hover{background-color:#0e1531bf}.qtd__radio__1ab97dfd .qtd__simpleButton__1ab97dfd{align-items:center;cursor:pointer;display:flex;justify-content:space-between}.qtd__radio__1ab97dfd .qtd__simpleButton__1ab97dfd span{color:#ffffff80;font-size:13px;pointer-events:none;transition:color .2s ease}.qtd__radio__1ab97dfd .qtd__simpleButton__1ab97dfd:hover span{color:#fff}.qtd__radio__1ab97dfd label{height:100%;width:100%}.qtd__error__1ab97dfd .qtd__innerButton__1ab97dfd{border:1px solid #870f0f}.qtd__left__1ab97dfd{display:flex}.qtd__preIcon__1ab97dfd{color:#ffffff80;font-size:20px;margin-right:4px}.qtd__checkIcon__1ab97dfd{-webkit-animation:qtd__bounce__1ab97dfd .75s;animation:qtd__bounce__1ab97dfd .75s;color:#3395fa;font-size:20px;position:absolute;right:10px}@-webkit-keyframes qtd__bounce__1ab97dfd{0%{-webkit-transform:scale(.2) rotate(-5deg);transform:scale(.2) rotate(-5deg)}50%{-webkit-transform:scale(1.3) rotate(5deg);transform:scale(1.3) rotate(5deg)}60%{-webkit-transform:scale(.9) rotate(0deg);transform:scale(.9) rotate(0deg)}80%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes qtd__bounce__1ab97dfd{0%{-webkit-transform:scale(.2) rotate(-5deg);transform:scale(.2) rotate(-5deg)}50%{-webkit-transform:scale(1.3) rotate(5deg);transform:scale(1.3) rotate(5deg)}60%{-webkit-transform:scale(.9) rotate(0deg);transform:scale(.9) rotate(0deg)}80%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(1);transform:scale(1)}}";
var modules_02792f97$2 = {"radio":"qtd__radio__1ab97dfd","innerButton":"qtd__innerButton__1ab97dfd","preIcon":"qtd__preIcon__1ab97dfd","simpleButton":"qtd__simpleButton__1ab97dfd","error":"qtd__error__1ab97dfd","checkIcon":"qtd__checkIcon__1ab97dfd","bounce":"qtd__bounce__1ab97dfd","left":"qtd__left__1ab97dfd"};
n(css$2,{});

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$5(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Button$1(props) {
  var _props$id = props.id,
    id = _props$id === void 0 ? v4() : _props$id,
    _props$name = props.name,
    name = _props$name === void 0 ? "" : _props$name,
    _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    _props$type = props.type,
    type = _props$type === void 0 ? "default" : _props$type,
    _props$checked = props.checked,
    checked = _props$checked === void 0 ? false : _props$checked,
    _props$hasError = props.hasError,
    hasError = _props$hasError === void 0 ? false : _props$hasError,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children,
    _props$icon = props.icon,
    icon = _props$icon === void 0 ? null : _props$icon,
    _props$image = props.image,
    image = _props$image === void 0 ? null : _props$image,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$component = props.component,
    component = _props$component === void 0 ? null : _props$component;
  var handleOnChange = function handleOnChange(event) {
    onChange(value);
  };
  var getIcon = function getIcon() {
    if (icon) return /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$2.preIcon + " " + icon
    });
    if (image) return /*#__PURE__*/React.createElement(CoreImage, {
      src: image,
      height: "20",
      brokenHeight: "20"
    });
    return null;
  };
  var getCheckIcon = function getCheckIcon() {
    if (!checked) return;
    return /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$2.checkIcon + " qt-web-check"
    });
  };
  var getRadioStyle = function getRadioStyle() {
    var style = modules_02792f97$2.radio;
    if (hasError) style += " " + modules_02792f97$2.error;
    return style;
  };
  var getInnerButton = function getInnerButton() {
    return /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$2.innerButton
    }, /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$2.left
    }, getIcon(), /*#__PURE__*/React.createElement("span", null, children)), getCheckIcon());
  };
  var getAsButton = function getAsButton() {
    var props = {
      checked: checked,
      value: value,
      icon: icon,
      children: children
    };

    /**
     * Eğer iletilen component LazyLoad olarak iletildi ise.
     */
    if (component.props.hasOwnProperty("childProps")) {
      props.childProps = _objectSpread$5(_objectSpread$5({}, component.props.childProps), {}, {
        checked: checked,
        value: value,
        icon: icon,
        children: children
      });
    }
    var button = /*#__PURE__*/React.cloneElement(component, props);
    return button;
  };
  var getSimpleButton = function getSimpleButton() {
    return /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$2.simpleButton
    }, /*#__PURE__*/React.createElement("span", null, children));
  };
  var getButtonByType = function getButtonByType() {
    if (type === "default") {
      return getInnerButton();
    } else if (type === "primary") {
      return getSimpleButton();
    } else {
      return /*#__PURE__*/React.createElement("span", null, children);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: getRadioStyle()
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    onChange: handleOnChange,
    id: id,
    name: name,
    value: value,
    checked: checked,
    "aria-checked": checked
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, component !== null ? getAsButton() : getButtonByType()));
}

var _templateObject$e;
var GroupWrapper = styled.div(_templateObject$e || (_templateObject$e = _taggedTemplateLiteral(["\n  display: grid;\n  grid-auto-flow: ", ";\n  grid-template-columns: ", ";\n  grid-template-rows: ", ";\n  grid-gap: ", ";\n  "])), function (props) {
  return props._onlyFlow ? props._direction : props._direction === "column" ? "row" : "column";
}, function (props) {
  return props._direction === "row" || props._onlyFlow ? "auto" : "repeat(".concat(props._length, ", 1fr)");
}, function (props) {
  return props._direction === "column" || props._onlyFlow ? "auto" : "repeat(".concat(props._length, ", 1fr)");
}, function (props) {
  return props._gap;
});

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$4(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Group = /*#__PURE__*/forwardRef(function (props, ref) {
  var _props$name = props.name,
    name = _props$name === void 0 ? "" : _props$name,
    _props$message = props.message,
    message = _props$message === void 0 ? "" : _props$message,
    _props$type = props.type,
    type = _props$type === void 0 ? "default" : _props$type,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? "" : _props$defaultValue,
    _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    _props$className = props.className,
    className = _props$className === void 0 ? "" : _props$className,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? "column" : _props$direction,
    _props$gap = props.gap,
    gap = _props$gap === void 0 ? "10px" : _props$gap,
    _props$length = props.length,
    length = _props$length === void 0 ? 3 : _props$length,
    _props$onlyFlow = props.onlyFlow,
    onlyFlow = _props$onlyFlow === void 0 ? false : _props$onlyFlow,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$onUpdate = props.onUpdate,
    onUpdate = _props$onUpdate === void 0 ? null : _props$onUpdate,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children;
  var _useState = useState(message),
    _useState2 = _slicedToArray(_useState, 2),
    errorMessage = _useState2[0],
    SetErrorMessage = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    selected = _useState4[0],
    SetSelected = _useState4[1];
  useEffect(function () {
    SetSelected(defaultValue);
    sendUpdates(defaultValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    SetSelected(value);
    sendUpdates(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useImperativeHandle(ref, function () {
    return {
      reset: function reset() {
        SetSelected(defaultValue);
        sendUpdates(defaultValue, true);
      },
      setValue: function setValue(value) {
        SetSelected(value);
        sendUpdates(value, true);
      },
      getValue: function getValue() {
        return selected;
      },
      setError: function setError(message) {
        SetErrorMessage(message);
      }
    };
  });
  var sendUpdates = function sendUpdates(value) {
    var skipValidation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (onChange) onChange(value);
    if (onUpdate) onUpdate(value, skipValidation);
  };
  var onClickRadioButton = function onClickRadioButton(value) {
    SetSelected(value);
    sendUpdates(value, true);
    SetErrorMessage(null);
  };
  var getGroupStyle = function getGroupStyle() {
    var style = "";
    if (className !== "") {
      style += " " + className;
    }
    return style;
  };
  return /*#__PURE__*/React.createElement(GroupWrapper, {
    className: getGroupStyle(),
    role: "radiogroup",
    _direction: direction,
    _length: length,
    _gap: gap,
    _onlyFlow: onlyFlow
  }, React.Children.map(children, function (element) {
    return /*#__PURE__*/React.cloneElement(element, _objectSpread$4(_objectSpread$4({}, element.props), {}, {
      checked: selected === element.props.value,
      onChange: onClickRadioButton,
      hasError: errorMessage !== null,
      name: name,
      type: type
    }));
  }));
});
var Group$1 = /*#__PURE__*/React.memo(Group);

var Radio = function Radio(props) {
  return null;
};
Radio.Group = Group$1;
Radio.Button = Button$1;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

var _excluded = ["children", "to"];
var ALink = function ALink(_ref) {
  var children = _ref.children,
    to = _ref.to,
    props = _objectWithoutProperties(_ref, _excluded);
  var getRoute = function getRoute() {
    var resolved = useResolvedPath(to);
    useMatch({
      path: resolved.pathname,
      end: true
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavLink, _extends({
      className: props.className ? props.className : "",
      to: to
    }, props), children));
  };
  return getRoute();
};

var _templateObject$d, _templateObject2$a, _templateObject3$a, _templateObject4$9;
var Wrapper$c = styled.div(_templateObject$d || (_templateObject$d = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  "])));
var Title = styled.div(_templateObject2$a || (_templateObject2$a = _taggedTemplateLiteral(["\n\n  background-color: #1D2649;\n  width: 100%;\n  height: 60px;\n  padding: 0 20px 0 20px;\n  margin-bottom: 1px;\n\n  cursor: pointer;\n  transition: background-color 0.3s ease-out;\n\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  \n  span {\n    font-size: 13px;\n    color: #ffffff99;\n  }\n\n  &:hover:not(&.activeTitle) {\n    background-color: #3396FB40;\n  }\n\n  ", "\n\n  "])), function (_ref) {
  var active = _ref.active;
  return active && css$8(_templateObject3$a || (_templateObject3$a = _taggedTemplateLiteral(["\n      background-color: #3396FB80;\n      span {\n        color: #ffffff;\n      }\n\n      .icon {\n        color: #ffffff;\n      }\n\n      .arrow {\n        fill: #ffffff;\n      }\n    "])));
});
var Content$1 = styled.div(_templateObject4$9 || (_templateObject4$9 = _taggedTemplateLiteral(["\n  \n  overflow: hidden;\n  transition: max-height 0.25s ease-out;\n\n  "])));

var css$1 = ".qtd__arrow__6798f289{fill:#ffffff99;height:20px;margin-left:auto;-webkit-transform:rotate(0deg);transform:rotate(0deg);transition:all .25s ease-out;width:20px}.qtd__arrowNormal__6798f289{margin-left:auto;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.qtd__arrowOpen__6798f289{fill:#fff;-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.qtd__icon__6798f289{align-items:center;color:#ffffff99;display:flex;font-size:22px;height:22px;margin-right:8px;width:22px}";
var modules_02792f97$1 = {"arrow":"qtd__arrow__6798f289","arrowNormal":"qtd__arrowNormal__6798f289","arrowOpen":"qtd__arrowOpen__6798f289","icon":"qtd__icon__6798f289"};
n(css$1,{});

function Panel(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "" : _ref$id,
    _ref$link = _ref.link,
    link = _ref$link === void 0 ? "" : _ref$link,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? "" : _ref$icon,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$hasOpen = _ref.hasOpen,
    hasOpen = _ref$hasOpen === void 0 ? false : _ref$hasOpen,
    _ref$useLink = _ref.useLink,
    useLink = _ref$useLink === void 0 ? false : _ref$useLink,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var content = useRef();
  var location = useLocation();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    SetIsOpen = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    style = _useState4[0],
    SetStyle = _useState4[1];
  var _useState5 = useState("0px"),
    _useState6 = _slicedToArray(_useState5, 2),
    height = _useState6[0],
    SetHeight = _useState6[1];
  useEffect(function () {
    SetStyle(0);

    /**
     * İlk açılışta menünün boyunu alarak açılma animasyonunu 
     * göstermemeyi sağlar.
     */
    if (hasLinkFound()) {
      content.current.style = "".concat(content.current.scrollHeight, "px");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (!hasOpen) SetIsOpen(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasOpen]);
  useEffect(function () {
    if (isOpen) {
      onChange(id);
    }
    SetHeight(!isOpen ? "0px" : "".concat(content.current.scrollHeight, "px"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  useEffect(function () {
    if (hasLinkFound()) {
      SetIsOpen(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  var hasLinkFound = function hasLinkFound() {
    if (!useLink && hasOpen) return true;
    var found = false;
    console.log("useLink: " + useLink);
    if (children) {
      children.forEach(function (child) {
        if (location.pathname.indexOf(child.props.link) > -1) {
          found = true;
        }
      });
    } else {
      if (location.pathname.indexOf(link) > -1) {
        found = true;
      }
    }
    return found;
  };
  var handleTitleClick = function handleTitleClick() {
    SetIsOpen(!isOpen);
  };
  var getArrow = function getArrow() {
    var arrowStyle = modules_02792f97$1.arrow;
    arrowStyle += children ? isOpen ? " " + modules_02792f97$1.arrowOpen : "" : " " + modules_02792f97$1.arrowNormal;
    return /*#__PURE__*/React.createElement(Arrow$2, {
      width: "20",
      height: "20",
      className: arrowStyle
    });
  };
  var getAccordionTitle = function getAccordionTitle() {
    return /*#__PURE__*/React.createElement(Title, {
      className: style,
      onClick: handleTitleClick
    }, /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$1.icon + " " + icon
    }), /*#__PURE__*/React.createElement("span", null, title), getArrow());
  };
  var getTitle = function getTitle() {
    return /*#__PURE__*/React.createElement(Title, {
      as: ALink,
      _active: hasLinkFound(),
      to: link
    }, /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97$1.icon + " " + icon
    }), /*#__PURE__*/React.createElement("span", null, title), getArrow());
  };
  var getChildren = function getChildren() {
    return /*#__PURE__*/React.createElement(Content$1, {
      ref: content,
      style: {
        maxHeight: "".concat(height)
      }
    }, children);
  };
  var getContent = function getContent() {
    return /*#__PURE__*/React.createElement(Wrapper$c, null, /*#__PURE__*/React.createElement("div", null, children ? getAccordionTitle() : getTitle(), getChildren()));
  };
  return getContent();
}

var _templateObject$c;
var Wrapper$b = styled.div(_templateObject$c || (_templateObject$c = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  "])));

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$3(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Collapse = function Collapse(_ref) {
  var _ref$useLink = _ref.useLink,
    useLink = _ref$useLink === void 0 ? false : _ref$useLink,
    children = _ref.children;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    SetSelected = _useState2[1];
  useEffect(function () {}, []);
  var handleOnChange = function handleOnChange(id) {
    SetSelected(id);
  };
  return /*#__PURE__*/React.createElement(Wrapper$b, null, React.Children.map(children, function (element) {
    return /*#__PURE__*/React.cloneElement(element, _objectSpread$3(_objectSpread$3({}, element.props), {}, {
      useLink: useLink,
      hasOpen: selected === element.props.id,
      onChange: handleOnChange
    }));
  }));
};
Collapse.Panel = Panel;

var _templateObject$b, _templateObject2$9, _templateObject3$9, _templateObject4$8, _templateObject5$6, _templateObject6$5, _templateObject7$3, _templateObject8$3, _templateObject9$1, _templateObject10$1, _templateObject11$1;
var Wrapper$a = styled.div(_templateObject$b || (_templateObject$b = _taggedTemplateLiteral(["\n\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  height: ", ";\n\n  background-color: #1D2649;\n  padding: 0 20px 0 20px;\n  margin-bottom: 1px;\n\n  cursor: pointer;\n  transition: background-color 0.3s ease-out;\n  \n  span {\n    user-select: none;\n    font-size: 13px;\n    color: #ffffff99;\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n"])), function (props) {
  return "".concat(props.$subHeight, "px");
}, function (_ref) {
  var $isActive = _ref.$isActive;
  return !$isActive && css$8(_templateObject2$9 || (_templateObject2$9 = _taggedTemplateLiteral(["\n      &:hover {\n        background-color: #3396FB40;\n      }\n    "])));
}, function (_ref2) {
  var $isActive = _ref2.$isActive;
  return $isActive && css$8(_templateObject3$9 || (_templateObject3$9 = _taggedTemplateLiteral(["\n      transition-duration: 0ms;\n      background-color: #3396FB80;\n\n      span {\n        color: #ffffff;\n      }\n      \n    "])));
}, function (_ref3) {
  var $isOpen = _ref3.$isOpen;
  return $isOpen && css$8(_templateObject4$8 || (_templateObject4$8 = _taggedTemplateLiteral(["\n      span {\n        color: #ffffff;\n      }\n    "])));
});
var Icon$2 = styled.div(_templateObject5$6 || (_templateObject5$6 = _taggedTemplateLiteral(["\n\n  font-size: ", ";\n  width: ", ";\n  height: ", ";\n\n  margin-right: 8px;\n  color: #ffffff99;\n  display: flex;\n  align-items: center;\n\n  ", "\n\n"])), function (props) {
  return "".concat(props.$size, "px");
}, function (props) {
  return "".concat(props.$size, "px");
}, function (props) {
  return "".concat(props.$size, "px");
}, function (_ref4) {
  var $isOpen = _ref4.$isOpen,
    $isActive = _ref4.$isActive;
  return ($isOpen || $isActive) && css$8(_templateObject6$5 || (_templateObject6$5 = _taggedTemplateLiteral(["\n      color: #ffffff;\n    "])));
});
var Content = styled.ul(_templateObject7$3 || (_templateObject7$3 = _taggedTemplateLiteral(["\n\n  overflow: hidden;\n  transition: max-height 0.25s ease-out;\n\n  "])));
var Arrow$1 = styled.svg(_templateObject8$3 || (_templateObject8$3 = _taggedTemplateLiteral(["\n\n  transition: all 0.25s ease-out;\n  margin-left: auto;\n  transform: rotate(0deg);\n  fill: #ffffff99;\n\n  ", "\n\n  ", "\n\n  ", "\n\n"])), function (_ref5) {
  var $isOpen = _ref5.$isOpen;
  return $isOpen && css$8(_templateObject9$1 || (_templateObject9$1 = _taggedTemplateLiteral(["\n      transform: rotate(-180deg);\n      fill: #ffffff;\n    "])));
}, function (_ref6) {
  var $isActive = _ref6.$isActive;
  return $isActive && css$8(_templateObject10$1 || (_templateObject10$1 = _taggedTemplateLiteral(["\n      fill: #ffffff;\n    "])));
}, function (_ref7) {
  var $isNormal = _ref7.$isNormal;
  return $isNormal && css$8(_templateObject11$1 || (_templateObject11$1 = _taggedTemplateLiteral(["\n      transform: rotate(-90deg);\n    "])));
});

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function SubMenu(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "" : _ref$id,
    _ref$link = _ref.link,
    link = _ref$link === void 0 ? "" : _ref$link,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? "" : _ref$icon,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$isSelected = _ref.isSelected,
    isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
    _ref$useLink = _ref.useLink,
    useLink = _ref$useLink === void 0 ? false : _ref$useLink,
    _ref$onlyOne = _ref.onlyOne,
    onlyOne = _ref$onlyOne === void 0 ? false : _ref$onlyOne,
    _ref$subMenuLinkArrow = _ref.subMenuLinkArrow,
    subMenuLinkArrow = _ref$subMenuLinkArrow === void 0 ? true : _ref$subMenuLinkArrow,
    _ref$subMenuHeight = _ref.subMenuHeight,
    subMenuHeight = _ref$subMenuHeight === void 0 ? 60 : _ref$subMenuHeight,
    _ref$itemHeight = _ref.itemHeight,
    itemHeight = _ref$itemHeight === void 0 ? 40 : _ref$itemHeight,
    _ref$iconSize = _ref.iconSize,
    iconSize = _ref$iconSize === void 0 ? 22 : _ref$iconSize,
    _ref$arrowSize = _ref.arrowSize,
    arrowSize = _ref$arrowSize === void 0 ? 20 : _ref$arrowSize,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var content = useRef();
  var location = useLocation();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isActive = _useState2[0],
    SetIsActive = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpen = _useState4[0],
    SetIsOpen = _useState4[1];
  var _useState5 = useState("0px"),
    _useState6 = _slicedToArray(_useState5, 2),
    height = _useState6[0],
    SetHeight = _useState6[1];
  useEffect(function () {
    /**
     * İlk açılışta menünün boyunu alarak açılma animasyonunu 
     * göstermemeyi sağlar.
     */
    if (hasLinkFound()) {
      content.current.style = "".concat(content.current.scrollHeight, "px");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (!isSelected && onlyOne) {
      SetIsOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);
  useEffect(function () {
    if (isOpen) {
      onChange(id);
    }
    SetHeight(!isOpen ? "0px" : "".concat(content.current.scrollHeight, "px"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  useEffect(function () {
    var hasFound = hasLinkFound();
    SetIsActive(hasFound);
    if (hasFound) SetIsOpen(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  var hasLinkFound = function hasLinkFound() {
    if (!useLink && isSelected) return true;
    var found = false;
    if (children) {
      children.forEach(function (child) {
        if (location.pathname.indexOf(child.props.link) > -1) {
          found = true;
        }
      });
    } else {
      if (location.pathname.indexOf(link) > -1) {
        found = true;
      }
    }
    return found;
  };
  var handleTitleClick = function handleTitleClick() {
    SetIsOpen(!isOpen);
  };
  var getArrow = function getArrow() {
    // let status = children ? (isOpen ? "open" : "") : "normal";

    return /*#__PURE__*/React.createElement(Arrow$1, {
      width: arrowSize,
      height: arrowSize,
      $isOpen: children && isOpen,
      $isNormal: !children,
      $isActive: isActive,
      as: Arrow$2
    });
  };
  var getAccordionTitle = function getAccordionTitle() {
    return /*#__PURE__*/React.createElement(Wrapper$a, {
      $subHeight: subMenuHeight,
      $isActive: isActive,
      $isOpen: isOpen,
      onClick: handleTitleClick
    }, /*#__PURE__*/React.createElement(Icon$2, {
      className: icon,
      $size: iconSize,
      $isOpen: isOpen,
      $isActive: isActive
    }), /*#__PURE__*/React.createElement("span", null, title), getArrow());
  };
  var getTitle = function getTitle() {
    return /*#__PURE__*/React.createElement(Wrapper$a, {
      $subHeight: subMenuHeight,
      $isActive: isActive,
      $isOpen: isOpen,
      to: link,
      as: ALink
    }, /*#__PURE__*/React.createElement(Icon$2, {
      className: icon,
      $size: iconSize,
      $isOpen: isOpen,
      $isActive: isActive
    }), /*#__PURE__*/React.createElement("span", null, title), subMenuLinkArrow ? getArrow() : null);
  };
  var getChildren = function getChildren() {
    return /*#__PURE__*/React.createElement(Content, {
      ref: content,
      style: {
        maxHeight: "".concat(height)
      }
    }, React.Children.map(children, function (element) {
      return /*#__PURE__*/React.cloneElement(element, _objectSpread$2(_objectSpread$2({}, element.props), {}, {
        itemHeight: itemHeight,
        arrowSize: arrowSize,
        active: location.pathname.indexOf(element.props.link) > -1
      }));
    }));
  };
  var getContent = function getContent() {
    return /*#__PURE__*/React.createElement("div", null, children ? getAccordionTitle() : getTitle(), getChildren());
  };
  return getContent();
}

var _templateObject$a, _templateObject2$8, _templateObject3$8, _templateObject4$7;
var Wrapper$9 = styled.div(_templateObject$a || (_templateObject$a = _taggedTemplateLiteral(["\n\n  height: ", ";\n\n  padding: 0 20px 0 50px;\n  background-color: #3396FB1A;\n  margin-bottom: 1px;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n  transition: background-color 0.3s ease-out;\n\n  span {\n    font-size: 12px;\n    color: #ffffff;\n    user-select: none;\n  }\n\n  ", "\n\n  "])), function (props) {
  return "".concat(props.$itemHeight, "px");
}, function (_ref) {
  var $isActive = _ref.$isActive;
  return !$isActive && css$8(_templateObject2$8 || (_templateObject2$8 = _taggedTemplateLiteral(["\n      &:hover {\n        background-color: #3396FB40;\n      }\n    "])));
});
var ActiveItem = styled.div(_templateObject3$8 || (_templateObject3$8 = _taggedTemplateLiteral(["\n\n  background-color: #3396FB80;\n\n  "])));
var Arrow = styled.div(_templateObject4$7 || (_templateObject4$7 = _taggedTemplateLiteral(["\n\n  transition: all 0.25s ease-out;\n  margin-left: auto;\n  transform: rotate(-90deg);\n  fill: #ffffff;\n\n  "])));

var Item = function Item(_ref) {
  var _ref$link = _ref.link,
    link = _ref$link === void 0 ? "" : _ref$link,
    _ref$itemHeight = _ref.itemHeight,
    itemHeight = _ref$itemHeight === void 0 ? 40 : _ref$itemHeight,
    _ref$arrowSize = _ref.arrowSize,
    arrowSize = _ref$arrowSize === void 0 ? 20 : _ref$arrowSize,
    _ref$active = _ref.active,
    active = _ref$active === void 0 ? false : _ref$active,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    activeItemClass = _useState2[0],
    SetActiveItemClass = _useState2[1];
  useCreateStyledStyle(ActiveItem, function (id) {
    return SetActiveItemClass(id);
  });
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Wrapper$9, {
    to: link,
    active: activeItemClass,
    $itemHeight: itemHeight,
    $isActive: active,
    as: ALink
  }, /*#__PURE__*/React.createElement("span", null, children), /*#__PURE__*/React.createElement(Arrow, {
    width: arrowSize,
    height: arrowSize,
    as: Arrow$2
  })));
};

var _templateObject$9;
var Wrapper$8 = styled.div(_templateObject$9 || (_templateObject$9 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  "])));

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Menu = function Menu(_ref) {
  var _ref$useLink = _ref.useLink,
    useLink = _ref$useLink === void 0 ? false : _ref$useLink,
    _ref$onlyOne = _ref.onlyOne,
    onlyOne = _ref$onlyOne === void 0 ? false : _ref$onlyOne,
    _ref$subMenuLinkArrow = _ref.subMenuLinkArrow,
    subMenuLinkArrow = _ref$subMenuLinkArrow === void 0 ? true : _ref$subMenuLinkArrow,
    _ref$subMenuHeight = _ref.subMenuHeight,
    subMenuHeight = _ref$subMenuHeight === void 0 ? 60 : _ref$subMenuHeight,
    _ref$itemHeight = _ref.itemHeight,
    itemHeight = _ref$itemHeight === void 0 ? 40 : _ref$itemHeight,
    _ref$iconSize = _ref.iconSize,
    iconSize = _ref$iconSize === void 0 ? 22 : _ref$iconSize,
    _ref$arrowSize = _ref.arrowSize,
    arrowSize = _ref$arrowSize === void 0 ? 20 : _ref$arrowSize,
    children = _ref.children;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    selected = _useState2[0],
    SetSelected = _useState2[1];
  var handleOnChange = function handleOnChange(id) {
    SetSelected(id);
  };
  return /*#__PURE__*/React.createElement(Wrapper$8, null, React.Children.map(children, function (element) {
    return /*#__PURE__*/React.cloneElement(element, _objectSpread$1(_objectSpread$1({}, element.props), {}, {
      useLink: useLink,
      onlyOne: onlyOne,
      subMenuLinkArrow: subMenuLinkArrow,
      subMenuHeight: subMenuHeight,
      itemHeight: itemHeight,
      iconSize: iconSize,
      arrowSize: arrowSize,
      isSelected: selected === element.props.id,
      onChange: handleOnChange
    }));
  }));
};
Menu.SubMenu = SubMenu;
Menu.Item = Item;

var Link$1 = function Link(props) {
  var getStyle = function getStyle(props, history) {
    return (props.className ? props.className : "") + " " + (PathMatcher(props.href, history.location.pathname) ? props.activeClass ? props.activeClass : "active" : "");
  };

  /*
  * Path'ın aynı olup olmadığını kontrol eder.
  * Örneğin bir tuşun path'i (/sports/1/country/1/tournament/17/) ise
  * fakat adres çubuğunda (/sports/1/country/1/tournament/17/match/11830252/)
  * yazıyorsa yine de kendi path'i içerisinde olduğunu anlar ve tuşa "active"
  * class'ı eklenmesi için true döner.
  *
  */
  var PathMatcher = function PathMatcher(match, href) {
    if (match === "/") {
      return match === href ? true : false;
    } else {
      var matches = match.split("/");
      var exactLastPath = matches[matches.length - 1].split("?")[0];
      var hrefs = href.split("/");
      var exactLastHrefPath = hrefs[hrefs.length - 1].split("?")[0];
      return exactLastPath === exactLastHrefPath || href.split(match + "/").length > 1;

      //return (href.split(match).length > 1);
    }
  };

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
  var handleClick = function handleClick(event, history) {
    if (props.preventClick) {
      event.preventDefault();
      return;
    }
    var currentHref = history.location.pathname + history.location.search;
    var targetHref = event.currentTarget.getAttribute("href");
    if (currentHref === targetHref) {
      event.preventDefault();
    } else {
      if (!props.target || props.target === "_self") ;
      //Pather( history, event.currentTarget.getAttribute("href") );
    }
  };

  var getLinked = function getLinked(history) {
    return /*#__PURE__*/React.createElement(Link$2, {
      to: props.href,
      onClick: function onClick(e) {
        return handleClick(e, history);
      },
      className: getStyle(props, history)
    }, props.children);
  };
  var getNaked = function getNaked(history) {
    return /*#__PURE__*/React.createElement("a", {
      href: props.preventClick ? "#" : props.href,
      className: getStyle(props, history),
      target: props.target
    }, props.children);
  };
  var getRoute = function getRoute() {
    return /*#__PURE__*/React.createElement(Route, {
      path: props.href,
      exact: true,
      children: function children(_ref) {
        var history = _ref.history;
        var isRouteLink = !props.target || props.target === "_self";
        return isRouteLink ? getLinked(history) : getNaked(history);
      }
    });
  };
  return getRoute();
};

var _templateObject$8, _templateObject2$7, _templateObject3$7, _templateObject4$6, _templateObject5$5;
var SpinAnimation = keyframes(_templateObject$8 || (_templateObject$8 = _taggedTemplateLiteral(["\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n"])));
var Wrapper$7 = styled.div(_templateObject2$7 || (_templateObject2$7 = _taggedTemplateLiteral(["\n  position: relative;\n  "])));
var SpinWrapper = styled.div(_templateObject3$7 || (_templateObject3$7 = _taggedTemplateLiteral(["\n\n  width: ", ";\n  height: ", ";\n\n  position:absolute;\n\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n\n  "])), function (props) {
  return "".concat(props.size, "px");
}, function (props) {
  return "".concat(props.size, "px");
});
var Spinner = styled.div(_templateObject4$6 || (_templateObject4$6 = _taggedTemplateLiteral(["\n\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n\n  div {\n\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border: 3px solid #fff;\n    border-radius: 50%;\n    animation: ", " 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: #fff transparent transparent transparent;\n    \n  }\n\n  div:nth-child(1) {\n    animation-delay: -0.45s;\n  }\n  \n  div:nth-child(2) {\n    animation-delay: -0.3s;\n  }\n  \n  div:nth-child(3) {\n    animation-delay: -0.15s;\n  }\n\n  "])), SpinAnimation);
var ChildrenWrapper = styled.div(_templateObject5$5 || (_templateObject5$5 = _taggedTemplateLiteral(["\n\n  opacity: ", ";\n  pointer-events: ", ";\n\n"])), function (props) {
  return "".concat(props.updating ? .5 : 1);
}, function (props) {
  return "".concat(props.updating ? 'none' : 'auto');
});

var Spin = function Spin(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 24 : _ref$size,
    _ref$updating = _ref.updating,
    updating = _ref$updating === void 0 ? true : _ref$updating,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  useEffect(function () {}, []);
  var getSpin = function getSpin() {
    return /*#__PURE__*/React.createElement(SpinWrapper, {
      size: size
    }, /*#__PURE__*/React.createElement(Spinner, null, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null)));
  };
  var getWrapper = function getWrapper() {
    return /*#__PURE__*/React.createElement(Wrapper$7, null, /*#__PURE__*/React.createElement(ChildrenWrapper, {
      updating: updating
    }, children), updating ? getSpin() : null);
  };
  return children ? getWrapper() : updating ? getSpin() : null;
};

var _templateObject$7, _templateObject2$6, _templateObject3$6, _templateObject4$5, _templateObject5$4, _templateObject6$4, _templateObject7$2, _templateObject8$2, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38;
var getStyleByType = function getStyleByType(type) {
  if (type === "default") {
    return css$8(_templateObject$7 || (_templateObject$7 = _taggedTemplateLiteral(["\n      color: #ffffff;\n      border: 1px solid #505A7D99;  \n      transition: border-color 0.2s ease-out;\n\n      span {\n        font-weight: 400;\n      }\n\n      &:hover {\n        border-color: #3598FE;\n      }\n    "])));
  }
  if (type === "link") {
    return css$8(_templateObject2$6 || (_templateObject2$6 = _taggedTemplateLiteral(["\n      span {\n\n        font-weight: 600;\n        color: #ffffff99;\n\n        &:hover {\n          color: #ffffff;\n        }\n\n      }\n    "])));
  }
  if (type === "primary") {
    return css$8(_templateObject3$6 || (_templateObject3$6 = _taggedTemplateLiteral(["\n      span {\n        color: #ffffff;\n      }\n\n      background: linear-gradient(-45deg,#1d74ce,#3598fe);\n      \n      &:hover {\n        background: linear-gradient(-45deg,#197ADD,#6CB5FF);\n      }\n    "])));
  }
  if (type === "generic") {
    return css$8(_templateObject4$5 || (_templateObject4$5 = _taggedTemplateLiteral(["\n      span {\n        color: #ffffff;\n      }\n\n      background-color: #1D2649;\n      \n      &:hover {\n        background: linear-gradient(-45deg,#197ADD,#6CB5FF);\n      }\n    "])));
  }
  if (type === "approved") {
    return css$8(_templateObject5$4 || (_templateObject5$4 = _taggedTemplateLiteral(["\n      span {\n        color: #1D2649;\n      }\n\n      background: linear-gradient(45deg,#fbda61,#f76b1c 94%);\n      \n      &:hover {\n        background: linear-gradient(45deg,#F9FB61,#F79E1C);\n      }\n    "])));
  }
  if (type === "rejected") {
    return css$8(_templateObject6$4 || (_templateObject6$4 = _taggedTemplateLiteral(["\n      span {\n        color: #ffffff;\n      }\n\n      background: linear-gradient(45deg,#870F0F,#BC2222 94%);\n      \n      &:hover {\n        background: linear-gradient(45deg,#9F1111,#E22020);\n      }\n    "])));
  }
  if (type === "pending") {
    return css$8(_templateObject7$2 || (_templateObject7$2 = _taggedTemplateLiteral(["\n      span {\n        color: #ffffff99;\n      }\n\n      background-color: #1F2952;\n      cursor: default;\n    "])));
  }
  if (type === "requested") {
    return css$8(_templateObject8$2 || (_templateObject8$2 = _taggedTemplateLiteral(["\n      span {\n        color: #ffffff4D;\n      }\n\n      background-color: #1F295280;\n      cursor: default;\n    "])));
  }
};
var getSelectedStyleByType = function getSelectedStyleByType(type) {
  if (type === "primary") {
    return css$8(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n      background: linear-gradient(-45deg,#197ADD,#6CB5FF);\n    "])));
  }
  if (type === "generic") {
    return css$8(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n      background: linear-gradient(-45deg,#197ADD,#6CB5FF);\n    "])));
  }
  if (type === "default") {
    return css$8(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n      border: 2px solid #3598FE;\n\n      span {\n        color: #3598FE;\n        font-weight: 600;\n        margin: -1px;\n      }\n    "])));
  }
  return css$8(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["background: linear-gradient(-45deg,#197ADD,#6CB5FF);"])));
};
var getSVGStyleBySize = function getSVGStyleBySize(size) {
  if (size === "small") {
    return css$8(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n      svg { width: 12px; }\n    "])));
  }
  if (size === "normal") {
    return css$8(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n      svg { width: 14px; }\n    "])));
  }
  if (size === "medium") {
    return css$8(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n      svg { width: 16px; }\n    "])));
  }
  if (size === "large") {
    return css$8(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n      svg { width: 18px; }\n    "])));
  }
  return css$8(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["svg { width: 12px; }"])));
};
var getIconStyleBySize = function getIconStyleBySize(size) {
  if (size === "small") {
    return css$8(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n      font-size: 20px;\n    "])));
  }
  if (size === "normal") {
    return css$8(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n      font-size: 22px;\n    "])));
  }
  if (size === "medium") {
    return css$8(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n      font-size: 24px;\n    "])));
  }
  if (size === "large") {
    return css$8(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n      font-size: 26px;\n    "])));
  }
  return css$8(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["font-size: 20px;"])));
};
var WrapperContent = css$8(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["\n\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n\n  border-radius: 5px;\n  padding: 0 10px;\n  cursor: pointer;\n  \n  svg {\n    fill: #ffffff;\n  }\n\n  span {\n    color: #ffffff;\n    font-weight: bold;\n    font-size: 12px;\n    line-height: 12px;\n    user-select: none;\n    transition: color 0.2s ease-out;\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", " \n\n  ", "\n\n  ", "\n  ", "\n  ", "\n\n"])), function (_ref) {
  var stretch = _ref.stretch;
  return stretch && css$8(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["\n      width: 100%;\n    "])));
}, function (_ref2) {
  var shape = _ref2.shape;
  return shape === "circle" && css$8(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["\n      border-radius: 100%;\n    "])));
}, function (_ref3) {
  var icon = _ref3.icon;
  return icon && css$8(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["\n      padding: 0 12px 0 10px;\n    "])));
}, function (_ref4) {
  var disabled = _ref4.disabled;
  return disabled && css$8(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["\n      pointer-events: none;\n      filter: grayscale(50%);\n      opacity: .5;\n    "])));
}, function (_ref5) {
  var type = _ref5.type;
  return type !== "default" && type !== "link" && css$8(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["\n      span {\n        font-weight: bold;\n        letter-spacing: -.21px;\n      }\n    "])));
}, function (_ref6) {
  var svg = _ref6.svg,
    shape = _ref6.shape,
    loading = _ref6.loading;
  return svg && shape !== "circle" && loading && css$8(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["\n      padding-left: 34px;\n    "])));
}, function (_ref7) {
  var size = _ref7.size,
    svg = _ref7.svg;
  return !svg && getSVGStyleBySize(size);
}, function (_ref8) {
  var type = _ref8.type;
  return getStyleByType(type);
}, function (_ref9) {
  var selected = _ref9.selected,
    type = _ref9.type;
  return selected && getSelectedStyleByType(type);
});
var SVG = styled.div(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["\n  \n  ", "\n\n  ", "\n\n  "])), function (_ref10) {
  var size = _ref10.size;
  return getSVGStyleBySize(size);
}, function (_ref11) {
  var singleIcon = _ref11.singleIcon;
  return !singleIcon && css$8(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["\n      margin-right: 7px;\n    "])));
});
var Image = styled(CoreImage)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["\n  margin-right: 5px;\n  width: 20px;\n  height: 20px;\n  "])));
var Hide = styled.span(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["\n  opacity: ", ";\n  "])), function (props) {
  return props.loading ? '0' : '1';
});
var CoreButton = styled.button(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["\n  ", "\n  "])), WrapperContent);
var Link = styled(ALink)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["\n  ", "\n  "])), WrapperContent);
var A = styled.a(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["\n  ", "\n  "])), WrapperContent);
var Icon$1 = styled.div(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["\n\n  color: #ffffff;\n  \n  ", "\n\n  ", "\n\n  "])), function (_ref12) {
  var size = _ref12.size;
  return getIconStyleBySize(size);
}, function (_ref13) {
  var useIconPadding = _ref13.useIconPadding;
  return useIconPadding && css$8(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["\n      margin-right: 7px;\n    "])));
});

function Button(props) {
  var _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    _props$useIconPadding = props.useIconPadding,
    useIconPadding = _props$useIconPadding === void 0 ? true : _props$useIconPadding,
    _props$stretch = props.stretch,
    stretch = _props$stretch === void 0 ? false : _props$stretch,
    _props$type = props.type,
    type = _props$type === void 0 ? "primary" : _props$type,
    _props$size = props.size,
    size = _props$size === void 0 ? "small" : _props$size,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? "" : _props$shape,
    _props$target = props.target,
    target = _props$target === void 0 ? "_self" : _props$target,
    _props$icon = props.icon,
    icon = _props$icon === void 0 ? null : _props$icon,
    _props$image = props.image,
    image = _props$image === void 0 ? null : _props$image,
    _props$svg = props.svg,
    svg = _props$svg === void 0 ? null : _props$svg,
    _props$href = props.href,
    href = _props$href === void 0 ? null : _props$href,
    _props$htmlType = props.htmlType,
    htmlType = _props$htmlType === void 0 ? null : _props$htmlType,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children,
    _props$className = props.className,
    className = _props$className === void 0 ? null : _props$className,
    _props$onClick = props.onClick,
    onClick = _props$onClick === void 0 ? null : _props$onClick;
  useEffect(function () {
    return function () {};
  }, []);

  /**
   * 
   * @returns 
   */
  var getIcon = function getIcon() {
    if (loading) return;
    if (icon) {
      return /*#__PURE__*/React.createElement(Icon$1, {
        className: icon,
        size: size,
        useIconPadding: useIconPadding
      });
    }
    if (image) {
      return /*#__PURE__*/React.createElement(Image, {
        src: image,
        height: "20",
        brokenHeight: "20"
      });
    }
    if (svg) {
      return /*#__PURE__*/React.createElement(SVG, {
        singleIcon: !children,
        size: size
      }, /*#__PURE__*/React.createElement(ReactSVG, {
        src: svg
      }));
    }
    return null;
  };
  var getChildren = function getChildren() {
    if (!children) return;
    return /*#__PURE__*/React.createElement(Hide, {
      loading: loading ? 1 : 0
    }, children);
  };
  var getButtonContent = function getButtonContent() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, getIcon(), getSpin(), getChildren());
  };
  var getSpin = function getSpin() {
    if (!loading) return null;
    return /*#__PURE__*/React.createElement(Spin, null);
  };

  /**
   * 
   * @returns 
   */
  var ClickButton = function ClickButton() {
    return /*#__PURE__*/React.createElement(A, {
      className: className,
      onClick: !loading ? onClick : null,
      shape: shape,
      icon: icon,
      disabled: disabled,
      selected: selected,
      type: type,
      stretch: stretch ? stretch : undefined,
      svg: svg,
      size: size,
      loading: loading ? 1 : 0
    }, getButtonContent());
  };

  /**
   * 
   * @returns 
   */
  var HrefButton = function HrefButton() {
    return /*#__PURE__*/React.createElement(Link, {
      className: className,
      to: href,
      target: target,
      shape: shape,
      icon: icon,
      disabled: disabled,
      selected: selected,
      type: type,
      stretch: stretch ? stretch : undefined,
      svg: svg,
      size: size,
      loading: loading ? 1 : 0
    }, getIcon(), /*#__PURE__*/React.createElement("span", null, children));
  };

  /**
   * 
   * @returns 
   */
  var SubmitButton = function SubmitButton() {
    return /*#__PURE__*/React.createElement(CoreButton, {
      className: className
      //type="submit"
      ,
      shape: shape,
      icon: icon,
      disabled: disabled,
      selected: selected,
      type: type,
      stretch: stretch ? stretch : undefined,
      svg: svg,
      size: size,
      loading: loading ? 1 : 0
    }, getButtonContent());
  };
  var getButton = function getButton() {
    if (htmlType === "submit") {
      return /*#__PURE__*/React.createElement(SubmitButton, null);
    }
    return href ? /*#__PURE__*/React.createElement(HrefButton, null) : /*#__PURE__*/React.createElement(ClickButton, null);
  };
  return getButton();
}

var DaysOfMonth = function DaysOfMonth(month, year, firstDayOfWeek) {
  var startOfMonth = moment().month(month - 1).year(year).startOf("month");
  var endOfMonth = moment().month(month - 1).year(year).endOf("month");
  var finalsOfPrevMonth = [];
  var currentMonth = [];
  var startsOfNextMonth = [];
  var iteratedDate = null;
  iteratedDate = startOfMonth.clone();
  while (iteratedDate.day() !== firstDayOfWeek) {
    iteratedDate.subtract(1, "day");
    finalsOfPrevMonth.push(iteratedDate.format("L"));
  }
  iteratedDate = startOfMonth.clone();
  while (iteratedDate.month() === month - 1) {
    currentMonth.push(iteratedDate.format("L"));
    iteratedDate.add(1, "day");
  }
  iteratedDate = endOfMonth.clone();
  while (finalsOfPrevMonth.length + currentMonth.length + startsOfNextMonth.length < 42) {
    iteratedDate.add(1, "day");
    startsOfNextMonth.push(iteratedDate.format("L"));
  }
  return [].concat(_toConsumableArray(finalsOfPrevMonth.reverse()), currentMonth, startsOfNextMonth);
};

var _templateObject$6, _templateObject2$5, _templateObject3$5, _templateObject4$4, _templateObject5$3, _templateObject6$3;
var Wrapper$6 = styled.div(_templateObject$6 || (_templateObject$6 = _taggedTemplateLiteral(["\n\n  position: relative;\n  cursor: pointer;\n  border-radius: 4px;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &::before {\n\n    position: absolute;\n    top: 50%;\n    right: 0;\n    left: 0;\n    z-index: 1;\n    height: 30px;\n    -webkit-transform: translateY(-50%);\n    transform: translateY(-50%);\n    content: \"\";\n\n  }\n\n  span {\n\n    font-size: 13px;\n    letter-spacing: -.5;\n    font-weight: 400;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    position: relative;\n    min-width: 30px;\n    height: 30px;\n    line-height: 30px;\n    border-radius: 50px;\n\n    transition: background-color 0.15s ease-out;\n\n  }\n\n  &:hover {\n\n    span {\n      color: #3598FE;\n      background-color: #0E1531;\n    }\n\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n\n  ", "\n\n"])), function (_ref) {
  var today = _ref.today;
  return today && css$8(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteral(["\n      span {\n        border: 1px solid #3598FE80;\n      }\n    "])));
}, function (_ref2) {
  var selected = _ref2.selected;
  return selected && css$8(_templateObject3$5 || (_templateObject3$5 = _taggedTemplateLiteral(["\n      span {\n        color: #3598FE;\n        background-color: #0E1531;\n      }\n    "])));
}, function (_ref3) {
  var current = _ref3.current;
  return current ? css$8(_templateObject4$4 || (_templateObject4$4 = _taggedTemplateLiteral(["\n        span {\n          color: #ffffff;\n        }\n      "]))) : css$8(_templateObject5$3 || (_templateObject5$3 = _taggedTemplateLiteral(["\n        span {\n          color: #ffffff80;\n        }\n      "])));
}, function (_ref4) {
  var disabled = _ref4.disabled;
  return disabled && css$8(_templateObject6$3 || (_templateObject6$3 = _taggedTemplateLiteral(["\n      pointer-events: none;\n      \n      &::before {\n        background-color: none;\n        background-color: #0E153180;\n      }\n\n      span {\n        background: 0 0;\n        color: #ffffff40;\n      }\n    "])));
});

function Day(_ref) {
  var _ref$date = _ref.date,
    date = _ref$date === void 0 ? "" : _ref$date,
    _ref$today = _ref.today,
    today = _ref$today === void 0 ? false : _ref$today,
    _ref$current = _ref.current,
    current = _ref$current === void 0 ? false : _ref$current,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$selected = _ref.selected,
    selected = _ref$selected === void 0 ? false : _ref$selected,
    _ref$handleClick = _ref.handleClick,
    handleClick = _ref$handleClick === void 0 ? null : _ref$handleClick,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children;
  var getDay = function getDay() {
    return /*#__PURE__*/React.createElement(Wrapper$6, {
      today: today,
      selected: selected,
      disabled: disabled,
      current: current,
      onClick: function onClick() {
        return handleClick(date);
      }
    }, /*#__PURE__*/React.createElement("span", null, children));
  };
  return getDay();
}

var _templateObject$5, _templateObject2$4, _templateObject3$4, _templateObject4$3, _templateObject5$2, _templateObject6$2;
var Wrapper$5 = styled.div(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteral(["\n\n  display: flex;\n  height: 40px;\n\n"])));
var Middle = styled.div(_templateObject2$4 || (_templateObject2$4 = _taggedTemplateLiteral(["\n\n  flex: auto;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n\n  a {\n\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n    \n    transition: color .15s ease-out;\n    color: #ffffff;\n\n    &:nth-child(2) {\n      margin-left: 5px;\n    }\n\n    &:hover {\n      color: #3598FE;\n    }\n  }\n\n"])));
var NextMonth = styled.a(_templateObject3$4 || (_templateObject3$4 = _taggedTemplateLiteral(["\n\n  span {\n    transform: rotate(135deg);\n    position: relative;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n  }\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  flex: none;\n  min-width: 22px;\n\n  transition: color .15s ease-out;\n  color: #ffffff80;\n\n  &:hover {\n    color: #ffffff;\n  }\n  \n  span::before, span::after {\n      \n    position: absolute;\n    top: 0;\n    left: 0;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n    border: 0 solid;\n    border-width: 2px 0 0 2px;\n    content: \"\";\n\n  }\n\n\n"])));
var PrevMonth = styled.a(_templateObject4$3 || (_templateObject4$3 = _taggedTemplateLiteral(["\n\n  span {\n    transform: rotate(-45deg);\n    position: relative;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n  }\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  flex: none;\n  min-width: 22px;\n\n  transition: color .15s ease-out;\n  color: #ffffff80;\n\n  &:hover {\n    color: #ffffff;\n  }\n  \n  span::before, span::after {\n      \n    position: absolute;\n    top: 0;\n    left: 0;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n    border: 0 solid;\n    border-width: 2px 0 0 2px;\n    content: \"\";\n\n  }\n\n\n"])));
var NextYear = styled.a(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteral(["\n\n  span {\n    transform: rotate(135deg);\n    position: relative;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n  }\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  flex: none;\n  min-width: 22px;\n\n  transition: color .15s ease-out;\n  color: #ffffff80;\n\n  &:hover {\n    color: #ffffff;\n  }\n  \n  span::before, span::after {\n      \n    position: absolute;\n    top: 0;\n    left: 0;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n    border: 0 solid;\n    border-width: 2px 0 0 2px;\n    content: \"\";\n\n  }\n\n  span::after {\n    top: 4px;\n    left: 4px;\n  }\n\n"])));
var PrevYear = styled.a(_templateObject6$2 || (_templateObject6$2 = _taggedTemplateLiteral(["\n\n  span {\n    transform: rotate(-45deg);\n    position: relative;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n  }\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  flex: none;\n  min-width: 22px;\n\n  transition: color .15s ease-out;\n  color: #ffffff80;\n\n  &:hover {\n    color: #ffffff;\n  }\n  \n  span::before, span::after {\n      \n    position: absolute;\n    top: 0;\n    left: 0;\n    display: inline-block;\n    width: 7px;\n    height: 7px;\n    border: 0 solid;\n    border-width: 2px 0 0 2px;\n    content: \"\";\n\n  }\n\n  span::after {\n    top: 4px;\n    left: 4px;\n  }\n\n"])));

function Header(props) {
  var _props$month = props.month,
    month = _props$month === void 0 ? "" : _props$month,
    _props$year = props.year,
    year = _props$year === void 0 ? "" : _props$year,
    _props$onPrevYear = props.onPrevYear,
    onPrevYear = _props$onPrevYear === void 0 ? null : _props$onPrevYear,
    _props$onPrevMonth = props.onPrevMonth,
    onPrevMonth = _props$onPrevMonth === void 0 ? null : _props$onPrevMonth,
    _props$onNextMonth = props.onNextMonth,
    onNextMonth = _props$onNextMonth === void 0 ? null : _props$onNextMonth,
    _props$onNextYear = props.onNextYear,
    onNextYear = _props$onNextYear === void 0 ? null : _props$onNextYear;
  useEffect(function () {}, []);
  var getHeader = function getHeader() {
    return /*#__PURE__*/React.createElement(Wrapper$5, null, /*#__PURE__*/React.createElement(PrevYear, {
      onClick: onPrevYear
    }, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement(PrevMonth, {
      onClick: onPrevMonth
    }, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement(Middle, null, /*#__PURE__*/React.createElement("div", null, month), /*#__PURE__*/React.createElement("div", null, year)), /*#__PURE__*/React.createElement(NextMonth, {
      onClick: onNextMonth
    }, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement(NextYear, {
      onClick: onNextYear
    }, /*#__PURE__*/React.createElement("span", null)));
  };
  return getHeader();
}

var _templateObject$4, _templateObject2$3, _templateObject3$3, _templateObject4$2;
var Wrapper$4 = styled.div(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteral(["\n\n  width: 280px;\n  border-radius: 6px;\n  background-color: #1D2649;\n  padding: 4px 14px 14px 14px;\n\n"])));
var Days = styled.div(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteral(["\n\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-gap: 4px 0;\n\n"])));
var WeekShortDays = styled.div(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteral(["\n\n  display: grid;\n  grid-gap: 0;\n  grid-template-columns: repeat(7, 1fr);\n  font-size: 13px;\n  line-height: 30px;\n  text-align: center;\n\n  > div {\n    \n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    span {\n      color: #ffffff;\n      font-weight: bold;\n    }\n\n  }\n\n"])));
var Separator = styled.div(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteral(["\n\n  width: 100%;\n  height: 1px;\n  margin: 4px 0;\n  background-color: #505A7D60;\n\n"])));

var Calendar = /*#__PURE__*/forwardRef(function (props, ref) {
  var _useContext = useContext(QTDContext),
    dateFormat = _useContext.dateFormat,
    locale = _useContext.locale;
  var _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? "" : _props$defaultValue,
    _props$className = props.className,
    className = _props$className === void 0 ? null : _props$className,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$disabledDate = props.disabledDate,
    disabledDate = _props$disabledDate === void 0 ? null : _props$disabledDate;
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    firstDayOfWeek = _useState2[0],
    SetFirstDayOfWeek = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    weekdaysShort = _useState4[0],
    SetWeekdaysShort = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    data = _useState6[0],
    SetData = _useState6[1];
  var _useState7 = useState(moment()),
    _useState8 = _slicedToArray(_useState7, 2),
    dateObject = _useState8[0],
    SetDateObject = _useState8[1];
  var _useState9 = useState(null),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedDay = _useState10[0],
    SetSelectedDay = _useState10[1];
  var convertToMoment = function convertToMoment(date) {
    return moment(date, "MM/DD/YYYY");
  };
  //const month = () => dateObject.format("MMMM");
  var year = function year() {
    return dateObject.format("Y");
  };
  //const currentDay = () => dateObject.format("D");
  var monthOrder = function monthOrder() {
    return dateObject.format("M");
  };
  useEffect(function () {
    load();
    formatAndSaveDay(defaultValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    formatAndSaveDay(value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useEffect(function () {
    getDays();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateObject]);
  var formatAndSaveDay = function formatAndSaveDay(_day) {
    if (_day === "") return;
    var day = moment(moment(_day, dateFormat), 'MM/DD/YYYY');
    SetSelectedDay(day);
    SetDateObject(day);
  };
  var load = function load() {
    axios.get("/locales/".concat(locale, "/calendar.json")).then(function (response) {
      success(response.data);
    }).catch(function (err) {
      console.error(err);
    });
  };
  var success = function success(result) {
    moment.locale("en");
    SetData(result);
    SetWeekdaysShort(result.weekdaysShort);
    SetFirstDayOfWeek(result.firstDay);

    /*
    console.table("year");
    console.table(year());
    console.table("currentDay");
    console.table(currentDay());
    console.table("month");
    console.table(month());
    console.table("monthOrder");
    console.table(monthOrder());
     console.log("moment().endOf('day'): " + moment().endOf('day'));
    */
  };

  var isDisabledDate = function isDisabledDate(current) {
    if (disabledDate) return disabledDate(current);
    return false;
  };
  var handleDayClick = function handleDayClick(date) {
    var localizatedDate = moment(new Date(date)).format(dateFormat);
    if (onChange) {
      onChange({
        localizated: localizatedDate,
        global: moment(new Date(date)).format("YYYY-MM-DD")
      });
    }
  };
  var getDays = function getDays() {
    var fullDays = DaysOfMonth(monthOrder(), year(), firstDayOfWeek);
    var days = [];
    for (var i = 0; i < fullDays.length; i++) {
      var date = convertToMoment(fullDays[i]);
      var dayProps = {
        key: i,
        date: date,
        handleClick: handleDayClick
      };
      if (date.isSame(convertToMoment(moment().format('MM/DD/YYYY')))) dayProps.today = true;
      if (date.isSame(selectedDay)) dayProps.selected = true;
      if (date.format("M") === monthOrder()) dayProps.current = true;
      if (isDisabledDate(date)) dayProps.disabled = true;
      days.push( /*#__PURE__*/React.createElement(Day, dayProps, date.format("D")));
    }
    return days;
  };
  var getWeekShortDays = function getWeekShortDays() {
    var days = [];
    for (var i = 0; i < weekdaysShort.length; i++) {
      days.push( /*#__PURE__*/React.createElement("div", {
        key: i
      }, /*#__PURE__*/React.createElement("span", null, weekdaysShort[i])));
    }
    return days;
  };
  var onPrev = function onPrev(type) {
    SetDateObject(dateObject.clone().subtract(1, type));
  };
  var onNext = function onNext(type) {
    SetDateObject(dateObject.clone().add(1, type));
  };
  var getCalendar = function getCalendar() {
    return /*#__PURE__*/React.createElement(Wrapper$4, {
      className: className
    }, /*#__PURE__*/React.createElement(Header, {
      month: data.months[monthOrder() - 1],
      year: year(),
      onPrevYear: function onPrevYear() {
        return onPrev("year");
      },
      onPrevMonth: function onPrevMonth() {
        return onPrev("month");
      },
      onNextYear: function onNextYear() {
        return onNext("year");
      },
      onNextMonth: function onNextMonth() {
        return onNext("month");
      }
    }), /*#__PURE__*/React.createElement(Separator, null), /*#__PURE__*/React.createElement(WeekShortDays, null, getWeekShortDays()), /*#__PURE__*/React.createElement(Days, null, getDays()));
  };
  return !data ? null : getCalendar();
});

var Lock = function Lock(_ref) {
  var className = _ref.className,
    height = _ref.height,
    width = _ref.width;
    _ref.fill;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    height: height,
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 15.56 20"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.77777778,0 C11.0185185,0 13.6111111,2.5 13.6111111,5.625 L13.6111111,5.625 L13.6111111,8.125 C14.712963,8.125 15.5555556,8.9375 15.5555556,10 L15.5555556,10 L15.5555556,18.125 C15.5555556,19.1875 14.712963,20 13.6111111,20 L13.6111111,20 L1.94444444,20 C0.842592593,20 0,19.1875 0,18.125 L0,18.125 L0,10 C0,8.9375 0.842592593,8.125 1.94444444,8.125 L1.94444444,8.125 L1.94444444,5.625 C1.94444444,2.5 4.53703704,0 7.77777778,0 Z M13.6111111,9.375 L1.94444444,9.375 C1.55555556,9.375 1.2962963,9.625 1.2962963,10 L1.2962963,10 L1.2962963,18.125 C1.2962963,18.5 1.55555556,18.75 1.94444444,18.75 L1.94444444,18.75 L13.6111111,18.75 C14,18.75 14.2592593,18.5 14.2592593,18.125 L14.2592593,18.125 L14.2592593,10 C14.2592593,9.625 14,9.375 13.6111111,9.375 L13.6111111,9.375 Z M7.77777778,11.25 C8.87962963,11.25 9.72222222,12.0625 9.72222222,13.125 C9.72222222,13.9375 9.2037037,14.625 8.42592593,14.875 L8.42592593,14.875 L8.42592593,16.25 C8.42592593,16.625 8.16666667,16.875 7.77777778,16.875 C7.38888889,16.875 7.12962963,16.625 7.12962963,16.25 L7.12962963,16.25 L7.12962963,14.875 C6.35185185,14.625 5.83333333,13.9375 5.83333333,13.125 C5.83333333,12.0625 6.67592593,11.25 7.77777778,11.25 Z M7.77777778,12.5 C7.38888889,12.5 7.12962963,12.75 7.12962963,13.125 C7.12962963,13.5 7.38888889,13.75 7.77777778,13.75 C8.16666667,13.75 8.42592593,13.5 8.42592593,13.125 C8.42592593,12.75 8.16666667,12.5 7.77777778,12.5 Z M7.77777778,1.25 C5.25,1.25 3.24074074,3.1875 3.24074074,5.625 L3.24074074,5.625 L3.24074074,8.125 L12.3148148,8.125 L12.3148148,5.625 C12.3148148,3.1875 10.3055556,1.25 7.77777778,1.25 Z"
  }));
};

var css = ".qtd__formElement__6ab363ae{border-radius:6px;display:flex;justify-content:space-between;padding:0 15px;position:relative;transition:background-color .2s ease;width:100%}.qtd__floatingInput__6ab363ae{caret-color:#ffffffd9;color:#ffffffd9;font-size:13px}.qtd__middle__6ab363ae{justify-self:flex-start;width:100%}.qtd__filled__6ab363ae{background-color:#0e153180}.qtd__filled__6ab363ae:focus-within,.qtd__filled__6ab363ae:hover{background-color:#0e1531bf}.qtd__inverted__6ab363ae{border:1px solid #505a7d99}.qtd__inverted__6ab363ae:focus-within,.qtd__inverted__6ab363ae:hover{border-color:#3598fe}.qtd__dashed__6ab363ae .qtd__errorBorder__6ab363ae{border-style:dashed}.qtd__dashed__6ab363ae:after{border:1px dashed #505a7d99;border-radius:6px;content:\"\";height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.qtd__dashed__6ab363ae:focus-within:after,.qtd__dashed__6ab363ae:hover:after{border-color:#505a7d}.qtd__small__6ab363ae{height:40px;padding-top:13px}.qtd__medium__6ab363ae{height:46px;padding-top:13px}.qtd__large__6ab363ae{height:50px;padding-top:13px}.qtd__floatingInput__6ab363ae::-webkit-input-placeholder{color:transparent}.qtd__floatingInput__6ab363ae::placeholder{color:transparent}.qtd__floatingInput__6ab363ae:disabled :not(.qtd__floatingInput__6ab363ae[data-locked=true]),.qtd__floatingInput__6ab363ae:disabled:not(.qtd__floatingInput__6ab363ae[data-locked=true]){opacity:.5}.qtd__floatingLabel__6ab363ae{display:block;font-weight:500;max-height:0;pointer-events:none;position:relative}.qtd__floatingLabel__6ab363ae:before{-webkit-backface-visibility:hidden;backface-visibility:hidden;color:#ffffff99;content:attr(data-content);display:inline-block;-webkit-filter:blur(0);filter:blur(0);position:relative;-webkit-transform-origin:left top;transform-origin:left top;transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out}.qtd__floatingInput__6ab363ae:placeholder-shown+.qtd__floatingLabel__6ab363ae:before{font-smooth:always;-webkit-font-smoothing:antialiased;-webkit-transform:translate3d(0,-32px,0) scale3d(.8,.8,1);transform:translate3d(0,-32px,0) scale3d(.8,.8,1)}.qtd__floatingInput__6ab363ae:focus+.qtd__floatingLabel__6ab363ae:before,.qtd__floatingLabel__6ab363ae:before{-webkit-transform:translate3d(0,-40px,0) scale3d(.76,.76,1);transform:translate3d(0,-40px,0) scale3d(.76,.76,1)}.qtd__floatingInput__6ab363ae:focus+.qtd__floatingLabel__6ab363ae:before{color:#ffffff99}.qtd__hiddenVisually__6ab363ae{clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);border:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.qtd__prefix__6ab363ae{align-items:center;display:flex;margin-right:10px}.qtd__suffix__6ab363ae{grid-column-gap:5px;align-items:center;display:grid;grid-auto-flow:column;justify-self:flex-end}.qtd__lockIcon__6ab363ae{fill:#ffffff80}.qtd__failed__6ab363ae,.qtd__success__6ab363ae,.qtd__warning__6ab363ae{align-items:center;color:#ffffffcc;cursor:pointer;display:flex;float:left;font-size:10px;height:100%;line-height:10px;margin:0}.qtd__failed__6ab363ae:hover,.qtd__success__6ab363ae:hover,.qtd__warning__6ab363ae:hover{color:#fff}.qtd__failed__6ab363ae:before,.qtd__success__6ab363ae:before,.qtd__warning__6ab363ae:before{border-radius:50px;padding:4px}.qtd__failed__6ab363ae:before{background-color:#870f0f}.qtd__errorTooltip__6ab363ae{align-items:flex-end;background:#870f0f;border-radius:5px;bottom:43px;color:#fff;display:flex;font-size:12px;justify-content:center;line-height:14px;max-width:210px;padding:10px 7px;position:absolute;right:0;width:-webkit-max-content;width:max-content;z-index:2}.qtd__errorTooltip__6ab363ae:after{border-left:7px solid transparent;border-right:7px solid transparent;border-top:10px solid #870f0f;bottom:-6px;content:\"\";height:0;position:absolute;right:17px;width:0}.qtd__errorBorder__6ab363ae{border:1px solid #870f0f;border-radius:6px;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:1}";
var modules_02792f97 = {"formElement":"qtd__formElement__6ab363ae","floatingInput":"qtd__floatingInput__6ab363ae","middle":"qtd__middle__6ab363ae","filled":"qtd__filled__6ab363ae","inverted":"qtd__inverted__6ab363ae","dashed":"qtd__dashed__6ab363ae","errorBorder":"qtd__errorBorder__6ab363ae","small":"qtd__small__6ab363ae","medium":"qtd__medium__6ab363ae","large":"qtd__large__6ab363ae","floatingLabel":"qtd__floatingLabel__6ab363ae","hiddenVisually":"qtd__hiddenVisually__6ab363ae","prefix":"qtd__prefix__6ab363ae","suffix":"qtd__suffix__6ab363ae","lockIcon":"qtd__lockIcon__6ab363ae","failed":"qtd__failed__6ab363ae","success":"qtd__success__6ab363ae","warning":"qtd__warning__6ab363ae","errorTooltip":"qtd__errorTooltip__6ab363ae"};
n(css,{});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * https://github.com/sanniassin/react-input-mask
 * http://sanniassin.github.io/react-input-mask/demo.html
 * https://dev.to/adrianbdesigns/let-s-create-a-floating-label-input-with-html-and-css-only-4mo8
 */
var Input = /*#__PURE__*/forwardRef(function (props, ref) {
  var inputRef = useRef(null);
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    currentValue = _useState2[0],
    SetCurrentValue = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    errorMessage = _useState4[0],
    SetErrorMessage = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    keepFocused = _useState6[0],
    SetKeepFocused = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showErrorTooltip = _useState8[0],
    SetShowErrorTooltip = _useState8[1];
  var _useState9 = useState(modules_02792f97.medium),
    _useState10 = _slicedToArray(_useState9, 2),
    sizeStyle = _useState10[0],
    SetSizeStyle = _useState10[1];
  var _useState11 = useState(modules_02792f97.filled),
    _useState12 = _slicedToArray(_useState11, 2),
    variantStyle = _useState12[0],
    SetVariantStyle = _useState12[1];
  var _useState13 = useState(""),
    _useState14 = _slicedToArray(_useState13, 2),
    floatValue = _useState14[0],
    SetFloatValue = _useState14[1];
  var _props$id = props.id,
    id = _props$id === void 0 ? v4() : _props$id,
    _props$label = props.label,
    label = _props$label === void 0 ? "" : _props$label,
    _props$message = props.message,
    message = _props$message === void 0 ? null : _props$message,
    _props$value = props.value,
    value = _props$value === void 0 ? "" : _props$value,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? "" : _props$defaultValue,
    _props$type = props.type,
    type = _props$type === void 0 ? "text" : _props$type,
    _props$size = props.size,
    size = _props$size === void 0 ? "medium" : _props$size,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? "filled" : _props$variant,
    _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? null : _props$prefix,
    _props$suffix = props.suffix,
    suffix = _props$suffix === void 0 ? null : _props$suffix,
    _props$maxLength = props.maxLength,
    maxLength = _props$maxLength === void 0 ? -1 : _props$maxLength,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$locked = props.locked,
    locked = _props$locked === void 0 ? false : _props$locked,
    _props$autoComplete = props.autoComplete,
    autoComplete = _props$autoComplete === void 0 ? false : _props$autoComplete,
    _props$numberFormat = props.numberFormat,
    numberFormat = _props$numberFormat === void 0 ? false : _props$numberFormat,
    _props$keepFocus = props.keepFocus,
    keepFocus = _props$keepFocus === void 0 ? false : _props$keepFocus,
    _props$focusRef = props.focusRef,
    focusRef = _props$focusRef === void 0 ? null : _props$focusRef,
    _props$mask = props.mask,
    mask = _props$mask === void 0 ? null : _props$mask,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$onUpdate = props.onUpdate,
    onUpdate = _props$onUpdate === void 0 ? null : _props$onUpdate,
    _props$onFocus = props.onFocus,
    onFocus = _props$onFocus === void 0 ? null : _props$onFocus,
    _props$onBlur = props.onBlur,
    onBlur = _props$onBlur === void 0 ? null : _props$onBlur,
    _props$onPressEnter = props.onPressEnter,
    onPressEnter = _props$onPressEnter === void 0 ? null : _props$onPressEnter,
    _props$onKeyDown = props.onKeyDown,
    onKeyDown = _props$onKeyDown === void 0 ? null : _props$onKeyDown,
    _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children;

  /**
   * 
   */
  useEffect(function () {
    if (modules_02792f97[variant]) SetVariantStyle(modules_02792f97[variant]);
    if (modules_02792f97[size]) SetSizeStyle(modules_02792f97[size]);
    setCurrentValueAndSend(defaultValue);
    checkFocus();
    return function () {
      if (focusRef) {
        addRemoveListeners(false);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 
   */
  useEffect(function () {
    setCurrentValueAndSend(value, value === "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  var setCurrentValueAndSend = function setCurrentValueAndSend() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var skipValidation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    SetCurrentValue(value);
    if (onChange) onChange(value);
    if (onUpdate) onUpdate(value, skipValidation);
  };

  /**
   * 
   * 
   * 
   * @param {*} value 
   */
  var addRemoveListeners = function addRemoveListeners(value) {
    var listener = value ? "addEventListener" : "removeEventListener";
    document[listener]("pointerdown", handleClickOutside, false);
  };

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  var handleClickOutside = function handleClickOutside(event) {
    SetKeepFocused(focusRef.current && focusRef.current.contains(event.target));
  };

  /**
   * 
   * 
   */
  var checkFocus = function checkFocus() {
    if (keepFocus && inputRef.current) {
      inputRef.current.focus();
      if (focusRef) {
        addRemoveListeners(true);
      }
    }
  };

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, function () {
    return {
      setFocus: function setFocus() {
        inputRef.current.focus();
        SetKeepFocused(true);
      },
      reset: function reset() {
        SetFloatValue("");
        setCurrentValueAndSend(defaultValue, true);
      },
      setValue: function setValue(value) {
        SetFloatValue(value);
        setCurrentValueAndSend(value);
      },
      getValue: function getValue() {
        return currentValue;
      },
      setError: function setError(message) {
        SetErrorMessage(message);
      },
      forceUpdate: function forceUpdate() {
        if (onUpdate) onUpdate(currentValue);
      },
      clear: function clear() {
        SetCurrentValue("");
      }
    };
  });

  /**
   * 
   * Input içerisindeki herhangi bir değer değiştiğinde
   * tetiklenir.
   * 
   * @param {*} event 
   */
  var onHandleChange = function onHandleChange(e) {
    var value = e.target.value;

    //SetErrorMessage(null);

    if (!onChange && !onUpdate) {
      console.warn("Input: 'onChange' method couldn't be called because it is not defined!");
    }
    var skipValidation = mask && value.replace(/\D+/g, '').length < mask.replace(/\D+/g, '').length;
    setCurrentValueAndSend(value, skipValidation);
  };
  var handleAmountChange = function handleAmountChange(values) {
    setCurrentValueAndSend(values.value, true);
    SetFloatValue(values.formattedValue);
  };

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  var handleOnFocus = function handleOnFocus(event) {
    if (onFocus) {
      onFocus(event);
    }
  };

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  var handleOnBlur = function handleOnBlur(event) {
    if (keepFocus && keepFocused) {
      inputRef.current.focus();
    }
    if (onBlur) onBlur(event);
    if (mask) {
      if (currentValue.replace(/\D+/g, '').length < mask.replace(/\D+/g, '').length) {
        setCurrentValueAndSend(defaultValue, true);
      }
    }
  };

  /**
   * 
   * 
   * 
   * @param {*} event 
   */
  var handleKeyDown = function handleKeyDown(event) {
    if (event.keyCode === 13 && onPressEnter) {
      onPressEnter(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  /**
   * 
   */
  var getInput = function getInput() {
    var inputProps = {
      id: id,
      placeholder: label,
      value: currentValue,
      type: type,
      message: message,
      className: getInputStyle(),
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
      onKeyDown: handleKeyDown,
      disabled: disabled || locked,
      ref: inputRef
    };
    if (locked) {
      inputProps['data-locked'] = locked.toString();
    }
    if (autoComplete) {
      inputProps = _objectSpread(_objectSpread({}, inputProps), {}, {
        autoComplete: id
      });
    }
    if (mask) {
      inputProps = _objectSpread(_objectSpread({}, inputProps), {}, {
        mask: mask,
        maskPlaceholder: "_",
        alwaysShowMask: false,
        onChange: onHandleChange
        //beforeMaskedValueChange:this.beforeMaskedValueChange
      });

      return /*#__PURE__*/React.createElement(InputMask, inputProps);
    } else {
      if (numberFormat) {
        inputProps = _objectSpread(_objectSpread({}, inputProps), {}, {
          maxLength: maxLength,
          thousandSeparator: true,
          value: floatValue,
          onValueChange: handleAmountChange
        });
        return /*#__PURE__*/React.createElement(NumberFormat, inputProps);
      } else {
        inputProps = _objectSpread(_objectSpread({}, inputProps), {}, {
          maxLength: maxLength,
          onChange: onHandleChange
        });
        return /*#__PURE__*/React.createElement("input", inputProps);
      }
    }
  };

  /**
   * 
   */
  var getLabel = function getLabel() {
    return /*#__PURE__*/React.createElement("label", {
      htmlFor: id,
      className: modules_02792f97.floatingLabel,
      disabled: disabled,
      "data-content": label
    }, /*#__PURE__*/React.createElement("span", {
      className: modules_02792f97.hiddenVisually
    }, label));
  };
  var getPrefix = function getPrefix() {
    if (!prefix) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97.prefix
    }, prefix);
  };

  /**
   * 
   */
  var getSuffix = function getSuffix() {
    return /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97.suffix
    }, suffix ? suffix : locked ? /*#__PURE__*/React.createElement(Lock, {
      width: "18",
      height: "18",
      className: modules_02792f97.lockIcon
    }) : null, getErrors());
  };
  /**
   * 
   */
  var getErrorBorder = function getErrorBorder() {
    if (errorMessage !== null) {
      return /*#__PURE__*/React.createElement("div", {
        className: modules_02792f97.errorBorder
      });
    }
  };

  /**
   * 
   */
  var getErrors = function getErrors() {
    if (!errorMessage) return null;
    return /*#__PURE__*/React.createElement("div", {
      "data-icon": "i",
      className: modules_02792f97.failed,
      onPointerOver: function onPointerOver() {
        return SetShowErrorTooltip(true);
      },
      onPointerOut: function onPointerOut() {
        return SetShowErrorTooltip(false);
      }
    }, showErrorTooltip ? /*#__PURE__*/React.createElement("span", {
      className: modules_02792f97.errorTooltip
    }, errorMessage) : null);
  };
  var getInputStyle = function getInputStyle() {
    return modules_02792f97.floatingInput + " " + sizeStyle;
  };
  var getElementStyle = function getElementStyle() {
    return modules_02792f97.formElement + " " + variantStyle;
  };

  /**
   * 
   * @returns 
   */
  var getContent = function getContent() {
    return /*#__PURE__*/React.createElement("div", {
      className: getElementStyle()
    }, getPrefix(), /*#__PURE__*/React.createElement("div", {
      className: modules_02792f97.middle
    }, getInput(), getLabel(), getErrorBorder()), getSuffix());
  };
  return children ? new Error("Remove the children!") : getContent();
});

var _templateObject$3, _templateObject2$2, _templateObject3$2, _templateObject4$1, _templateObject5$1, _templateObject6$1, _templateObject7$1, _templateObject8$1;
var Wrapper$3 = styled.div(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n  \n  position: relative;\n\n  ", "\n\n  "])), function (_ref) {
  var disabled = _ref.disabled;
  return disabled && css$8(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral(["\n      opacity: .75;\n      cursor: not-allowed;\n      pointer-events: none;\n    "])));
});
var CalendarWrapper = styled.div(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteral(["\n  box-shadow: 0 0 30px rgba(0,0,0,.25);\n  z-index: 2;\n  position: absolute;\n  top: calc(100% + 10px);\n  left: 0;\n\n  transform-origin: 50% 1%;\n  transform-box: fill-box;\n  transition-timing-function: cubic-bezier(.75,-0.5,0,1.25);\n  "])));
var Icon = styled.div(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral(["\n  margin: 0;\n  margin-right: 0px;\n  color: #ffffff99;\n  float: left;\n  font-size: 20px;\n  "])));
var ModalEnter = styled.div(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral(["\n  opacity: 0;\n  transform: translateY(-10px) ;\n"])));
var ModalEnterActive = styled.div(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral(["\n  opacity: 1;\n  transform: translateY(0) ;\n  transition: opacity 250ms, transform 250ms;\n"])));
var ModalExit = styled.div(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral(["\n  opacity: 1;\n"])));
var ModalExitActive = styled.div(_templateObject8$1 || (_templateObject8$1 = _taggedTemplateLiteral(["\n  opacity: 0;\n  transform: translateY(-10px) ;\n  transition: opacity 250ms, transform 250ms;\n"])));

/*
https://stackoverflow.com/questions/41181372/chrome-mousedown-and-mouseup-events-no-longer-working-other-browsers-are-fine/41238807#41238807
*/
var DatePicker = /*#__PURE__*/forwardRef(function (props, ref) {
  var _useContext = useContext(QTDContext),
    dateFormat = _useContext.dateFormat,
    locale = _useContext.locale;
  var wrapperRef = useRef(null);
  var inputRef = useRef(null);
  var nodeRef = useRef(null);
  var _props$name = props.name,
    name = _props$name === void 0 ? "datepicker" : _props$name,
    _props$label = props.label,
    label = _props$label === void 0 ? "" : _props$label,
    _props$mask = props.mask,
    mask = _props$mask === void 0 ? null : _props$mask,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? {
      localizated: "",
      global: ""
    } : _props$defaultValue,
    _props$onUpdate = props.onUpdate,
    onUpdate = _props$onUpdate === void 0 ? null : _props$onUpdate,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? null : _props$onChange,
    _props$disabledDate = props.disabledDate,
    disabledDate = _props$disabledDate === void 0 ? null : _props$disabledDate;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    SetInputValue = _useState2[1];
  var _useState3 = useState(defaultValue),
    _useState4 = _slicedToArray(_useState3, 2),
    enteredValue = _useState4[0],
    SetEnteredValue = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    errorMessage = _useState6[0],
    SetErrorMessage = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isOpen = _useState8[0],
    SetIsOpen = _useState8[1];

  /**
   * Styled Components
   */
  var _useState9 = useState(""),
    _useState10 = _slicedToArray(_useState9, 2),
    clanderWrapperClass = _useState10[0],
    SetClanderWrapperClass = _useState10[1];
  var _useState11 = useState(""),
    _useState12 = _slicedToArray(_useState11, 2),
    modalEnterClass = _useState12[0],
    SetModalEnterClass = _useState12[1];
  var _useState13 = useState(""),
    _useState14 = _slicedToArray(_useState13, 2),
    modalEnterActiveClass = _useState14[0],
    SetModalEnterActiveClass = _useState14[1];
  var _useState15 = useState(""),
    _useState16 = _slicedToArray(_useState15, 2),
    modalExitClass = _useState16[0],
    SetModalExitClass = _useState16[1];
  var _useState17 = useState(""),
    _useState18 = _slicedToArray(_useState17, 2),
    modalExitActiveClass = _useState18[0],
    SetModalExitActiveClass = _useState18[1];
  useCreateStyledStyle(CalendarWrapper, function (id) {
    return SetClanderWrapperClass(id);
  });
  useCreateStyledStyle(ModalEnter, function (id) {
    return SetModalEnterClass(id);
  });
  useCreateStyledStyle(ModalEnterActive, function (id) {
    return SetModalEnterActiveClass(id);
  });
  useCreateStyledStyle(ModalExit, function (id) {
    return SetModalExitClass(id);
  });
  useCreateStyledStyle(ModalExitActive, function (id) {
    return SetModalExitActiveClass(id);
  });
  useEffect(function () {
    SetEnteredValue(defaultValue);
    return function () {
      addRemoveListeners(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (inputRef.current) {
      inputRef.current.setError(errorMessage);
    }
  }, [errorMessage]);
  useEffect(function () {
    addRemoveListeners(isOpen);
    if (!isOpen) {
      if (!checkDateIsValid(enteredValue.localizated)) {
        SetEnteredValue({
          localizated: "",
          global: ""
        });
        inputRef.current.clear();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  useEffect(function () {
    if (enteredValue.localizated === "") return;
    var isValid = checkDateIsValid(enteredValue.localizated);
    SetInputValue(isValid ? enteredValue.localizated : "");
    if (onChange) onChange(isValid ? enteredValue.global : "");
    if (onUpdate) onUpdate(isValid ? enteredValue.global : "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValue]);

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, function () {
    return {
      reset: function reset() {
        SetEnteredValue(defaultValue);
        SetInputValue("");
        if (onChange) onChange(defaultValue.global);
        if (onUpdate) onUpdate(defaultValue.global, true);
      },
      setValue: function setValue(value) {
        if (value === "") return;
        SetEnteredValue({
          localizated: moment(new Date(value)).format(dateFormat),
          global: value
        });
        if (onChange) onChange(value);
        if (onUpdate) onUpdate(value, true);
      },
      getValue: function getValue() {
        return inputValue;
      },
      setError: function setError(message) {
        SetErrorMessage(message);
      }
    };
  });

  /**
   * 
   * document objesine event listener ekler ve DatePicker dışarısında
   * herhangi bir alana tıklanıldığında Select'in kapatılmasını veya 
   * kullanıcı Input üzerine focus ise kapanmamasını sağlar.
   * 
   */
  var addRemoveListeners = function addRemoveListeners(value) {
    var listener = value ? "addEventListener" : "removeEventListener";
    document[listener]("pointerdown", handleClickOutside);
  };

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
  var handleClickOutside = function handleClickOutside(event) {
    if (!isOpen) return;
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      SetIsOpen(false);
    }
  };

  /**
   * 
   * document objesi üzerinde herhangi bir tuş tıklaması yapılıp
   * yapılmadığını kontrol eder. Eğer Tab tuşuna tıklanıldıysa
   * Calendar'ı kapatır, aksi durumda açar.
   * 
   * @param {*} event Zorunlu event objesi. 
   * 
   */
  var handleKeyDown = function handleKeyDown(event) {
    SetIsOpen(!(event.keyCode === 9 || event.keyCode === 27));
  };
  var handleFocus = function handleFocus(event) {
    SetIsOpen(true);
  };
  var handleClick = function handleClick(event) {
    inputRef.current.setFocus();
    SetIsOpen(true);
  };
  var handleInputChange = function handleInputChange(value) {
    SetErrorMessage(null);
    SetEnteredValue({
      localizated: value,
      global: moment(value, dateFormat, locale).format("YYYY-MM-DD")
    });
  };
  var handleBlur = function handleBlur(event) {};
  var handleCalendarChange = function handleCalendarChange(values) {
    SetIsOpen(false);
    SetEnteredValue(values);
  };
  var checkDateIsValid = function checkDateIsValid(value) {
    var isValid = moment(value, dateFormat, locale, true).isValid();
    var isDisabledDate = false;
    if (disabledDate) isDisabledDate = disabledDate(moment(value, dateFormat));
    return isValid && !isDisabledDate;
  };
  var getDatePicker = function getDatePicker() {
    return /*#__PURE__*/React.createElement(Wrapper$3, {
      disabled: disabled,
      ref: wrapperRef,
      onPointerDown: handleClick
    }, /*#__PURE__*/React.createElement(Input, {
      name: name,
      label: label,
      value: inputValue,
      mask: mask,
      onChange: handleInputChange,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
      message: errorMessage,
      keepFocus: isOpen,
      focusRef: wrapperRef,
      ref: inputRef,
      disabled: disabled,
      suffix: /*#__PURE__*/React.createElement(Icon, {
        className: "qt-web-date"
      })
    }), /*#__PURE__*/React.createElement(CSSTransition, {
      in: isOpen,
      timeout: 500,
      classNames: {
        enter: modalEnterClass,
        enterActive: modalEnterActiveClass,
        exit: modalExitClass,
        exitActive: modalExitActiveClass
      },
      nodeRef: nodeRef,
      unmountOnExit: true
    }, /*#__PURE__*/React.createElement(Calendar, {
      value: inputValue,
      defaultValue: inputValue,
      onChange: handleCalendarChange,
      disabledDate: disabledDate,
      className: clanderWrapperClass,
      ref: nodeRef
    })));
  };
  return getDatePicker();
});

var _templateObject$2;
var Wrapper$2 = styled.div(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n\n  input[type=checkbox]{\n    height: 0;\n    width: 0;\n    visibility: hidden;\n  }\n\n  label {\n    cursor: pointer;\n    text-indent: -9999px;\n    width: 53px;\n    height: 28px;\n    background: #1D2649;\n    display: block;\n    border-radius: 28px;\n    position: relative;\n  }\n\n  label:after {\n    content: '';\n    position: absolute;\n    top: 3px;\n    left: 3px;\n    width: 22px;\n    height: 22px;\n    background: #fff;\n    border-radius: 50px;\n    transition: 0.3s;\n  }\n  /*\n  input:checked + label {\n    background: #3396FB;\n  }\n  */\n  input:checked + label:after {\n    left: calc(100% - 3px);\n    transform: translateX(-100%);\n    background: #3396FB;\n  }\n\n  label:active:after {\n    width: 28px;\n  }\n\n  "])));

var Toggle = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? v4() : _ref$id,
    _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked;
    _ref.message;
    var _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? null : _ref$onChange,
    _ref$onUpdate = _ref.onUpdate,
    onUpdate = _ref$onUpdate === void 0 ? null : _ref$onUpdate;
    _ref.children;
  var _useState = useState(checked),
    _useState2 = _slicedToArray(_useState, 2),
    isChecked = _useState2[0],
    SetIsChecked = _useState2[1];
  useEffect(function () {
    SetIsChecked(checked);
    sendUpdates(checked);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  /**
   * 
   * 
   * 
   */
  useImperativeHandle(ref, function () {
    return {
      reset: function reset() {
        SetIsChecked(checked);
        sendUpdates(checked, true);
      },
      getValue: function getValue() {
        return isChecked;
      }
    };
  });
  var handleCheckboxChange = function handleCheckboxChange() {
    SetIsChecked(!isChecked);
    sendUpdates(!isChecked);
  };
  var sendUpdates = function sendUpdates(value) {
    var skipValidation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (onChange) onChange(value);
    if (onUpdate) onUpdate(value, skipValidation);
  };
  var getCheckbox = function getCheckbox() {
    return /*#__PURE__*/React.createElement(Wrapper$2, null, /*#__PURE__*/React.createElement("input", {
      id: id,
      type: "checkbox",
      checked: isChecked,
      value: isChecked,
      onChange: handleCheckboxChange,
      ref: ref
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: id
    }, "Toggle"));
  };
  return getCheckbox();
});

var _templateObject$1, _templateObject2$1, _templateObject3$1;
var Wrapper$1 = styled.div(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n  position: fixed;\n  bottom: 80px;\n  right: 30px;\n  visibility: hidden;\n  "])));
var Show = styled.a(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n\n  visibility: ", ";\n  animation: ", " 0.5s;\n\n  display: block;\n  transition: fill .3s ease-out;\n  cursor: pointer;\n  fill: #ffffff80;\n\n  &:hover {\n    fill: #3396fb;\n  }\n  \n  "])), function (props) {
  return props._show ? 'visible' : 'hidden';
}, function (props) {
  return props._show ? showBounceAnimation : 'none';
});
/*
const hideBounceAnimation = keyframes`
  0% { transform: scale(.2) }
  50% { transform: scale(1.1) }
  75% { transform: scale(0.9) }
  100% { transform: scale(1) }
`
*/
var showBounceAnimation = keyframes(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral(["\n  0% { transform: scale(.2) }\n  50% { transform: scale(1.1) }\n  75% { transform: scale(0.9) }\n  100% { transform: scale(1) }\n"])));

var BackToTop = function BackToTop(_ref) {
  var className = _ref.className,
    height = _ref.height,
    width = _ref.width;
    _ref.fill;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    height: height,
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 50 50"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M25,0 C11.2152344,0 0,11.2152344 0,25 C0,38.7847656 11.2152344,50 25,50 C38.7847656,50 50,38.7847656 50,25 C50,11.2152344 38.7847656,0 25,0 Z M25,46.875 C12.9378906,46.875 3.125,37.0621094 3.125,25 C3.125,12.9378906 12.9378906,3.125 25,3.125 C37.0621094,3.125 46.875,12.9378906 46.875,25 C46.875,37.0621094 37.0621094,46.875 25,46.875 Z M33.9171875,22.3328125 C34.5277344,22.9433594 34.5277344,23.9320313 33.9171875,24.5421875 C33.6121094,24.8472656 33.2121094,25 32.8125,25 C32.4128906,25 32.0128906,24.8472656 31.7078125,24.5421875 L26.5625,19.396875 L26.5625,34.375 C26.5625,35.2386719 25.8628906,35.9375 25,35.9375 C24.1371094,35.9375 23.4375,35.2386719 23.4375,34.375 L23.4375,19.396875 L18.2921875,24.5421875 C17.6816406,25.1527344 16.6929687,25.1527344 16.0828125,24.5421875 C15.4726563,23.9316406 15.4722656,22.9429687 16.0828125,22.3328125 L23.8953125,14.5203125 C24.5058594,13.9097656 25.4945313,13.9097656 26.1046875,14.5203125 L33.9171875,22.3328125 Z"
  }));
};

function BackTop(props) {
  var _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    SetVisible = _useState2[1];
  //const [viewPortHeight, SetViewPortHeight] = useState(0);

  useEffect(function () {
    //SetViewPortHeight(window.innerHeight);
    document.addEventListener("scroll", onScroll);
    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);
  var onScroll = function onScroll(e) {
    SetVisible(document['body'].scrollTop > window.innerHeight);
  };
  var handleButtonClick = function handleButtonClick(e) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  var getButton = function getButton() {
    return /*#__PURE__*/React.createElement(Wrapper$1, null, /*#__PURE__*/React.createElement(Show, {
      onClick: handleButtonClick,
      _show: visible
    }, children ? children : /*#__PURE__*/React.createElement(BackToTop, {
      width: 30,
      height: 30
    })));
  };
  return getButton();
}

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n\n  border-radius: 6px;\n  padding: 0 10px;\n\n  span {\n    color: #ffffff;\n    font-weight: 600;\n    font-size: 11px;\n    line-height: 12px;\n    user-select: none;\n  }\n\n  ", "\n\n  "])), function (_ref) {
  var status = _ref.status;
  return getByStatus(status);
});
var getByStatus = function getByStatus(status) {
  if (status === "approved") {
    return css$8(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        span {\n          color: #1D2649;\n        }\n\n        background: #27C13A;\n      "])));
  }
  if (status === "rejected" || status === "declined") {
    return css$8(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        span {\n          color: #ffffff;\n        }\n\n        background-color: #C12727;\n      "])));
  }
  if (status === "pending") {
    return css$8(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        span {\n          color: #ffffff;\n        }\n\n        background-color: #1E3B6C;\n      "])));
  }
  if (status === "requested") {
    return css$8(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n        span {\n          color: #ffffff4D;\n        }\n      "])));
  }
  if (status === "open") {
    return css$8(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        span {\n          color: #ffffff;\n        }\n\n        background-color: #3396FB;\n      "])));
  }
  if (status === "cancelled") {
    return css$8(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n        span {\n          color: #1D2649;\n        }\n\n        background-color: #cfe10c;\n      "])));
  }
  return css$8(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n      span {\n        color: #1D2649;\n      }\n\n      background: #27C13A;\n    "])));
};

function Status(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? "approved" : _props$type,
    _props$children = props.children,
    children = _props$children === void 0 ? "" : _props$children,
    _props$className = props.className,
    className = _props$className === void 0 ? null : _props$className;
  useEffect(function () {
    return function () {};
  }, []);
  var getStatus = function getStatus() {
    return /*#__PURE__*/React.createElement(Wrapper, {
      status: type,
      className: className
    }, /*#__PURE__*/React.createElement("span", null, children));
  };
  return getStatus();
}

var single = function single(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";
  var color = "";
  if (type === "info") color = singleInfo;
  if (type === "error") color = singleError;
  console.log("%c " + message + " ", color);
  if (type === "error") {
    console.log("%c " + message, errorStyle);
  }
};
var double = function double(title, message) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "info";
  var color = "";
  if (type === "info") color = doubleInfo;
  if (type === "error") color = doubleError;
  console.log("%c " + title + ": %c  " + message + "  ", color, doubleContent);
};
var table = function table(data) {
  console.table(data);
};
var singleInfo = ["background: #27C13A", "color: #2b2b2b", "line-height: 20px", "border-radius: 20px"].join(";");
var singleError = ["background: #C12727", "color: #cccccc", "line-height: 20px", "border-radius: 20px"].join(";");
var doubleInfo = ["background: #3598FE", "color: #2b2b2b", "line-height: 20px", "border-radius: 20px"].join(";");
var doubleError = ["background: #C12727", "color: #cccccc", "line-height: 20px", "border-radius: 20px"].join(";");
var doubleContent = ["background: #111111", "color: #cccccc", "line-height: 20px", "border-radius: 20px"].join(";");
var errorStyle = ["background-image: url('https://media.giphy.com/media/XKCdA6ERnXp6M/giphy.gif')", "background-size: 280px 200px", "background-repeat: no-repeat", "color: #000000", "padding: 0px 75px 0 0", "line-height: 200px"].join(";");
var ConsoleLog = {};
ConsoleLog.single = single;
ConsoleLog.double = double;
ConsoleLog.table = table;

var Upload = function Upload(_ref) {
  var className = _ref.className,
    height = _ref.height,
    width = _ref.width;
    _ref.fill;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    height: height,
    width: width,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 18.59"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16.90979,11.25 C17.4325562,11.25 17.9237366,11.454773 18.2929993,11.8266296 L18.2929993,11.8266296 L18.2998657,11.8336487 L19.7799683,13.3628845 C20.0801086,13.6729431 20.0721741,14.1674805 19.7621155,14.4676209 C19.6104431,14.6144104 19.4145203,14.6875 19.21875,14.6875 C19.0145874,14.6875 18.8105774,14.6080017 18.6573791,14.4496155 L18.6573791,14.4496155 L17.69104,13.4513855 L17.69104,17.8125 C17.69104,18.2440186 17.3413086,18.59375 16.90979,18.59375 C16.4782715,18.59375 16.12854,18.2440186 16.12854,17.8125 L16.12854,17.8125 L16.12854,13.4275818 L15.118866,14.4233704 C14.8117066,14.7264099 14.3170166,14.7229004 14.0141296,14.415741 C13.7110901,14.1085816 13.714447,13.6138916 14.0216064,13.3110046 L14.0216064,13.3110046 L15.5299377,11.8232727 C15.8987427,11.4535523 16.3885498,11.25 16.90979,11.25 Z M16.875,0 C18.598175,0 20,1.40182496 20,3.125 L20,3.125 L20,9.765625 C20,10.0886536 19.8010254,10.378418 19.4996643,10.4946899 C19.1981506,10.6108093 18.8562012,10.52948 18.6395264,10.2897644 L18.6395264,10.2897644 L14.8075867,6.05453492 L9.11529539,13.2946777 L10.9115601,15.625 L13.7890625,15.625 C14.2205811,15.625 14.5703125,15.9747314 14.5703125,16.40625 C14.5703125,16.8377686 14.2205811,17.1875 13.7890625,17.1875 L13.7890625,17.1875 L3.125,17.1875 C1.40182496,17.1875 0,15.785675 0,14.0625 L0,14.0625 L0,3.125 C0,1.40182496 1.40182496,0 3.125,0 L3.125,0 Z M16.875,1.5625 L3.125,1.5625 C2.26348875,1.5625 1.5625,2.26348875 1.5625,3.125 L1.5625,3.125 L1.5625,14.0625 C1.5625,14.9240113 2.26348875,15.625 3.125,15.625 L3.125,15.625 L8.93875121,15.625 L5.46936035,11.1242676 L4.36874391,12.5552368 C4.10552977,12.8971863 3.6151123,12.9612732 3.27301023,12.6980591 C2.93106078,12.4349976 2.86712648,11.9445801 3.13018797,11.602478 L3.13018797,11.602478 L4.84954836,9.36737063 C4.99725344,9.17526246 5.22598266,9.06265258 5.46829223,9.0625 L5.46829223,9.0625 L5.57156087,9.0692886 C5.77471987,9.09624995 5.96075877,9.20235769 6.08749391,9.36676023 L6.08749391,9.36676023 L8.13125609,12.0181274 L14.1514588,4.36096191 C14.2938232,4.17999266 14.508667,4.07104492 14.738617,4.06295777 C14.9684143,4.05456543 15.1905823,4.14886477 15.3450012,4.31961059 L15.3450012,4.31961059 L18.4375,7.73773195 L18.4375,3.125 C18.4375,2.26348875 17.7365112,1.5625 16.875,1.5625 L16.875,1.5625 Z M5.46875,2.8125 C6.76116945,2.8125 7.8125,3.86383055 7.8125,5.15625 C7.8125,6.44866945 6.76116945,7.5 5.46875,7.5 C4.17633055,7.5 3.125,6.44866945 3.125,5.15625 C3.125,3.86383055 4.17633055,2.8125 5.46875,2.8125 Z M5.46875,4.375 C5.03799437,4.375 4.6875,4.72549438 4.6875,5.15625 C4.6875,5.58700562 5.03799437,5.9375 5.46875,5.9375 C5.89950562,5.9375 6.25,5.58700562 6.25,5.15625 C6.25,4.72549438 5.89950562,4.375 5.46875,4.375 Z"
  }));
};

/**
 * 
 * window objesine event listener ekler ve 
 * kullanıcı online ve offline olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
var useReCaptcha = function useReCaptcha(handler) {
  var script;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    reCaptchaKey = _useState2[0],
    SetReCaptchaKey = _useState2[1];
  useEffect(function () {
    return function () {
      document.body.removeChild(script);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var executeReCaptcha = function executeReCaptcha(handler) {
    if (reCaptchaKey === "") {
      ConsoleLog.double("useReCaptcha", "Not yet initialized! reCaptcha can't execute right now.", "error");
      return;
    }
    window.grecaptcha.ready(function (_) {
      try {
        window.grecaptcha.execute(reCaptchaKey, {
          action: "login"
        }).then(function (token) {
          ConsoleLog.double("ReCaptcha V3", "Token is valid");
          console.log("token: " + token);
          handler(token);
        });
      } catch (e) {
        ConsoleLog.double("ReCaptcha V3", "Token is invalid", "error");
      }
    });
  };
  var loadReCaptcha = function loadReCaptcha(key) {
    script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=" + key;
    script.onload = function () {
      SetReCaptchaKey(key);
    };
    document.body.appendChild(script);
  };
  return {
    loadReCaptcha: loadReCaptcha,
    executeReCaptcha: executeReCaptcha
  };
};

var useConstructor = function useConstructor() {
  var callBack = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    hasBeenCalled = _useState2[0],
    setHasBeenCalled = _useState2[1];
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

/**
 * 
 * ADD EXTERNAL CSS
 * 
 * Dinamik css dosyalarını yüklemek için kullanılır. Eğer yüklenecek
 * olan css dosyası daha önce eklenmiş ise tekrar yüklemez. Bunu yükleyen
 * component ekrandan silinirse yüklediği yazı da silinir.
 * 
 * 
 * @param {*} link 
 * @param {*} temporary 
 * 
 */
var useAddExternalCSS = function useAddExternalCSS(link) {
  var temporary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  //const [ styleLink, SetStyleLink ] = useState(null);

  useEffect(function () {
    var found = false;
    var head = document.head;
    var dynamicLink = createLink();
    document.querySelectorAll('head > link').forEach(function (css) {
      if (css.href.indexOf(link) !== -1) found = true;
    });
    if (!found) {
      head.appendChild(dynamicLink);
      //SetStyleLink(dynamicLink);
    }

    return function () {
      if (temporary) {
        document.querySelectorAll('head > link').forEach(function (css) {
          if (css.href.indexOf(link) !== -1) {
            document.head.removeChild(css);
          }
        });
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);
  var createLink = function createLink() {
    var dynamicLink = document.createElement("link");
    dynamicLink.type = "text/css";
    dynamicLink.rel = "stylesheet";
    dynamicLink.href = link;
    return dynamicLink;
  };
};

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
var useCreateDynamicStyle = function useCreateDynamicStyle(style, handler) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : nanoid(11);
  useEffect(function () {
    if (!isEmpty()) initialize();
    return function () {
      return remove();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var initialize = function initialize() {
    injectStyles();
    handler("cs-" + id);
  };
  var remove = function remove() {
    var _class = getClass();
    if (_class !== "") {
      _class.parentNode.removeChild(_class);
    }
  };
  var isEmpty = function isEmpty() {
    return Object.keys(style).length === 0;
  };
  var getClass = function getClass() {
    var _class = "";
    document.querySelectorAll('head > style').forEach(function (css) {
      if (css.id === id) {
        _class = css;
      }
    });
    return _class;
  };
  var injectStyles = function injectStyles() {
    var rules = getRules(style);
    var injectedStyles = document.createElement('style');
    injectedStyles.setAttribute('type', 'text/css');
    injectedStyles.setAttribute('id', id);
    injectedStyles.innerHTML = rules.join('');
    document.head.appendChild(injectedStyles);
  };
  var getRules = function getRules(style) {
    var rules = [];
    for (var i in style) {
      var styles = JSON.stringify(style[i]).split("\",\"").join(";").replace(/"/g, "");
      styles = postcss().use(autoprefixer).use(postcssNested).use(calc()).process(styles).css;
      var rule = ".cs-".concat(id, " ").concat(i, " ");
      rule += styles;
      rule += " ";
      rules.push(rule);
    }
    return rules;
  };
};

var useSingleQuery = function useSingleQuery(props) {
  var navigate = useNavigate();
  var parse = function parse(query, options) {
    return queryString.hasOwnProperty("parse") ? queryString.parse(query, options) : [];
  };
  var stringify = function stringify(query, options) {
    return queryString.hasOwnProperty("stringify") ? queryString.stringify(query, options) : [];
  };
  var set = function set() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "search";
    var value = arguments.length > 1 ? arguments[1] : undefined;
    var query = parse(location.search, {
      arrayFormat: 'comma'
    });
    if (value === "") {
      delete query[type];
    } else {
      query[type] = value;
    }
    navigate({
      search: decodeURIComponent(stringify(query, {
        arrayFormat: 'comma'
      }))
    });
  };
  var get = function get() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "search";
    var _default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var query = parse(location.search, {
      arrayFormat: 'comma'
    });
    if (query[type]) {
      if (length > 0 && query[type].length < length) {
        return _default;
      } else {
        return query[type];
      }
    } else {
      return _default;
    }
  };
  var setMulti = function setMulti() {
    var queries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
      type: '',
      value: ''
    }];
    var query = parse(location.search, {
      arrayFormat: 'comma'
    });
    queries.forEach(function (q) {
      if (q.value === "") {
        delete query[q.type];
      } else {
        query[q.type] = q.value;
      }
    });
    navigate({
      search: decodeURIComponent(stringify(query, {
        arrayFormat: 'comma'
      }))
    });
  };
  return {
    set: set,
    get: get,
    setMulti: setMulti
  };
};

var useMultiQuery = function useMultiQuery(props) {
  var navigate = useNavigate();
  var parse = function parse(query, options) {
    return queryString.hasOwnProperty("parse") ? queryString.parse(query, options) : [];
  };
  var stringify = function stringify(query, options) {
    return queryString.hasOwnProperty("stringify") ? queryString.stringify(query, options) : [];
  };
  var set = function set() {
    var queries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
      type: '',
      value: ''
    }];
    var query = parse(location.search, {
      arrayFormat: 'comma'
    });
    queries.forEach(function (q) {
      if (q.value === "") {
        delete query[q.type];
      } else {
        query[q.type] = q.value;
      }
    });
    navigate({
      search: decodeURIComponent(stringify(query, {
        arrayFormat: 'comma'
      }))
    });
  };
  var get = function get() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "search";
    var _default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var query = parse(location.search, {
      arrayFormat: 'comma'
    });
    if (query[type]) {
      if (length > 0 && query[type].length < length) {
        return _default;
      } else {
        return query[type];
      }
    } else {
      return _default;
    }
  };
  return {
    set: set,
    get: get
  };
};

/**
 * 
 * window objesine event listener ekler ve 
 * sayfa resize olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
var useOnResize = function useOnResize(handler) {
  useEffect(function () {
    var listener = function listener(event) {
      handler(event);
    };
    window.addEventListener("resize", listener);
    return function () {
      window.removeEventListener("resize", listener);
    };
  }, [handler]);
};

/**
 * 
 * window objesine event listener ekler ve 
 * kullanıcı online ve offline olduğunda çağrılır.
 * 
 * @param {*} handler 
 * 
 */
var useConnectionStatus = function useConnectionStatus(handler) {
  useEffect(function () {
    var listener = function listener(event) {
      handler(event);
    };
    window.addEventListener("online", listener);
    return function () {
      window.removeEventListener("online", listener);
    };
  }, [handler]);
};

function DetermineNewHeight(originalHeight, originalWidth, newWidth) {
  return originalHeight / originalWidth * newWidth;
}

function DetermineNewWidth(originalHeight, originalWidth, newHeight) {
  return originalWidth / originalHeight * newHeight;
}

function ConvertCurrency(balance, currency) {
  if (!balance) balance = 0;
  if (currency === "TRY") {
    return getBalance(balance, currency, "₺");
  } else if (currency === "USD") {
    return getBalance(balance, currency, "$");
  } else if (currency === "EUR") {
    return getBalance(balance, currency, "€");
  } else {
    return getBalance(balance, currency, "?");
  }
}
var getBalance = function getBalance(balance, currency, symbol) {
  var isNegative = false;
  var _balance = parseFloat(balance).toFixed(2);
  if (_balance.indexOf("-") > -1) {
    isNegative = true;
    _balance = _balance.split("-")[1];
  }
  return (isNegative ? "-" : "") + symbol + _balance;
};

function GetCurrencySymbol(currency) {
  if (currency === "TRY") {
    return "₺";
  } else if (currency === "USD") {
    return "$";
  } else if (currency === "EUR") {
    return "€";
  } else {
    return "?";
  }
}

/**
 * 
 */
function AddDefaultThemeStyle() {
  var styleSheet = document.createElement('style');
  document.head.appendChild(styleSheet);
  styleSheet.textContent = ":root{color: #ffffff}";
}

/**
 * 
 * @param {*} theme 
 */
function UpdateThemeStyle(theme) {
  var themeRules = "";
  var sheet = document.styleSheets[0];
  Object.keys(theme).forEach(function (property, i) {
    themeRules += "".concat(property, ":").concat(theme[property], ";");
  });
  if (sheet.hasOwnProperty('cssRules')) {
    sheet.cssRules[0].style.cssText = themeRules;
  }
}

function IsValidJSON(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  if (_typeof(item) === "object" && item !== null) {
    return true;
  }
  return false;
}

function AddZero(num) {
  var value = Number(num);
  var res = num.toString().split(".");
  if (num.toString().indexOf('.') === -1) {
    value = value.toFixed(2);
    num = value.toString();
  } else if (res[1].length < 3 || res[1].length > 2) {
    value = value.toFixed(2);
    num = value.toString();
  }
  return parseFloat(num).toFixed(2);
}

function RemoveUnits(value) {
  if (!value) return 0;
  value = value.replaceAll('%', '').replaceAll('px', '').replaceAll('em', '').replaceAll('ex', '').replaceAll('ch', '').replaceAll('rem', '').replaceAll('vw', '').replaceAll('vh', '').replaceAll('vmin', '').replaceAll('vmax', '').replaceAll('pt', '').replaceAll('pc', '').replaceAll('in', '').replaceAll('mm', '').replaceAll('cm', '');
  return parseInt(value);
}

/**
 * Returns an array with arrays of the given size.
 *
 * @param array {Array} array to split
 * @param chunk_size {Integer} Size of every group
 */
function ChunkArray(array, chunk_size) {
  var index = 0;
  var result = [];
  var chunk = [];
  for (index = 0; index < array.length; index += chunk_size) {
    chunk = array.slice(index, index + chunk_size);
    // Do something if you want with the group
    result.push(chunk);
  }
  return result;
}

/**
 * 
 * @param {*} text 
 * @param {*} entryType 
 * @returns 
 */
function FileChecker() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "config";
  var entryType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "resource";
  var alreadyLoaded = performance.getEntries().filter(function (e) {
    return e.entryType === entryType;
  }).filter(function (e) {
    return e.name.indexOf(text) > -1;
  })[0] !== undefined;
  if (!alreadyLoaded) {
    console.log("script was not loaded");
  } else {
    console.log("script already loaded");
  }
  return alreadyLoaded;
}

/**
 * 
 * 
 * 
 */
function UniUpperCase() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "tr";
  var letters = {
    "i": "İ",
    "ş": "Ş",
    "ğ": "Ğ",
    "ü": "Ü",
    "ö": "Ö",
    "ç": "Ç",
    "ı": "I"
  };
  if (lang === "tr") {
    value = value.replace(/(([iışğüçö]))/g, function (letter) {
      return letters[letter];
    });
  }
  return value.toUpperCase();
}

export { ALink, AddDefaultThemeStyle, AddZero, Arrow$2 as ArrowIcon, BackToTop, BackTop, Button, Calendar, Checkbox$1 as Checkbox, Checkmark, ChunkArray, Collapse, ConsoleLog, ConvertCurrency, DatePicker, DetermineNewHeight, DetermineNewWidth, FileChecker, FindSelector, Form, GetCurrencySymbol, CoreImage as Image, Input, IsValidJSON, Link$1 as Link, Lock as LockIcon, Menu, ModalManager, MultiSelect, MultiSelectArrow, Notification, QTDContext, QTDProvider, Radio, RemoveUnits, Select$1 as Select, SimpleScrollbar, Spin, Status, Toggle, Tooltip, UniUpperCase, UpdateThemeStyle, Upload as UploadIcon, useAddExternalCSS, useConnectionStatus, useConstructor, useCreateDynamicStyle, useCreateStyledStyle, useMultiQuery, useOnClickOutside, useOnESCKeyDown, useOnResize, useReCaptcha, useSingleQuery };
