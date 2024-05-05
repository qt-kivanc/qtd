import styled, { css } from 'styled-components';
import LockIcon from '../../icons/Lock';

const Wrapper = styled.div`
  
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box; 

`
  
const Label = styled.div`
  
  display: flex;
  flex-grow: 1;
  height: 100%;

`

const Icon = styled.div`
  
  display: flex;
  align-items: center;

  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(-180deg);
    `}

`

const PreIcon = styled.div`

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
    background-color: #f8285a;
  }

`

const LockIconWrapper = styled(LockIcon)`
  
  fill: #ffffff80;

`

const Suffix = styled.div`
  
  display: grid;
  grid-column-gap: 10px;
  grid-auto-flow: column;
  align-items: center;
  justify-self: flex-end;

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

const ErrorBorder = styled.div`

  position: absolute;
  border: 1px solid #f8285a;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;

`

export { Wrapper, Suffix, Label, Icon, PreIcon, ErrorTooltip, ErrorBorder, Success, Warning, Failed, LockIconWrapper };