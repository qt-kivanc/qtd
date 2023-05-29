import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const InputWrapper = styled.input`
  pointer-events: none;
  visibility: hidden;
  
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
`

const Label = styled.span`
  width: 100%;
`

export { Wrapper, Label, InputWrapper };