import React, { useEffect } from "react";

import { Wrapper, Middle, NextMonth, PrevMonth, NextYear, PrevYear } from './styled.components';

export default function Header(props) {

  const {
    month = "",
    year = "",
    onPrevYear = null,
    onPrevMonth = null,
    onNextMonth = null,
    onNextYear = null,
  } = props;

  useEffect(() => {

  }, []);

  const getHeader = () => (

    <Wrapper>
      <PrevYear onClick={onPrevYear}>
        <span />
      </PrevYear>
      <PrevMonth onClick={onPrevMonth}>
        <span />
      </PrevMonth>
      <Middle>
        <div>{month}</div>
        <div>{year}</div>
      </Middle>
      <NextMonth onClick={onNextMonth}>
        <span />
      </NextMonth>
      <NextYear onClick={onNextYear}>
        <span />
      </NextYear>
    </Wrapper>
    
  )

  return getHeader();

}