import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import SelectTime from './SelectTime'
import Header from './Header'
import SelectSeat from './SelectSeat'
import SucessScreen from './SuccessScreen'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/filme/:idFilm" element={<SelectTime />} />
        <Route path="/sessao" element={<SelectSeat />} />
        <Route path="/sucesso" element={<SucessScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
