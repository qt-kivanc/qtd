import { css } from "styled-components"

/**
 * GHOST BUTTON
 */
export const getLinkButton = () => {

  return css`

    &.qtd-button-link {

      background-color: transparent;
      border: transparent;

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

        span {
          color: #3598FE;
          font-weight: 600;
          margin: -1px;
        }

      }

      &[disabled] {
        span, div.icon {
          color: #071437;
          fill: #071437;
        }
      }

      .qtd-spin-spinner {
        >div>div {
          border-color: #000000 transparent transparent;
        }
      }
      
    }
  `
}