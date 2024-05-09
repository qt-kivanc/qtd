import { useTranslation } from "react-i18next";
import {Form as FormComponent, Input, Button, FieldUpdateProps, Upload} from "../index";
import { useEffect, useRef, useState } from "react";
import { FormContextType } from '../form/context/FormContext';
import { FileTypes, FormValidationTypes } from "enums/enum";

interface StoryFormProps {
  name            : string,
  useQueryString  : boolean,
  initialValues   : {}
}

export const Form: React.FC<any> = ({
  name,
  useQueryString,
  initialValues
}: StoryFormProps) => {
  
  //const { addNotification }     = Notification.useNotifications();
  const { t }                   = useTranslation();
  const [isValid, SetIsValis]   = useState(false);
  const form                    = useRef<FormContextType>(null);
  
  const [disableSamePassword, SetDisableSamePassword]   = useState(true);

  const style = {
    width: "400px",
  }

  useEffect(() => {
    console.log("initialValues", initialValues);
    if ( Object.keys(initialValues).length > 0 ) {
      //form.current?.setInitialValues(initialValues);
    }
  }, [initialValues]);

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
    console.log("onReset");
    //form.current?.setFieldError("image", "asdsadasd")
  }

  const onFieldUpdate = (update:FieldUpdateProps) => {
    //console.log("onFieldUpdate", update);

    if ( update.name === "password" ) {
      SetDisableSamePassword(!update.valid);
    }

    //console.log("isFieldsValid", isFieldsValid(["username"]))
    // SetIsValid(
    //   isFieldsValid(checkFields)
    // );

  }

  return (
    <div style={{...style}}>
      <FormComponent
        name            = {name}
        onFinish        = {onFinish}
        onFinishFailed  = {onFinishFailed}
        onValidated     = {onValidated}
        onFieldUpdate   = {onFieldUpdate}
        onReset         = {onReset}
        ref             = {form}
        useQueryString  = {useQueryString}
        initialValues   = {initialValues}
      >
        <Group>

          <Item name="username" query="username" rules={[
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

          <Item name="email" query="email" rules={[
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
            name        = "password"
            query       = "password"
            dependency  = "password2"
            rules       = {[
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
            query = "password2"
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
            query = "image"
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