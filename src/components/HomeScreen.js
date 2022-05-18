import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Film({ url, id }) {
  return (
    <div className="film alignCenter">
      <Link to={`/filme/${id}`}>
        <img src={url} alt="filme" />
      </Link>
    </div>
  )
}

export default function HomeScreen() {
  const [films, setFilms] = useState([])
  useEffect(() => {
    const promisse = axios.get(
      'https://mock-api.driven.com.br/api/v5/cineflex/movies'
    )
    promisse.then(response => {
      setFilms(response.data)
    })
  }, [])
  console.log(films)

  return (
    <div className="home alignCenter">
      <h1>Selecione o filme</h1>
      <div className="films alignCenter">
        {films.map((item, index) => (
          <Film url={item.posterURL} id={item.id} key={index} />
        ))}
      </div>
    </div>
  )
}
