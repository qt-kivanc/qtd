import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  
  min-width: 100%;
  background-color: #1D2649;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  z-index: 2;
  box-shadow: 0 0 10px rgba(0,0,0,.25);

  transform-origin: 50% 1%;
  transform-box: fill-box;
  transition-timing-function: cubic-bezier(.75,-0.5,0,1.25);
  
  ul {

    min-width: max-content;

  }

  ${({ position }) =>
    position === "bottom" &&
    css`
      top: calc(100% + 10px);
    `
  }

  ${({ position }) =>
    position === "top" &&
    css`
      bottom: calc(100% + 10px);
    `
  }

  ${({ direction }) =>
    direction === "left" &&
    css`
      left: 0;
    `
  }

  ${({ direction }) =>
    direction === "right" &&
    css`
      right: 0;
    `
  }

  `

const BodyWrapper = styled.div`
  max-height: 300px;
`

const ModalEnter = styled.div`
  opacity: 0;
  transform: translateY(-10px);
`

const ModalEnterActive = styled.div`
  opacity: 1;
  transform: translateY(0);
  transition: opacity 250ms, transform 250ms;
`

const ModalExit = styled.div`
  opacity: 1;
`

const ModalExitActive = styled.div`
  opacity: 0;
  transform: translateY(-10px) ;
  transition: opacity 250ms, transform 250ms;
`


export { Wrapper, BodyWrapper, ModalEnter, ModalEnterActive, ModalExit, ModalExitActive };