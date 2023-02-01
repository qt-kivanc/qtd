import styled, { css } from 'styled-components';

const getByPosition = (position) => {

  if ( position === "topLeft" ) {
    return (css`
      left: 0;
      top: 0;
    `)
  }

  if ( position === "topRight" ) {
    return (css`
      right: 0;
      top: 0;
    `)
  }

  if ( position === "bottomRight" ) {
    return (css`
      right: 0;
      bottom: 0;
    `)
  }

  if ( position === "bottomLeft" ) {
    return (css`
      left: 0;
      bottom: 0;
    `)
  }

  return (css`
    left: 0;
    top: 0;
  `)

}

const Wrapper = styled.div`
  
  position: fixed;
  overflow: hidden;
  z-index: 6;
  padding: 30px;
  pointer-events: none;

  ${({ position }) => getByPosition(position)}

  `

export { Wrapper };