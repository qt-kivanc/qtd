import styled from 'styled-components';

const Wrapper = styled.div`

  display: flex;
  height: 40px;

`

const Middle = styled.div`

  flex: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {

    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    
    transition: color .15s ease-out;
    color: #ffffff;

    &:nth-child(2) {
      margin-left: 5px;
    }

    &:hover {
      color: #3598FE;
    }
  }

`

const NextMonth = styled.a`

  span {
    transform: rotate(135deg);
    position: relative;
    display: inline-block;
    width: 7px;
    height: 7px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: none;
  min-width: 22px;

  transition: color .15s ease-out;
  color: #ffffff80;

  &:hover {
    color: #ffffff;
  }
  
  span::before, span::after {
      
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 7px;
    height: 7px;
    border: 0 solid;
    border-width: 2px 0 0 2px;
    content: "";

  }


`

const PrevMonth = styled.a`

  span {
    transform: rotate(-45deg);
    position: relative;
    display: inline-block;
    width: 7px;
    height: 7px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: none;
  min-width: 22px;

  transition: color .15s ease-out;
  color: #ffffff80;

  &:hover {
    color: #ffffff;
  }
  
  span::before, span::after {
      
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 7px;
    height: 7px;
    border: 0 solid;
    border-width: 2px 0 0 2px;
    content: "";

  }


`

const NextYear = styled.a`

  span {
    transform: rotate(135deg);
    position: relative;
    display: inline-block;
    width: 7px;
    height: 7px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: none;
  min-width: 22px;

  transition: color .15s ease-out;
  color: #ffffff80;

  &:hover {
    color: #ffffff;
  }
  
  span::before, span::after {
      
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 7px;
    height: 7px;
    border: 0 solid;
    border-width: 2px 0 0 2px;
    content: "";

  }

  span::after {
    top: 4px;
    left: 4px;
  }

`

const PrevYear = styled.a`

  span {
    transform: rotate(-45deg);
    position: relative;
    display: inline-block;
    width: 7px;
    height: 7px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex: none;
  min-width: 22px;

  transition: color .15s ease-out;
  color: #ffffff80;

  &:hover {
    color: #ffffff;
  }
  
  span::before, span::after {
      
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 7px;
    height: 7px;
    border: 0 solid;
    border-width: 2px 0 0 2px;
    content: "";

  }

  span::after {
    top: 4px;
    left: 4px;
  }

`

export { Wrapper, Middle, NextMonth, PrevMonth, NextYear, PrevYear };