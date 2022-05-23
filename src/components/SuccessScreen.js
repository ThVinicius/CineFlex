import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Loading from './shared/Loading'

function Ticket({ seat, name, CPF }) {
  return (
    <div>
      <h6>Assento {seat}</h6>
      <h4>Nome: {name}</h4>
      <h4>CPF: {CPF}</h4>
    </div>
  )
}

export default function SucessScreen({ data }) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const promisse = axios.post(
      'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
      data.body
    )
    promisse.then(() => {
      setLoading(false)
    })
    promisse.catch(() => {
      alert('dados incorretos')
      navigate('/')
    })
  }, [])

  const backToHome = () => {
    data.movie = {}
    data.reserve = {}
    navigate('/')
  }

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <ContainerData>
        <h1>Pedido feito com sucesso!</h1>
        <div>
          <h5>Filme e sessão</h5>
          <h6>{data.movie.name}</h6>
          <h6>
            {data.movie.date} {data.movie.hour}
          </h6>
        </div>
        {data.data.map((item, index) => (
          <Ticket
            seat={item.assento}
            name={item.nome}
            CPF={item.cpf}
            key={index}
          />
        ))}
      </ContainerData>
      <Button onClick={backToHome}>Voltar pra Home</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  flex-direction: column;

  h1 {
    margin-top: 12vh;
    margin-bottom: 3vh;
    color: #247a6b;
    font: normal 700 24px 'Roboto', sans-serif;
    letter-spacing: 0.04em;
  }
`
const ContainerData = styled.div`
  div {
    margin-bottom: 20px;
  }
  h4 {
    font: normal 400 22px 'Roboto', sans-serif;
    letter-spacing: 0.04em;
  }
  h5 {
    font: normal 700 24px 'Roboto', sans-serif;
    color: #293845;
    letter-spacing: 0.04em;
  }
  h6 {
    font: normal 400 22px 'Roboto', sans-serif;
    letter-spacing: 0.04em;
    color: #293845;
  }
`
const Button = styled.button`
  background-color: #e8833a;
  width: 24vw;
  height: 6.78vh;
  margin-top: 4.49vh;
  font: normal 400 18px 'Roboto', sans-serif;
  letter-spacing: 0.04em;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 420px) {
    width: 60vw;
    height: 42px;
  }
`
