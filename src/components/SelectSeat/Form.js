import { useState } from 'react'
import axios from 'axios'
import Inputs from './Inputs'

export default function Form({ data, storage, navigate, inputValue }) {
  const toSend = event => {
    event.preventDefault()

    if (storage.ids.length === 0) {
      alert('Selecione pelo menos 1 assento')
      return
    }

    const body = {
      ids: storage.ids, // ids dos assentos
      compradores: storage.compradores
    }

    // const sent = {
    //   name: inputName,
    //   cpf: inputCPF.cpf.replaceAll('.', '').replaceAll('-', ''),
    //   ids: storage.ids
    // }
    // data.reserve.name = inputName
    // data.reserve.cpf = inputCPF.cpf
    // data.reserve.ids = storage.ids
    data.data = storage.dados
    // data.movie.seats.sort((a, b) => a - b)
    // data.reserve.ids.sort((a, b) => a - b)

    const promisse = axios.post(
      'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
      body
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
      {storage.compradores.map((item, index) => (
        <Inputs
          key={index}
          index={index}
          storage={storage}
          compradores={item}
          inputValue={inputValue}
          seat={storage.dados[index].assento}
        />
      ))}
      {storage.ids.length > 0 ? (
        <div className="boxButtonReserve alignCenter">
          <button className="buttonReserve alignCenter" type="submit">
            Reservar assento(s)
          </button>
        </div>
      ) : null}
    </form>
  )
}
