import { Box, Button, Flex, Stack,Text } from '@chakra-ui/react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import router from 'next/router';
import React, { useState } from 'react';
import { auth, firestore } from '@/src/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

type ResultsProps = {
    data: any[]
    endQuiz: boolean
};

const Results:React.FC<ResultsProps> = ({data,endQuiz}) => {
    
    const [user] = useAuthState(auth)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [sendResults, setSendResults] = useState(false)

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
                <Box  border='2px solid #265e9e' borderRadius={5} m ={2} p={5}>
                    <Flex direction=  'column' p={2} m={2} > 
                      <Button bg='#265e9e' color='white' onClick={attemptRecord}> Show Results </Button><br/>
                    </Flex>  
                </Box>
           }

           { sendResults &&
           <Box  border='2px solid #265e9e' borderRadius={5} m ={2} p={5}>
                <Text fontSize={20} fontWeight={700}>Results</Text>
                <Flex direction=  'column' p={2} m={2} > 
                <Stack spacing={2} align='center'>
                {
                  data.map((prevID:any,index:number) => (
                    <Box bg='white' color='black' border='2px solid #265e9e' width='100%'key={index} p={2} m={2}>
                      <Text>Question: {prevID.question}</Text>
                      <Text>Result: {prevID.result}</Text>
                    </Box>
                  ))
                }
                </Stack> <br/> 
                </Flex> 
            </Box>
            // <Box>
            //   <Text fontWeight={700}>RESULTS </Text>
            //   <Stack spacing={2} align='center'>
            //   {
            //     data.map((prevID:any,index:number) => (
            //       <Box bg='white' color='black' border='2px solid #265e9e' width='100%'key={index}>
            //         <Text>Question: {prevID.question}</Text>
            //         <Text>Result: {prevID.result}</Text>
            //       </Box>
            //     ))
            //   }
            //   </Stack>
            // </Box>      
          }
        </>
         )

}
export default Results;