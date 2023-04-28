import { Topic } from '@/src/atom/quizAtoms';
import { auth, firestore } from '@/src/firebase/clientApp';
import { Box, Flex, Heading, List, ListItem, Stack, Text, } from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import {useRouter} from 'next/router'
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type ActiveQuizProps = {
   /* Get topic snippets => -topic name, date created, isComplete
                            -use topic snippet from topics to create
                             the active quiz list.
                            -From the active quiz list allow the user
                             to pick a quiz to attempt
      
    When a student picsk a quiz add it to the student's quiz history.
    Add the quiz name, if its completed, when was the attempt, and the results

*/
  topicInfo:Topic[]
};

const ActiveQuiz:React.FC<ActiveQuizProps> = ({topicInfo}) => {
    
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [user] = useAuthState(auth)
    
    const goToQuiz =() =>{
      router.push(`quiz/fractions`)
    }
    const attemptRecord = async (selectedTopic:string) =>{
    // Add this quiz (selectedTopic) to student history as an attempted quiz
        setLoading(true)
        try {
          const studentDocRef= doc(firestore,`students/${user?.uid}/quizHistory/${selectedTopic}`)
        
            await runTransaction(firestore,async (transaction) => {
            //  const studentSnippet = await transaction.get(studentDocRef)
            //  if(studentSnippet.exists()){
            //     throw new Error('Sorry Quiz already taken.')
            //   }
            //overwrite previous info
             transaction.set(studentDocRef,{
                topicId : selectedTopic,
                isComplete: false,
                attemptedAts : serverTimestamp(),                
                })
            //  router.push(`quiz/fractions`)
             router.push(`quiz/${selectedTopic}`)
            })

        } catch (error:any) {
          console.log('handleCreateQuiz error ',error)
          setError(error.message)
        }
         setLoading(false)
    }
    return (
        <>
          <Box m ={2} p={5} boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)' >
            <Box fontSize='16px' fontWeight={700} color='gray.700'>
              <p> Current Quiz</p>
            </Box>
            <Flex direction='row' p={2} m={2} >
                 
            <List width='100%'>
                <Stack spacing={5}>
                  <ListItem>
                    <Box  cursor='pointer' fontWeight={700} 
                     bg='white' boxShadow='1px 1px 1px 2px rgba(97, 143, 217, .75)'p='10px'
                      _hover={{
                        bg:'#265e9e', color:'white',
                      }}>
                        <Text >Topic: Fractions</Text>
                        <Text>Time:</Text>
                        <Text>Status:</Text>
                    </Box>
                  </ListItem>
                </Stack>
             </List>
                </Flex>
          </Box>
        </>
    )
}
export default ActiveQuiz;