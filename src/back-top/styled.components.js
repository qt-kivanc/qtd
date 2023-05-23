import styled from 'styled-components';
import { keyframes } from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 80px;
  right: 30px;
  visibility: hidden;
  `

const Show = styled.a`

  visibility: ${props => props._show ? 'visible' : 'hidden'};
  animation: ${props => props._show ? showBounceAnimation : 'none'} 0.5s;

  display: block;
  transition: fill .3s ease-out;
  cursor: pointer;
  fill: #ffffff80;

  &:hover {
    fill: #3396fb;
  }
  
  `
/*
const hideBounceAnimation = keyframes`
  0% { transform: scale(.2) }
  50% { transform: scale(1.1) }
  75% { transform: scale(0.9) }
  100% { transform: scale(1) }
`
*/
const showBounceAnimation = keyframes`
  0% { transform: scale(.2) }
  50% { transform: scale(1.1) }
  75% { transform: scale(0.9) }
  100% { transform: scale(1) }
`

export { Wrapper, Show };