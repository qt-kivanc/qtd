import styled, {css} from 'styled-components';
import ALink from '../../alink/index.jsx';

const Wrapper = styled(ALink)`

  height: ${props => `${props.$itemHeight}px`};

  padding: 0 20px 0 50px;
  background-color: #3396FB1A;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: background-color 0.3s ease-out;

  span {
    font-size: 12px;
    color: #ffffff;
    user-select: none;
  }

  &.active {
    background-color: #3396FB80;
  }

  ${({ $isActive }) =>
    !$isActive &&
    css`
      &:hover {
        background-color: #3396FB40;
      }
    `}

  `

const Arrow = styled.div`

  transition: all 0.25s ease-out;
  margin-left: auto;
  transform: rotate(-90deg);
  fill: #ffffff;

  `

export { Wrapper, Arrow };