import styled, {css} from 'styled-components';

const Wrapper = styled.div`

  ${({ $scrollbar }) =>
    css`
      ${"." + $scrollbar}:before {
        background: #3598FE;
        border-radius: 7px;
      }
    `
  }

  ${({ $track, $vertical }) =>
    css`
      ${"." + $track + "." + $vertical} {
        width: 8px;
      }
    `
  }

  `

export { Wrapper };