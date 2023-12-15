import styled, {css} from 'styled-components';

const Wrapper = styled.div`

  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  border-radius: 6px;
  padding: 0 10px;

  span {
    color: #ffffff;
    font-weight: 600;
    font-size: 11px;
    line-height: 12px;
    user-select: none;
  }

  ${({ $status }) => getByStatus($status)}

  `

const getByStatus = (status) => {

  if ( status === "approved" ) {
    return (
      css`
        span {
          color: #1D2649;
        }

        background: #27C13A;
      `
    )
  }

  if ( status === "rejected" || status === "declined" ) {
    return (
      css`
        span {
          color: #ffffff;
        }

        background-color: #C12727;
      `
    )
  }

  if ( status === "pending" ) {
    return (
      css`
        span {
          color: #ffffff;
        }

        background-color: #1E3B6C;
      `
    )
  }

  if ( status === "requested" ) {
    return (
      css`
        span {
          color: #1D2649;
        }

        background-color: #ffa801;
      `
    )
  }

  if ( status === "open" ) {
    return (
      css`
        span {
          color: #ffffff;
        }

        background-color: #3396FB;
      `
    )
  }

  if ( status === "cancelled" ) {
    return (
      css`
        span {
          color: #1D2649;
        }

        background-color: #cfe10c;
      `
    )
  }

  if ( status === "timeout" ) {
    return (
      css`
        span {
          color: #ffffff;
        }

        background-color: #DF2561;
      `
    )
  }

  return (
    css`
      span {
        color: #1D2649;
      }

      background: #27C13A;
    `
  )

}

export { Wrapper };