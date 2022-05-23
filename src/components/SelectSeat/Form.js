import styled from 'styled-components'
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
    data.body = body

    data.data = storage.dados
    console.log(data)
    // data.movie.seats.sort((a, b) => a - b)
    // data.reserve.ids.sort((a, b) => a - b)
    navigate('/sucesso')
  }

  return (
    <Container onSubmit={toSend}>
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
        <AlignCenter>
          <Button type="submit">Reservar assento(s)</Button>
        </AlignCenter>
      ) : null}
    </Container>
  )
}
const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 7px;
`
const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  background-color: #e8833a;
  width: 24vw;
  height: 6.78vh;
  margin-top: 4.49vh;
  font: normal 400 18px 'Roboto', sans-serif;
  letter-spacing: 0.04em;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 420px) {
    width: 60vw;
    height: 42px;
  }
`
