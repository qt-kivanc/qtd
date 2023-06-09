import styled from 'styled-components';

const Wrapper = styled.div`

  &.qtd-accordion-menu-sub-menu {

    &:not(:last-child) {
      .qtd-accordion-menu-header {
        margin-bottom: 1px;
      }
    }

    /**
     * SINGLE
     */
    &.qtd-accordion-menu-sub-menu-single {
      .qtd-accordion-menu-header svg.qtd-accordion-menu-header-arrow-icon.qtd-svg {
        transform: rotate(-90deg);
      }
    }
    
    /**
     * MULTIPLE
     */
    &.qtd-accordion-menu-sub-menu-multiple.qtd-accordion-menu-sub-menu-open {
      .qtd-accordion-menu-header svg.qtd-accordion-menu-header-arrow-icon.qtd-svg {
        transform: rotate(-180deg);
      }
    }
    
    /**
     * SINGLE AND MULTIPLE
     */
    &.qtd-accordion-menu-sub-menu-single, &.qtd-accordion-menu-sub-menu-multiple {
    
      /**
       * DEFAULT
       */
      .qtd-accordion-menu-header {

        background-color: #1D2649;
        transition: background-color 0.25s ease-out;

        span {
          font-size: 13px;
          color: #ffffff99;
          transition: color 0.25s ease-out;
        }

        div.qtd-accordion-menu-header-icon.qtd-icon {
          margin-right: 8px;
          color: #ffffff99;
          transition: color 0.25s ease-out;
        }

        svg.qtd-accordion-menu-header-arrow-icon.qtd-svg {
          fill: #ffffff99;
          transition: all 0.25s ease-out;
        }

        /* HOVER */
        &:hover {

          background-color: #3396FB40;

          span {
            color: #ffffff;
          }

          div.qtd-accordion-menu-header-icon.qtd-icon {
            color: #ffffff;
          }

          svg.qtd-accordion-menu-header-arrow-icon.qtd-svg {
            fill: #ffffff;
          }
          
        }

      }

      ul.qtd-accordion-menu-collapse {
        
        li.qtd-accordion-menu-content-item {
          
          .qtd-accordion-menu-content {

            background-color: #3396FB1A;
            transition: background-color 0.25s ease-out;
            
            span.qtd-accordion-menu-content-header-text {
              font-size: 12px;
              color: #ffffff;
            }

            .qtd-accordion-menu-content-header-arrow-icon.qtd-svg {
              transition: all 0.25s ease-out;
              fill: #ffffff;
            }

            /* HOVER */
            &:hover {
              background-color: #3396fb40;
            }

          }
          
        }
        
      }

      /**
       * ACTIVE
       */
      &.qtd-accordion-menu-sub-menu-active {
      
        .qtd-accordion-menu-header {

          transition-duration: 0ms;
          background-color: #3396FB80;

          span {
            color: #ffffff;
          }

          div.qtd-accordion-menu-header-icon.qtd-icon {
            color: #ffffff;
          }

          svg.qtd-accordion-menu-header-arrow-icon.qtd-svg {
            fill: #ffffff;
          }
          
        }

        ul.qtd-accordion-menu-collapse li.qtd-accordion-menu-content-item {
          
          .qtd-accordion-menu-content {

            &.active {
              background-color: #3396FB80;
            }

          }

        }

      }

    }

  }

`

const Icon = styled.div`

  font-size: ${props => `${props.$size}px`};
  width: ${props => `${props.$size}px`};
  height: ${props => `${props.$size}px`};
  
  display: flex;
  align-items: center;
  
`

const Content = styled.ul`

  overflow: hidden;
  transition: max-height 0.25s ease-out;

`

const Arrow = styled.svg`

  transition: all 0.25s ease-out;
  margin-left: auto;
  transform: rotate(0deg);

`

const Title = styled.div`

  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${props => `${props.height}px`};
  padding: 0 20px 0 20px;
  cursor: pointer;
  
  span {
    user-select: none;
  }

`


export { Wrapper, Title, Icon, Content, Arrow };