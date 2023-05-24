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
 * FORWARDED REF COMPONENTS
 */
export { default as Select } from './select/index';
export { default as Form } from './form/index';
export { default as Checkbox } from './checkbox/index';
export { default as AccordionMenu } from './accordionmenu/index';
export { default as Calendar } from './calendar/index';
export { default as DatePicker } from './datepicker/index';
export { default as Input } from './input/index';
export { default as Toggle } from './toggle/index';
export { default as Tooltip } from './tooltip/index';

/**
 * COMPONENTS (HAS SUB COMPONENTS)
 */
export { default as Collapse } from './collapse/index';
export { default as ModalManager } from './modal/index';
export { default as Notification } from './notification/index';
export { default as Radio } from './radio/index';
export { default as MultiSelect } from './multiselect/index';

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

/**
 * ICONS
 */
export { default as LockIcon } from './icons/Lock';
export { default as ArrowIcon } from './icons/Arrow';
export { default as UploadIcon } from './icons/Upload';
export { default as BackToTop } from './icons/BackToTop';
export { default as Checkmark } from './icons/Checkmark';
export { default as MultiSelectArrow } from './icons/MultiSelectArrow';

/**
 * HOOKS
 */
export { default as useReCaptcha } from './hooks/useReCaptcha.js';
export { default as useConstructor } from './hooks/useConstructor.js';
export { default as useAddExternalCSS } from './hooks/useAddExternalCSS.js';
export { default as useCreateDynamicStyle } from './hooks/useCreateDynamicStyle.js';
export { default as useCreateStyledStyle } from './hooks/useCreateStyledStyle.js';
export { default as useOnClickOutside } from './hooks/useOnClickOutside.js';
export { default as useOnESCKeyDown } from './hooks/useOnESCKeyDown.js';
export { default as useSingleQuery } from './hooks/useSingleQuery.js';
export { default as useMultiQuery } from './hooks/useMultiQuery.js';
export { default as useOnResize } from './hooks/useOnResize.js';
export { default as useConnectionStatus } from './hooks/useConnectionStatus.js';
export { default as useComponentSize } from './hooks/useComponentSize.js';

/**
 * HELPERS
 */
export { default as DetermineNewHeight } from './helpers/aspectratio/DetermineNewHeight.js';
export { default as DetermineNewWidth } from './helpers/aspectratio/DetermineNewWidth.js';
export { default as FindSelector } from './helpers/css/FindSelector.js';
export { default as GetCountryCodeByCurrencyCode } from './helpers/country/GetCountryCodeByCurrencyCode.js';
export { default as GetCountryCodeByLanguage } from './helpers/country/GetCountryCodeByLanguage.js';
export { default as ConvertCurrency } from './helpers/currency/ConvertCurrency.js';
export { default as GetByCurrency } from './helpers/currency/GetByCurrency.js';
export { default as GetCurrencyFormat } from './helpers/currency/GetCurrencyFormat.js';
export { default as GetCurrencySymbol } from './helpers/currency/GetCurrencySymbol.js';
export { default as GetDecimalByCurrency } from './helpers/currency/GetDecimalByCurrency.js';
export { default as AddDefaultThemeStyle } from './helpers/theme/AddDefaultThemeStyle.js';
export { default as UpdateThemeStyle } from './helpers/theme/UpdateThemeStyle.js';
export { default as IsValidJSON } from './helpers/json/IsValidJSON.js';
export { default as AddZero } from './helpers/math/AddZero.js';
export { default as RemoveUnits } from './helpers/remover/RemoveUnits.js';
export { default as ChunkArray } from './helpers/array/ChunkArray.js';
export { default as FileChecker } from './helpers/checker/FileChecker.js';
export { default as UniUpperCase } from './helpers/string/UniUpperCase.js';


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