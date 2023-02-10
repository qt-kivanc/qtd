import React from "react";
import { NavLink } from 'react-router-dom';

const ALink = ({ children, to, active, ...props }) => {

  //let resolved = useResolvedPath(to);
  //let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      {...props}
    >
      {children}
    </NavLink>
  )

}

export default ALink;