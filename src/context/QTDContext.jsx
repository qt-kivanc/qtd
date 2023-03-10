import React, { useState, createContext, useEffect } from "react";

import { ModalProvider } from "../modal/index.jsx";
import { NotificationProvider } from "../notification/index.jsx";
import { TooltipProvider } from "../tooltip/index.jsx";

const QTDContext = createContext();
      QTDContext.displayName = "QTDContext";

export const QTDProvider = ({ children }) => {
  
  const [theme, SetTheme] = useState("dark");
  const [dateFormat, SetDateFormat] = useState("");
  const [locale, SetLocale] = useState("en-US");
  const [language, SetLanguage] = useState("en");
  const [brokenImage, SetBrokenImage] = useState("");
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
            { children }
          </ModalProvider>
        </TooltipProvider>
      </NotificationProvider>
    </QTDContext.Provider>
  );
};

export default QTDContext;