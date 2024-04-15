import { css } from "styled-components"

/**
 * SVG
 */
export const getSVG = () => {
  return css`
    &.qtd-svg {

      padding: 0 12px 0 12px;
      svg { fill: #ffffff; }

      /* X-SMALL */
      &.qtd-button-xs {
        svg { width: 12px; }
      }

      /* SMALL */
      &.qtd-button-sm {
        svg { width: 14px; }
      }

      /* MEDIUM */
      &.qtd-button-md {
        svg { width: 16px; }
      }

      /* LARGE */
      &.qtd-button-lg {
        svg { width: 20px; }
      }

      /* DEFAULT */
      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-md):not(&.qtd-button-lg):not(&.qtd-button-xlg) 
      {
        svg { width: 16px; }
      }

    }
  `
}