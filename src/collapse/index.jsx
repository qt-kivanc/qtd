import React, { useEffect, useState } from 'react';

import Panel from './panel/Panel.jsx';
import { Wrapper } from './styled.components';

const Collapse = ({useLink = false, children}) => {

  const [selected, SetSelected] = useState("");

  useEffect(() => {



  }, []);

  const handleOnChange = (id) => {
    SetSelected(id);
  }

  return (

    <Wrapper>

      {
        React.Children.map(children, element => 
          React.cloneElement(element, {
            ...element.props,
            useLink: useLink,
            hasOpen: selected === element.props.id,
            onChange: handleOnChange
          })
        )
      }

    </Wrapper>

  );
  
};

Collapse.Panel = Panel;

export { Panel };
export default Collapse;