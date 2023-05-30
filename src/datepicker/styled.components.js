import Calendar from '../calendar/index';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  
  position: relative;

  input {
    background: none;
    border-width: 0;
    display: block;
    width: 100%;
    outline: none;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: .75;
      cursor: not-allowed;
      pointer-events: none;
    `}

  `
  
const CalendarWrapper = styled(Calendar)`
  box-shadow: 0 0 30px rgba(0,0,0,.25);
  z-index: 2;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;

  transform-origin: 50% 1%;
  transform-box: fill-box;
  transition-timing-function: cubic-bezier(.75,-0.5,0,1.25);
  `

const Icon = styled.div`
  margin: 0;
  margin-right: 0px;
  color: #ffffff99;
  float: left;
  font-size: 20px;
  `

const ModalEnter = styled.div`
  opacity: 0;
  transform: translateY(-10px) ;
`

const ModalEnterActive = styled.div`
  opacity: 1;
  transform: translateY(0) ;
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


export { Wrapper, CalendarWrapper, Icon, ModalEnter, ModalEnterActive, ModalExit, ModalExitActive };