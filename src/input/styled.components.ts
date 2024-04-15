import styled, {css}  from 'styled-components';
import LockIcon from '../icons/Lock.jsx';

const getInputSize = () => {

  return css`

    /* X-SMALL */
    &.qtd-input-xs {
      height: 28px;
      .qtd-input-floating-input {
        height: 28px; 
        padding-top: 13px;
      }
    }

    /* SMALL */
    &.qtd-input-sm {
      height: 34px; 
      .qtd-input-floating-input {
        height: 34px; 
        padding-top: 13px;
      }
    }
    
    /* MEDIUM */
    &.qtd-input-md {
      height: 38px; 
      .qtd-input-floating-input {
        height: 38px; 
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
        transition: all .3 ease-out;
      }
    
      &:hover, &:focus-within {
        &::after {
          border-color: #505A7D;
        }
      }
    
    }

    /* DEFAULT */
    &.qtd-input-default
    {
      border: 1px solid #505A7D99;
      transition: all .3s ease-out;
      
      &:hover, &:focus-within {
        border-color: #3598FE;
      }
    }

  `

}

const Wrapper = styled.div`
  
  transition: background-color 0.2s ease;
  border-radius: 6px;
  width: inherit;

  position: relative;
  display: flex;
  justify-content: space-between;

  input {
    background: none;
    border-width: 0;
    display: block;
    width: 100%;
    border: none;
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

const Content = styled.div`

  display: grid;
  grid-auto-flow: column;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  justify-content: flex-start;
  grid-template-columns: 1fr;

`

const Middle = styled.div`
  
  width: 100%;
  justify-self: flex-start;

`

const IconsWrapper = styled.div`
  
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
  justify-items: flex-end;
  width: 100%;

`

const Prefix = styled.div`
  
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 10px;

  span {
    transition: color .3s ease-out;
  }

`

const Suffix = styled.div`
  
  display: flex;
  align-items: center;
  height: 100%;

  span {
    transition: color .3s ease-out;
  }

  /*
  display: grid;
  grid-column-gap: 10px;
  grid-auto-flow: column;
  align-items: center;
  justify-self: flex-end;
  */

`

const Locked = styled.div`
  
  display: flex;
  align-items: center;
  height: 100%;

`

const Addon = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  padding: 0 15px;
  height: 100%;

  font-size: 14px;
  font-weight: 500;

  span {
    transition: color .3s ease-out;
  }

`

const AddonBefore = styled(Addon)`
  
  border-radius: 6px 0 0 6px;

`

const AddonAfter = styled(Addon)`
  
  border-radius: 0 6px 6px 0;

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
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  border-radius: 6px;
  top: -1px;
  left: -1px;
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

  color: #ffffffCC;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    color: #ffffff;
  }

  &[data-icon="i"] {
    &::before {
      padding: 4px;
      border-radius: 50px;
    }
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
  Content,
  Prefix,
  Suffix,
  Locked,
  AddonBefore,
  AddonAfter,
  IconsWrapper,
  LockIconWrapper,
  ErrorTooltip,
  ErrorBorder,
  HiddenVisually,
  Success,
  Warning,
  Failed
};