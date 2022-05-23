import { useState, useEffect } from 'react'

function confirm(storage, id, num, setStorage, selected, setColor) {
  const teste = window.confirm(
    'Os dados desse assento serão apagados.\nVocê confirma essa ação?'
  )
  if (teste === true) {
    setStorage({
      compradores: [
        ...storage.compradores.filter(item => item.idAssento !== id)
      ],
      dados: [...storage.dados.filter(item => item.assento !== num)],
      ids: [...storage.ids.filter(item => item !== id)]
    })
    selected.state ? setColor('green') : setColor('')
  } else {
    selected.state = true
  }
}

export default function Seat({ num, isAvailable, storage, setStorage, id }) {
  const [selected, setSelected] = useState({ state: false })
  const [color, setColor] = useState(undefined)

  useEffect(() => {
    if (selected.state === true) {
      setStorage({
        ids: [...storage.ids, id],
        compradores: [...storage.compradores, { idAssento: id }],
        dados: [...storage.dados, { assento: num }]
      })
      selected.state ? setColor('green') : setColor('')
    } else if (selected.state === false && storage.ids.length > 0) {
      storage.compradores.forEach(element => {
        if (
          element.idAssento === id &&
          element.nome === '' &&
          element.cpf === ''
        ) {
          setStorage({
            compradores: [
              ...storage.compradores.filter(item => item.idAssento !== id)
            ],
            dados: [...storage.dados.filter(item => item.assento !== num)],
            ids: [...storage.ids.filter(item => item !== id)]
          })
          selected.state ? setColor('green') : setColor('')
        }
        if (
          element.idAssento === id &&
          (element.nome !== '' || element.cpf !== '')
        ) {
          confirm(storage, id, num, setStorage, selected, setColor)
        }
      })
    }
  }, [selected])

  useEffect(() => {
    if (isAvailable === false) {
      setColor('yellow')
    } else {
      setColor('')
    }
  }, [])

  return (
    <div
      className={
        isAvailable
          ? `seat alignCenter ${color} cursor`
          : `seat alignCenter ${color} no-drop`
      }
      onClick={
        isAvailable
          ? () => setSelected({ ...selected, state: !selected.state })
          : null
      }
    >
      {num}
    </div>
  )
}
