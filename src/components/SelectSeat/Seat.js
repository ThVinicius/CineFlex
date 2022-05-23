import { useState, useEffect } from 'react'
import styled from 'styled-components'

function confirm(storage, id, num, setStorage, selected, setColor, color) {
  const teste = window.confirm(
    `Os dados do assento ${num} serão apagados.\nVocê confirma essa ação?`
  )
  if (teste === true) {
    setStorage({
      compradores: [
        ...storage.compradores.filter(item => item.idAssento !== id)
      ],
      dados: [...storage.dados.filter(item => item.assento !== num)],
      ids: [...storage.ids.filter(item => item !== id)]
    })
    selected.state
      ? setColor({
          ...color,
          colorBackGround: '#8DD7CF',
          colorBorder: '#1AAE9E'
        })
      : setColor({
          ...color,
          colorBackGround: '#C3CFD9',
          colorBorder: '#808F9D'
        })
  } else {
    selected.state = true
  }
}

export default function Seat({ num, isAvailable, storage, setStorage, id }) {
  const [selected, setSelected] = useState({ state: false })
  const [color, setColor] = useState({
    colorBackGround: undefined,
    colorBorder: undefined
  })

  useEffect(() => {
    if (selected.state === true) {
      setStorage({
        ids: [...storage.ids, id],
        compradores: [...storage.compradores, { idAssento: id }],
        dados: [...storage.dados, { assento: num }]
      })
      selected.state
        ? setColor({
            ...color,
            colorBackGround: '#8DD7CF',
            colorBorder: '#1AAE9E'
          })
        : setColor({
            ...color,
            colorBackGround: '#C3CFD9',
            colorBorder: '#808F9D'
          })
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
          selected.state
            ? setColor({
                ...color,
                colorBackGround: '#8DD7CF',
                colorBorder: '#1AAE9E'
              })
            : setColor({
                ...color,
                colorBackGround: '#C3CFD9',
                colorBorder: '#808F9D'
              })
        }
        if (
          element.idAssento === id &&
          (element.nome !== '' || element.cpf !== '')
        ) {
          confirm(storage, id, num, setStorage, selected, setColor, color)
        }
      })
    }
  }, [selected])

  useEffect(() => {
    if (isAvailable === false) {
      setColor({ ...color, colorBackGround: '#FBE192', colorBorder: '#F7C52B' })
    } else {
      setColor({ ...color, colorBackGround: '#C3CFD9', colorBorder: '#808F9D' })
    }
  }, [])

  return (
    // isAvailable
    //       ? `seat alignCenter ${color} cursor`
    //       : `seat alignCenter ${color} no-drop`
    <Ball
      colorBackGround={color.colorBackGround}
      colorBorder={color.colorBorder}
      cursorPointer="pointer"
      cursorNot="not-allowed"
      isAvailable={isAvailable}
      onClick={
        isAvailable
          ? () => setSelected({ ...selected, state: !selected.state })
          : () => alert('Esse assento não está disponível')
      }
    >
      {num}
    </Ball>
  )
}
const Ball = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.colorBackGround};
  width: 35px;
  height: 35px;
  font: normal 400 11px 'Roboto', sans-serif;
  letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid ${props => props.colorBorder};
  border-radius: 17px;
  cursor: ${props =>
    props.isAvailable ? props.cursorPointer : props.cursorNot};

  p {
    font: normal 400 13px 'Roboto', sans-serif;
    letter-spacing: -0.013em;
    color: #4e5a65;
    line-height: 15px;
  }
  @media (max-width: 420px) {
    width: 26px;
    height: 26px;
    border-radius: 12px;
  }
`
