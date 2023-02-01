import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  
  margin-bottom: 10px;
  max-width: 300px;

  font-size: 12px;
  position: relative;
  padding: 16px;
  border-radius: 3px;
  word-break: break-word;
  cursor: pointer;
  pointer-events: auto;

  font-size: 13px;
  font-weight: 600;

  ${({ status }) => getByStatus(status)}

  `

const Title = styled.div`

  `

const getByStatus = (status) => {

  if ( status === "error" ) {
    return (css`
      background: #870f0f;
      ${Title} { color: #ffffff; }
    `)
  }

  if ( status === "default" ) {
    return (css`
      background: #0bab65;
      ${Title} { color: #2b2b2b; }
    `)
  }

  if ( status === "warning" ) {
    return (css`
      background: #cfe10c;
      ${Title} { color: #2b2b2b; }
    `)
  }

  return (css`
    background: #0bab65;
    ${Title} { color: #2b2b2b; }
  `)

}


export { Wrapper, Title };