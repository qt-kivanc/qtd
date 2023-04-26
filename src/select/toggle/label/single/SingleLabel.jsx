import React, { useEffect, useState } from 'react';

import { Wrapper, Label, InputWrapper } from './styled.components';

export default function SingleLabel(props) {
  
  const { 

    label = "", 
    size = "small", 
    value = "",

  } = props;

  const [sizeStyle, SetSizeStyle] = useState("");
  const [labelValue, SetLabelValue] = useState("");
  const [labelTitle, SetLabelTitle] = useState("");
  /*
  useEffect(() => {

    SetSizeStyle(size);

  }, []);
  */
  useEffect(() => {
    SetSizeStyle(size ? size : "");
  }, [size]);
  
  useEffect(() => {
    SetLabelTitle(label ? label : "");
  }, [label]);
  
  useEffect(() => {
    SetLabelValue(value ? value : "");
  }, [value]);

  const getInput = () => (

    <Wrapper className="qtd-select-selection-label qtd-select-selection-item-single">
      <Label size={sizeStyle}>
        {labelTitle} 
      </Label>
      <InputWrapper 
        value={labelValue} 
        type="text" 
        disabled={true}
      />
    </Wrapper>

  )

  return getInput();

}