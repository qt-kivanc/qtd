import styled, {css} from 'styled-components';

const Wrapper = styled.li`

  display: flex;
  min-width: max-content;
  align-items: center;
  cursor: pointer;
  
  &:not(:last-child) {
    margin-bottom: 1px;
  }

`

/* Eğer bu kısım olmazsa elemanların boyunu alamayız */
const ImageWrapper = styled.div`

  img {
    pointer-events: none;
  }

`

const PreIcon = styled.div`

`

const Single = styled.div`

  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  span {
    white-space: nowrap;
  }

`

export { Wrapper, ImageWrapper, PreIcon, Single };