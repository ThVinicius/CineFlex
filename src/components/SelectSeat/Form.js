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
