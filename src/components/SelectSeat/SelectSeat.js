import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    promisse.then(response => {
      setSeat(response.data)
      data.movie.name = response.data.movie.title
      data.movie.date = response.data.day.date
      data.movie.hour = response.data.name
    })
  }, [])

  return seat.length === 0 ? (
    <Loading />
  ) : (
    <div className="mainScreen">
      <div className="selectSeat alignCenter">
        <h2>Selecione o(s) assento(s)</h2>
        <div className="seats alignCenter">
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
        </div>
        <div className="subtitle alignCenter">
          <div className="alignCenter">
            <div className={`seat alignCenter green`}></div>
            <p>Selecionado</p>
          </div>
          <div className="alignCenter">
            <div className={`seat alignCenter`}></div>
            <p>Disponível</p>
          </div>
          <div className="alignCenter">
            <div className={`seat alignCenter yellow`}></div>
            <p>Indisponível</p>
          </div>
        </div>
      </div>
      <div className="data">
        <Form
          data={data}
          storage={storage}
          navigate={navigate}
          inputValue={inputValue}
        />
      </div>
      <Footer>
        <Film
          src={seat.movie.posterURL}
          name={seat.movie.title}
          time={`${seat.day.weekday} - ${seat.name}`}
        />
      </Footer>
    </div>
  )
}
