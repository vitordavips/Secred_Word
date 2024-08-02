import './Game.css';

const Game = ({verifyLetter}) => {
  return (
    <div>
        <h2>Game</h2>
        <button onClick={verifyLetter}>finalizar jogo</button>
    </div>
  )
}

export default Game