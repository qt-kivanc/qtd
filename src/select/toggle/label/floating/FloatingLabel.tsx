import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Wrapper, Label, InputWrapper, HiddenVisually, InputLabel } from './styled.components';

interface FloatingLabelProps {
  id?: string,
  value: string | object,
  label: string,
  placeholder: string,
  size: string
}

const FloatingLabel = ({
  id = v4(),
  value = "",
  label = "",
  placeholder = "",
  size = "default"
}:FloatingLabelProps) => {

  const [sizeStyle, SetSizeStyle] = useState<string>("default");
  const [labelValue, SetLabelValue] = useState<string | object>("");
  const [labelTitle, SetLabelTitle] = useState<string>("");
  const [placeholderValue, SetPlaceholderValue] = useState<string>("");

  useEffect(() => {

  }, []);

  useEffect(() => {
    SetSizeStyle(size);
  }, [size]);

  useEffect(() => {
    SetPlaceholderValue(placeholder);
  }, [placeholder]);

  useEffect(() => {
    SetLabelTitle(label);
  }, [label]);

  useEffect(() => {
    SetLabelValue(value);
  }, [value]);

  const getInput = () => (

    <Wrapper 
      className="qtd-select-selection-label qtd-select-selection-item-floating"
    >
      <Label
        size={sizeStyle}
      >
        {labelTitle} 
      </Label>
      <InputWrapper 
        id={id} 
        placeholder={placeholderValue} 
        value={labelValue} 
        type="text" 
        disabled={true}
      />
      <InputLabel 
        data-filled={value !== ""} 
        htmlFor={id} 
        data-content={placeholder}
      >
        <HiddenVisually>
          {placeholder}
        </HiddenVisually>
      </InputLabel>
    </Wrapper>
    
  )

  return getInput();

}

export default FloatingLabel;