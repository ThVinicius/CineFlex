import styled from 'styled-components'

export default function Film({ src, name, time = '' }) {
  return (
    <>
      <ContainerImg>
        <img src={src} alt="filme" />
      </ContainerImg>
      <div>
        <h2>{name}</h2>
        <h2>{time}</h2>
      </div>
    </>
  )
}
const ContainerImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.0600000000000005vw;
  height: 15.14vh;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 3px;

  @media (max-width: 420px) {
    width: 17.06vw;
    height: 10.14vh;
  }
`
