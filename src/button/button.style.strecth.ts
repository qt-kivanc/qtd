import { css } from "styled-components"

/**
 * STRECTH
 */
export const getStrecth = () => {
  return css`
    &.qtd-button-stretch {
      width: 100%;
    }
    &:not(&.qtd-button-stretch) {
      width: max-content;
    }
  `
}