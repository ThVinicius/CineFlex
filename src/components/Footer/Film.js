export default function Film({ src, name, time = '' }) {
  return (
    <>
      <div className="film alignCenter">
        <img src={src} alt="filme" />
      </div>
      <div>
        <h2>{name}</h2>
        <h2>{time}</h2>
      </div>
    </>
  )
}
