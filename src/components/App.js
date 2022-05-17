import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import SelectTime from './SelectTime'
import Header from './Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/teste2" element={<SelectTime />} />
      </Routes>
    </BrowserRouter>
  )
}
