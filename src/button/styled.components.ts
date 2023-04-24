import styled, {css} from 'styled-components';

import ALink from '../alink/index.jsx';
import CoreImage from '../image/index.jsx';

const getSize = () => {
  return css`
    &.qtd-button-xs {
      height: 25px;
      span { font-size: 12px; line-height: 12px; }
    }

    &.qtd-button-sm {
      height: 28px;
      span { font-size: 12px; line-height: 12px; }
    }

    &.qtd-button-md {
      height: 32px;
      span { font-size: 12px; line-height: 12px; }
    }

    &.qtd-button-nm {
      height: 40px;
      span { font-size: 12px; line-height: 12px; }
    }

    &.qtd-button-lg {
      height: 46px;
      span { font-size: 18px; line-height: 18px; font-weight: 500; }
    }

    &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-nm):not(&.qtd-button-md):not(&.qtd-button-lg) 
    {
      height: 40px;
      span { font-size: 12px; line-height: 12px; }
    }
  `
}

const getCircle = () => {
  return css`
    &.qtd-button-circle {

      border-radius: 100%;

      &.qtd-button-xs {
        width: 25px;
      }

      &.qtd-button-sm {
        width: 28px;
      }

      &.qtd-button-md {
        width: 32px;
      }

      &.qtd-button-nm {
        width: 40px;
      }

      &.qtd-button-lg {
        width: 46px;
      }

      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-nm):not(&.qtd-button-md):not(&.qtd-button-lg) 
      {
        width: 40px;
      }

    }
  `
}

const getIcon = () => {
  return css`
    &.qtd-icon {
      
      padding: 0 12px 0 12px;

      &.qtd-button-xs {
        ${Icon} { font-size: 14px; }
      }

      &.qtd-button-sm {
        ${Icon} { font-size: 16px; }
      }

      &.qtd-button-md {
        ${Icon} { font-size: 18px; }
      }

      &.qtd-button-nm {
        ${Icon} { font-size: 20px; }
      }

      &.qtd-button-lg {
        ${Icon} { font-size: 26px; }
      }

      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-nm):not(&.qtd-button-md):not(&.qtd-button-lg) 
      {
        ${Icon} { font-size: 20px; }
      }
      
    }
  `
}

const getSVG = () => {
  return css`
    &.qtd-svg {

      padding: 0 12px 0 12px;
      svg { fill: #ffffff; }

      &.qtd-button-xs {
        svg { width: 12px; }
      }

      &.qtd-button-sm {
        svg { width: 14px; }
      }

      &.qtd-button-nm {
        svg { width: 16px; }
      }

      &.qtd-button-md {
        svg { width: 18px; }
      }

      &.qtd-button-lg {
        svg { width: 20px; }
      }

      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-nm):not(&.qtd-button-md):not(&.qtd-button-lg) 
      {
        svg { width: 16px; }
      }

    }
  `
}

const getDefaultButton = () => {
  return css`
    &.qtd-button-default {
      border: 1px solid #505A7D99;
      span, div {
        color: #ffffff;
        font-weight: 400;
      }
      &:hover {
        border-color: #3598FE;
      }
      &.qtd-button-selected {
        border: 2px solid #3598FE;
        span {
          color: #3598FE;
          font-weight: 600;
          margin: -1px;
        }
      }
      &[disabled] {
        border: 1px solid #505A7D4D;
        span, div {
          color: #ffffff4D;
        }
      }
    }
  `
}

const getLinkButton = () => {
  return css`
    &.qtd-button-link {
      span, div {
        color: #ffffff99;
        font-weight: 600;
        &:hover {
          color: #ffffff;
        }
        &[disabled] {
          span, div {
            color: #ffffff4D;
          }
        }
      }
    }
  `
}

const getPrimaryButton = () => {
  return css`
    &.qtd-button-primary {
      background: linear-gradient(-45deg,#1d74ce,#3598fe);
      span, div {
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#C3C3C3,#E3E3E3);
        span, div {
          color: #ffffff4D;
        }
      }
    }
  `
}

const getGenericButton = () => {
  return css` 
    &.qtd-button-generic {
      background-color: #1D2649;
      span, div {
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: #C3C3C3;
        span, div {
          color: #ffffff4D;
        }
      }
    }
  `
}

const getApprovedButton = () => {
  return css`
    &.qtd-button-approved {
      background: linear-gradient(45deg,#fbda61,#f76b1c 94%);
      span, div {
        color: #1D2649;
      }
      &:hover {
        background: linear-gradient(45deg,#F9FB61,#F79E1C);
      }
      &.qtd-button-selected {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
      &[disabled] {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
    }
  `
}

const getRejectedButton = () => {
  return css`
    &.qtd-button-rejected {
      background: linear-gradient(45deg,#870F0F,#BC2222 94%);
      span, div {
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(45deg,#9F1111,#E22020);
      }
      &.qtd-button-selected {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
      &[disabled] {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
    }
  `
}

const getPendingButton = () => {
  return css`
    &.qtd-button-pending {
      cursor: default;
      background-color: #1F2952;
      span, div {
        color: #ffffff99;
      }
      &:hover {
        //background: linear-gradient(45deg,#9F1111,#E22020);
      }
      &.qtd-button-selected {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
      &[disabled] {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
    }
  `
}

const getRequestedButton = () => {
  return css`
    &.qtd-button-requested {
      cursor: default;
      background-color: #1F295280;
      span, div {
        color: #ffffff4D;
      }
      &:hover {
        //background: linear-gradient(45deg,#9F1111,#E22020);
      }
      &.qtd-button-selected {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
      &[disabled] {
        //background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div {
          //color: #ffffff;
        }
      }
    }
  `
}

const getSelected = () => {
  return css`
    &.qtd-button-selected {

      &:not(&.qtd-button-default):not(&.qtd-button-link):not(&.qtd-button-primary):not(&.qtd-button-generic):not(&.qtd-button-approved):not(&.qtd-button-rejected):not(&.qtd-button-pending):not(&.qtd-button-requested)
      {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
      }

    }
  `
}

const getDisabled = () => {
  return css`
    &[disabled] {
      pointer-events: none;
      //cursor: not-allowed;
      //filter: grayscale(50%);
      //opacity: .5;
    } 
  `
}

const getStrect = () => {
  return css`
    &.qtd-button-stretch {
      width: 100%;
    }
  `
}

const Icon = styled.div<{ useIconPadding: boolean, size: string }>`
  color: #ffffff;
  
  ${({ useIconPadding }) =>
    useIconPadding &&
    css`
      margin-right: 7px;
    `}
    
`

const WrapperContent = css<{ 
  stretch: boolean, 
  shape: string, 
  icon: string,  
  svg: boolean, 
  loading: boolean, 
  type: string,
  size: string
}>`

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  padding: 0 10px;
  cursor: pointer;
  transition: all .2s ease-out;

  div, span {
    transition: all .2s ease-out;
  }

  &:hover, &.qtd-button-selected, &[disabled] {
    transition: all .2s ease-out;
    div, span {
      transition: all .2s ease-out;
    }
  }
  
  span {
    color: #ffffff;
    font-weight: 400;
    user-select: none;
    letter-spacing: -.21px;
  }

  /* STRECT */
  ${ () => getStrect() }
  
  /* SIZE */
  ${ () => getSize() }
  
  /* CIRCLE */
  ${ () => getCircle() }
  
  /* ICON */
  ${ () => getIcon() }

  /* SVG */
  ${ () => getSVG() }

  /* DEFAULT */
  ${ () => getDefaultButton() }

  /* LINK */
  ${ () => getLinkButton() }
  
  /* PRIMARY */
  ${ () => getPrimaryButton() }
  
  /* GENERIC */
  ${ () => getGenericButton() }
  
  /* APPROVED */
  ${ () => getApprovedButton() }
  
  /* REJECTED */
  ${ () => getRejectedButton() }
  
  /* PENDING */
  ${ () => getPendingButton() }
  
  /* REQUESTED */
  ${ () => getRequestedButton() }
  
  /* SELECTED */
  ${ () => getSelected() }
  
  /* DISABLED */
  ${ () => getDisabled() }

`

const SVG = styled.div<{ singleIcon: boolean, size: string }>`
  
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

export { SVG, Hide, Image, CoreButton, Link, A, Icon };