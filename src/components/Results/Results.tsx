import {
  border,
  Box,
  Button,
  Flex,
  Link,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, firestore } from '@/src/firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

type ResultsProps = {
  data: any[]
  endQuiz: boolean
  topicID: string
}

const Results: React.FC<ResultsProps> = ({ data, endQuiz, topicID }) => {
  const [user] = useAuthState(auth)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendResults, setSendResults] = useState(false)
  const router = useRouter()
  const [userID, setUserID] = useState<any>('')

  useEffect(() => {
    const getAllIds = () => {
      setUserID(user?.uid)
    }
    getAllIds()
  }, [])
  const attemptRecord = async () => {
    setLoading(true)
    setSendResults(true)

    /* * * * *  Send data to database * * * * */
    try {
      const studentDocRef = doc(
        firestore,
        `topics/${topicID}/quizHistory/${user?.uid}`
      )

      await runTransaction(firestore, async (transaction) => {
        //overwrite previous info
        transaction.set(studentDocRef, {
          topicId: topicID,
          results: data,
          studentID: user?.email,
        })
      })
    } catch (error: any) {
      console.log('handleCreateQuiz error ', error)
      setError(error.message)
    }
    setLoading(false)
  }
  return (
    <>
      {/* END OF QUIZ*/}
      {endQuiz && !sendResults && (
        <Flex direction="column" p={2} m={2}>
          <Button
            bg="#265e9e"
            color="white"
            boxShadow="5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)"
            _hover={{
              transform: 'scale(0.95)',
            }}
            onClick={attemptRecord}
          >
            {' '}
            Show Results{' '}
          </Button>
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
              {' '}
              Back{' '}
            </Button>
            <br />
          </Link>
        </Flex>
      )}

      {sendResults && (
        <Box m={2} p={5} boxShadow="1px 1px 3px 2px rgba(97, 143, 217, .25)">
          <Flex direction="column" justify="center" align="center">
            <Text fontSize={20} fontWeight={700} mb="5px">
              Results
            </Text>
            <List spacing={2}>
              {data.map((prevID: any, index: number) => (
                <ListItem key={index + prevID.question}>
                  {index === 0 ? (
                    ''
                  ) : (
                    <Box
                      width="100%"
                      key={index * 9}
                      p={2}
                      m={2}
                      borderRadius={0}
                      boxShadow="1px 1px 1px 2px rgba(97, 143, 217, .75)"
                    >
                      {/* {console.log('prevID.resources', prevID.resources)} */}
                      <Flex flexDirection="column">
                        <Text fontSize="lg">
                          Question: <strong>{prevID.question}</strong>
                        </Text>
                        <Text>
                          Answer: <strong>{prevID.answer}</strong>
                        </Text>
                        <Text>
                          Result: <strong>{prevID.result}</strong>
                        </Text>
                        {prevID.loText ? (
                          <Text>
                            Learning Objective: <strong>{prevID.loText}</strong>
                          </Text>
                        ) : null}
                        {prevID.resources.filter(
                          (item: string) => item.trim() !== ''
                        ).length > 0 ? (
                          <Box>
                            <Text fontSize="lg" fontWeight="bold">
                              Resources:
                            </Text>
                            {prevID.resources.map(
                              (resource: string, index: number) => (
                                <Text key={index + resource}>{resource}</Text>
                              )
                            )}
                          </Box>
                        ) : (
                          ''
                        )}
                      </Flex>
                    </Box>
                  )}
                </ListItem>
              ))}
            </List>

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
    </>
  )
}
export default Results
