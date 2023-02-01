import React, { useState, createContext } from "react";

import { ModalProvider } from "../modal/index.jsx";
import { NotificationProvider } from "../notification/index.jsx";
import { TooltipProvider } from "../tooltip/index.jsx";

const QTDContext = createContext();
      QTDContext.displayName = "QTDContext";

export const QTDProvider = ({ children }) => {
  
  const [theme, SetTheme] = useState("dark");
  const [brokenImage, SetBrokenImage] = useState("");
  const [dummyTeamImage, SetDummyTeamImage] = useState("");
  const [dateFormat, SetDateFormat] = useState("");
  const [locale, SetLocale] = useState("en");

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

  const value = {
    theme,
    brokenImage,
    dummyTeamImage,
    dateFormat,
    locale,
    changeTheme,
    changeBrokenImage,
    changeDummyTeamImage,
    changeDateFormat,
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