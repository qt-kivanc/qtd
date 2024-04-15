import { css } from "styled-components"

/**
 * CIRCLE
 */
export const getCircle = () => {
  return css`
    &.qtd-button-circle {

      border-radius: 100%;

      /* X-SMALL */
      &.qtd-button-xs {
        width: 24px;
      }

      /* SMALL */
      &.qtd-button-sm {
        width: 28px;
      }

      /* MEDIUM */
      &.qtd-button-md {
        width: 32px;
      }

      /* LARGE */
      &.qtd-button-lg {
        width: 44px;
      }

      /* X-LARGE */
      &.qtd-button-xlg {
        width: 46px;
      }

      /* DEFAULT */
      &:not(&.qtd-button-xs):not(&.qtd-button-sm):not(&.qtd-button-md):not(&.qtd-button-lg):not(&.qtd-button-xlg)
      {
        width: 40px;
      }

    }
  `
}