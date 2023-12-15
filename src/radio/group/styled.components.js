import styled from 'styled-components';

const GroupWrapper = styled.div`
  display: grid;
  grid-auto-flow: ${props => props.$onlyFlow ? props.$direction : (props.$direction === "column" ? "row" : "column")};
  grid-template-columns: ${props => props.$direction === "row" || props.$onlyFlow ? "auto" : `repeat(${props.$length}, 1fr)`};
  grid-template-rows: ${props => props.$direction === "column" || props.$onlyFlow ? "auto" : `repeat(${props.$length}, 1fr)`};
  grid-gap: ${props => props.$gap};
  `

export { GroupWrapper };