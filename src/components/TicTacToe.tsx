import { useEffect, useState } from 'react'
import Square from './Square'
import ReactConfetti from 'react-confetti'

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const [counter, setCounter] = useState({
    x: 0,
    o: 0,
  })

  // Confetti code
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleClick = (i: number) => {
    const newSquares = squares.slice()
    if (calculateWinner(squares) || newSquares[i]) {
      return
    }
    newSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }

  const renderSquare = (i: number) => {
    return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const [theWinner, setTheWinner] = useState('')
  useEffect(() => {
    if (winner) {
      setTheWinner(winner)
      if (winner === 'X') {
        setCounter({
          ...counter,
          x: counter.x + 1,
        })
      } else {
        setCounter({
          ...counter,
          o: counter.o + 1,
        })
      }
      setShowConfetti(true)
    }
  }, [winner])

  const detectSize = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)
    return () => window.removeEventListener('resize', detectSize)
  }, [windowDimensions])

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen overflow-x-hidden'>
      <h1>
        <span className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          TIC TAC TOE GAME
        </span>
      </h1>
      <div className='flex gap-8 mt-6'>
        <div className='flex flex-col items-center'>
          <div className='text-2xl mb-2'>Player X</div>
          <div className='text-4xl text-black text-center font-bold p-8 bg-white w-42 mb-6'>
            {counter.x}
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-2xl mb-2'>Player O</div>
          <div className='text-4xl text-black text-center font-bold p-8 bg-white w-42 mb-6'>
            {counter.o}
          </div>
        </div>
      </div>
      <div className='text-2xl mb-6 font-semibold'>{status}</div>
      <div className='grid grid-cols-3'>
        {Array(9)
          .fill(null)
          .map((_, i) => renderSquare(i))}
      </div>
      <button
        className='bg-pink-500 hover:bg-pink-700 active:bg-pink-800 text-white font-bold py-2 px-4 mt-6'
        onClick={() => {
          setSquares(Array(9).fill(null))
          setShowConfetti(false)
        }}
      >
        Reset
      </button>
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          colors={['#ff0000', '#ffffff']}
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
    </div>
  )
}

const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default TicTacToe
