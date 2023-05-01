import styled, { css } from 'styled-components';

const Wrapper = styled.div` 
  position: relative;
  width: 100%;
`
  
const InputWrapper = styled.input`
  pointer-events: none;
  visibility: hidden;
`

const InputLabel = styled.label`
  display: block;
  position: relative;
  max-height: 0;
  pointer-events: none;

  &::before {
    content: attr(data-content);
    display: inline-block;
    filter: blur(0);
    backface-visibility: hidden;
    transform-origin: left top;
    position: relative;
  }
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

const Label = styled.span`
  position: absolute;
`

export { Wrapper, Label, InputWrapper, HiddenVisually, InputLabel };