import styled, {css} from 'styled-components';

import ALink from '../alink/index.jsx';
import CoreImage from '../image/index.jsx';

const getSize = () => {
  return css`
    &.qtd-button-xs {
      height: 24px;
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

    &.qtd-button-lg {
      height: 46px;
      span { font-size: 18px; line-height: 18px; font-weight: 500; }
    }

    /* DEFAULT */
    &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-md):not(&.qtd-button-lg) 
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
        width: 24px;
      }

      &.qtd-button-sm {
        width: 28px;
      }

      &.qtd-button-md {
        width: 32px;
      }

      &.qtd-button-lg {
        width: 46px;
      }

      /* DEFAULT */
      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-md):not(&.qtd-button-lg) 
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

      &.qtd-button-lg {
        ${Icon} { font-size: 26px; }
      }

      /* DEFAULT */
      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-md):not(&.qtd-button-lg) 
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

      &.qtd-button-md {
        svg { width: 18px; }
      }

      &.qtd-button-lg {
        svg { width: 20px; }
      }

      /* DEFAULT */
      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-md):not(&.qtd-button-lg) 
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
      span, div.qtd-icon {
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
        span, div.qtd-icon {
          color: #ffffff4D;
        }
      }
    }
  `
}

const getLinkButton = () => {
  return css`
    &.qtd-button-link {
      span, div.qtd-icon {
        color: #ffffff99;
        font-weight: 600;
        &:hover {
          color: #ffffff;
        }
        &.qtd-button-selected {
          color: #3396FB;
        }
        &[disabled] {
          span, div.qtd-icon {
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
      span, div.qtd-icon {
        font-weight: bold;
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#6CB5FF,#197ADD);
        outline: 2px solid #6CB5FF;
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#477db4,#215283);
        span, div.qtd-icon {
          color: #ffffff4D;
        }
      }
    }
  `
}

const getSecondaryButton = () => {
  return css`
    &.qtd-button-secondary {
      background: linear-gradient(-45deg,#E4E4E4,#B7B7B7);
      span, div.qtd-icon {
        font-weight: bold;
        color: #1D2649;
      }
      &:hover {
        background: linear-gradient(-45deg,#EFEFEF,#D8D8D8);
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#B7B7B7,#E4E4E4);
        outline: 2px solid #6CB5FF;
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#E4E4E4,#B7B7B7);
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
        }
      }
    }
  `
}

const getGenericButton = () => {
  return css` 
    &.qtd-button-generic {
      background-color: #1D2649;
      span, div.qtd-icon {
        color: #ffffff;
      }
      &:hover {
        background: #3396fb;
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &.qtd-button-selected {
        background: #3396fb;
        outline: 2px solid #6CB5FF;
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: #151B33;
        span, div.qtd-icon {
          color: rgb(255, 255, 255, 30);
        }
      }
    }
  `
}

const getApprovedButton = () => {
  return css`
    &.qtd-button-approved {
      background: linear-gradient(45deg,#fbda61,#f76b1c);
      span, div.qtd-icon {
        color: #1D2649;
      }
      &:hover {
        background: linear-gradient(45deg,#F9FB61,#F79E1C);
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#F79E1C,#F9FB61);
        outline: 2px solid #FACA57;
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#B49E4D,#9D4513);
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
        }
      }
    }
  `
}

const getRejectedButton = () => {
  return css`
    &.qtd-button-rejected {
      background: linear-gradient(45deg,#870F0F,#BC2222);
      span, div.qtd-icon {
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(45deg,#9F1111,#E22020);
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#E22020,#9F1111);
        outline: 2px solid #DF1F1F;
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#640B0B,#9B1414);
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
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
      span, div.qtd-icon {
        color: #ffffff99;
      }
      &:hover {
        background-color: #1F2952;
        span, div.qtd-icon {
          color: #ffffff99;
        }
      }
      &.qtd-button-selected {
        background-color: #1F2952;
        span, div.qtd-icon {
          color: #ffffff99;
        }
      }
      &[disabled] {
        background-color: #1F2952;
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
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
      span, div.qtd-icon {
        color: #ffffff4D;
      }
      &:hover {
        background-color: #1F295280;
        span, div.qtd-icon {
          color: #ffffff4D;
        }
      }
      &.qtd-button-selected {
        background-color: #1F295280;
        span, div.qtd-icon {
          color: #ffffff4D;
        }
      }
      &[disabled] {
        background-color: #1F295280;
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
        }
      }
    }
  `
}

const getSelected = () => {
  return css`
    &.qtd-button-selected {

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
  
  /* SECONDARY */
  ${ () => getSecondaryButton() }
  
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