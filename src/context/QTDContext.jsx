import React, { useState, createContext, useEffect } from "react";
import i18next from 'i18next';

import { ModalProvider } from "../modal/index";
import { NotificationProvider } from "../notification/index";
import { TooltipProvider } from "../tooltip/index";

const QTDContext = createContext();
      QTDContext.displayName = "QTDContext";

export const QTDProvider = (props) => {
  
  const [theme, SetTheme]                   = useState(props.theme ? props.theme : "dark");
  const [dateFormat, SetDateFormat]         = useState("");
  const [locale, SetLocale]                 = useState("en-US");
  const [language, SetLanguage]             = useState("en");
  const [brokenImage, SetBrokenImage]       = useState("");
  const [dummyTeamImage, SetDummyTeamImage] = useState("");

  const changeTheme = (value) => {
    SetTheme(value);
  };

  const changeBrokenImage = (value) => {
    SetBrokenImage(value);
  };

  const changeDummyTeamImage = (value) => {
    SetDummyTeamImage(value);
  };

  const changeDateFormat = (value) => {
    SetDateFormat(value);
  };

  const changeLocale = (value) => {
    SetLocale(value);
  };

  const changeLanguage = (value) => {
    SetLanguage(value);
    i18next.changeLanguage(value);
  };

  const value = {
    theme,
    brokenImage,
    dummyTeamImage,
    dateFormat,
    language,
    locale,
    changeTheme,
    changeBrokenImage,
    changeDummyTeamImage,
    changeDateFormat,
    changeLanguage,
    changeLocale
  };

  return (
    <QTDContext.Provider value={value}>
      <NotificationProvider>
        <TooltipProvider>
          <ModalProvider>
            { props.children }
          </ModalProvider>
        </TooltipProvider>
      </NotificationProvider>
    </QTDContext.Provider>
  );
};

export default QTDContext;