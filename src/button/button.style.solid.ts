import { css } from "styled-components"

/**
 * SOLID BUTTON
 */
export const getSolidButton = () => {

  return css`

    &.qtd-button-solid {

      background-color: #f9f9f9;

      span, div.icon {
        color: #071437;
      }

      &:hover {
        span, div.icon {
          color: #1b84ff;
          fill: #1b84ff;
        }
      }

      &.qtd-button-selected {
        
        border: 2px solid #3598FE;

        span, div.icon {
          color: #3598FE;
          fill: #3598FE;
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