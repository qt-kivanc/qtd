import { css } from "styled-components"

/**
 * DEFAULT BUTTON
 */
export const getDefaultButton = () => {

  return css`

    &.qtd-button-default {

      background-color: #1b84ff;

      span, div.icon {
        color: #ffffff;
        fill: #ffffff;
      }

      &:hover {
        background-color: #056ee9;
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
        span, div.icon {
          color: #ffffff4D;
          fill: #ffffff4D;
        }
      }
      
    }
  `
}