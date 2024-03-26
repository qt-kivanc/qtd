import { useEffect, useState } from 'react';

import { Wrapper, Label, InputWrapper } from './styled.components';

const SingleLabel = ({
  value       = "",
  label       = "",
  placeholder = "",
  size        = "default"
}) => {

  const [sizeStyle, SetSizeStyle]   = useState("");
  const [labelValue, SetLabelValue] = useState("");
  const [labelTitle, SetLabelTitle] = useState("");

  /*
  useEffect(() => {

    SetSizeStyle(size);

  }, []);
  */
  useEffect(() => {
    SetSizeStyle(size);
  }, [size]);
  
  useEffect(() => {
    SetLabelTitle(label === "" ? placeholder : label);
  }, [label]);
  
  useEffect(() => {
    SetLabelValue(value);
  }, [value]);

  const getInput = () => (

    <Wrapper 
      className="qtd-select-selection-label qtd-select-selection-item-single"
    >
      <Label 
        size      = {sizeStyle}
      >
        {labelTitle} 
      </Label>
      <InputWrapper 
        value     = {labelValue} 
        type      = "text" 
        disabled  = {true}
      />
    </Wrapper>

  )

  return getInput();

}

export default SingleLabel;