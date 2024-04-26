import { useTranslation } from 'react-i18next';
import {Notification, Upload as UploadComponent} from '../index';
import {UploadProps} from '../index';

interface StoryUploadProps extends UploadProps {
  
}

export const Upload: React.FC<any> = ({
  ...props
}: StoryUploadProps) => {
  
  const { addNotification } = Notification.useNotifications();
  const { t }               = useTranslation();

  const style = {
    width: "500px",
  }

  const addNotificationSuccess = (message = "") => {
    addNotification({
      title: t("notifications.success"),
      description: message,
      type: "success"
    });
  };

  const addNotificationError = (error = "") => {
    addNotification({
      title: t("notifications.error"),
      description: error,
      type: "error"
    });
  };

  return (
    <div style={{...style}}>
      <UploadComponent
        {...props}
        onUploadSuccess         = {() => {addNotificationSuccess("notifications.uploadSuccess")}}
        onUploadFailed          = {() => {addNotificationError("notifications.uploadFailed")}}
        onRemoveFileSuccess     = {() => {addNotificationSuccess("notifications.removeFileSuccess")}}
      />
    </div>
  );

};
