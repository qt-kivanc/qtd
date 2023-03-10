import React, { useState, useContext, useCallback } from "react";

import Container from "./container/Container.jsx";
import NotificationContext from "./context/NotificationsContext.jsx";

let id = 1;

export const NotificationProvider = ({ children }) => {

  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({
    title = "",
    description = "",
    placement = "topRight",
    autoHide = true,
    delay = 3000,
    type = "default"
  }) => {

    setNotifications((notifications) => [
      ...notifications,
      {
        id: id++,
        title: title,
        description: description,
        placement: placement,
        autoHide: autoHide,
        delay: delay,
        type: type
      }
    ]);

  }, [setNotifications]);

  const removeNotification = useCallback((id) => {

    setNotifications((notifications) => notifications.filter((n) => n.id !== id));

  }, [setNotifications]);

  return (

    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification
      }}
    >
      <Container notifications={notifications} onRemove={removeNotification} />
      {children}
    </NotificationContext.Provider>
    
  );

};

const useNotifications = () => {
  const notificationHelpers = useContext(NotificationContext);

  return notificationHelpers;
};

const Notification = {};
      Notification.useNotifications = useNotifications;

export { NotificationContext, useNotifications };
export default Notification;