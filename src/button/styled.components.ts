import styled, {css} from 'styled-components';

import ALink from '../alink/index.jsx';
import CoreImage from '../image/index.jsx';

const ICON_MARGIN = "7px";
const ICON_MARGIN_SPACE_BETWEEN = "-7px";
const BORDER_RADIUS = "5px";

/**
 * SIZE
 */
const getSize = () => {
  return css`
    /* X-SMALL */
    &.qtd-button-xs {
      height: 24px;
      span { font-size: 10px; line-height: 10px; }
    }

    /* SMALL */
    &.qtd-button-sm {
      height: 28px;
      span { font-size: 12px; line-height: 12px; }
    }

    /* MEDIUM */
    &.qtd-button-md {
      height: 32px;
      span { font-size: 12px; line-height: 12px; }
    }

    /* LARGE */
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

/**
 * CIRCLE
 */
const getCircle = () => {
  return css`
    &.qtd-button-circle {

      border-radius: 100%;

      /* X-SMALL */
      &.qtd-button-xs {
        width: 24px;
      }

      /* SMALL */
      &.qtd-button-sm {
        width: 28px;
      }

      /* MEDIUM */
      &.qtd-button-md {
        width: 32px;
      }

      /* LARGE */
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

/**
 * ICON
 */
const getIcon = () => {
  return css`
    &.qtd-icon {
      
      padding: 0 12px 0 12px;

      /* X-SMALL */
      &.qtd-button-xs {
        ${Icon} { font-size: 10px; }
      }

      /* SMALL */
      &.qtd-button-sm {
        ${Icon} { font-size: 16px; }
      }

      /* MEDIUM */
      &.qtd-button-md {
        ${Icon} { font-size: 18px; }
      }

      /* LARGE */
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

/**
 * SVG
 */
const getSVG = () => {
  return css`
    &.qtd-svg {

      padding: 0 12px 0 12px;
      svg { fill: #ffffff; }

      /* X-SMALL */
      &.qtd-button-xs {
        svg { width: 10px; }
      }

      /* SMALL */
      &.qtd-button-sm {
        svg { width: 14px; }
      }

      /* MEDIUM */
      &.qtd-button-md {
        svg { width: 18px; }
      }

      /* LARGE */
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

/**
 * DEFAULT BUTTON
 */
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

/**
 * LINK BUTTON
 */
const getLinkButton = () => {
  return css`
    &.qtd-button-link {
      span, div.qtd-icon {

        color: #ffffff99;

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

/**
 * PRIMARY BUTTON
 */
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
        border: 2px solid #6CB5FF;
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

/**
 * SECONDARY BUTTON
 */
const getSecondaryButton = () => {
  return css`
    &.qtd-button-secondary {
      background: linear-gradient(-45deg,#ebebeb,#ffffff);
      span, div.qtd-icon {
        font-weight: bold;
        color: #000000;
      }
      &:hover {
        background: linear-gradient(-45deg,#CDCDCD,#ebebeb);
        span, div.qtd-icon {
          color: #000000;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#d8d8d8,#e2e2e2);
        border: 2px solid #6CB5FF;
        span, div.qtd-icon {
          color: #000000;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#CDCDCD,#A7A7A7);
        span, div.qtd-icon {
          color: rgb(0, 0, 0, 30);
        }
      }
    }
  `
}

/**
 * GENERIC BUTTON
 */
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
        border: 2px solid #6CB5FF;
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

/**
 * REQUEST BUTTON
 */
const getRequestButton = () => {
  return css`
    &.qtd-button-request {
      background: linear-gradient(90deg, #0BE881 0%, #02B964 99%);
      span, div.qtd-icon {
        font-weight: bold;
        color: #1D2649;
      }
      &:hover {
        background: linear-gradient(90deg, #16E886 0%, #0DD578 99%);
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(90deg, #02B964 0%, #0BE881 99%);
        border: 2px solid #0AE37E;
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &[disabled] {
        background: linear-gradient(90deg, #05B663 0%, #028246 97%);
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
        }
      }
    }
  `
}

/**
 * APPROVE BUTTON
 */
const getApproveButton = () => {
  return css`
    &.qtd-button-approve {
      background: linear-gradient(90deg, #FFB142 0%, #D88A1C 100%);
      span, div.qtd-icon {
        font-weight: bold;
        color: #1D2649;
      }
      &:hover {
        background: linear-gradient(90deg, #FFC067 0%, #FFB346 100%);
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(90deg, #D88A1C 0%, #FFB142 100%);
        border: 2px solid #FAAC3D;
        span, div.qtd-icon {
          color: #1D2649;
        }
      }
      &[disabled] {
        background: linear-gradient(90deg, #C88930 0%, #A86A13 98%);
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
        }
      }
    }
  `
}

/**
 * REJECT BUTTON
 */
const getRejectButton = () => {
  return css`
    &.qtd-button-reject {
      background: linear-gradient(90deg, #B33939 0%, #971B1B 100%);
      span, div.qtd-icon {
        font-weight: bold;
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(90deg, #DC5050 0%, #C52D2D 100%);
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(90deg, #971B1B 0%, #B33939 100%);
        border: 2px solid #AD3232;
        span, div.qtd-icon {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: linear-gradient(90deg, #872626 0%, #731010 100%);
        span, div.qtd-icon {
          color: rgb(29, 38, 73, 30);
        }
      }
    }
  `
}

/**
 * PENDING BUTTON
 */
const getPendingButton = () => {
  return css`
    &.qtd-button-pending {
      cursor: default;
      background-color: #1F2952;
      span, div.qtd-icon {
        font-weight: bold;
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

/**
 * REQUESTED BUTTON
 */
const getRequestedButton = () => {
  return css`
    &.qtd-button-requested {
      cursor: default;
      background-color: #1F295280;
      span, div.qtd-icon {
        font-weight: bold;
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

/**
 * SELECTED
 */
const getSelected = () => {
  return css`
    &.qtd-button-selected {

    }
  `
}

/**
 * DISABLED
 */
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

/**
 * STRECT
 */
const getStrect = () => {
  return css`
    &.qtd-button-stretch {
      width: 100%;
    }
    &:not(&.qtd-button-stretch) {
      width: max-content;
    }
  `
}

const getByContentPosition = (contentPosition: string, justify: string) => {

  if ( justify === "space-between" ) {
    return css`
      margin-right: ${ICON_MARGIN_SPACE_BETWEEN};
    `
  }
  else {
    if ( contentPosition === "left" ) {
      return css`
        margin-right: ${ICON_MARGIN};
      `
    }
    else {
      return css`
        margin-left: ${ICON_MARGIN};
      `
    }
  }

}

const Icon = styled.div<{ 
  useIconPadding: boolean, 
  contentPosition: string, 
  justify: string, 
  size: string 
}>`

  color: #ffffff;
  
  ${({ useIconPadding, contentPosition, justify }) => {
    if ( useIconPadding ) {
      return getByContentPosition(contentPosition, justify);
    }
  }}
    
`

const SVG = styled.div<{ 
  singleIcon: boolean, 
  contentPosition: string, 
  justify: string, 
  size: string 
}>`

  ${({ singleIcon, contentPosition, justify }) => {
      if ( !singleIcon ) {
        return getByContentPosition(contentPosition, justify);
      }
    }}
  
  `

const Image = styled(CoreImage)`

  width: 20px;
  height: 20px;

  ${({ contentPosition, justify }) => {
    return getByContentPosition(contentPosition, justify);
  }}

`

const Hide = styled.span<{ loading: boolean }>`
  ${({ loading }) =>
    loading === "true" &&
    css`
      opacity: 0;
    `}
  `

const WrapperContent = css<{ 
  justify: string
}>`

  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all .2s ease-out;
  justify-content: ${({justify}) => justify};
  border-radius: ${BORDER_RADIUS};

  div, span {
    transition: all .2s ease-out;
  }

  &:hover, &.qtd-button-selected, &[disabled] {
    transition: all .2s ease-out;
    div, span {
      transition: all .2s ease-out;
    }
  }

  &:not(&.qtd-button-link) {
    padding: 0 10px;
  }
  
  span {
    color: #ffffff;
    font-weight: 400;
    user-select: none;
  }

  /* ------------------------ */
  // STRECT
  /* ------------------------ */
  ${ () => getStrect() }
  
  /* ------------------------ */
  // SIZE
  /* ------------------------ */
  ${ () => getSize() }
  
  /* ------------------------ */
  // CIRCLE
  /* ------------------------ */
  ${ () => getCircle() }
  
  /* ------------------------ */
  // ICON
  /* ------------------------ */
  ${ () => getIcon() }

  /* ------------------------ */
  // SVG
  /* ------------------------ */
  ${ () => getSVG() }

  /* ------------------------ */
  // DEFAULT
  /* ------------------------ */
  ${ () => getDefaultButton() }

  /* ------------------------ */
  // LINK
  /* ------------------------ */
  ${ () => getLinkButton() }
  
  /* ------------------------ */
  // PRIMARY
  /* ------------------------ */
  ${ () => getPrimaryButton() }
  
  /* ------------------------ */
  // SECONDARY
  /* ------------------------ */
  ${ () => getSecondaryButton() }
  
  /* ------------------------ */
  // GENERIC
  /* ------------------------ */
  ${ () => getGenericButton() }
  
  /* ------------------------ */
  // REQUEST
  /* ------------------------ */
  ${ () => getRequestButton() }
  
  
  /* ------------------------ */
  // APPROVE
  /* ------------------------ */
  ${ () => getApproveButton() }
  
  /* ------------------------ */
  // REJECT
  /* ------------------------ */
  ${ () => getRejectButton() }
  
  /* ------------------------ */
  // PENDING
  /* ------------------------ */
  ${ () => getPendingButton() }
  
  /* ------------------------ */
  // REQUESTED
  /* ------------------------ */
  ${ () => getRequestedButton() }
  
  /* ------------------------ */
  // SELECTED
  /* ------------------------ */
  ${ () => getSelected() }
  
  /* ------------------------ */
  // DISABLED
  /* ------------------------ */
  ${ () => getDisabled() }

`

const CoreButton = styled.button`
  ${WrapperContent}
  `

const Link = styled(ALink)`
  ${WrapperContent}
  `

const ClickButton = styled.button`
  ${WrapperContent}
  `

export { SVG, Hide, Image, CoreButton, Link, ClickButton, Icon };