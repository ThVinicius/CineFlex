import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from './footer/Footer'
import Film from './footer/Film'

let seats = []
for (let i = 1; i <= 50; i++) {
  seats.push(('00' + i).slice(-2))
}

function Form({ data, storage, navigate }) {
  const [inputName, setInputName] = useState()
  const [inputCPF, setInputCPF] = useState({ cpf: '' })

  const cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }

  const hanleChangeInputName = e => {
    let input = e.target.value
    setInputName(input)
  }
  // console.log(inputName)

  const hanleChangeInputCPF = e => {
    const { name, value } = e.target
    setInputCPF({
      ...inputCPF,
      [name]: value
    })
    // let input = e.target.value
    // setInputCPF({ documentId: cpfMask(input) })
    // console.log(inputCPF)
  }

  const toSend = event => {
    event.preventDefault()
    const sent = {
      name: inputName,
      cpf: inputCPF.cpf.replaceAll('.', '').replaceAll('-', ''),
      ids: storage.ids
    }
    data.reserve.name = inputName
    data.reserve.cpf = inputCPF.cpf
    data.reserve.ids = storage.ids
    data.movie.seats = storage.name
    data.movie.seats.sort((a, b) => a - b)
    data.reserve.ids.sort((a, b) => a - b)
    console.log(data)
    console.log(sent)

    const promisse = axios.post(
      'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
      sent
    )
    promisse.then(response => {
      console.log('post realizado com sucesso!')
      console.log(response)
      navigate('/sucesso')
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
        {/* <label htmlFor="nome">Nome</label> */}
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
        {/* <label htmlFor="CPF">Nome</label> */}
        <input
          type="text"
          maxLength="14"
          placeholder="Digite seu CPF..."
          id="CPF"
          required
          name="cpf"
          value={cpfMask(inputCPF.cpf)}
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

function Seat({ num, isAvailable, storage, setStorage, id, data }) {
  const [selected, setSelected] = useState(false)
  const [color, setColor] = useState(undefined)

  useEffect(() => {
    selected ? setColor('green') : setColor('')
    if (selected === true) {
      storage.ids.push(id)
      storage.name.push(num)
    } else if (selected === false && storage.ids.length > 0) {
      console.log('false')
      storage.ids = storage.ids.filter(item => item !== id)
      storage.name = storage.name.filter(item => item !== num)
    }
    // setStorage([...storage, id])
  }, [selected])
  console.log(storage)

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

export default function SelectSeat({ data }) {
  const navigate = useNavigate()
  const [seat, setSeat] = useState([])
  const [storage, setStorage] = useState({ ids: [], name: [] })

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
                  data={data}
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
        <Form data={data} storage={storage} navigate={navigate} />
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
