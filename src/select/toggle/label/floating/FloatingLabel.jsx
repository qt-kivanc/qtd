import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Wrapper, Label, InputWrapper, HiddenVisually, InputLabel } from './styled.components';

const FloatingLabel = ({
  id = v4(),
  value = "",
  label = "",
  placeholder = "",
  size = "default"
}) => {

  const [sizeStyle, SetSizeStyle] = useState("default");
  const [labelValue, SetLabelValue] = useState("");
  const [labelTitle, SetLabelTitle] = useState("");
  const [placeholderValue, SetPlaceholderValue] = useState("");

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
      data-filled={label !== ""}
    >
      <Label size={sizeStyle}>
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
        data-filled={label !== ""}
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