import styled, { css } from 'styled-components';

const getBySize = () => {
  return css`

    &.qtd-select-xs {
      .qtd-select-selector {
        height: 24px; 
        padding: 0px 2px 0px 6px;
      }
    }

    &.qtd-select-sm {
      .qtd-select-selector {
        height: 28px; 
        padding: 0px 6px 0px 10px;
      }
    }

    &.qtd-select-md {
      .qtd-select-selector {
        height: 32px; 
        padding: 0px 5px 0px 10px;
      }
    }

    &.qtd-select-lg {
      .qtd-select-selector {
        height: 46px; 
        padding: 0px 6px 0px 10px;
      }
    }

    /* DEFAULT */
    &:not(&.qtd-select-xs):not(&.qtd-select-sm):not(&.qtd-select-md):not(&.qtd-select-lg) 
    {
      .qtd-select-selector {
        height: 40px; 
        padding: 0 7px 0 12px;
      }
    }
  `
}

const getLabelBySize = () => {
  return css`
      
    &.qtd-select-xs {
      
      .qtd-select-selector {
        .qtd-icon {
          font-size: 14px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {
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
          }
        }
      }
      
    }

    &.qtd-select-sm {

      .qtd-select-selector {
        .qtd-icon {
          font-size: 16px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {
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
          }
        }
      }

    }

    &.qtd-select-md {

      .qtd-select-selector {
        .qtd-icon {
          font-size: 18px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {
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
          }
        }
      }

    }

    &.qtd-select-lg {

      .qtd-select-selector {
        .qtd-icon {
          font-size: 22px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {
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
          }
        }
      }

    }

    /* DEFAULT */
    &:not(&.qtd-select-xs):not(&.qtd-select-sm):not(&.qtd-select-md):not(&.qtd-select-lg) {
      
      .qtd-select-selector {
        .qtd-icon {
          font-size: 20px;
        }
      }

      .qtd-select-selection-item {
        .qtd-select-selection-label {
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
          }
        }
      }

    }
  `
}

const getByType = () => {
  return css`

    &.qtd-select-primary {
      .qtd-select-selector {
        transition: background-color 0.2s ease;
        background-color: #0E153180;

        &:hover {
          background-color: #0E1531BF;
        }
      }
    }

    &.qtd-select-default {
      .qtd-select-selector {
        border: 1px solid #505A7D99;

        &:hover {
          border-color: #3598FE;
        }
      }
    }

  `
}

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

const getToggleStyles = () => {
  return css`
    .qtd-select-selector {

      border-radius: 6px;
      transition: border-color 0.2s ease-out;

      img {
        width: 20px;
        height: 20px;
        pointer-events: none;
        margin-right: 7px;
      }

      .qtd-select-arrow {
        transition: transform .25s ease-out;

        svg {
          width: 20px;
          height: 20px;
          fill: #ffffff;
        }
      }

      .qtd-icon {
        color: #ffffff;
        margin-right: 7px;
        font-size: 20px;
      }

      .qtd-select-status-error {
        border: 1px solid #870f0f;
        border-radius: 6px;
      }

      .qtd-select-selection-item {

        .qtd-select-selection-label {

          &.qtd-select-selection-item-single {

            transition: background-color 0.2s ease;
            border-radius: 6px;

            [type=text] {
              font-size: 13px;
              color: #ffffffD9;
              caret-color: #ffffffD9;
            }

            span {
              color: #ffffff;
              font-weight: 400;
              margin-right: 7px;
            }

          }

          &.qtd-select-selection-item-floating {

            transition: background-color 0.2s ease;
            border-radius: 6px;

            [type=text] {
              font-size: 13px;
              color: #ffffffD9;
              caret-color: #ffffffD9;

              height: 46px;
              padding-top: 13px;

              &::placeholder {
                color: rgba(0, 0, 0, 0);
              }
            }

            span {
              color: #ffffffD9;
              top: 23px;
            }

            label {

              font-weight: 500;

              &::before {
                color: #ffffff99;
                transition: transform 0.2s ease;
              }

              &::before {
                transform: translate3d(0, -32px, 0) scale3d(.8, .8, 1);
              }

              &[data-filled] {
                &::before {
                  transform: translate3d(0, -40px, 0) scale3d(0.76, 0.76, 1);
                }
              }

            }

          }

        }

      }

    }
  `
}

const getDropdownStyles = () => {
  return css`
    .qtd-select-dropdown {

      background-color: #1D2649;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0,0,0,.25);
      transition-timing-function: cubic-bezier(.75,-0.5,0,1.25);

      ${ () => getByPosition() }
      ${ () => getByDirection() }

      .qtd-select-dropdown-body {
        max-height: 300px;
      }

      .qtd-select-item.qtd-select-item-option {

        transition: border-color 0.2s ease-out;
        padding: 10px 30px 10px 15px;

        &:hover {
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

            width: 20px;
            height: 20px;
            margin-right: 7px;

            .qtd-select-option-image {
              width: 20px;
              height: 20px;
              pointer-events: none;
            }

            .qtd-select-option-icon {
              color: #ffffff;
              margin-right: 7px;
              font-size: 20px;
            }

          }

        }
        
      }

    }
  `
}

const Wrapper = styled.div`

  position: relative;

  &[disabled] {
    opacity: .75;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ------------------------ */
  // TOGGLE
  /* ------------------------ */
  ${ () => getToggleStyles() }
  
  /* ------------------------ */
  // DROPDOWN MENU
  /* ------------------------ */
  ${ () => getDropdownStyles() }
  
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

`
  
export { Wrapper };