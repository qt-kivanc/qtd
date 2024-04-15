import styled, {css} from 'styled-components';

import ALink from '../alink/index';
import CoreImage from '../image/index.jsx';
import { getDefaultButton } from './button.style.default';
import { getSolidButton } from './button.style.solid';
import { getOutlineButton } from './button.style.outline';
import { getSize } from './button.style.size';
import { getIcon } from './button.style.icon';
import { IIcon, ISVG } from 'types/ButtonProps';
import { getCircle } from './button.style.circle';
import { getSVG } from './button.style.SVG';
import { getStrecth } from './button.style.strecth';
import { getGhostButton } from './button.style.ghost';
import { getLinkButton } from './button.style.link';

const ICON_MARGIN = "7px";
const ICON_MARGIN_SPACE_BETWEEN = "-7px";
const BORDER_RADIUS = "5px";

/**
 * PRIMARY BUTTON
 */
const getPrimaryButton = () => {
  return css`
    &.qtd-button-primary {
      background: linear-gradient(-45deg,#1d74ce,#3598fe);
      span, div.icon {
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(-45deg,#197ADD,#6CB5FF);
        span, div.icon {
          color: #ffffff;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#6CB5FF,#197ADD);
        border: 2px solid #6CB5FF;
        span, div.icon {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#477db4,#215283);
        span, div.icon {
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
      span, div.icon {
        color: #000000;
      }
      &:hover {
        background: linear-gradient(-45deg,#CDCDCD,#ebebeb);
        span, div.icon {
          color: #000000;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(-45deg,#d8d8d8,#e2e2e2);
        border: 2px solid #6CB5FF;
        span, div.icon {
          color: #000000;
        }
      }
      &[disabled] {
        background: linear-gradient(-45deg,#CDCDCD,#A7A7A7);
        span, div.icon {
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
      span, div.icon {
        color: #ffffff;
      }
      &:hover {
        background: #3396fb;
        span, div.icon {
          color: #ffffff;
        }
      }
      &.qtd-button-selected {
        background: #3396fb;
        border: 2px solid #6CB5FF;
        span, div.icon {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: #151B33;
        span, div.icon {
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
      span, div.icon {
        color: #1D2649;
      }
      &:hover {
        background: linear-gradient(90deg, #16E886 0%, #0DD578 99%);
        span, div.icon {
          color: #1D2649;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(90deg, #02B964 0%, #0BE881 99%);
        border: 2px solid #0AE37E;
        span, div.icon {
          color: #1D2649;
        }
      }
      &[disabled] {
        background: linear-gradient(90deg, #05B663 0%, #028246 97%);
        span, div.icon {
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
      span, div.icon {
        color: #1D2649;
      }
      &:hover {
        background: linear-gradient(90deg, #FFC067 0%, #FFB346 100%);
        span, div.icon {
          color: #1D2649;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(90deg, #D88A1C 0%, #FFB142 100%);
        border: 2px solid #FAAC3D;
        span, div.icon {
          color: #1D2649;
        }
      }
      &[disabled] {
        background: linear-gradient(90deg, #C88930 0%, #A86A13 98%);
        span, div.icon {
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
      span, div.icon {
        color: #ffffff;
      }
      &:hover {
        background: linear-gradient(90deg, #DC5050 0%, #C52D2D 100%);
        span, div.icon {
          color: #ffffff;
        }
      }
      &.qtd-button-selected {
        background: linear-gradient(90deg, #971B1B 0%, #B33939 100%);
        border: 2px solid #AD3232;
        span, div.icon {
          color: #ffffff;
        }
      }
      &[disabled] {
        background: linear-gradient(90deg, #872626 0%, #731010 100%);
        span, div.icon {
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
      span, div.icon {
        color: #ffffff99;
      }
      &:hover {
        background-color: #1F2952;
        span, div.icon {
          color: #ffffff99;
        }
      }
      &.qtd-button-selected {
        background-color: #1F2952;
        span, div.icon {
          color: #ffffff99;
        }
      }
      &[disabled] {
        background-color: #1F2952;
        span, div.icon {
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
      span, div.icon {
        color: #ffffff4D;
      }
      &:hover {
        background-color: #1F295280;
        span, div.icon {
          color: #ffffff4D;
        }
      }
      &.qtd-button-selected {
        background-color: #1F295280;
        span, div.icon {
          color: #ffffff4D;
        }
      }
      &[disabled] {
        background-color: #1F295280;
        span, div.icon {
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
      filter: grayscale(50%);
      opacity: .5;
    } 
  `
}

/**
 * FOCUS VISIBLE
 */
const getFocusVisible = () => {
  return css`
    &:focus-visible {
      outline: 2px solid #1b84ff;
      outline-offset: 2px;
    }
  `
}

const getByContentPosition = (contentPosition:string | undefined, justify:string | undefined) => {

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

const Icon = styled.div<IIcon>`

  color: #ffffff;
  
  ${({ $useIconPadding, $contentPosition, $justify }) => {
    if ( $useIconPadding ) {
      return getByContentPosition($contentPosition, $justify);
    }
  }}
    
`

const Element = styled(Icon)`
  display         : flex;
  align-items     : center;
  justify-content : center;
`

const SVG = styled.div<ISVG>`

  ${({ $singleIcon, $contentPosition, $justify }) => {
    if ( !$singleIcon ) {
      return getByContentPosition($contentPosition, $justify);
    }
  }}
  
`

const Image = styled(CoreImage)`

  width   : 20px;
  height  : 20px;

  ${({ $contentPosition, $justify }) => {
    return getByContentPosition($contentPosition, $justify);
  }}

`

const Hide = styled.span<{$loading:string}>`

  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
  
  ${({ $loading }) =>
    $loading === "true" &&
    css`
      opacity: 0;
    `}

`

const WrapperContent = css<{$justify:string}>`

  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  justify-content: ${({$justify}) => $justify};
  border-radius: ${BORDER_RADIUS};
  
  transition-property: background-color, margin;
  transition-duration: 800ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  span, div.icon {
    
    transition-property: background-color, border-color, color;
    transition-duration: 800ms;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    
  }

  /* ------------------------ */
  // STRECTH
  /* ------------------------ */
  ${ () => getStrecth() }
  
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
  ${ () => getIcon(Icon) }

  /* ------------------------ */
  // SVG
  /* ------------------------ */
  ${ () => getSVG() }

  /* ------------------------ */
  // DEFAULT
  /* ------------------------ */
  ${ () => getDefaultButton() }

  /* ------------------------ */
  // GHOST
  /* ------------------------ */
  ${ () => getGhostButton() }

  /* ------------------------ */
  // SOLID
  /* ------------------------ */
  ${ () => getSolidButton() }

  /* ------------------------ */
  // OUTLINE
  /* ------------------------ */
  ${ () => getOutlineButton() }

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
  
  /* ------------------------ */
  // FOCUS VISIBLE
  /* ------------------------ */
  ${ () => getFocusVisible() }

`

const ClickButton = styled.button<IIcon>`
  ${WrapperContent}
  border: none;
  background: none;
  padding: 0;
`

const Link = styled(ALink)<IIcon>`
  ${WrapperContent}
`

const A = styled.a<IIcon>`
  ${WrapperContent}
`

export { SVG, Hide, Element, Image, ClickButton, Link, A, Icon };