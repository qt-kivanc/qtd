import { css } from "styled-components"

/**
 * OUTLINE BUTTON
 */
export const getOutlineButton = () => {

  return css`

    &.qtd-button-outline {

      background-color: transparent;
      border: 1px solid #dbdfe9;

      span, div.icon {
        color: #071437;
        fill: #071437;
      }

      &:hover {
        
        background-color: #f9f9f9;
        border-color: #dbdfe9;

        span, div.icon {
          //color: #1b84ff;
          //fill: #1b84ff;
        }

      }

      &:not([disabled]).qtd-button-selected {
        
        outline: 2px solid #3598FE;
        outline-offset: -1px;

        span, div.icon {
          color: #3598FE;
          fill: #3598FE;
        }

      }

      &[disabled] {
        
        border: 1px solid #dbdfe9;
        
        span, div.icon {
          color: #071437;
          fill: #071437;
        }

      }
      
    }
  `
}