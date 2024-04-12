import styled from 'styled-components';

const Thumb = styled.span`

  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50px;
  transition: 0.3s;

  .qtd-spin-spinner {

    margin-left: -6px!important;
    margin-top: -6px!important;
    width: 12px!important;
    height: 12px!important;

    >div>div {
      border-color: #071437 transparent transparent;
      border-width: 1px;
    }

  }
  
`

const Body = styled.div`
  
  cursor: pointer;
  text-indent: -9999px;
  width: 53px;
  height: 28px;
  background: #1D2649;
  display: block;
  border-radius: 28px;
  position: relative;
  box-shadow: inset 0px 0px 20px rgba(0,0,0,0.4);

`

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;

  button {

    background-color: transparent;

    &[data-state="checked"] {
      
      ${Thumb} {
        left: calc(100% - 3px);
        transform: translateX(-100%);
        background: #3396FB;
      }
      
    }

  }

  label {
    font-size: 14px;
    font-weight: 400;
    margin-left: 5px;
  }

  &.qtd-switch-loading .qtd-switch-body {
    cursor: progress;
  }

  &.qtd-switch-disabled .qtd-switch-body {

    cursor: not-allowed;
    background-color: #18181b7f;

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

export { Wrapper, ErrorTooltip, Body, Thumb };