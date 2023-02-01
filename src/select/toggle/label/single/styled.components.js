import styled, { css } from 'styled-components';

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

  pointer-events: none;
  visibility: hidden;
  
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;

  `

const Label = styled.div`
  
  color: #ffffff;
  font-weight: 400;
  margin-right: 7px;
  width: 100%;

  ${({ size }) => getBySize(size)}

  `

const getBySize = (size) => {

  if ( size === "small" ) {
    return (
      css`
        font-size: 12px;
        line-height: 12px;
      `
    )
  }

  if ( size === "medium" ) {
    return (
      css`
        font-size: 13px;
        line-height: 13px;
      `
    )
  }

  if ( size === "large" ) {
    return (
      css`
        font-size: 14px;
        line-height: 14px;
      `
    )
  }

  return (
    css`
      font-size: 12px;
      line-height: 12px;
    `
  )

}


export { Wrapper, Label, InputWrapper };