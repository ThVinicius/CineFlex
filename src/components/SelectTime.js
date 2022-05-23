import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Footer from './Footer/Footer'
import Film from './Footer/Film'
import Loading from './shared/Loading'

function Time({ weekday, date, time1, time2, id1, id2 }) {
  return (
    <ContainerTime>
      <h2>
        {weekday} - {date}
      </h2>
      <Schedules>
        <A to={`/sessao/${id1}`}>
          <Button>{time1}</Button>
        </A>
        <A to={`/sessao/${id2}`}>
          <Button>{time2}</Button>
        </A>
      </Schedules>
    </ContainerTime>
  )
}

export default function SelectTime() {
  const navigate = useNavigate()
  const { idFilm } = useParams()
  const [film, setFilm] = useState([])

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`
    )

    promisse
      .then(response => {
        setFilm(response.data)
      })
      .catch(() => {
        navigate('/')
      })
  }, [])

  return film.length === 0 ? (
    <Loading />
  ) : (
    <Container>
      <h1>Selecione o horário</h1>
      <Adjustment>
        {film.days.map((item, index) => (
          <Time
            weekday={item.weekday}
            date={item.date}
            time1={item.showtimes[0].name}
            time2={item.showtimes[1].name}
            id1={item.showtimes[0].id}
            id2={item.showtimes[1].id}
            key={index}
          />
        ))}
      </Adjustment>
      <Footer>
        <Film src={film.posterURL} name={film.title} />
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  margin-top: 7.63vh;

  h1 {
    margin: 4.56vh 0;
    font: normal 400 24px 'Roboto', sans-serif;
  }
`
const Adjustment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  flex-wrap: wrap;
  margin-bottom: 17.1vh;
  padding: 0 24px;
  gap: 23px;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`
const ContainerTime = styled.div`
  h2 {
    margin-bottom: 22px;
    font: normal 400 16px 'Roboto', sans-serif;
    letter-spacing: 0.02em;
    color: #293845;
  }
  @media (max-width: 420px) {
    width: 100%;
  }
`
const Schedules = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8833a;
  color: #ffffff;
  font: normal 400 18px 'Roboto', sans-serif;
  letter-spacing: 0.02em;
  width: 83px;
  height: 43px;
  border-radius: 3px;
  cursor: pointer;
`
const A = styled(Link)`
  text-decoration: none;
  color: inherit;
  button {
    border: none;
  }
`
