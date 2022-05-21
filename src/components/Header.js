import { useParams } from 'react-router-dom'

export default function Header() {
  const { teste } = useParams()
  console.log(teste)
  return <header className="alignCenter">CINEFLEX</header>
}
