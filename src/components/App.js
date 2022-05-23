import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import ResetStyle from '../assets/css/reset'
import GlobalStyle from '../assets/css/globalStyles'
import HomeScreen from './HomeScreen'
import SelectTime from './SelectTime'
import Header from './Header'
import SelectSeat from './SelectSeat/SelectSeat'
import SucessScreen from './SuccessScreen'

export default function App() {
  const [arrow, setArrow] = useState(true)
  const [data] = useState({
    data: undefined,
    body: undefined,
    movie: {}
  })

  return (
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <Header arrow={arrow} setArrow={setArrow} />
      <Routes>
        <Route path="/" element={<HomeScreen setArrow={setArrow} />} />
        <Route path="/filme/:idFilm" element={<SelectTime />} />
        <Route path="/sessao/:idSeat" element={<SelectSeat data={data} />} />
        <Route path="/sucesso" element={<SucessScreen data={data} />} />
      </Routes>
    </BrowserRouter>
  )
}
