import styled, { css } from 'styled-components';
import { animated } from "react-spring";

const getByType = (type) => {

  if ( type === "error" ) {
    return (css`
      background: #f8285a;
      ${Title} { color: #ffffff; }
      ${Description} { color: #ffffffBF; }
    `)
  }

  if ( type === "default" || type === "success" ) {
    return (css`
      background: #0bab65;
      ${Title} { color: #2b2b2b; }
      ${Description} { color: #2b2b2bBF; }
    `)
  }

  if ( type === "warning" ) {
    return (css`
      background: #cfe10c;
      ${Title} { color: #2b2b2b; }
      ${Description} { color: #2b2b2bBF; }
    `)
  }

  return (css`
    background: #f8285a;
    ${Title} { color: #ffffff; }
    ${Description} { color: #ffffffBF; }
  `)

}

const Wrapper = styled(animated.div)`
  
  margin-bottom: 10px;
  max-width: 300px;

  font-size: 12px;
  position: relative;
  padding: 16px;
  border-radius: 3px;
  word-break: break-word;
  cursor: pointer;
  pointer-events: auto;

  ${({ $type }) => getByType($type)}

  `

const Title = styled.div`
  
  font-size: 13px;
  font-weight: 600;

  `

const Description = styled.div`
  
  font-size: 12px;
  font-weight: normal;

  `

export { Wrapper, Title, Description };