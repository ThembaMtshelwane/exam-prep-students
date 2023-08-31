import { QuestionTemplate, Topic } from '@/src/atom/quizAtoms'
import PageContent from '@/src/components/Layout/PageContent'
import Questions from '@/src/components/QuizPage/Questions'
import QuizInfo from '@/src/components/QuizPage/QuizInfo'
import { Flex, Button, Text, Box } from '@chakra-ui/react'

import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import React from 'react'
import { getQuestion } from '../../api/QuestionData'

type QuizPageProps = {
  // All topic data=> questions, options...
  topicQuestionData: QuestionTemplate[]
  name: string
}

const QuizPage: React.FC<QuizPageProps> = ({ topicQuestionData, name }) => {
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

              <Link href="/dashboard">
                <Button
                  bg="#265e9e"
                  color="white"
                  boxShadow="5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)"
                  _hover={{
                    transform: 'scale(0.95)',
                  }}
                  width="100%"
                >
                  Back
                </Button>
                <br />
              </Link>
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
