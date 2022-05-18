import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Footer from './footer/Footer'
import Film from './footer/Film'

function Time({ weekday, date, time1, time2 }) {
  return (
    <div className="time">
      <h2>
        {weekday} - {date}
      </h2>
      <div className="schedules alignCenter">
        <div className="buttonTime alignCenter">{time1}</div>
        <div className="buttonTime alignCenter">{time2}</div>
      </div>
    </div>
  )
}

export default function SelectTime() {
  const { idFilm } = useParams()
  const [film, setFilm] = useState([])

  useEffect(() => {
    const promisse = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`
    )

    promisse
      .then(response => {
        setFilm(response.data)
        console.log(film)
      })
      .catch(() => {
        console.log('deu ruim')
      })
  }, [])
  console.log(film.days)

  return (
    <>
      <div className="selectTime alignCenter">
        <h1>Selecione o horário</h1>
        {film.length === 0
          ? 'Carregando'
          : film.days.map((item, index) => (
              <Time
                weekday={item.weekday}
                date={item.date}
                time1={item.showtimes[0].name}
                time2={item.showtimes[1].name}
                key={index}
              />
            ))}
      </div>
      <Footer>
        <Film src={film.posterURL} name={film.title} />
      </Footer>
    </>
  )
}
