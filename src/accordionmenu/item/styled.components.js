import styled, {css} from 'styled-components';
import ALink from '../../alink/index.jsx';

const Wrapper = styled(ALink)`

  height: ${props => `${props.$itemHeight}px`};

  padding: 0 20px 0 50px;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  overflow: hidden;

  span {
    user-select: none;
  }

`

const Arrow = styled.div`

  margin-left: auto;
  transform: rotate(-90deg);

`

export { Wrapper, Arrow };