import { useState, useEffect } from 'react'

export default function Inputs({ index, storage, inputValue, seat }) {
  const [inputName, setInputName] = useState('')
  const [inputCPF, setInputCPF] = useState('')
  const [click, setClick] = useState(false)

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
    let input = e.target.value
    setInputCPF(input)
  }

  useEffect(() => {
    storage.compradores[index].nome = inputName
    storage.compradores[index].cpf = inputCPF
      .replaceAll('.', '')
      .replaceAll('-', '')
    inputValue[index] = { nome: inputName, cpf: inputCPF }
    inputValue[index].assento = storage.dados[index].assento
    storage.dados[index].cpf = inputCPF
    storage.dados[index].nome = inputName
  }, [inputName, inputCPF])

  useEffect(() => {
    inputValue.filter((item, index, arr) => arr.indexOf(item) === index)

    inputValue.forEach(element => {
      if (element.assento === seat) {
        setInputName(element.nome)
        setInputCPF(element.cpf)
      }
    })
  }, [storage])
  return (
    <div className={click ? 'seatData visible' : 'seatData'}>
      <h5 onClick={() => setClick(!click)}>Assento {seat}</h5>
      <div>
        <h3>Nome do comprador:</h3>
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
        <input
          type="text"
          placeholder="Digite seu CPF..."
          maxLength="14"
          id="CPF"
          required
          name="cpf"
          value={cpfMask(inputCPF)}
          onChange={e => hanleChangeInputCPF(e)}
        />
      </div>
    </div>
  )
}
