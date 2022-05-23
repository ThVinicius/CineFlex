import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import flecha from '../assets/images/double-arrowheads-outlines-pointing-to-left-direction.png'

export default function Header({ arrow }) {
  const navigate = useNavigate()
  const seta = arrow ? (
    <img src={flecha} alt="arrow" onClick={() => navigate(-1)} />
  ) : null
  return (
    <Container>
      {seta}
      <header>
        <h2>CINEFLEX</h2>
      </header>
    </Container>
  )
}

const Container = styled.div`
  position: relative;

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c3cfd9;
    color: #e8833a;
    font: normal 400 30px 'Roboto', sans-serif;
    width: 100vw;
    height: 7.63vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  img {
    position: fixed;
    top: 0;
    left: 17px;
    width: 4vw;
    height: 7vh;
    z-index: 1;
    cursor: pointer;
  }

  @media (max-width: 420px) {
    img {
      top: 10px;
      left: 17px;
      width: 12vw;
      height: 5vh;
    }
  }
`
