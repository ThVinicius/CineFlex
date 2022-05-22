import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './shared/Loading'

function Film({ url, id, setArrow, navigate }) {
  const next = () => {
    setArrow(true)
    navigate(`/filme/${id}`)
  }

  return (
    <div className="film alignCenter">
      <img src={url} alt="filme" onClick={next} />
    </div>
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
    promisse.then(response => {
      setFilms(response.data)
    })
  }, [])
  const content = (
    <div className="home alignCenter">
      <h1>Selecione o filme</h1>
      <div className="films alignCenter">
        {films.map((item, index) => (
          <Film
            url={item.posterURL}
            id={item.id}
            key={index}
            setArrow={setArrow}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  )

  return films.length === 0 ? <Loading /> : content
}
