type SquareProps = {
  value: string
  onClick: () => void
}

const Square = ({ value, onClick }: SquareProps) => {
  return (
    <button
      className='bg-white border border-gray-400 hover:bg-gray-100 focus:outline-none focus:shadow-outline-gray text-3xl font-medium px-4 py-2 text-gray-800 w-24 h-24'
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Square
