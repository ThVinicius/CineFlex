import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from './footer/Footer'
import Film from './footer/Film'

let seats = []
for (let i = 1; i <= 50; i++) {
  seats.push(('00' + i).slice(-2))
}

function Form() {
  const [inputName, setInputName] = useState()
  const [inputCPF, setInputCPF] = useState()

  const hanleChangeInputName = e => {
    let input = e.target.value
    setInputName(input)
  }
  // console.log(inputName)

  const hanleChangeInputCPF = e => {
    let input = e.target.value
    setInputCPF(input)
    // console.log(inputCPF)
  }

  const toSend = () => {
    const sent = { ids: [4868], name: inputName, cpf: inputCPF }
    // const sent = { ids: [4868], name: name, cpf: cpf }
    console.log(sent)
    const promisse = axios.post(
      'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
      sent
    )
    promisse.then(response => {
      console.log('post realizado com sucesso!')
      console.log(response)
    })
    promisse.catch(response => {
      console.log('deu errado')
      console.log(response)
    })
  }

  return (
    <form onSubmit={toSend}>
      <div>
        <h3>Nome do comprador:</h3>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          placeholder="Digite seu nome..."
          id="nome"
          required
          value={inputName}
          onChange={e => hanleChangeInputName(e)}
        />
      </div>
      <div>
        <h3>CPF do comprador:</h3>
        <label htmlFor="CPF">Nome</label>
        <input
          type="text"
          placeholder="Digite seu CPF..."
          id="CPF"
          required
          value={inputCPF}
          onChange={e => hanleChangeInputCPF(e)}
        />
      </div>
      <div className="boxButtonReserve alignCenter">
        <button className="buttonReserve alignCenter" type="submit">
          Reservar assento(s)
        </button>
      </div>
    </form>
  )
}

function Seat({ num, isAvailable, storage, setStorage, id }) {
  const [selected, setSelected] = useState(false)
  const [color, setColor] = useState(undefined)

  useEffect(() => {
    selected ? setColor('green') : setColor('')
    if (selected === true) storage.push(id)
    // setStorage([...storage, id])
  }, [selected])

  useEffect(() => {
    if (isAvailable === false) {
      setColor('yellow')
    } else {
      setColor('')
    }
  }, [])

  // function select() {
  //   setSelected(!selected)
  //   setStorage([...storage, Number(num)])
  //   !selected ? setColor('green') : setColor('')
  // }

  return (
    <div
      className={`seat alignCenter ${color}`}
      onClick={() => setSelected(!selected)}
    >
      {console.log('oi')}
      {num}
    </div>
  )
}

export default function SelectSeat() {
  const [seat, setSeat] = useState([])
  const [storage, setStorage] = useState([])

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

  // const [inputName, setInputName] = useState()
  // const [inputCPF, setInputCPF] = useState()

  // const hanleChangeInputName = e => {
  //   let input = e.target.value
  //   setInputName(input)
  // }
  // // console.log(inputName)

  // const hanleChangeInputCPF = e => {
  //   let input = e.target.value
  //   setInputCPF(input)
  //   // console.log(inputCPF)
  // }

  // const toSend = (name, cpf) => {
  //   // const sent = { ids: [4868], name: inputName, cpf: inputCPF }
  //   const sent = { ids: [4868], name: name, cpf: cpf }
  //   console.log(sent)
  //   const promisse = axios.post(
  //     'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
  //     sent
  //   )
  //   promisse.then(response => {
  //     console.log('post realizado com sucesso!')
  //     console.log(response)
  //   })
  //   promisse.catch(response => {
  //     console.log('deu errado')
  //     console.log(response)
  //   })
  // }

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
                  storage={storage}
                  setStorage={setStorage}
                  id={seat.seats[index].id}
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
        <Form />
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
