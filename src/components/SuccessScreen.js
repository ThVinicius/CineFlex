export default function SucessScreen() {
  return (
    <div className="sucessScreen alignCenter">
      <div className="dataBase">
        <h1>Pedido feito com sucesso!</h1>
        <div>
          <h5>Filme e sessão</h5>
          <h6>Enola Holmes</h6>
          <h6>24/06/2021 15:00</h6>
        </div>
        <div>
          <h5>Ingressos</h5>
          <h6>Assento 15</h6>
          <h6>Assento 16</h6>
        </div>
        <div>
          <h5>Comprador</h5>
          <h6>Nome: João da Silva Sauro</h6>
          <h6>CPF: 123.456.789-10</h6>
        </div>
      </div>
      <div className="buttonReserve alignCenter">Voltar pra Home</div>
    </div>
  )
}
