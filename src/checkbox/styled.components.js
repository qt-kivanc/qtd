import styled, {css, keyframes} from 'styled-components';

const Wrapper = styled.label`

  display: flex;
  align-items: center;
  position: relative;
  
  cursor: pointer;
  user-select: none;
  min-height: 20px;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

`

const Label = styled.div`

  padding-left: 27px;
  min-height: 20px;

  display: flex;
  align-items: center;
  position: relative;

  span {

    font-size: 12px;
    font-weight: 400;
    color: #ffffff99;
    line-height: 1.2;

    a {
      color: #3396FB;
      &:hover {
        text-decoration: underline;
      }
    }

  }

`

const Checkmark = styled.span`

  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 6px;

  ${({ errorBorder }) =>
    errorBorder ?
      css`
        border: 1px solid #870f0f;
      `
    :
      css`
        border: 1px solid #505A7D80;
      `
  }

  ${({ isChecked }) =>
    isChecked &&
    css`
      &::after { 
        animation: ${bounceAnimation} 0.5s;
        content: "";
        position: absolute;
        left: 7px;
        top: 3px;
        width: 5px;
        height: 11px;
        border: solid #2196F3;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    `
  }

  //FIXME: Her koşulda hover çalışıyor. düzeltilmeli.
  ${({ isChecked, errorBorder }) =>
    (!isChecked && !errorBorder) &&
    css`
      ${Wrapper}:hover & {    
        border: 1px solid #505A7D;
      }
    `
  }

`

const ErrorTooltip = styled.span`

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  font-size: 12px;
  line-height: 14px;

  border-radius: 5px;
  padding: 10px;
  left: 0px;
  bottom: 50px;
  color: #ffffff;
  background: #870f0f;
  width: max-content;
  max-width: 300px;
  margin-bottom: 5px;

  &::after {

    content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: -6px;
    left: 3px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid #870f0f;

  }

`

const bounceAnimation = keyframes`
  0% { transform: scale(.2) rotate(42deg);}
  50% { transform: scale(1.3) rotate(48deg);}
  75% { transform: scale(0.9) rotate(44deg);}
  100% { transform: scale(1) rotate(45deg);}
`

export { Wrapper, Label, Checkmark, ErrorTooltip };