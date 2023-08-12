import { border, Box, Button, Flex, Stack,Text } from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, firestore } from '@/src/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useRouter} from 'next/router'

type ResultsProps = {
    data: any[]
    endQuiz: boolean
};

const Results:React.FC<ResultsProps> = ({data,endQuiz}) => {
    
  const [user] = useAuthState(auth)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendResults, setSendResults] = useState(false)
  const router = useRouter()

  const attemptRecord = async () =>{
 
    setLoading(true)
    setSendResults(true)

    try {
      const studentDocRef= doc(firestore,`students/${user?.uid}/quizHistory/fractions`)
    
      await runTransaction(firestore,async (transaction) => {
      //overwrite previous info
       transaction.set(studentDocRef,{
          topicId : 'fractions',
          results: data,               
          })
      })
    } catch (error:any) {
        console.log('handleCreateQuiz error ',error)
        setError(error.message)
      }
    setLoading(false)
  }
  return (
    <> 
      {/* END OF QUIZ*/}
      {  (endQuiz && !sendResults)&& 
         <Flex direction=  'column' p={2} m={2} > 
           <Button bg='#265e9e' color='white' 
             boxShadow='5px 5px 5px 2px rgba(97, 143, 217, .75), 0 1px 1px rgba(0, 0, 0, .15)'
             _hover={{
              transform: 'scale(0.95)',
            }}
             onClick={attemptRecord}
           > Show Results </Button><br/>
         </Flex>  
      }
      
      { sendResults &&
      <Box m ={2} p={5}
      boxShadow='1px 1px 3px 2px rgba(97, 143, 217, .25)'
      >
        
        <Flex direction=  'column' > 
        <Text fontSize={20} fontWeight={700} mb='5px'>Results</Text>
        <Stack spacing={2} align='center'>
        {
          data.map((prevID:any,index:number) => (
            <Box bg='white' color='black'  width='100%'key={index*9} p={2} m={2}
            borderRadius={0} boxShadow='1px 1px 1px 2px rgba(97, 143, 217, .75)'
            >
              <Text>Question: {prevID.question}</Text>
              <Text>Result: {prevID.result}</Text>
              <Text>Resources: {prevID.resources}</Text>
              {
                console.log('resources ',prevID.resources)
              // prevID.resources
              }
            </Box>
           ))
         }
          </Stack> <br/> 
          </Flex> 
      </Box>  
      }
    </>
  )

}
export default Results;