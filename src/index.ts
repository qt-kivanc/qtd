//import { StrictMode } from "react";
//import { createRoot } from "react-dom/client";

import i18next from 'i18next';
//import resourcesToBackend from 'i18next-resources-to-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

//import App from './App.js';
//import reportWebVitals from './reportWebVitals';

/*
I18NLoader(
  "/locales/{{lng}}/{{ns}}.json",
  ["tr", "en"],
  ["translation"],
  () => {}
);
*/
i18next
  //.use(LanguageDetector)
  .use(initReactI18next)
  // .use(
  //   resourcesToBackend(
  //     (language:string, namespace:string) => import(`./locales/${language}/${namespace}.json`)
  //   )
  // )
  .init({
    preload       : ["en", "tr"],
    fallbackLng   : ["en", "tr"],
    lng           : "en-US",
    load          : "languageOnly",
    ns            : ["translation"],
    defaultNS     : ["translation"],
    initImmediate : false,
    debug         : false,
    resources: {} 
  });

i18next.addResourceBundle(
  "en", 
  "translation", {
    success: "Success",
    error: "Error",
    errors: {
      required: "This field is required!",
      minLength: "Should contain at least {{- length}} characters",
      maxLength: "Is too long. Max size is {{- length}}",
      passwordRule: "Should contain upper and lower-case English letters, at least one digit and no spaces.",
      invalidEmailAddress: "Invalid email address",
      passwordsDontMatch: "The two passwords that you entered do not match!",
      usernameRule: "Only English letters, digits and symbols (-_). No space is allowed",
      wrongTCIdentity: "Wrong TC Identity Number",
      fieldMustBeTheSame: "This field must be the same as: {{- fields}}",
    },
    uploader: {
      header: "Drag and drop an file",
      hint: "or Browse to choose a file",
      fileUploading: "File uploading...",
      info: "Total: {{- total}} - {{- estimated}} s remaining.",
      delete: "Delete",
      preview: "Preview",
      error: "Error",
      fileFormatError: "You can only upload {{fileFormat}} file",
      fileSizeError: "File must smaller than {{fileSize}}",
      fileUploadSuccess: "File successfully uploaded.",
      fileUploadFailed: "File upload failed!",
      removeFileSuccess: "File successfully delete!",
      browserDoesntSupportDND: "Browser doesn't support drag and drop!",
      calculating: "Calculating...",
      removeFile: "Remove File",
      areYouSureToDeleteThisFile: "Are you sure to delete this file?",
      yes: "Yes",
      no: "No"
    }
  }
);

i18next.addResourceBundle(
  "tr", 
  "translation", {
    success: "Başarılı",
    error: "Hata",
    errors: {
      required: "Bu alan zorunludur!",
      minLength: "En az {{- length}} karakter olmalıdır",
      maxLength: "Çok uzun. Maks uzunluk {{- length}} karakter olmalıdır.",
      exactLength: "This field must be {{- length}} characters long.",
      passwordRule: "En az bir rakam, büyük-küçük harf olmalıdır ve boşluk kullanılmamalıdır",
      invalidEmailAddress: "Geçersiz e-posta adresi",
      passwordsDontMatch: "Girdiğiniz şifreler birbirleriyle uyuşmuyor!",
      usernameRule: "Harf, sayı ve bazı özel karakterlerden oluşmalıdır (-_). Boşluk kullanılmamalıdır",
      wrongTCIdentity: "TC Kimlik Numarası Yanlış",
      fieldMustBeTheSame: "Bu alan şunlarla aynı olmalıdır: {{- fields}}",
    },
    uploader: {
      header: "Bir resmi sürükleyip bırakın",
      hint: "ya da bir dosya seçmek için tıklayın.",
      fileUploading: "Dosya yükleniyor...",
      info: "Toplam: {{- total}} - {{- estimated}} sn kaldı.",
      delete: "Sil",
      preview: "Önizleme",
      error: "Hata",
      fileFormatError: "Yalnızca {{fileFormat}} dosyası yükleyebilirsiniz.",
      fileSizeError: "Dosya boyutu {{fileSize}}'den küçük olmalıdır.",
      fileUploadSuccess: "Dosya başarıyla yüklendi.",
      fileUploadFailed: "Dosya yüklenemedi!",
      removeFileSuccess: "Dosya başarıyla silindi!",
      browserDoesntSupportDND: "Tarayıcı taşı&bırak özelliğini desteklemiyor!",
      calculating: "Hesaplanıyor...",
      removeFile: "Dosya Silme",
      areYouSureToDeleteThisFile: "Bu dosyayı silmek istediğinize emin misiniz?",
      yes: "Evet",
      no: "Hayır"
    }
  }
);

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
export { default as Alert } from './alert/index';
export { default as Upload } from './upload/index';
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
export type { ButtonProps, ButtonType, ButtonVariant, ButtonState, ButtonSize, ButtonContentPosition } from './types/ButtonProps';
export type { FormProps, FormRuleProps, FormValueProps, FormItemProps, FormSubComponentProps, FieldUpdateProps } from './types/FormProps';
export type { FormContextType } from './form/context/FormContext';
export type { AlertProps, AlertType, AlertSize } from './types/AlertProps';
export type { SwitchProps } from './types/SwitchProps';
export type { ModalProps, ModalContentProps, ModalRefProps } from './types/ModalProps';
export type { UploadProps, UploadProgressProps, UploadResultMessageProps } from './types/UploadProps';

export { ModalState, FileExtensions, FileTypes } from './enums/enum';

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