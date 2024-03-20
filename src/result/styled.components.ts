import styled from 'styled-components';
import { keyframes } from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
`

const bounce = keyframes`
  0% { transform: scale(.5); opacity: 0;}
  50% { transform: scale(1.05); opacity: 1;}
  75% { transform: scale(0.95); opacity: 1;}
  100% { transform: scale(1); opacity: 1;}
`

const ContentWrapper = styled.div<{$autoCenter:boolean}>`

  animation: ${bounce} 0.5s ease-out;
  transition: all 0.5s ease-out;
  transform-origin: 50% 50%;
  opacity: 1;

  ${props => {
    if ( props.$autoCenter ) {
      return `
      width: 100%;
      height: 100%;
      `
    }
  }}

`

const Content = styled.div<{$fill:string, $autoCenter:boolean, $type:string}>`

  padding: 70px 40px;
  border-radius: 6px;
  width: ${props => props.$fill === "true" ? "100%" : "600px"};
  background-color: ${props => props.$type === "default" ? "#1D2649" : "#0E153180"};

  ${props => {
    if ( props.$autoCenter ) {
      return `
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `
    }
  }}
  
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  min-height: 96px;
  margin-bottom: 20px;
`

const Extras = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  a {
    min-width: 150px;

    &:not(:last-child) {
      margin-right: 20px;
    }

  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

const Body = styled.div`
  display: grid;
  grid-gap: 10px;

  img {
    width: 96px;
    height: 96px;
  }
`

const Title = styled.div`
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  max-width: 80%;
  margin: 0 auto;
`

const ContentDescription = styled.div`
  text-align: center;
  color: #ffffff99;
  font-size: 14px;
  line-height: 19px;
  font-weight: 500;
  max-width: 80%;
  margin: 0 auto;
`

export { 
  Wrapper,
  ContentWrapper,
  Content,
  ImageWrapper,
  Extras,
  Footer,
  Body,
  Title,
  ContentDescription
};