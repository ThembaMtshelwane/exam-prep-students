import { QuestionTemplate, Topic } from '@/src/atom/quizAtoms'
import BackButton from '@/src/components/buttons/BackButton'
import PageContent from '@/src/components/Layout/PageContent'
import Questions from '@/src/components/QuizPage/Questions'
import QuizInfo from '@/src/components/QuizPage/QuizInfo'
import { Flex, Text, Box } from '@chakra-ui/react'

import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { getQuestion } from '../../api/QuestionData'

type QuizPageProps = {
  // All topic data=> questions, options...
  topicQuestionData: QuestionTemplate[]
  name: string
}

const QuizPage: React.FC<QuizPageProps> = ({ topicQuestionData, name }) => {
  // console.log('topicQuestionData', topicQuestionData)
  return (
    <>
      <PageContent>
        <QuizInfo topicName={name} />
        {topicQuestionData.length != 0 ? (
          <Questions questions={topicQuestionData} topicName={name} />
        ) : (
          <Box borderRadius={5} m={2} p={5}>
            <Flex direction="column" p={2} m={2}>
              <Text>No Questions</Text>
              <br />
              <BackButton />
            </Flex>
          </Box>
        )}
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getQuestion(context)
}

export default QuizPage
