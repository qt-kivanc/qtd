import styled from "styled-components";
import { getSuccessAlert } from "./alert.style.success";
import { getErrorAlert } from "./alert.style.error";
import { getInfoAlert } from "./alert.style.info";
import { getWarningAlert } from "./alert.style.warning";

const Wrapper = styled.div`

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px;
  border-radius: 6px;
  font-weight: 500;

  svg {
    width: 16px;
    height: 16px;
  }
  
  /* ------------------------ */
  // SUCCESS
  /* ------------------------ */
  ${ () => getSuccessAlert() }

  /* ------------------------ */
  // INFO
  /* ------------------------ */
  ${ () => getInfoAlert() }

  /* ------------------------ */
  // WARNING
  /* ------------------------ */
  ${ () => getWarningAlert() }

  /* ------------------------ */
  // ERROR
  /* ------------------------ */
  ${ () => getErrorAlert() }
  
`

const Title = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  display: flex;
  align-self: flex-start;
`

const Description = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
`

const Texts = styled.span<{$noTitle:boolean}>`

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  gap: ${props => props.$noTitle ? 0 : "5px"};

`

const IconWrapper = styled.div`

  width: 16px;
  min-width: 16px;
  height: 100%;

  display: flex;
  align-self: flex-start;
  
  svg {
    display: flex;
    align-self: flex-start;
  }

`

export { Wrapper, IconWrapper, Title, Description, Texts };