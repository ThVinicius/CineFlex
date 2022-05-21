import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from './Footer/Footer'
import Film from './Footer/Film'

function Time({ weekday, date, time1, time2, id1, id2 }) {
  return (
    <div className="time">
      <h2>
        {weekday} - {date}
      </h2>
      <div className="schedules alignCenter">
        <Link to={`/sessao/${id1}`}>
          <div className="buttonTime alignCenter">{time1}</div>
        </Link>
        <Link to={`/sessao/${id2}`}>
          <div className="buttonTime alignCenter">{time2}</div>
        </Link>
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

    promisse.then(response => {
      setFilm(response.data)
    })
  }, [])

  return (
    <div className="selectTime alignCenter">
      <h1>Selecione o horário</h1>
      <div className="adjustment alignCenter">
        {film.length === 0
          ? 'Carregando'
          : film.days.map((item, index) => (
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
      </div>
      {film.length === 0 ? (
        'Carregando'
      ) : (
        <Footer>
          <Film src={film.posterURL} name={film.title} />
        </Footer>
      )}
    </div>
  )
}
