import styled from 'styled-components';

const Wrapper = styled.div`
  
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  transform-origin: 50% 50%;
  transform-box: fill-box;
  transition-timing-function: cubic-bezier(0,1.25);

  opacity: 1;

  `

const ModalEnter = styled.div`
  top: 55%;
  opacity: 0;
`

const ModalEnterActive = styled.div`
  top: 50%;
  opacity: 1;
  transition: opacity 300ms, top 300ms;
  transition-delay: .3s;
`

const ModalExit = styled.div`
  top: 50%;
  opacity: 1;
`

const ModalExitActive = styled.div`
  top: 55%;
  opacity: 0;
  transition: opacity 300ms, top 300ms;
`


export { Wrapper, ModalEnter, ModalEnterActive, ModalExit, ModalExitActive };