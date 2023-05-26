import { useEffect, useState } from 'react';

import { Wrapper, Label, InputWrapper } from './styled.components';

interface SingleLabelProps {
  value: string | object,
  label: string,
  size: string
}

const SingleLabel = ({
  value = "",
  label = "",
  size = "default"
}:SingleLabelProps) => {

  const [sizeStyle, SetSizeStyle] = useState<string>("");
  const [labelValue, SetLabelValue] = useState<string | object>("");
  const [labelTitle, SetLabelTitle] = useState<string>("");

  /*
  useEffect(() => {

    SetSizeStyle(size);

  }, []);
  */
  useEffect(() => {
    SetSizeStyle(size);
  }, [size]);
  
  useEffect(() => {
    SetLabelTitle(label);
  }, [label]);
  
  useEffect(() => {
    SetLabelValue(value);
  }, [value]);

  const getInput = () => (

    <Wrapper 
      className="qtd-select-selection-label qtd-select-selection-item-single"
    >
      <Label 
        size={sizeStyle}
      >
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

export default SingleLabel;