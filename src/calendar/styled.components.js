import styled from 'styled-components';

const Wrapper = styled.div`

  width: 280px;
  border-radius: 6px;
  background-color: #1D2649;
  padding: 4px 14px 14px 14px;

`

const Days = styled.div`

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px 0;

`

const WeekShortDays = styled.div`

  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(7, 1fr);
  font-size: 13px;
  line-height: 30px;
  text-align: center;

  > div {
    
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: #ffffff;
      font-weight: bold;
    }

  }

`

const Separator = styled.div`

  width: 100%;
  height: 1px;
  margin: 4px 0;
  background-color: #505A7D60;

`

export { Wrapper, Days, WeekShortDays, Separator };