import { useState } from 'react'
import './App.css'
import { Button, ButtonGroup } from '@chakra-ui/react' // from Chakra UI 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <h1>Hello world </h1>
          <p>Tailwind is Working </p>
          <p>Chakra UI is Also Working here</p>
      </div>
    </>
  )
}

export default App
