import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import SelectTime from './SelectTime'
import Header from './Header'
import SelectSeat from './SelectSeat/SelectSeat'
import SucessScreen from './SuccessScreen'
import { useState } from 'react'

export default function App() {
  const [data] = useState({
    reserve: {},
    movie: {}
  })

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/filme/:idFilm" element={<SelectTime />} />
        <Route path="/sessao/:idSeat" element={<SelectSeat data={data} />} />
        <Route path="/sucesso" element={<SucessScreen data={data} />} />
      </Routes>
    </BrowserRouter>
  )
}
