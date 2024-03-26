import styled, { css } from 'styled-components';

const ICON_MARGIN_RIGHT = "7px";
const ICON_SIZE_DEFAULT = "20px";
const ICON_SIZE_MEDIUM = "16px";
const BORDER_RADIUS = "5px";

/**
 * SIZE
 */
const getBySize = () => {
  return css`

    /* X-SMALL */
    &.qtd-select-xs {
      .qtd-select-selector {

        height: 24px; 
        padding: 0px 15px 0px 15px;

      }
    }

    /* SMALL */
    &.qtd-select-sm {
      .qtd-select-selector {

        height: 28px; 
        padding: 0px 15px 0px 15px;

      }
    }

    /* MEDIUM */
    &.qtd-select-md {
      .qtd-select-selector {

        height: 32px; 
        padding: 0px 6px 0px 10px;

      }
    }

    /* LARGE */
    &.qtd-select-lg {
      .qtd-select-selector {

        height: 44px; 
        padding: 0px 15px 0px 15px;

      }
    }

    /* X-LARGE */
    &.qtd-select-xlg {
      .qtd-select-selector {

        height: 46px; 
        padding: 0px 15px 0px 15px;

      }
    }

    /* DEFAULT */
    &:not(&.qtd-select-xs):not(&.qtd-select-sm):not(&.qtd-select-md):not(&.qtd-select-lg):not(&.qtd-select-xlg)  
    {
      .qtd-select-selector {

        height: 40px; 
        padding: 0 7px 0 12px;

      }
    }
  `
}

/**
 * LABEL
 */
const getLabelBySize = () => {
  return css`
      
    /* X-SMALL */
    &.qtd-select-xs {
      
      .qtd-select-selector {
        .qtd-icon {
          font-size: 14px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {

          [type=text] {
            height: 24px;
          }

          &.qtd-select-selection-item-single {
            span {
              font-size: 11px;
              line-height: 11px;
            }
          }

          &.qtd-select-selection-item-floating {

            span {
              font-size: 11px;
              line-height: 11px;
            }

            &[data-filled="true"] {
              label::before {
                transform: translate3d(0, -24px, 0) scale3d(0.76, 0.76, 1);
              }
              > span {
                padding-top: 12px;
              }
            }

            &[data-filled="false"] {
              label::before {
                transform: translate3d(0, -20px, 0) scale3d(.8, .8, 1);
              }
              > span { 
                position: relative;
              }
            }

          }

        }
      }
      
    }

    /* SMALL */
    &.qtd-select-sm {

      .qtd-select-selector {
        .qtd-icon {
          font-size: 16px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {

          [type=text] {
            height: 28px;
          }

          &.qtd-select-selection-item-single {
            span {
              font-size: 12px;
              line-height: 12px;
            }
          }

          &.qtd-select-selection-item-floating {

            span {
              font-size: 12px;
              line-height: 12px;
            }

            &[data-filled="true"] {
              label::before {
                transform: translate3d(0, -26px, 0) scale3d(0.76, 0.76, 1);
              }
              > span {
                padding-top: 14px;
              }
            }

            &[data-filled="false"] {
              label::before {
                transform: translate3d(0, -22px, 0) scale3d(.8, .8, 1);
              }
              > span { 
                position: relative;
              }
            }

          }

        }
      }

    }

    /* MEDIUM */
    &.qtd-select-md {

      .qtd-select-selection-item {
        .qtd-select-selection-label {

          [type=text] {
            height: 32px;
          }

          &.qtd-select-selection-item-single {
            span {
              font-size: 12px;
              line-height: 12px;
            }
          }

          &.qtd-select-selection-item-floating {
          
            span {
              font-size: 12px;
              line-height: 12px;
            }

            &[data-filled="true"] {
              label::before {
                transform: translate3d(0, -28px, 0) scale3d(0.76, 0.76, 1);
              }
              > span {
                padding-top: 16px;
              }
            }

            &[data-filled="false"] {
              label::before {
                transform: translate3d(0, -23.5px, 0) scale3d(.8, .8, 1);
              }
              > span { 
                position: relative;
              }
            }
            
          }

        }
      }

    }

    /* LARGE */
    &.qtd-select-lg {

      .qtd-select-selector {
        .qtd-icon {
          font-size: 22px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {

          [type=text] {
            height: 44px;
          }

          &.qtd-select-selection-item-single {
            span {
              font-size: 13px;
              line-height: 13px;
            }
          }

          &.qtd-select-selection-item-floating {

            span {
              font-size: 13px;
              line-height: 13px;
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

    }

    /* X-LARGE */
    &.qtd-select-xlg {

      .qtd-select-selector {
        .qtd-icon {
          font-size: 22px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {

          [type=text] {
            height: 46px;
          }

          &.qtd-select-selection-item-single {
            span {
              font-size: 13px;
              line-height: 13px;
            }
          }

          &.qtd-select-selection-item-floating {

            span {
              font-size: 13px;
              line-height: 13px;
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

    }

    /* DEFAULT */
    &:not(&.qtd-select-xs):not(&.qtd-select-sm):not(&.qtd-select-md):not(&.qtd-select-lg):not(&.qtd-select-xlg)
    {
      
      .qtd-select-selector {
        .qtd-icon {
          font-size: ${ICON_SIZE_DEFAULT};
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {

          [type=text] {
            height: 40px;
          }

          &.qtd-select-selection-item-single {
            span {
              font-size: 12px;
              line-height: 12px;
            }
          }

          &.qtd-select-selection-item-floating {

            span {
              font-size: 12px;
              line-height: 12px;
            }

            &[data-filled="true"] {
              label::before {
                transform: translate3d(0, -34px, 0) scale3d(0.76, 0.76, 1);
              }
              > span {
                padding-top: 20px;
              }
            }

            &[data-filled="false"] {
              label::before {
                transform: translate3d(0, -28px, 0) scale3d(.8, .8, 1);
              }
              > span { 
                position: relative;
              }
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

const getImageSizeBySize = (size) => {

  if ( size === "xs" )   return {width: "20px", height: "20px"};
  if ( size === "sm" )   return {width: "20px", height: "20px"};
  if ( size === "md" )   return {width: "16px", height: "16px"};
  if ( size === "lg" )   return {width: "20px", height: "20px"};
  if ( size === "xlg" )  return {width: "20px", height: "20px"};
  

  return {width: "20px", height: "20px"}
  
}

const getOptionSizeBySize = (size) => {
  
  if ( size === "xs" )   return {padding: "0 30px 0 15px", height: "40px"};
  if ( size === "sm" )   return {padding: "0 30px 0 15px", height: "40px"};
  if ( size === "md" )   return {padding: "0 10px 0 10px", height: "30px"};
  if ( size === "lg" )   return {padding: "0 30px 0 15px", height: "40px"};
  if ( size === "xlg" )  return {padding: "0 30px 0 15px", height: "40px"};
  
  return {padding: "0 30px 0 15px", height: "40px"}
  
}

/**
 * TOGGLE STYLES
 */
const getToggleStyles = (size) => {
  
  const imageSize = getImageSizeBySize(size);

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
        border: 1px solid #870f0f;
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
              font-size: 13px;
              color: #ffffffD9;
              caret-color: #ffffffD9;
            }

            span {
              color: #ffffff;
              font-weight: 400;
              margin-right: ${ICON_MARGIN_RIGHT};
            }

          }

          transition: background-color 0.2s ease;
          border-radius: ${BORDER_RADIUS};

          [type=text] {
            font-size: 13px;
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

            font-weight: 500;

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

  const imageSize = getImageSizeBySize(size);
  const optionSize = getOptionSizeBySize(size);

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

        transition: border-color 0.2s ease-out;
        padding: ${optionSize.padding};
        height: ${optionSize.height};

        &.qtd-select-item-option-active {
          background-color: #3598FE20;
        }

        &.qtd-select-item-option-selected {
          background-color: #3598FE20;
        }

        .qtd-item-single {
          
          span {
            color: #ffffff;
            font-weight: 400;
            font-size: 12px;
            line-height: 12px;
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
  ${ () => getBySize() }

  /* ------------------------ */
  // TYPE
  /* ------------------------ */
  ${ () => getByType() }

  /* ------------------------ */
  // LABEL SIZE
  /* ------------------------ */
  ${ () => getLabelBySize() }

  /* ------------------------ */
  // DISABLED
  /* ------------------------ */
  ${ () => getDisabled() }

`
  
export { Wrapper };