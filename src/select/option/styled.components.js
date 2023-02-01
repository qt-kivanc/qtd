import styled, {css} from 'styled-components';

const Wrapper = styled.li`

  display: flex;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s ease-out;
  min-width: max-content;
  padding: 10px 30px 10px 15px;

  img {
    width: 20px;
    height: 20px;
    pointer-events: none;
  }

  span {
    color: #ffffff;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    white-space: nowrap;
  }

  &:not(:last-child) {
    margin-bottom: 1px;
  }

  &:hover {
    background-color: #3598FE20;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: #3598FE20;
    `
  }

  `

/* Eğer bu kısım olmazsa elemanların boyunu alamayız */
const ImageWrapper = styled.div`

  width: 20px;
  height: 20px;
  margin-right: 7px;

  `

const PreIcon = styled.div`

  color: #ffffff;
  margin-right: 7px;
  font-size: 20px;

  `

const Single = styled.div`

  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  `

export { Wrapper, ImageWrapper, PreIcon, Single };