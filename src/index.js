//import { StrictMode } from "react";
//import { createRoot } from "react-dom/client";

//import App from './App.js';
//import reportWebVitals from './reportWebVitals';

export { QTDProvider } from './context/QTDContext.jsx';
export { default as QTDContext } from './context/QTDContext.jsx';
export { default as Select } from './select/index.jsx';
export { default as MultiSelect } from './multiselect/index.jsx';
export { default as Form } from './form/index.jsx';
export { default as Radio } from './radio/index.jsx';
export { default as Image } from './image/index.jsx';
export { default as Checkbox } from './checkbox/index.jsx';
export { default as Collapse } from './collapse/index.jsx';
export { default as Menu } from './menu/index.jsx';

export { default as ALink } from './alink/index.jsx';
export { default as Button } from './button/index.jsx';
export { default as Calendar } from './calendar/index.jsx';
export { default as DatePicker } from './datepicker/index.jsx';
export { default as Input } from './input/index.jsx';
export { default as Spin } from './spin/index.jsx';
export { default as Toggle } from './toggle/index.jsx';
export { default as Notification } from './notification/index.jsx';
export { default as ModalManager } from './modal/index.jsx';
export { default as Tooltip } from './tooltip/index.jsx';
export { default as BackTop } from './back-top/index.jsx';
export { default as Status } from './status/index.jsx';
export { default as TinyScrollbar } from './tinyscrollbar/index.jsx';
export { default as ConsoleLog } from './logger/index.js';

export { default as LockIcon } from './icons/Lock.jsx';
export { default as ArrowIcon } from './icons/Arrow.jsx';
export { default as UploadIcon } from './icons/Upload.jsx';
export { default as BackToTop } from './icons/BackToTop.jsx';
export { default as Checkmark } from './icons/Checkmark.jsx';
export { default as MultiSelectArrow } from './icons/MultiSelectArrow.jsx';

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

export { default as DetermineNewHeight } from './helpers/aspectratio/DetermineNewHeight';
export { default as DetermineNewWidth } from './helpers/aspectratio/DetermineNewWidth';
export { default as FindSelector } from './helpers/css/FindSelector';
export { default as GetCountryCodeByCurrencyCode } from './helpers/country/GetCountryCodeByCurrencyCode';
export { default as GetCountryCodeByLanguage } from './helpers/country/GetCountryCodeByLanguage';
export { default as ConvertCurrency } from './helpers/currency/ConvertCurrency';
export { default as GetByCurrency } from './helpers/currency/GetByCurrency';
export { default as GetCurrencyFormat } from './helpers/currency/GetCurrencyFormat';
export { default as GetCurrencySymbol } from './helpers/currency/GetCurrencySymbol';
export { default as GetDecimalByCurrency } from './helpers/currency/GetDecimalByCurrency';
export { default as AddDefaultThemeStyle } from './helpers/theme/AddDefaultThemeStyle';
export { default as UpdateThemeStyle } from './helpers/theme/UpdateThemeStyle';
export { default as IsValidJSON } from './helpers/json/IsValidJSON';
export { default as AddZero } from './helpers/math/AddZero';
export { default as RemoveUnits } from './helpers/remover/RemoveUnits';
export { default as ChunkArray } from './helpers/array/ChunkArray';
export { default as FileChecker } from './helpers/checker/FileChecker';
export { default as UniUpperCase } from './helpers/string/UniUpperCase';


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