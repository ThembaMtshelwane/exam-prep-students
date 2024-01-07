import { Topic } from '@/src/atom/quizAtoms'
import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react'
import { Timestamp } from '@google-cloud/firestore'
import React, { useEffect, useState } from 'react'
import { getTopicInfo } from '../../pages/api/TopicData'

type ActiveQuizProps = {
  /* Get topic snippets => -topic name, date created, isComplete
                            -use topic snippet from topics to create
                             the active quiz list.
                            -From the active quiz list allow the user
                             to pick a quiz to attempt
      
    When a student picks a quiz add it to the student's quiz history.
    Add the quiz name, if its completed, when was the attempt, and the results

*/
}

const ActiveQuiz: React.FC<ActiveQuizProps> = ({}) => {
  const [loading, setLoading] = useState(false)
  const [topicData, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopicInfo()
      setTopics(data?.props.topicData)
    }
    fetchTopics()
  }, [])

  function compareDates(inputDate: Timestamp): boolean {
    const currentDate = new Date()

    if (inputDate) {
      if (new Date(inputDate.seconds) < currentDate) {
        return false // before due date, therefore show quiz
      } else {
        return true
      }
    } else {
      return true
    }
  }

  return (
    <>
      <Box m={2} p={5} boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)">
        <Box fontSize="16px" fontWeight={700} color="gray.700" p={2}>
          Created Quizzes
        </Box>
        <Flex direction="row" pr={2} m={2}>
          <List width="100%">
            <Stack spacing={5}>
              {topicData.length != 0 ? (
                topicData.map(
                  (prevID: Topic, index: number) => (
                    // compareDates(prevID.dueDate) ? (
                    <ListItem key={index}>
                      <Link href={`quiz/${prevID.topicID}`}>
                        <Button
                          fontWeight={700}
                          bg="white"
                          boxShadow="1px 1px 1px 2px rgba(97, 143, 217, .75)"
                          p="10px"
                          _hover={{
                            bg: '#265e9e',
                            color: 'white',
                            transform: 'scale(0.98)',
                          }}
                          isLoading={loading}
                          width="95%"
                          height="50%"
                          borderRadius={0}
                        >
                          <Flex direction="column">
                            <Text>Course Code: {prevID.courseCode}</Text>
                            <Text>Topic: {prevID.topicID}</Text>
                            <Text>
                              Number of Learning Objectives:{' '}
                              {prevID.numberOfLearningObjectives}
                            </Text>
                            {/* <Text>Attempts: {0}</Text> */}
                            <Text>
                              Created at:
                              {new Date(
                                prevID.createdAt.seconds * 1000
                              ).toLocaleDateString()}
                            </Text>

                            <Text>
                              Due at:
                              {prevID.dueDate
                                ? new Date(
                                    prevID.dueDate.seconds * 1000
                                  ).toLocaleDateString()
                                : 'No Due Date'}
                            </Text>
                          </Flex>
                        </Button>
                      </Link>
                    </ListItem>
                  )
                  // ) :
                  //   ''
                )
              ) : (
                <Flex direction="column">
                  <Text>No Available Quiz</Text>
                </Flex>
              )}
            </Stack>
          </List>
        </Flex>
      </Box>
    </>
  )
}
export default ActiveQuiz
