import { Button } from '@chakra-ui/react'
import React from 'react'

type StartButtonProps = {
  startQuiz: () => void
}

const StartButton: React.FC<StartButtonProps> = ({ startQuiz }) => {
  return (
    <Button
      bg="#265e9e"
      color="white"
      boxShadow="5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)"
      _hover={{ transform: 'scale(0.95)' }}
      onClick={startQuiz}
      width="100%"
    >
      Start Quiz
    </Button>
  )
}
export default StartButton
