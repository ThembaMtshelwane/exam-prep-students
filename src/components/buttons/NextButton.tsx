import { Button } from '@chakra-ui/react'
import React from 'react'

type NextButtonProps = {
  nextQuestions: () => void
}

const NextButton: React.FC<NextButtonProps> = ({ nextQuestions }) => {
  return (
    <Button
      bg="#265e9e"
      color="white"
      onClick={nextQuestions}
      boxShadow="5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)"
      _hover={{ transform: 'scale(0.95)' }}
    >
      {' '}
      Next{' '}
    </Button>
  )
}
export default NextButton
