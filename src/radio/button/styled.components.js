import styled from 'styled-components';
import { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
  0% { transform: scale(.2) rotate(-5deg);}
  50% { transform: scale(1.3) rotate(5deg);}
  60% { transform: scale(0.9) rotate(0deg);}
  80% { transform: scale(1) }
  100% { transform: scale(1) }
`

const CheckIcon = styled.div`
  right: 10px;
  position: absolute;
  font-size: 20px;
  color: #3395FA;
  animation: ${bounceAnimation} 0.75s;
`

const PreIcon = styled.div`
  color: #ffffff80;
  font-size: 20px;
  margin-right: 4px;
`

const Left = styled.div`
  display: flex;
`

const Label = styled.label`
  position: relative;
  height: 100%;
  width: 100%;
`

const SimpleButton = styled.div`

  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;

  span {
    transition: color 0.2s ease;
    pointer-events: none;
    color: #ffffff80;
    font-size: 13px;
  }

`

const InnerButton = styled.div`

  border: solid 1px transparent;
  transition: background-color 0.2s ease;
  background: #0e153180;
  border-radius: 6px;
  padding: 0 15px;

  height: 46px;
  width: 100%;

  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;

  span {
    pointer-events: none;
    color: #ffffff80;
    font-size: 13px;
  }

`

const Wrapper = styled.div`

  position: relative;

  &:hover:not(&.qtd-radio-selected) {
    ${InnerButton} {
      background-color: #0E1531BF;
    }
    ${SimpleButton} {
      span {
        color: #ffffff;
      }
    }
  }

  input[type=radio] {
    
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none;
    height: 100%;

    &:checked {

      + ${Label} {

        ${InnerButton} {
          
          border: solid 1px #3598fe;

          span {
            color: #ffffff;
          }

          .preIcon {
            color: #ffffff;
          }
          
        }

        ${SimpleButton} {
          span {
            color: #ffffff;
          }
        }

      }

    }

  }

`

const ErrorBorder = styled.div`

  position: absolute;
  border: 1px solid #870f0f;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;

`

export { Wrapper, CheckIcon, PreIcon, Left, InnerButton, SimpleButton, Label, ErrorBorder };