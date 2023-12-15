import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;

  `

const Overlay = styled.div`
  
  background: #000000BF;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: opacity .25s ease-out;
  opacity: 0;

  ${({ $show }) =>
    $show ?
      css`
        opacity: 1;
      `
    :
      css`
        opacity: 0;
      `
  }

  `


export { Wrapper, Overlay };