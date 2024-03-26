//import { StrictMode } from "react";
//import { createRoot } from "react-dom/client";

//import App from './App.js';
//import reportWebVitals from './reportWebVitals';

export * from './';

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
export { default as Select } from './select/index';
export { default as Form } from './form/index';
export { default as Checkbox } from './checkbox/index';
export { default as Accordion } from './accordion/index';
export { default as Calendar } from './calendar/index';
export { default as DatePicker } from './datepicker/index';
export { default as Input } from './input/index';
export { default as Switch } from './switch/index';
export { default as Tooltip } from './tooltip/index';

/**
 * COMPONENTS (HAS SUB COMPONENTS)
 */
export { default as Collapse } from './collapse/index';
export { default as ModalManager } from './modal/index';
export { default as Notification } from './notification/index';
export { default as Radio } from './radio/index';
export { default as InlineSelect } from './inlineselect/index';

/**
 * COMPONENTS
 */
export { default as Image } from './image/index';
export { default as ConsoleLog } from './logger/index';
export { default as Button } from './button/index';
export { default as Result } from './result/index';
export { default as ALink } from './alink/index';
export { default as Spin } from './spin/index';
export { default as BackTop } from './back-top/index';
export { default as Status } from './status/index';
export { default as TinyScrollbar } from './tinyscrollbar/index';


export type { AccordionPropsType } from './accordion/index';
export type { AccordionItemPropsType } from './accordion/item/Item';
export type { AccordionSubMenuPropsType } from './accordion/submenu/SubMenu';

export type { InputPropsType } from './input/index';
export type { ImperativeFunctionsProps } from './input/index';

export type { ButtonPropsType } from './button/index';

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