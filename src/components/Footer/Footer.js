import styled from 'styled-components'

export default function Footer(props) {
  return <Container>{props.children}</Container>
}

const Container = styled.footer`
  background-color: #dfe6ed;
  height: 18.34vh;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 14px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;

  img {
    width: 6vw;
    height: 13vh;
  }

  h2 {
    font: normal 400 26px 'Roboto', sans-serif;
    color: #293845;
  }
  @media (max-width: 420px) {
    height: 13.34vh;

    img {
      width: 14.5vw;
      height: 9vh;
    }

    h2 {
      font: normal 400 22px 'Roboto', sans-serif;
    }
  }
`
