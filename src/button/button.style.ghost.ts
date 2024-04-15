import { css } from "styled-components"

/**
 * GHOST BUTTON
 */
export const getGhostButton = () => {

  return css`

    &.qtd-button-ghost {

      background-color: transparent;

      span, div.icon {
        color: #252f4a;
      }

      &:hover {
        
        background-color: #f9f9f9;

        span, div.icon {
          color: #1b84ff;
          fill: #1b84ff;
        }

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