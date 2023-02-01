import styled from 'styled-components';

const Wrapper = styled.div`

  input[type=checkbox]{
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 53px;
    height: 28px;
    background: #1D2649;
    display: block;
    border-radius: 28px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 50px;
    transition: 0.3s;
  }
  /*
  input:checked + label {
    background: #3396FB;
  }
  */
  input:checked + label:after {
    left: calc(100% - 3px);
    transform: translateX(-100%);
    background: #3396FB;
  }

  label:active:after {
    width: 28px;
  }

  `

export { Wrapper };