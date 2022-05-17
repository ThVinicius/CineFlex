import filme2 from '../assets/images/image 6.png'
import Footer from './footer/Footer'
import Film from './footer/Film'

let seats = []
for (let i = 1; i <= 50; i++) {
  seats.push(('00' + i).slice(-2))
}

function Seat({ num, color = '' }) {
  return <div className={`seat alignCenter ${color}`}>{num}</div>
}

export default function SelectSeat() {
  return (
    <>
      <div className="mainScreen">
        <div className="selectSeat alignCenter">
          <h2>Selecione o(s) assento(s)</h2>
          <div className="seats alignCenter">
            {seats.map((item, index) => (
              <Seat num={item} key={index} />
            ))}
          </div>
          <div className="subtitle alignCenter">
            <div className="alignCenter">
              <Seat color={'green'} />
              <p>Selecionado</p>
            </div>
            <div className="alignCenter">
              <Seat />
              <p>Disponível</p>
            </div>
            <div className="alignCenter">
              <Seat color={'yellow'} />
              <p>Indisponível</p>
            </div>
          </div>
        </div>
        <div className="data">
          <div>
            <h3>Nome do comprador:</h3>
            <input type="text" placeholder="Digite seu nome..." />
          </div>
          <div>
            <h3>CPF do comprador:</h3>
            <input type="text" placeholder="Digite seu CPF..." />
          </div>
          <div className="boxButtonReserve alignCenter">
            <div className="buttonReserve alignCenter">Reservar assento(s)</div>
          </div>
        </div>
      </div>
      <Footer>
        <Film
          src={filme2}
          name={'Enola Holmes'}
          time={'Quinta-feira - 15:00'}
        />
      </Footer>
    </>
  )
}
