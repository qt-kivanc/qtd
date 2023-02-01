import React, { useEffect, useState } from 'react';

import MultiSelectArrow from '../../icons/MultiSelectArrow.jsx';

import { Label, Container, Select } from './styled.components';

export default function Toggle({
  label = "",
  value = "",
  count = 0,
  isOpen = false,
  single = false,
  onChange = null
} ) {

  const [isOpened, SetIsOpened] = useState(isOpen);

  useEffect(() => {

  }, []);

  useEffect(() => {

    SetIsOpened(isOpen);

  }, [isOpen]);

  /**
   * 
   * Select'e tıklanıldığın açar veya kapatır.
   * 
   * @param {*} event Zorunlu değil
   * 
   */
  const onButtonClick = (event) => {

    SetIsOpened(!isOpened);
    onChange(!isOpened);

  }

  const getLabel = () => {

    if ( single || count === 1 ) {
      return label;
    }
    else {
      return label + " (" + count + ")";
    }

  }

  const getInput = () => {
    
    return ( 
      <Label>
        <Container>
          <Label>
            { getLabel() } 
          </Label>
          <MultiSelectArrow width={9} height={4.5} />
        </Container>
      </Label>
    )
  }

  return(

    <Select open={isOpen} onClick={(e) => onButtonClick(e)}>

      { getInput() }

    </Select>

  );

}