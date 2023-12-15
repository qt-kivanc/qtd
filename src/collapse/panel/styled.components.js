import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  `

const Title = styled.div`

  background-color: #1D2649;
  width: 100%;
  height: 60px;
  padding: 0 20px 0 20px;
  margin-bottom: 1px;

  cursor: pointer;
  transition: background-color 0.3s ease-out;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  span {
    font-size: 13px;
    color: #ffffff99;
  }

  &:hover:not(&.activeTitle) {
    background-color: #3396FB40;
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: #3396FB80;
      span {
        color: #ffffff;
      }

      .icon {
        color: #ffffff;
      }

      .arrow {
        fill: #ffffff;
      }
    `}

  `

const Content = styled.div`
  
  overflow: hidden;
  transition: max-height 0.25s ease-out;

  `

export { Wrapper, Title, Content };