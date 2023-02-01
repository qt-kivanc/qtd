import styled, { css } from 'styled-components';

const getBySize = (size) => {

  if ( size === "small" ) {
    return (css`
      font-size: 12px;
    `)
  }

  if ( size === "medium" ) {
    return (css`
      font-size: 13px;
    `)
  }

  if ( size === "large" ) {
    return (css`
      font-size: 14px;
    `)
  }

  return (css`
    font-size: 12px;
  `)

}

const Wrapper = styled.div`
  
  transition: background-color 0.2s ease;
  border-radius: 6px;
  position: relative;
  width: 100%;

  `
  
const InputWrapper = styled.input`
  
  font-size: 13px;
  color: #ffffffD9;
  caret-color: #ffffffD9;

  height: 46px;
  padding-top: 13px;
  
  pointer-events: none;
  visibility: hidden;

  &::placeholder {
    color: rgba(0, 0, 0, 0);
  }

  `

const InputLabel = styled.label`
  
  display: block;
  position: relative;
  max-height: 0;
  font-weight: 500;
  pointer-events: none;

  &::before {

    color: #ffffff99;
    content: attr(data-content);
    display: inline-block;
    filter: blur(0);
    backface-visibility: hidden;
    transform-origin: left top;
    transition: transform 0.2s ease;
    position: relative;

  }

  &::before {
    transform: translate3d(0, -32px, 0) scale3d(.8, .8, 1);
  }

  ${({ filled }) =>
    filled &&
    css`
      &::before {
        transform: translate3d(0, -40px, 0) scale3d(0.76, 0.76, 1);
      }
    `}
  /*
  &::before + ${InputWrapper}:placeholder-shown {
    transform: translate3d(0, -32px, 0) scale3d(.8, .8, 1);
  }

  &::before,
  ${InputWrapper}:focus + &::before {
    transform: translate3d(0, -40px, 0) scale3d(0.76, 0.76, 1);
  }

  ${InputWrapper}:focus + &::before {
    color: #ffffff99;
  }
  */

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

const Label = styled.div`
  
  color: #ffffffD9;
  position: absolute;
  top: 20px;

  ${({ size }) => getBySize(size)}

  `

export { Wrapper, Label, InputWrapper, HiddenVisually, InputLabel };