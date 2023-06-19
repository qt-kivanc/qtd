import React from 'react';

import Checkmark from '../../icons/Checkmark.jsx';

import s from './style.module.scss';

const Checkbox = ({
  checked = false,
  className = "",
  children = null
}) => {

  const getCheckmark = () => {

    let style = "qtd-inline-select-checkbox " + s.checkmark;

    if ( checked )
      style += " " + s.check;

    return (
      <div className={style}>
        <Checkmark className="qtd-svg" width={12} height={12} />
      </div>
    )

  }

  const getCheckbox = () => (

    <label className={"qtd-inline-select-checkbox-label " + className + " " + s.container}>
      <div className={"qtd-inline-select-checkbox-wrapper " + s.label}>
        { getCheckmark() }
        <span>{children}</span>
      </div>
    </label>

  )

  return getCheckbox();

};

export default Checkbox;