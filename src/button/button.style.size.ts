import { css } from "styled-components"

/**
 * SIZE
 */
export const getSize = () => {
  return css`
    /* X-SMALL */
    &.qtd-button-xs {

      min-width: 28px;
      height: 28px;
      
      .qtd-spin-spinner {
        >div {
          width: 15px;
          height: 15px;
        }
        >div>div {
          border-color: #ffffff transparent transparent;
          border-width: 1px;
        }
      }

      &:not(.qtd-button-has-icon) {
        padding: 10px 10px;
      }

      span { font-size: 12px; line-height: 12px; font-weight: 400; }
    }

    /* SMALL */
    &.qtd-button-sm {

      min-width: 34px;
      height: 34px;
      
      .qtd-spin-spinner {
        >div {
          width: 15px;
          height: 15px;
        }
        >div>div {
          border-color: #ffffff transparent transparent;
          border-width: 2px;
        }
      }

      &:not(.qtd-button-has-icon) {
        padding: 0 15px;
      }

      span { font-size: 13px; line-height: 13px; font-weight: 500; }
    }

    /* MEDIUM */
    &.qtd-button-md {

      min-width: 38px;
      height: 38px;
      
      .qtd-spin-spinner {
        >div {
          width: 18px;
          height: 18px;
        }
        >div>div {
          border-color: #ffffff transparent transparent;
          border-width: 2px;
        }
      }

      &:not(.qtd-button-has-icon) {
        padding: 0 15px;
      }

      span { font-size: 13px; line-height: 13px; font-weight: 500; }
    }

    /* LARGE */
    &.qtd-button-lg {

      min-width: 44px;
      height: 44px;
      
      .qtd-spin-spinner {
        >div {
          width: 22px;
          height: 22px;
        }
        >div>div {
          border-color: #FFFFFF transparent transparent;
          border-width: 2px;
        }
      }

      &:not(.qtd-button-has-icon) {
        padding: 0 20px;
      }

      span { font-size: 14px; line-height: 14px; font-weight: 500; }
    }

    /* X-LARGE */
    &.qtd-button-xlg {

      min-width: 46px;
      height: 46px;
      
      .qtd-spin-spinner {
        >div {
          width: 24px;
          height: 24px;
        }
        >div>div {
          border-color: #ffffff transparent transparent;
          border-width: 3px;
        }
      }

      &:not(.qtd-button-has-icon) {
        padding: 0 20px;
      }

      span { font-size: 15px; line-height: 15px; font-weight: 500; }
    }

    /* DEFAULT */
    &.qtd-button-df {

      min-width: 40px;
      height: 40px;
      
      .qtd-spin-spinner {
        >div {
          width: 20px;
          height: 20px;
        }
        >div>div {
          border-color: #FFFFFF transparent transparent;
          border-width: 2px;
        }
      }

      &:not(.qtd-button-has-icon) {
        padding: 0 15px;
      }

      span { font-size: 14px; line-height: 14px; font-weight: 500; }
    }
  `
}