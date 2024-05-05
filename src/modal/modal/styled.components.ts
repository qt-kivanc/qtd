import styled from 'styled-components';

const Wrapper = styled.div`
  
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  transform-origin: 50% 50%;
  transform-box: fill-box;
  transition-timing-function: cubic-bezier(0,1.25);

  opacity: 1;

  .qtd-spin-spinner {
    >div>div {
      border-color: #000000 transparent transparent;
    }
  }

`
const ModalInnerWrapper = styled.div`
  
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 50px;

`

const ModalBody = styled.div`

  margin: auto;
  height: max-content;
  position: relative;
  overflow: hidden;

  background: #fff;
  min-width: 400px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);

`

const ModalContent = styled.div`

`

const ModalInnerContentBefore = styled.div<{$padding?:string}>`
  padding: ${props => props.$padding};
`

const ModalInnerContentAfter = styled.div<{$padding?:string}>`
  padding: ${props => props.$padding};
`

const ModalInnerContent = styled.div<{$padding?:string}>`

  transition-property: all;
  transition-duration: 800ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);

  padding: ${props => props.$padding};

`

const ModalHeader = styled.div`

  height: 50px;
  background-color: #f1f1f1;
  color: #071437;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;

`

const ModalFooter = styled.div`

  border-top: 1px solid #00000010;

  height: 65px;
  padding: 15px 20px;

  display: flex;
  justify-content: flex-end;
  gap: 10px;

`

const CloseButton = styled.div`
  
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 12px;


`

const ModalEnter = styled.div`
  top: 55%;
  opacity: 0;
`

const ModalEnterActive = styled.div`
  top: 50%;
  opacity: 1;
  transition: opacity 300ms, top 300ms;
  transition-delay: .3s;
`

const ModalExit = styled.div`
  top: 50%;
  opacity: 1;
`

const ModalExitActive = styled.div`
  top: 55%;
  opacity: 0;
  transition: opacity 300ms, top 300ms;
`


export {
  Wrapper,
  ModalInnerWrapper,
  ModalBody,
  ModalContent,
  ModalInnerContent, 
  ModalInnerContentBefore,
  ModalInnerContentAfter,
  ModalHeader,
  ModalFooter,
  CloseButton,
  ModalEnter,
  ModalEnterActive,
  ModalExit,
  ModalExitActive
};