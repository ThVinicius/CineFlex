import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  const backToHome = () => {
    data.movie = {}
    data.reserve = {}
    navigate('/')
  }

  return (
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
        {/* <div>
          <h5>Ingressos</h5>
          {data.movie.seats.map((item, index) => (
            <h6 key={index}>Assento {item}</h6>
          ))}
        </div>
        <div>
          <h5>Comprador</h5>
          <h6>Nome: {data.reserve.name}</h6>
          <h6>CPF: {data.reserve.cpf}</h6>
        </div> */}
      </div>
      <div className="buttonReserve alignCenter" onClick={backToHome}>
        Voltar pra Home
      </div>
    </div>
  )
}
