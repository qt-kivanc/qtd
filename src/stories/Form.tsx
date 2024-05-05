import { useTranslation } from "react-i18next";
import {Form as FormComponent, Input, Button, FieldUpdateProps, Upload} from "../index";
import { useRef, useState } from "react";
import { FormContextType } from '../form/context/FormContext';
import { FileTypes, FormValidationTypes } from "enums/enum";

interface StoryFormProps {
  
}

export const Form: React.FC<any> = ({
  ...props
}: StoryFormProps) => {
  
  //const { addNotification }     = Notification.useNotifications();
  const { t }                   = useTranslation();
  const [isValid, SetIsValis]   = useState(false);
  
  const [disableSamePassword, SetDisableSamePassword]   = useState(true);

  const form = useRef<FormContextType>(null);
  
  const style = {
    width: "500px",
  }

  // const addNotificationSuccess = (message = "") => {
  //   addNotification({
  //     title: t("success"),
  //     description: message,
  //     type: "success"
  //   });
  // };

  // const addNotificationError = (error = "") => {
  //   addNotification({
  //     title: t("error"),
  //     description: error,
  //     type: "error"
  //   });
  // };

  const { Group, Item, Control } = FormComponent;

  const onFinish = (values:{}) => {
    console.log("onFinish", values);
  }

  const onFinishFailed = (values:{}) => {
    console.log("onFinishFailed", values);
  }

  const onValidated = (valid:boolean) => {
    console.log("onValidated", valid);
    SetIsValis(valid);
  }

  const onReset = () => {
    console.log("onReset")
  }

  const onFieldUpdate = (update:FieldUpdateProps) => {
    console.log("onFieldUpdate", update);

    if ( update.name === "password" ) {
      SetDisableSamePassword(!update.valid);
    }

    console.log("form", form)
    console.log("isFieldsValid", form.current?.isFieldsValid(["username"]))
    console.log("getFields", form.current?.getFields())
    //console.log("isFieldsValid", isFieldsValid(["username"]))
    // SetIsValid(
    //   isFieldsValid(checkFields)
    // );

  }

  return (
    <div style={{...style}}>
      <FormComponent
        name            = "example-form"
        onFinish        = {onFinish}
        onFinishFailed  = {onFinishFailed}
        onValidated     = {onValidated}
        onFieldUpdate   = {onFieldUpdate}
        onReset         = {onReset}
        ref             = {form}
        {...props}
      >
        <Group>

          <Item name="username" rules={[
            {
              required: true
            },
            {
              type: FormValidationTypes.MIN_LENGTH,
              value: 8
            },
            {
              type: FormValidationTypes.MAX_LENGTH,
              value: 15
            },
            {
              type: FormValidationTypes.USERNAME
            }
          ]}>
            <Input placeholder='Name' floating={false} />
          </Item>

          <Item name="email" rules={[
            {
              required: true
            },
            {
              type: FormValidationTypes.MIN_LENGTH,
              value: 8
            },
            {
              type: FormValidationTypes.MAX_LENGTH,
              value: 15
            },
            {
              type: FormValidationTypes.EMAIL,
            }
          ]}>
            <Input placeholder='Name' floating={false} />
          </Item>

          <Item
            name  = "password"
            rules = {[
              {
                required: true
              },
              {
                type: FormValidationTypes.PASSWORD,
              }
            ]}
          >
            <Input value="" floating={false} type="password" />
          </Item>

          <Item
            name  = "password2"
            rules = {[
              {
                required: true
              },
              {
                type: FormValidationTypes.PASSWORD,
              },
              {
                required: true,
                message: t('forms:errors.confirmPassword')
              },
              {
                type: FormValidationTypes.SAME,
                field: 'password',
                message: t('errors.passwordsDontMatch')
              }
            ]}
          >
            <Input
              value       = ""
              floating    = {false}
              type        = "password"
              disabled    = {disableSamePassword}
            />
          </Item>

          <Item
            name  = "image"
            rules = {[
              {
                required: true
              }
            ]}
          >
            <Upload
              action              = "https://api.imgbb.com/1/upload?key=fa70bcfc032ed5fd20eafb19d21742b2"
              maxFileSize         = {1024}
              showDeleteIcon      = {true}
              showPreviewIcon     = {true}
              requestMethod       = "post"
              removeAction        = ""
              removeExtraFormData = {{}}
              binaryName          = "image"
              fileTypes           = {[FileTypes.PNG, FileTypes.JPG]}
            />
          </Item>
          
        </Group>

        <Control>
          <Button type="reset">Reset</Button>
          <Button type="submit" disabled={!isValid}>Submit</Button>
        </Control>

      </FormComponent>
    </div>
  );

};
