import styled, { css } from "styled-components";

const Wrapper = styled.div`

  position: relative;
  width: 100%;

  input[type="file"] {

    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    
  }

`

const FileContent = styled.div<{
  $showBorder :boolean,
  $hasError   :boolean,
  $padding    :number
}>`

  transition-property: border-color;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  border: 1px solid ${props => props.$hasError ? "#f8285a" : (props.$showBorder ? "#3498FE" : "#DBDFE9")};
  border-radius: 6px;
  padding: ${props => props.$padding + "px"};
  //overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
  min-height: 100px;

  position: relative;

`

const Label = styled.label<{$showFocus:boolean}>`

  display: block;

  outline: ${props => props.$showFocus ? "2px solid #1b84ff" : "2px solid #1b84ff00"};
  outline-offset: 1px;
  border-radius: 6px;

  transition-property: outline-color;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

`

const IconsWrapper = styled.div`

  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);

  display: flex;
  flex-direction: row;
  gap: 10px;

`

const Icons = styled.div`

  display: flex;
  flex-direction: column;
  gap: 10px;

`

const CenterContent = styled.div<{$height:number | string, $padding:number}>`

  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  min-height: ${props => props.$height ? props.$height : "300px"};
  padding: ${props => props.$padding + "px"};

`

const OverlayContent = styled.div<{$isHover:boolean}>`

  transition-property: all;
  transition-duration: 0ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0ms;
  //animation-direction: reverse;

  position: absolute;
  top: 150%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  display: flex;
  flex-direction: column;
  width: 100%;
  
  span {
    &:nth-child(1) {
      color: #000000;
      font-weight: 600; 
      font-size: 14px;
      text-align: center;
    }
    &:nth-child(2) {
      color: #00000090;
      font-weight: 500;
      font-size: 12px;
      text-align: center;
    }
  }

  ${({ $isHover }) =>
    $isHover &&
    css`
 
      top: 50%;
    `}

`

const Overlay = styled.div<{$isHover:boolean}>`

  position: absolute;

  display: flex;

  transition-property: all;
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  animation-direction: reverse;

  width: 100%;
  height: 100%;
  background-color: #ffffff00;
  backdrop-filter: blur(0px);
  border-radius: 5px;
  overflow: hidden;

  ${({ $isHover }) =>
    $isHover &&
    css`
      backdrop-filter: blur(2px);
      background-color: #ffffff90;
    `}

`

const Uploading = styled.div<{
  $isActive   : boolean,
  $complete   : boolean,
  $error      : boolean
}>`

  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition-property: all;
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  width: 100%;
  height: 100%;
  background-color: #1b84ff00;
  border-radius: 5px;
  overflow: hidden;

  span {

    color: #ffffff00;
    z-index: 1;
    pointer-events: none;

    transition-property: all;
    transition-duration: 400ms;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    
  }
  
  ${({ $isActive, $complete, $error }) =>
    $isActive &&
    css`
      background-color  : ${$complete ? "#91DB7D" : ($error ? "#ff0000" : "#1b84ff")};
      span {
        color: #ffffff;
      }
    `}

`

const UploadStatusBox = styled.div<{
  $progress   : number,
  $complete   : boolean,
  $error      : boolean
}>`
  transition-property: all;
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  content: "";

  background-color  : ${props => props.$complete ? "#91DB7D" : (props.$error ? "#ff0000" : "#54A3FF")};
  width             : ${props => props.$progress + "%"};
`

const ErrorBorder = styled.div`

  position: absolute;
  border: 1px solid #f8285a;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  border-radius: 6px;
  top: -1px;
  left: -1px;
  pointer-events: none;
  z-index: 1;

`
const StatusCore = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;

  color: #000000CC;
  font-size: 10px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #000000;
  }

  &[data-icon="i"] {
    &::before {
      padding: 4px;
      border-radius: 50px;
    }
  }

`

const Failed = styled(StatusCore)`

  &::before {
    background-color: #f8285a;
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
  padding: 10px 7px;
  right: -14px;
  bottom: 32px;
  color: #ffffff;
  background: #f8285a;
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
    border-top: 10px solid #f8285a;

  }

`

export { Wrapper, FileContent, IconsWrapper, Icons, Label, CenterContent, Overlay, OverlayContent, Uploading, UploadStatusBox, ErrorBorder, ErrorTooltip, Failed }