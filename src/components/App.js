import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import SelectTime from './SelectTime'
import Header from './Header'
import SelectSeat from './SelectSeat'
import SucessScreen from './SuccessScreen'
import { useState } from 'react'

export default function App() {
  // const [data] = useState()
  // const data1 = []
  // console.log('oi')

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/filme/:idFilm" element={<SelectTime />} />
        <Route path="/sessao/:idSeat" element={<SelectSeat />} />
        <Route path="/sucesso" element={<SucessScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
