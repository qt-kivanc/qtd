import React from 'react';

import Checkmark from '../../icons/Checkmark.jsx';

import s from './style.module.scss';

const Checkbox = ({
  checked = false,
  children = null
}) => {

  const getCheckmark = () => {

    let style = s.checkmark;

    if ( checked )
      style += " " + s.check;

    return (
      <div className={style}>
        <Checkmark width={12} height={12} />
      </div>
    )

  }

  const getCheckbox = () => (

    <label className={s.container}>
      <div className={s.label}>
        { getCheckmark() }
        <span>{children}</span>
      </div>
    </label>

  )

  return getCheckbox();

};

export default Checkbox;