import { auth, firestore } from '@/src/firebase/clientApp';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
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
};

const ActiveQuiz:React.FC<ActiveQuizProps> = (
{

}) => {

    const router = useRouter()
    const [user] = useAuthState(auth)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedTopic, setSelectedTopic] = useState('sum')
    
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
           <Box>
                <Heading p={5} m={0}> Welcome {user?.email},</Heading>
            </Box><br />
            <Box 
            border='2px solid #265e9e' 
            m ={2} p={5}>
                <Text> Current Quiz</Text>
                 <Flex direction='row' border='2px solid #265e9e' p={2} m={2} >
                 <Stack spacing={2}> 
                  <Text onClick={goToQuiz} cursor='pointer' fontWeight={700}>Fractions</Text>
                     {/* { 
                        Array(+AllTopicsSnippets.topicSnippet.length)
                          .fill("")
                          .map((n, i) => {
                            {}
                                return (
                                  <>
                                  <div key={i*2} >
                                    <Flex direction='column' border='2px'p={2} borderColor='#265e9e' borderRadius='10px' >
                                         <Box>
                                            <Text
                                             fontWeight={700}
                                             cursor='pointer'
                                             onClick={()=>{
                                                 setSelectedTopic(String(Alltopics.topicSnippet[i].topicId))
                                                 console.log('selected topic', selectedTopic)
                                                 setSelectedTopic(String(Alltopics.topicSnippet[i].topicId))
                                                 attemptRecord(selectedTopic)
                                             }}
                                            >Name:{String(AllTopicsSnippets.topicSnippet[i].topicId)}</Text>
                                            <Text> Quiz Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat perspiciatis cumque voluptate asperiores </Text>
                                         </Box>
                                         <Text fontSize='9pt' color='red'>{ error}</Text>
                                    </Flex>
                                  </div>

                                  </>
                                )
                            })
                    } */}
             
                </Stack>
                </Flex>
            </Box>
        </>
    )
}
export default ActiveQuiz;