import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
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
      navigate(-1)
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
    <div className="sucessScreen alignCenter">
      <div className="dataBase">
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
      </div>
      <div className="buttonReserve alignCenter" onClick={backToHome}>
        Voltar pra Home
      </div>
    </div>
  )
}
