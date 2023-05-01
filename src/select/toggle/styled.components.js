import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  
  display: flex;
  align-items: center;
  cursor: pointer;

`
  
const Label = styled.div`
  
  display: flex;
  flex-grow: 1;

`

const Icon = styled.div`
  
  ${({ open }) =>
    open &&
    css`
      transform: rotate(-180deg);
    `}

`

const PreIcon = styled.div`

`
  
const ErrorBorder = styled.div`
  
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  `

export { Wrapper, Label, Icon, PreIcon, ErrorBorder };