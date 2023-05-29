import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  
  min-width: 100%;
  min-height: 40px;
  overflow: hidden;
  position: absolute;
  z-index: 2;
  transform-box: fill-box;
  transform-origin: 50% 1%;
  
  ul {
    min-width: max-content;
  }

`

const BodyWrapper = styled.div`
  
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