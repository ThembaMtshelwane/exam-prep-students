import { auth, firestore } from '@/src/firebase/clientApp';
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { doc, runTransaction } from 'firebase/firestore';
import {useRouter} from 'next/router'
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type ActiveQuizProps = {
    
};

const ActiveQuiz:React.FC<ActiveQuizProps> = () => {
// Get student ID, topic name
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const attemptRecord = async () =>{
        setLoading(true)
        try {
          //Create the quiz document in firestore
          // - check if unique
          const studentDocRef= doc(firestore,`students/${user?.uid}/quizSnippets`,'fraction')
        
            await runTransaction(firestore,async (transaction) => {
             const studentSnippet = await transaction.get(studentDocRef)
             if(studentSnippet.exists()){
                throw new Error('Sorry Quiz already taken.')
              }
             // create quiz snipet for the user=lecture
             transaction.set(studentDocRef,{
                topicId : 'fractions',
                isComplete: false,
                })
             // router.push(`topics/${topicName}`)
             router.push(`quiz/fractions`)
            })

        } catch (error:any) {
          console.log('handleCreateQuiz error ',error)
          setError(error.message)
        
        }
         setLoading(false)
    }
    return (
        <>
            <Box border='2px solid black'>
                <Heading p={5} m={0}> Welcome student</Heading>
            </Box><br />
            <Box 
            border='2px solid red' 
            m ={2} p={5}>
                <Text> Current Quiz</Text>
                <Flex direction='row' border='2px solid red' p={2} m={2} >
                    <Box>
                    <Text>1 Quiz Name</Text>
                    <Text> Quiz Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat perspiciatis cumque voluptate asperiores </Text>
                    <Text> Timestamp</Text>
                    </Box>
                    <Spacer/>
                    <Button alignSelf='center' onClick={attemptRecord} isLoading={loading}>Start</Button>
                    <Text fontSize='9pt' color='red'>{error}</Text>
                </Flex>
            </Box>
        </>
    )
}
export default ActiveQuiz;