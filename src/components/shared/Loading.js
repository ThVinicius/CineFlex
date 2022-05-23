import styled from 'styled-components'
import loading from '../../assets/images/Gear-0.2s-333px (1).gif'

export default function Loading() {
  return (
    <Container>
      <img src={loading} alt="loading" />
    </Container>
  )
}

const Container = styled.div`
  height: 92.37vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
