import { Flex, Button, Text, Box, Stack, Image, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import React from 'react'
import BackButton from '../buttons/BackButton'
import StartButton from '../buttons/StartButton'
import Card from './Card'

interface QuestionData {
  questionText: string
  fileURL: string
  options: string[]
  qid: string
  answer: string
  loText: string
  questionResources: string[]
}

type QuestionCardProps = {
  startQuiz: any
  allQuestions: any
  questionNumber: number
  levelNumber: number
  checkAnswer: any
  nextQuestions: any
  currentLevelQuestions: any
  isDisplayFirst: boolean
  isStart: boolean
  isDisplaySecondAndBeyond: boolean
  endQuiz: boolean
  questionData: QuestionData
}
const QuestionCard: React.FC<QuestionCardProps> = ({
  startQuiz,
  allQuestions,
  questionNumber,
  levelNumber,
  checkAnswer,
  nextQuestions,
  currentLevelQuestions,
  isDisplayFirst,
  isStart,
  isDisplaySecondAndBeyond,
  endQuiz,
  questionData,
}) => {

  return (
    <>
      {!isStart && (
        <>
          <Box borderRadius={5} m={2} p={5}>
            <Flex direction="column" p={2} m={2}>
              <StartButton startQuiz={startQuiz}></StartButton>
              <br />
              <BackButton></BackButton>
            </Flex>
          </Box>
        </>
      )}

      {/* FOR THE FIRST QUESTION */}
      {isDisplayFirst && (
        <Card
          questionNumber={questionNumber}
          totalNumOfQuestions={allQuestions[levelNumber - 1].length}
          currentQuestionData={questionData}
          isStart={isStart}
          nextQuestions={nextQuestions}
          checkAnswer={checkAnswer}
        ></Card>
      )}
      {/* FOR THE SECOND QUESTION AND BEYOND */}
      {isDisplaySecondAndBeyond && !endQuiz && (
        <Card
          questionNumber={questionNumber}
          totalNumOfQuestions={currentLevelQuestions.length}
          currentQuestionData={currentLevelQuestions[questionNumber - 1]}
          isStart={isStart}
          nextQuestions={nextQuestions}
          checkAnswer={checkAnswer}
        ></Card>
      )}
    </>
  )
}

export default QuestionCard
