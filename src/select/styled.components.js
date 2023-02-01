import styled, { css } from 'styled-components';

const Wrapper = styled.div`

  position: relative;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: .75;
      cursor: not-allowed;
      pointer-events: none;
    `}

  `
  
export { Wrapper };