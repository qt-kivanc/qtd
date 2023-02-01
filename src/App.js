import TinyScrollbar from "./tinyscrollbar";
import s from './App.module.scss';

import { useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Button from "./button";
import Checkbox from "./checkbox";
import { QTDProvider } from "./context/QTDContext";
import Form from "./form";
import Input from "./input";
import InputPassword from "./InputPassword";

function App() {

  const { Group, Control, Item } = Form;
  const form = useRef(null);

  const [loaded, SetLoaded] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [isValid, SetIsValid] = useState(false);
  const [hasError, SetHasError] = useState(false);

  const onFinish = (values) => {

    if ( loading && !loaded ) return;

    SetLoading(true);

  }

  const onFinishFailed = (values) => {

    console.log("onFinishFailed");
    console.table(values);

  }

  const onValidated = (value) => {

    console.log("onValidated");
    SetIsValid(value);

  }

  const handleInputChange = (event) => {
    if ( hasError ) {
      form.current.removeFieldError("username");
      form.current.removeFieldError("password");
      SetHasError(false);
    }
  }

  const handleResetPassword = (e) => {
    

  }

  const getForm = () => (

    <Form
      name="login" 
      ref={form}
      onFinish={onFinish} 
      onFinishFailed={onFinishFailed} 
      onValidated={onValidated}
    >
      <Group>

        <Item 
          name="username"
          label={'forms:labels.username'}
          rules={[
            {
              required: true,
              message: 'forms:errors.required'
            }
          ]}
        >
          <Input onChange={handleInputChange} />
        </Item>

        <Item 
          name="password" 
          type="password"
          label={'forms:labels.password'}
          rules={[
            {
              required: true,
              message: 'forms:errors.required'
            }
          ]}
        >
          <InputPassword onChange={handleInputChange} />
        </Item>

        <div>
          <Item name="remember" valuePropName="checked">
            <Checkbox checked={true}>
              {'forms:labels.rememberMe'}
            </Checkbox>
          </Item>
          <div onClick={handleResetPassword}>
            {'login.rememberPassword'}
          </div>
        </div>

      </Group>
      <Control>
        <Button
          htmlType="submit" 
          disabled={!isValid || loading} 
          loading={loading}
          stretch={true}
        >
          {'forms:buttons.login'}
        </Button>
      </Control>
    </Form>

  )
  
  return (
    <BrowserRouter>
      <QTDProvider>
        <div 
          style={{ display:'flex', 
          flexDirection:'column', 
          alignItems:'start', 
          justifyContent:'center', 
          gap:'1.5rem', 
          padding: '5rem' }}
        >
          <a
            href="https://www.npmjs.com/package/@quan-tech/qt-design"
            target="_blank"
            rel="noopener noreferrer"
          >
          Quantech Design Library
          </a>
        </div>
        { getForm() }
        {
        <TinyScrollbar className={s.scrollWrapper}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae congue massa, et ullamcorper turpis. Donec leo quam, scelerisque et auctor eu, luctus ac ante. Integer quis enim congue, egestas nibh ut, scelerisque libero. Donec ante lacus, tempor quis diam luctus, placerat vehicula nunc. Fusce elementum ante lectus, at varius elit eleifend vitae. Praesent vel tincidunt velit. Cras congue nisl at blandit porta. Integer nec arcu lacus. Quisque at facilisis metus. Integer ut consequat leo. Suspendisse maximus dui eu aliquet imperdiet. Aenean lectus sapien, iaculis et ex consectetur, egestas ultricies tellus. Vivamus blandit efficitur rutrum. Cras feugiat facilisis magna. Proin sit amet scelerisque velit.

  In volutpat semper enim eget tempus. Etiam felis orci, placerat aliquam lacinia sit amet, placerat sit amet tellus. Nulla elementum condimentum neque, at euismod velit convallis ac. Aliquam tincidunt blandit faucibus. Suspendisse semper tristique vulputate. Etiam rhoncus mauris tempor felis malesuada fermentum. Aenean tempus quam sit amet felis convallis vestibulum. Nulla lorem sapien, convallis ac diam ut, blandit fringilla turpis. Curabitur posuere turpis vitae ex ullamcorper, id iaculis eros tempor. Cras posuere, leo non bibendum imperdiet, libero arcu gravida lacus, in pellentesque enim odio ac libero.
        </TinyScrollbar>
    }
    </QTDProvider>
  </BrowserRouter>
  );
}

export default App;