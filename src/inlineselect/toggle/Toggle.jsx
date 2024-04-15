import React, { useEffect, useState } from 'react';

import InlineSelectArrow from '../../icons/InlineSelectArrow';

import { Label, Container, Select, Selection } from './styled.components';

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
      <Selection className="qtd-inline-select-selection-item">
        <Container>
          <Label className="qtd-inline-select-selection-label">
            { getLabel() } 
          </Label>
          <InlineSelectArrow 
            className="qtd-inline-select-arrow" 
            width={9} height={4.5} 
          />
        </Container>
      </Selection>
    )
  }

  return(

    <Select
      $open={isOpen} 
      onClick={(e) => onButtonClick(e)}
      className="qtd-inline-select-selector"
    >
      { getInput() }
    </Select>

  );

}