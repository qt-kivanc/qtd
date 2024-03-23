import styled, {css}  from 'styled-components';
import LockIcon from '../icons/Lock.jsx';

const getInputSize = () => {

  return css`

    /* X-SMALL */
    &.qtd-input-xs {
      height: 24px;
      .qtd-input-floating-input {
        height: 24px; 
        padding-top: 13px;
      }
    }

    /* SMALL */
    &.qtd-input-sm {
      height: 28px; 
      .qtd-input-floating-input {
        height: 28px; 
        padding-top: 13px;
      }
    }
    
    /* MEDIUM */
    &.qtd-input-md {
      height: 32px; 
      .qtd-input-floating-input {
        height: 32px; 
        padding-top: 13px;
      }
    }
    
    /* LARGE */
    &.qtd-input-lg {
      height: 44px; 
      .qtd-input-floating-input {
        height: 44px; 
        padding-top: 13px;
      }
    }
    
    /* X-LARGE */
    &.qtd-input-xlg {
      height: 46px; 
      .qtd-input-floating-input {
        height: 46px; 
        padding-top: 13px;
      }
    }
    
    /* DEFAULT */
    &:not(&.qtd-input-xs):not(&.qtd-input-sm):not(&.qtd-input-md):not(&.qtd-input-lg):not(&.qtd-input-xlg) {
      height: 40px; 
      .qtd-input-floating-input {
        height: 40px; 
        padding-top: 13px;
      }
    }
    
  `

}

const getInputVariant = () => {

  return css`
    
    /* FILLED */
    &.qtd-input-filled {

      background-color: #0E153180;
      
      &:hover, &:focus-within {
        background-color: #0E1531BF;
      }
    
    }
    
    /* DASHED */
    &.qtd-input-dashed {
    
      .qtd-error-border { 
        border-style: dashed;
      }
    
      &::after {
        content: '';
        position: absolute;
        border: 1px dashed #505A7D99;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        top: 0;
        left: 0;
        pointer-events: none;
      }
    
      &:hover, &:focus-within {
        &::after {
          border-color: #505A7D;
        }
      }
    
    }

    /* DEFAULT */
    &:not(&.qtd-input-filled):not(&.qtd-input-dashed) 
    {
      border: 1px solid #505A7D99;
      
      &:hover, &:focus-within {
        border-color: #3598FE;
      }
    }

  `

}

const Wrapper = styled.div`
  
  transition: background-color 0.2s ease;
  border-radius: 6px;
  padding: 0px 15px;
  width: inherit;

  position: relative;
  display: flex;
  justify-content: space-between;

  input {
    background: none;
    border-width: 0;
    display: block;
    width: 100%;
    outline: none;
  }

  /* ------------------------ */
  // VARIANT
  /* ------------------------ */
  ${ () => getInputVariant() }

  /* ------------------------ */
  // SIZE
  /* ------------------------ */
  ${ () => getInputSize() }

`

const Middle = styled.div`
  
  width: 100%;
  justify-self: flex-start;

`

const Suffix = styled.div`
  
  display: grid;
  grid-column-gap: 10px;
  grid-auto-flow: column;
  align-items: center;
  justify-self: flex-end;

`

const Prefix = styled.div`
  
  display: flex;
  align-items: center;
  margin-right: 10px;

`

const LockIconWrapper = styled(LockIcon)`
  
  fill: #ffffff80;

`

const ErrorTooltip = styled.span`
  
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  font-size: 12px;
  line-height: 14px;

  border-radius: 5px;
  padding: 10px 7px;
  right: 0px;
  bottom: 43px;
  color: #ffffff;
  background: #870f0f;
  width: max-content;
  max-width: 210px;

  z-index: 2;

  &::after {

    content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: -6px;
    right: 17px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid #870f0f;

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

const HiddenVisually = styled.span`

  border: 0;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;

`

const StatusCore = styled.div`

  margin: 0;
  margin-right: 0px;
  color: #ffffffCC;
  float: left;
  font-size: 10px;
  line-height: 10px;
  height: 100%;

  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

  &::before {
    padding: 4px;
    border-radius: 50px;
  }

`

const Success = styled(StatusCore)`

`

const Warning = styled(StatusCore)`

`

const Failed = styled(StatusCore)`

  &::before {
    background-color: #870F0F;
  }

`

export { 
  Wrapper,
  Middle,
  Suffix,
  Prefix,
  LockIconWrapper,
  ErrorTooltip,
  ErrorBorder,
  HiddenVisually,
  Success,
  Warning,
  Failed
};