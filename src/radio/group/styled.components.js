import styled from 'styled-components';

const GroupWrapper = styled.div`
  display: grid;
  grid-auto-flow: ${props => props._onlyFlow ? props._direction : (props._direction === "column" ? "row" : "column")};
  grid-template-columns: ${props => props._direction === "row" || props._onlyFlow ? "auto" : `repeat(${props._length}, 1fr)`};
  grid-template-rows: ${props => props._direction === "column" || props._onlyFlow ? "auto" : `repeat(${props._length}, 1fr)`};
  grid-gap: ${props => props._gap};
  `

export { GroupWrapper };