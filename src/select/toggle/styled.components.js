import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  
  display: flex;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s ease-out;

  img {
    width: 20px;
    height: 20px;
    pointer-events: none;
    margin-right: 7px;
  }

  ${({ size }) => getBySize(size)}
  ${({ variant }) => getByVariant(variant)}

  `
  
const Label = styled.div`
  
  display: flex;
  flex-grow: 1;

  `

const Icon = styled.div`
  
  transition: transform .25s ease-out;

  ${({ open }) =>
    open &&
    css`
      transform: rotate(-180deg);
    `}
  
  svg {
      
    width: 20px;
    height: 20px;
    fill: #ffffff;

  }

  `

const PreIcon = styled.div`
  
  color: #ffffff;
  margin-right: 7px;
  font-size: 20px;

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

  `
  
const getBySize = (size) => {

  if ( size === "small" ) {
    return (css`
      height: 40px; 
      padding: 0 7px 0 12px;
    `)
  }

  if ( size === "medium" ) {
    return (css`
      height: 46px; 
      padding: 0 10px 0 15px;
    `)
  }

  if ( size === "large" ) {
    return (css`
      height: 50px; 
      padding: 0 10px 0 15px;
    `)
  }

  return (css`
    height: 40px; 
    padding: 0 7px 0 12px;
  `)

}

const getByVariant = (variant) => {

  if ( variant === "filled" ) {
    return (css`
      transition: background-color 0.2s ease;
      background-color: #0E153180;

      &:hover {
        background-color: #0E1531BF;
      }
    `)
  }

  if ( variant === "inverted" ) {
    return (css`
      border: 1px solid #505A7D99;

    &:hover {
      border-color: #3598FE;
    }
    `)
  }

  return (css`
    transition: background-color 0.2s ease;
    background-color: #0E153180;

    &:hover {
      background-color: #0E1531BF;
    }
  `)

}


export { Wrapper, Label, Icon, PreIcon, ErrorBorder };