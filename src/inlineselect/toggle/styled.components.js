import styled, {css} from 'styled-components';

const Selection = styled.div`
  width: max-content;
`

const Label = styled.span`

  font-size: 13px;
  font-weight: 400;
  color: #ffffff80;
  width: max-content;
  transition: color .15s ease-out;

`

const Container = styled.div`

  display: flex;
  align-items: center;

  svg {
    fill: #3396FB;
    margin-left: 10px;
    transition: transform .3s ease-out;
  }

  `

const Select = styled.div`

  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 10px 18px 10px 18px;
  
  border-radius: 5px 5px 0 0;

  ${({ open }) =>
    open &&
    css`
      background-color: #050A20;

      ${Label} {
        color: #ffffff;
      }

      ${Container} {
        svg {
          transform: rotate(180deg);
        }
      }
    `}

  `

export { Selection, Label, Container, Select };