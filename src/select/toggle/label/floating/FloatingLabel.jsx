import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Wrapper, Label, InputWrapper, HiddenVisually, InputLabel } from './styled.components';

export default function FloatingLabel({
  id = v4(),
  value = "",
  label = "",
  placeholder = "",
  size = "small"
}) {

  const [sizeStyle, SetSizeStyle] = useState("small");
  const [labelValue, SetLabelValue] = useState("");
  const [labelTitle, SetLabelTitle] = useState("");
  const [placeholderValue, SetPlaceholderValue] = useState("");

  useEffect(() => {

  }, []);

  useEffect(() => {
    SetSizeStyle(size);
  }, [size]);

  useEffect(() => {
    SetPlaceholderValue(placeholder ? placeholder : "");
  }, [placeholder]);

  useEffect(() => {
    SetLabelTitle(label ? label : "");
  }, [label]);

  useEffect(() => {
    SetLabelValue(value ? value : "");
  }, [value]);

  const getInput = () => (

    <Wrapper className="qtd-select-selection-item-floating">
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
      <InputLabel filled={value !== ""} htmlFor={id} data-content={placeholder} >
        <HiddenVisually>
          {placeholder}
        </HiddenVisually>
      </InputLabel>
    </Wrapper>
    
  )

  return getInput();

}