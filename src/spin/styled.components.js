import { keyframes } from 'styled-components';
import styled from 'styled-components';

const SpinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  position: relative;
  `

const SpinWrapper = styled.div`

  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};

  position:absolute;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  `
  
const Spinner = styled.div`

  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;

  div {

    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid #fff;
    border-radius: 50%;
    animation: ${SpinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
    
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  
  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  `

const ChildrenWrapper = styled.div`

  opacity: ${props => `${props.$updating ? .5 : 1}`};
  pointer-events: ${props => `${props.$updating ? 'none' : 'auto'}`};

`

export { Wrapper, Spinner, ChildrenWrapper, SpinWrapper };