import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../Footer/Footer'
import Film from '../Footer/Film'
import Form from './Form'
import Seat from './Seat'
import Loading from '../shared/Loading'

let seats = []
for (let i = 1; i <= 50; i++) {
  seats.push(('00' + i).slice(-2))
}

export default function SelectSeat({ data }) {
  const navigate = useNavigate()
  const [seat, setSeat] = useState([])
  const [storage, setStorage] = useState({
    ids: [],
    compradores: [],
    dados: []
  })
  const [inputValue] = useState([])

  const { idSeat } = useParams()
  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSeat}/seats`
    )
    promisse
      .then(response => {
        setSeat(response.data)
        data.movie.name = response.data.movie.title
        data.movie.date = response.data.day.date
        data.movie.hour = response.data.name
      })
      .catch(() => {
        navigate('/')
      })
  }, [])

  return seat.length === 0 ? (
    <Loading />
  ) : (
    <Container>
      <ContainerSeats>
        <h2>Selecione o(s) assento(s)</h2>
        <ContainerSeat>
          {seats.map((item, index) => (
            <Seat
              num={item}
              key={index}
              isAvailable={seat.seats[index].isAvailable}
              storage={storage}
              setStorage={setStorage}
              id={seat.seats[index].id}
              data={data}
              inputValue={inputValue}
            />
          ))}
        </ContainerSeat>
        <ContainerSubtitle>
          <AlignCenter>
            <Ball colorBackGround="#8DD7CF" colorBorder="#1AAE9E"></Ball>
            <p>Selecionado</p>
          </AlignCenter>
          <AlignCenter>
            <Ball colorBackGround="#C3CFD9" colorBorder="#808F9D"></Ball>
            <p>Disponível</p>
          </AlignCenter>
          <AlignCenter>
            <Ball colorBackGround="#FBE192" colorBorder="#F7C52B"></Ball>
            <p>Indisponível</p>
          </AlignCenter>
        </ContainerSubtitle>
      </ContainerSeats>
      <ContainerData>
        <Form
          data={data}
          storage={storage}
          navigate={navigate}
          inputValue={inputValue}
        />
      </ContainerData>
      <Footer>
        <Film
          src={seat.movie.posterURL}
          name={seat.movie.title}
          time={`${seat.day.weekday} - ${seat.name}`}
        />
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  margin-top: 7.63vh;
  overflow-y: auto;
`
const ContainerSeats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 2.4vw;

  h2 {
    margin: 4.56vh 0;
    font: normal 400 24px 'Roboto', sans-serif;
    letter-spacing: 0.04em;
    color: #293845;
  }

  @media (max-width: 420px) {
    padding: 0 6.4vw;
  }
`
const ContainerSeat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.05vh 0.9vw;

  @media (max-width: 420px) {
    gap: 2.05vh 1.86vw;
  }
`
const ContainerSubtitle = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: space-evenly;
  margin-top: 1.82vh;
  margin-bottom: 4.67vh;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const Ball = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.colorBackGround};
  width: 35px;
  height: 35px;
  font: normal 400 11px 'Roboto', sans-serif;
  letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid ${props => props.colorBorder};
  border-radius: 17px;

  p {
    font: normal 400 13px 'Roboto', sans-serif;
    letter-spacing: -0.013em;
    color: #4e5a65;
    line-height: 15px;
  }

  @media (max-width: 420px) {
    width: 26px;
    height: 26px;
    border-radius: 12px;
  }
`
const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ContainerData = styled.div`
  padding: 0 6.4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20.34vh;

  @media (max-width: 420px) {
    margin-bottom: 21.34vh;
    align-items: inherit;
  }
`
