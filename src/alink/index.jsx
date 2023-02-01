import React from "react";
import { NavLink, useResolvedPath } from 'react-router-dom';

const ALink = ({ children, to, active, ...props }) => {

  const getRoute = () => {

    let resolved = useResolvedPath(to);
    //let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <NavLink
          to={to}
          {...props}
        >
          {children}
        </NavLink>
    );
      
  }

  return getRoute();

}

export default ALink;