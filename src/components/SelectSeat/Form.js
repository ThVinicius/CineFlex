import { useState } from 'react'
import axios from 'axios'

export default function Form({ data, storage, navigate }) {
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

  const hanleChangeInputCPF = e => {
    const { name, value } = e.target
    setInputCPF({
      ...inputCPF,
      [name]: value
    })
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

    const promisse = axios.post(
      'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
      sent
    )
    promisse.then(response => {
      navigate('/sucesso')
    })
    promisse.catch(response => {
      alert('dados incorretos')
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
