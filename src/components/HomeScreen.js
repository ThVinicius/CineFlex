import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Loading from './shared/Loading'

function Film({ url, id, setArrow, navigate }) {
  const next = () => {
    setArrow(true)
    navigate(`/filme/${id}`)
  }

  return (
    <ContainerFilm>
      <img src={url} alt="filme" onClick={next} />
    </ContainerFilm>
  )
}

export default function HomeScreen({ setArrow }) {
  const navigate = useNavigate()
  const [films, setFilms] = useState([])
  useEffect(() => {
    setArrow(false)
    const promisse = axios.get(
      'https://mock-api.driven.com.br/api/v5/cineflex/movies'
    )
    promisse
      .then(response => {
        setFilms(response.data)
      })
      .catch(() => {
        alert('Servidor fora do ar')
      })
  }, [])

  return films.length === 0 ? (
    <Loading />
  ) : (
    <Container>
      <h1>Selecione o filme</h1>
      <Films>
        {films.map((item, index) => (
          <Film
            url={item.posterURL}
            id={item.id}
            key={index}
            setArrow={setArrow}
            navigate={navigate}
          />
        ))}
      </Films>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font: normal 400 24px 'Roboto', sans-serif;
    color: #293845;
    letter-spacing: 0.04em;
    margin-top: 10vh;
    margin-bottom: 3vh;
  }
`
const Films = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px 30px;

  img {
    width: 129px;
    height: 193px;
    cursor: pointer;
  }
`
const ContainerFilm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 209px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 3px;
`
