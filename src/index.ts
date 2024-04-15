//import { StrictMode } from "react";
//import { createRoot } from "react-dom/client";

//import App from './App.js';
//import reportWebVitals from './reportWebVitals';


/**
 * CONTEXT PROVIDER
 */
export { QTDProvider } from './context/QTDContext';

/**
 * CONTEXT
 */
export { default as QTDContext } from './context/QTDContext';

/**
 * HELPERS
 */
export * from './helpers/index';

/**
 * HOOKS
 */
export * from './hooks/index';

/**
 * ICONS
 */
export * from './icons/index';

/**
 * FORWARDED REF COMPONENTS
 */
export { default as Select } from './select/index.jsx';
export { default as Form } from './form/index.jsx';
export { default as Checkbox } from './checkbox/index';
export { default as Accordion } from './accordion/index';
export { default as Calendar } from './calendar/index.jsx';
export { default as DatePicker } from './datepicker/index.jsx';
export { default as Input } from './input/index';
export { default as Switch } from './switch/index';
export { default as Tooltip } from './tooltip/index.jsx';

/**
 * COMPONENTS (HAS SUB COMPONENTS)
 */
export { default as Collapse } from './collapse/index.jsx';
export { default as ModalManager } from './modal/index';
export { default as Notification } from './notification/index.jsx';
export { default as Radio } from './radio/index.jsx';
export { default as InlineSelect } from './inlineselect/index.jsx';

/**
 * COMPONENTS
 */
export { default as Image } from './image/index.jsx';
export { default as ConsoleLog } from './logger/index.js';
export { default as Button } from './button/index';
export { default as Result } from './result/index';
export { default as ALink } from './alink/index';
export { default as Spin } from './spin/index';
export { default as BackTop } from './back-top/index';
export { default as Status } from './status/index.jsx';
export { default as TinyScrollbar } from './tinyscrollbar/index.jsx';


export type { AccordionProps } from './types/AccordionProps';
export type { AccordionSubMenuProps } from './types/AccordionSubMenuProps';
export type { AccordionItemProps } from './types/AccordionItemProps';
export type { InputProps } from './types/InputProps';
export type { CheckboxProps } from './types/CheckboxProps';
export type { QTDImperativeFuncProps } from './types/QTDImperativeFuncProps';
export type { SingleQueryProps } from './types/SingleQueryProps';
export type { ButtonProps } from './types/ButtonProps';
export type { SwitchProps } from './types/SwitchProps';
export type { ModalProps, ModalContentProps } from './types/ModalProps';

export { ModalState } from './enums/enum';

/*
console.log("process.env.NODE_ENV: " + process.env.NPM_ENV);

if (process.env.NPM_ENV !== "production") {
  
  const rootElement = document.getElementById("qtd-root");
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

}
*/