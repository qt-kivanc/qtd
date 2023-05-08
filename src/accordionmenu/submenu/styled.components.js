import styled, {css} from 'styled-components';

const Wrapper = styled.div`

  .qtd-accordion-menu-sub-menu {
    
    &.qtd-accordion-menu-sub-menu-open {

    }

    &.qtd-accordion-menu-sub-menu-active {
    
    }
    
    &.qtd-accordion-menu-sub-menu-single {
      
    }
    
    &.qtd-accordion-menu-sub-menu-multiple {

    }
    
    &.qtd-accordion-menu-sub-menu-single, &.qtd-accordion-menu-sub-menu-multiple {

      .qtd-accordion-menu-header {

      }
      
    }

  }

  .qtd-accordion-menu-header {

  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${props => `${props.$subHeight}px`};

  background-color: #1D2649;
  padding: 0 20px 0 20px;
  margin-bottom: 1px;

  cursor: pointer;
  transition: background-color 0.3s ease-out;
  
  span {
    user-select: none;
    font-size: 13px;
    color: #ffffff99;
  }

  ${({ $isActive }) =>
    !$isActive &&
    css`
      &:hover {
        background-color: #3396FB40;
      }
    `
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      transition-duration: 0ms;
      background-color: #3396FB80;

      span {
        color: #ffffff;
      }
      
    `
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      span {
        color: #ffffff;
      }
    `
  }

`

const Icon = styled.div`

  font-size: ${props => `${props.$size}px`};
  width: ${props => `${props.$size}px`};
  height: ${props => `${props.$size}px`};

  margin-right: 8px;
  color: #ffffff99;
  display: flex;
  align-items: center;

  ${({ $isOpen, $isActive }) =>
    ($isOpen || $isActive) &&
    css`
      color: #ffffff;
    `
  }

`

const Content = styled.ul`

  overflow: hidden;
  transition: max-height 0.25s ease-out;

  `

const Arrow = styled.svg`

  transition: all 0.25s ease-out;
  margin-left: auto;
  transform: rotate(0deg);
  fill: #ffffff99;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(-180deg);
      fill: #ffffff;
    `
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      fill: #ffffff;
    `
  }

  ${({ $isNormal }) =>
    $isNormal &&
    css`
      transform: rotate(-90deg);
    `
  }

`


export { Wrapper, Icon, Content, Arrow };