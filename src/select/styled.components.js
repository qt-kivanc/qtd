import styled, { css } from 'styled-components';
import { getFontSizeBySize, getImageSizeBySize, getOptionSizeBySize, getSelectSizeBySize } from './style.settings';

const ICON_MARGIN_RIGHT = "7px";
const ICON_SIZE_DEFAULT = "20px";
const BORDER_RADIUS     = "5px";

/**
 * SIZE
 */
const getBySize = (size) => {

  const selectSize = getSelectSizeBySize(size);

  return css`

    .qtd-select-selector {

      height  : ${selectSize.height}; 
      padding : ${selectSize.padding};

    }
    
  `
}

/**
 * LABEL
 */
const getLabelBySize = (size) => {

  const imageSize   = getImageSizeBySize(size);
  const selectSize  = getSelectSizeBySize(size);
  const fontSize    = getFontSizeBySize(size);

  return css`
      
    .qtd-select-selector {
      .qtd-icon {
        font-size: ${imageSize.height};
      }
    }

    .qtd-select-selection-item {
      .qtd-select-selection-label {

        [type=text] {
          height: ${selectSize.height};
        }

        &.qtd-select-selection-item-single {
          span {
            font-size   : ${fontSize.fontSize};
            line-height : ${fontSize.lineHeight};
            font-weight : ${fontSize.fontWeight};
          }
        }

        &.qtd-select-selection-item-floating {

          span {
            font-size   : ${fontSize.fontSize};
            line-height : ${fontSize.lineHeight};
            font-weight : ${fontSize.fontWeight};
          }

          &[data-filled="true"] {
            label::before {
              transform: translate3d(0, -40px, 0) scale3d(0.9, 0.9, 1);
            }
            > span {
              padding-top: 24px;
            }
          }

          &[data-filled="false"] {
            label::before {
              transform: translate3d(0, -32px, 0) scale3d(1, 1, 1);
            }
            > span { 
              position: relative;
            }
          }

        }

      }
    }
    
  `
}

/**
 * TYPE
 */
const getByType = () => {
  return css`

    &.qtd-select-primary {
      
      &.qtd-select-open {
        .qtd-select-selector {
          background-color: #0E1531BF;
        }
      }

      .qtd-select-selector {
        transition: background-color 0.2s ease;
        background-color: #0E153180;

        &:hover {
          background-color: #0E1531BF;
        }
      }

    }

    &.qtd-select-default {

      &.qtd-select-open {
        .qtd-select-selector {
          border: 1px solid #3598FE;
        }
      }

      .qtd-select-selector {
        border: 1px solid #505A7D99;

        &:hover {
          border-color: #3598FE;
        }
      }

    }

  `
}

/**
 * POSITION
 */
const getByPosition = () => {
  return css`

    &[data-position="bottom"] {
      top: calc(100% + 10px);
    }

    &[data-position="top"] {
      bottom: calc(100% + 10px);
    }

  `
}

/**
 * DIRECTION
 */
const getByDirection = () => {
  return css`

    &[data-direction="left"] {
      left: 0;
    }

    &[data-direction="right"] {
      right: 0;
    }

  `
}

/**
 * TOGGLE STYLES
 */
const getToggleStyles = (size) => {
  
  const imageSize = getImageSizeBySize(size);
  const fontSize  = getFontSizeBySize(size);

  return css`
    .qtd-select-selector {

      border-radius: ${BORDER_RADIUS};
      transition: border-color 0.2s ease-out;

      img {
        width: ${imageSize.width};
        height: ${imageSize.height};
        pointer-events: none;
        margin-right: ${ICON_MARGIN_RIGHT};
      }

      .qtd-select-arrow {
        transition: transform .25s ease-out;

        svg {
          width: ${imageSize.width};
          height: ${imageSize.height};
          fill: #ffffff;
        }
      }

      .qtd-icon {
        color: #ffffff;
        margin-right: ${ICON_MARGIN_RIGHT};
        font-size: ${ICON_SIZE_DEFAULT};
      }

      .qtd-select-status-error {
        border: 1px solid #f8285a;
        border-radius: ${BORDER_RADIUS};
      }

      .qtd-select-selection-item {

        .qtd-select-selection-label {

          [type=text] {
            border: none;
            padding: 0;
          }

          &.qtd-select-selection-item-single {

            transition: background-color 0.2s ease;
            border-radius: ${BORDER_RADIUS};

            [type=text] {
              font-size: ${fontSize.fontSize};
              color: #ffffffD9;
              caret-color: #ffffffD9;
            }

            span {
              color: #ffffff;
              font-weight: ${fontSize.fontWeight};
              margin-right: ${ICON_MARGIN_RIGHT};
            }

          }

          transition: background-color 0.2s ease;
          border-radius: ${BORDER_RADIUS};

          [type=text] {
            font-size: ${fontSize.fontSize};
            color: #ffffffD9;
            caret-color: #ffffffD9;

            &::placeholder {
              color: rgba(0, 0, 0, 0);
            }
          }

          span {
            color: #ffffffD9;
          }

          label {

            font-weight: ${fontSize.fontWeight};

            &::before {
              color: #ffffff99;
              transition: transform 0.2s ease;
            }

          }

        }

      }
    }
  `
}

/**
 * DROPDOWN STYLES
 */
const getDropdownStyles = (size) => {

  const imageSize   = getImageSizeBySize(size);
  const optionSize  = getOptionSizeBySize(size);
  const fontSize    = getFontSizeBySize(size);

  return css`
    .qtd-select-dropdown {

      background-color: #1D2649;
      border-radius: ${BORDER_RADIUS};
      box-shadow: 0 0 10px rgba(0,0,0,.25);
      transition-timing-function: cubic-bezier(.75,-0.5,0,1.25);

      ${ () => getByPosition() }
      ${ () => getByDirection() }

      .qtd-select-dropdown-body {
        max-height: 300px;
      }

      .qtd-select-item.qtd-select-item-option {

        transition  : border-color 0.2s ease-out;
        padding     : ${optionSize.padding};
        height      : ${optionSize.height};

        &.qtd-select-item-option-active {
          background-color: #3598FE20;
        }

        &.qtd-select-item-option-selected {
          background-color: #3598FE20;
        }

        .qtd-item-single {
          
          span {
            color: #ffffff;
            font-size: ${fontSize.fontSize};
            font-weight: ${fontSize.fontWeight};
            line-height: ${fontSize.lineHeight};
          }

          .qtd-image {

            width: ${imageSize.width};
            height: ${imageSize.height};
            margin-right: ${ICON_MARGIN_RIGHT};

            .qtd-select-option-image {
              width: ${imageSize.width};
              height: ${imageSize.height};
              pointer-events: none;
            }

            .qtd-select-option-icon {
              color: #ffffff;
              margin-right: ${ICON_MARGIN_RIGHT};
              font-size: ${imageSize.width};
            }

          }

        }
        
      }

    }
  `
}

/**
 * DISABLED
 */
const getDisabled = () => {
  return css`
    &[disabled] {
      opacity: .75;
      cursor: not-allowed;
      pointer-events: none;
    } 
  `
}

const Wrapper = styled.div`

  position: relative;
  box-sizing: border-box; 

  ul {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }

  /* ------------------------ */
  // TOGGLE
  /* ------------------------ */
  ${ (props) => getToggleStyles(props.$size) }
  
  /* ------------------------ */
  // DROPDOWN MENU
  /* ------------------------ */
  ${ (props) => getDropdownStyles(props.$size) }
  
  /* ------------------------ */
  // SIZE
  /* ------------------------ */
  ${ (props) => getBySize(props.$size) }

  /* ------------------------ */
  // TYPE
  /* ------------------------ */
  ${ () => getByType() }

  /* ------------------------ */
  // LABEL SIZE
  /* ------------------------ */
  ${ (props) => getLabelBySize(props.$size) }

  /* ------------------------ */
  // DISABLED
  /* ------------------------ */
  ${ () => getDisabled() }

`
  
export { Wrapper };