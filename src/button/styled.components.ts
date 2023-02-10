import styled, {css, FlattenSimpleInterpolation} from 'styled-components';

import ALink from '../alink/index.jsx';
import CoreImage from '../image/index.jsx';

const getStyleByType = (type:string):FlattenSimpleInterpolation => {

  if ( type === "default" ) {
    return css`
      color: #ffffff;
      border: 1px solid #505A7D99;  
      transition: border-color 0.2s ease-out;

      span {
        font-weight: 400;
      }

      &:hover {
        border-color: #3598FE;
      }
    `
  }

  if ( type === "link" ) {
    return css`
      span {

        font-weight: 600;
        color: #ffffff99;

        &:hover {
          color: #ffffff;
        }

      }
    `
  }

  if ( type === "primary" ) {
    return css`
      span {
        color: #ffffff;
      }

      background: linear-gradient(-45deg,#1d74ce,#3598fe);
      
      &:hover {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
      }
    `
  }

  if ( type === "generic" ) {
    return css`
      span {
        color: #ffffff;
      }

      background-color: #1D2649;
      
      &:hover {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
      }
    `
  }

  if ( type === "approved" ) {
    return css`
      span {
        color: #1D2649;
      }

      background: linear-gradient(45deg,#fbda61,#f76b1c 94%);
      
      &:hover {
        background: linear-gradient(45deg,#F9FB61,#F79E1C);
      }
    `
  }

  if ( type === "rejected" ) {
    return css`
      span {
        color: #ffffff;
      }

      background: linear-gradient(45deg,#870F0F,#BC2222 94%);
      
      &:hover {
        background: linear-gradient(45deg,#9F1111,#E22020);
      }
    `
  }

  if ( type === "pending" ) {
    return css`
      span {
        color: #ffffff99;
      }

      background-color: #1F2952;
      cursor: default;
    `
  }

  if ( type === "requested" ) {
    return css`
      span {
        color: #ffffff4D;
      }

      background-color: #1F295280;
      cursor: default;
    `
  }

  return css``;

}

const getSelectedStyleByType = (type: string) => {

  if ( type === "primary" ) {
    return css`
      background: linear-gradient(-45deg,#197ADD,#6CB5FF);
    `
  }

  if ( type === "generic" ) {
    return css`
      background: linear-gradient(-45deg,#197ADD,#6CB5FF);
    `
  }

  if ( type === "default" ) {
    return css`
      border: 2px solid #3598FE;

      span {
        color: #3598FE;
        font-weight: 600;
        margin: -1px;
      }
    `
  }

  return css`background: linear-gradient(-45deg,#197ADD,#6CB5FF);`

}

const getSVGStyleBySize = (size:string) => {

  if ( size === "small" ) {
    return css`
      svg { width: 12px; }
    `
  }

  if ( size === "normal" ) {
    return css`
      svg { width: 14px; }
    `
  }

  if ( size === "medium" ) {
    return css`
      svg { width: 16px; }
    `
  }

  if ( size === "large" ) {
    return css`
      svg { width: 18px; }
    `
  }

  return css`svg { width: 12px; }`

}

const getIconStyleBySize = (size:string) => {

  if ( size === "small" ) {
    return css`
      font-size: 20px;
    `
  }

  if ( size === "normal" ) {
    return css`
      font-size: 22px;
    `
  }

  if ( size === "medium" ) {
    return css`
      font-size: 24px;
    `
  }

  if ( size === "large" ) {
    return css`
      font-size: 26px;
    `
  }

  return css`font-size: 20px;`

}

const WrapperContent = css<{ 
  stretch: boolean, 
  shape: string, 
  icon: string, 
  disabled: boolean, 
  svg: boolean, 
  loading: boolean, 
  selected: boolean, 
  type: string,
  size: string
}>`

  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  border-radius: 5px;
  padding: 0 10px;
  cursor: pointer;
  
  svg {
    fill: #ffffff;
  }

  span {
    color: #ffffff;
    font-weight: bold;
    font-size: 12px;
    line-height: 12px;
    user-select: none;
    transition: color 0.2s ease-out;
  }

  ${({ stretch }) =>
    stretch &&
    css`
      width: 100%;
    `
  }

  ${({ shape }) =>
    shape === "circle" &&
    css`
      border-radius: 100%;
    `
  }

  ${({ icon }) =>
    icon &&
    css`
      padding: 0 12px 0 10px;
    `
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      filter: grayscale(50%);
      opacity: .5;
    `
  }

  ${({ type }) =>
    (type !== "default" && type !== "link") &&
    css`
      span {
        font-weight: bold;
        letter-spacing: -.21px;
      }
    `
  } 

  ${({ svg, shape, loading }) =>
    (svg && shape !== "circle" && loading) &&
    css`
      padding-left: 34px;
    `
  }

  ${({ size, svg }) => !svg && getSVGStyleBySize(size)}
  ${({ type }) => getStyleByType(type)}
  ${({ selected, type }) => selected && getSelectedStyleByType(type)}

`
const SVG = styled.div<{ singleIcon: boolean, size: string }>`
  
  ${({ size }) => getSVGStyleBySize(size)}

  ${({ singleIcon }) =>
    !singleIcon &&
    css`
      margin-right: 7px;
    `}

  `

const Image = styled(CoreImage)`
  margin-right: 5px;
  width: 20px;
  height: 20px;
  `

const Hide = styled.span<{ loading: boolean }>`
  ${({ loading }) =>
    loading === "true" &&
    css`
      opacity: 0;
    `}
  `

const CoreButton = styled.button`
  ${WrapperContent}
  `

const Link = styled(ALink)`
  ${WrapperContent}
  `

const A = styled.a`
  ${WrapperContent}
  `

const Icon = styled.div<{ useIconPadding: boolean, size: string }>`

  color: #ffffff;
  
  ${({ size }) => getIconStyleBySize(size)}

  ${({ useIconPadding }) =>
    useIconPadding &&
    css`
      margin-right: 7px;
    `}
  `

export { SVG, Hide, Image, CoreButton, Link, A, Icon };