import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from './footer/Footer'
import Film from './footer/Film'

let seats = []
for (let i = 1; i <= 50; i++) {
  seats.push(('00' + i).slice(-2))
}

function Seat({ num, isAvailable, selected = false }) {
  let color
  switch (true) {
    case selected === true:
      color = 'green'
      break

    case isAvailable === false:
      color = 'yellow'
      break

    default:
      color = ''
      break
  }

  return (
    <Link to={`/sucesso`}>
      <div className={`seat alignCenter ${color}`}>{num}</div>
    </Link>
  )
}

export default function SelectSeat() {
  const [seat, setSeat] = useState([])
  const { idSeat } = useParams()
  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSeat}/seats`
    )
    promisse.then(response => {
      setSeat(response.data)
    })
  }, [])
  console.log(seat)

  return (
    <div className="mainScreen">
      <div className="selectSeat alignCenter">
        <h2>Selecione o(s) assento(s)</h2>
        <div className="seats alignCenter">
          {seat.length === 0
            ? 'carregando'
            : seats.map((item, index) => (
                <Seat
                  num={item}
                  key={index}
                  isAvailable={seat.seats[index].isAvailable}
                />
              ))}
        </div>
        <div className="subtitle alignCenter">
          <div className="alignCenter">
            <Seat selected={true} />
            <p>Selecionado</p>
          </div>
          <div className="alignCenter">
            <Seat isAvailable={true} />
            <p>Disponível</p>
          </div>
          <div className="alignCenter">
            <Seat isAvailable={false} />
            <p>Indisponível</p>
          </div>
        </div>
      </div>
      <div className="data">
        <div>
          <h3>Nome do comprador:</h3>
          <input type="text" placeholder="Digite seu nome..." />
        </div>
        <div>
          <h3>CPF do comprador:</h3>
          <input type="text" placeholder="Digite seu CPF..." />
        </div>
        <div className="boxButtonReserve alignCenter">
          <div className="buttonReserve alignCenter">Reservar assento(s)</div>
        </div>
      </div>
      {seat.length === 0 ? (
        'Carregando'
      ) : (
        <Footer>
          <Film
            src={seat.movie.posterURL}
            name={seat.movie.title}
            time={`${seat.day.weekday} - ${seat.name}`}
          />
        </Footer>
      )}
    </div>
  )
}
