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

    <Wrapper className="qtd-calendar-header">
      <PrevYear className="qtd-calendar-prev-year" onClick={onPrevYear}>
        <span />
      </PrevYear>
      <PrevMonth className="qtd-calendar-prev-month" onClick={onPrevMonth}>
        <span />
      </PrevMonth>
      <Middle className="qtd-calendar-middle">
        <div>{month}</div>
        <div>{year}</div>
      </Middle>
      <NextMonth className="qtd-calendar-next-month" onClick={onNextMonth}>
        <span />
      </NextMonth>
      <NextYear className="qtd-calendar-next-year" onClick={onNextYear}>
        <span />
      </NextYear>
    </Wrapper>
    
  )

  return getHeader();

}