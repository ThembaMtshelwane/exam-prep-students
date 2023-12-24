import { QuestionTemplate } from '@/src/atom/quizAtoms'
import { Box, Button, Flex, Stack, Text, Image } from '@chakra-ui/react'
import React from 'react'
import NextButton from '../buttons/NextButton'

type CardProps = {
  questionNumber: number
  totalNumOfQuestions: number
  currentQuestionData: QuestionTemplate
  isStart: boolean
  nextQuestions: () => void
  checkAnswer: (
    e: any,
    questionID: string,
    questionAnswer: string,
    question: string,
    questionLearningObjectives: any,
    questionResources: any
  ) => void
}

const Card: React.FC<CardProps> = ({
  questionNumber,
  totalNumOfQuestions,
  currentQuestionData,
  isStart,
  nextQuestions,
  checkAnswer,
}) => {
  const {
    question,
    fileURL,
    questionOptions,
    questionAnswer,
    questionID,
    questionLearningObjectives,
    questionResources,
  } = currentQuestionData

  return (
    <Box
      borderRadius={0}
      boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)"
      m={2}
      p={5}
    >
      <Text fontWeight={700}>
        Question {questionNumber} of {totalNumOfQuestions}{' '}
      </Text>
      <Text>{question}</Text>

      {fileURL ? <Image objectFit="cover" src={fileURL} alt="question" /> : ''}

      <Flex direction="column" p={2} m={2}>
        <Stack spacing={2} align="center">
          {questionOptions.map((option: string, index: number) => (
            <Button
              whiteSpace="normal"
              height="auto"
              blockSize="auto"
              padding={2}
              bg="white"
              color="black"
              border="2px solid #265e9e"
              width="100%"
              key={index}
              _active={{
                transform: 'scale(0.98)',
              }}
              _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                bg: ' #618fd9',
                color: 'white',
              }}
              onClick={(e) => {
                checkAnswer(
                  e,
                  questionID,
                  questionAnswer,
                  question,
                  questionLearningObjectives,
                  questionResources
                )
              }}
            >
              <Text width="100%">{option}</Text>
            </Button>
          ))}
        </Stack>{' '}
        <br />
        {isStart && (
          <>
            <NextButton nextQuestions={nextQuestions}></NextButton>
            <br />{' '}
          </>
        )}
      </Flex>
    </Box>
  )
}
export default Card
