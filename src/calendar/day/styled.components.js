import styled, {css} from 'styled-components';

const Wrapper = styled.div`

  position: relative;
  cursor: pointer;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &::before {

    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    z-index: 1;
    height: 30px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    content: "";

  }

  span {

    font-size: 13px;
    letter-spacing: -.5;
    font-weight: 500;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50px;

    transition: background-color 0.15s ease-out;

  }

  &:hover {

    span {
      color: #3598FE;
      background-color: #0E1531;
    }

  }

  ${({ today }) =>
    today &&
    css`
      span {
        border: 1px solid #3598FE80;
      }
    `
  }

  ${({ selected }) =>
    selected &&
    css`
      span {
        color: #3598FE;
        background-color: #0E1531;
      }
    `
  }

  ${({ current }) =>
    current ?
      css`
        span {
          color: #ffffff;
        }
      `
    :
      css`
        span {
          color: #ffffff80;
        }
      `
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      
      &::before {
        background-color: none;
        background-color: #0E153180;
      }

      span {
        background: 0 0;
        color: #ffffff40;
      }
    `
  }

`

export { Wrapper };