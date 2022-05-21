import { useState, useEffect } from 'react'

export default function Seat({
  num,
  isAvailable,
  storage,
  setStorage,
  id,
  data
}) {
  const [selected, setSelected] = useState(false)
  const [color, setColor] = useState(undefined)

  useEffect(() => {
    selected ? setColor('green') : setColor('')
    if (selected === true) {
      storage.ids.push(id)
      storage.name.push(num)
    } else if (selected === false && storage.ids.length > 0) {
      storage.ids = storage.ids.filter(item => item !== id)
      storage.name = storage.name.filter(item => item !== num)
    }
    // setStorage([...storage, id])
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
      className={`seat alignCenter ${color}`}
      onClick={() => setSelected(!selected)}
    >
      {num}
    </div>
  )
}
