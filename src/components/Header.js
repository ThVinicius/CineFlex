import { useNavigate } from 'react-router-dom'
import flecha from '../assets/images/double-arrowheads-outlines-pointing-to-left-direction.png'

export default function Header({ arrow }) {
  const navigate = useNavigate()
  const seta = arrow ? (
    <img src={flecha} alt="arrow" onClick={() => navigate(-1)} />
  ) : null
  return (
    <div className="faixa">
      {seta}
      <header className="alignCenter">
        <h2>CINEFLEX</h2>
      </header>
    </div>
  )
}
