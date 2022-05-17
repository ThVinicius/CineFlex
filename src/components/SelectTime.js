import filme2 from '../assets/images/image 6.png'
import Footer from './footer/Footer'
import Film from './footer/Film'

export default function SelectTime() {
  return (
    <>
      <div className="selectTime alignCenter">
        <h1>Selecione o horário</h1>
        <div className="time">
          <h2>Quinta-feira - 24/06/2021</h2>
          <div className="schedules alignCenter">
            <div className="buttonTime alignCenter">15:00</div>
            <div className="buttonTime alignCenter">19:00</div>
          </div>
        </div>
      </div>
      <Footer>
        <Film src={filme2} name={'Enola Holmes'} />
      </Footer>
    </>
  )
}
