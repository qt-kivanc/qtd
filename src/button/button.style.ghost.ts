import { css } from "styled-components"

/**
 * GHOST BUTTON
 */
export const getGhostButton = () => {

  return css`

    &.qtd-button-ghost {

      background-color: transparent;
      border: 1px solid #00000000;

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
        span, div.icon {
          color: #0000004D;
          fill: #0000004D;
        }
      }
      
    }
  `
}